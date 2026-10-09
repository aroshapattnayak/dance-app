function doGet(e) { return scan(); }
function doPost(e) { return scan(); }

function scan() {
  var BASE = "https://firestore.googleapis.com/v1/projects/dance-app-ccf55/databases/(default)/documents";

  // 1. Search Gmail for Zelle emails (last 4 days)
  var threads = GmailApp.search('from:no.reply.alerts@chase.com subject:"You received money with Zelle" newer_than:4d');
  var payments = [];

  for (var t = 0; t < threads.length; t++) {
    var msgs = threads[t].getMessages();
    for (var m = 0; m < msgs.length; m++) {
      var body = msgs[m].getPlainBody();
      var nameMatch = body.match(/(.+?)\s+sent you money/i);
      var amountMatch = body.match(/Amount\s*\$([0-9,]+(?:\.[0-9]{2})?)/);
      var dateMatch = body.match(/Sent on\s*(.+)/);
      if (nameMatch && amountMatch && dateMatch) {
        var raw = dateMatch[1].trim();
        var d = new Date(raw);
        if (isNaN(d.getTime())) continue;
        var yyyy = d.getFullYear();
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var dd = ("0" + d.getDate()).slice(-2);
        payments.push({
          senderName: nameMatch[1].trim(),
          amount: parseFloat(amountMatch[1].replace(/,/g, "")),
          messageDate: yyyy + "-" + mm + "-" + dd
        });
      }
    }
  }

  // 2. Read active students from Firestore
  var students = [];
  var url = BASE + "/students?pageSize=100";
  while (url) {
    var resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    var data = JSON.parse(resp.getContentText());
    var docs = data.documents || [];
    for (var i = 0; i < docs.length; i++) {
      var f = docs[i].fields || {};
      var active = f.active ? f.active.booleanValue : false;
      if (!active) continue;
      students.push({
        id: docs[i].name.split("/").pop(),
        name: f.name ? f.name.stringValue : "",
        parentName: f.parentName ? f.parentName.stringValue : "",
        fee: parseInt(f.fee ? (f.fee.integerValue || f.fee.doubleValue || "0") : "0")
      });
    }
    url = data.nextPageToken ? BASE + "/students?pageSize=100&pageToken=" + data.nextPageToken : null;
  }

  // 3. Read existing zelle_queue
  var existing = [];
  var qResp = UrlFetchApp.fetch(BASE + "/zelle_queue?pageSize=200", { muteHttpExceptions: true });
  var qData = JSON.parse(qResp.getContentText());
  var qDocs = qData.documents || [];
  for (var i = 0; i < qDocs.length; i++) {
    var qf = qDocs[i].fields || {};
    existing.push({
      senderName: qf.senderName ? qf.senderName.stringValue : "",
      amount: parseFloat(qf.amount ? (qf.amount.doubleValue || qf.amount.integerValue || "0") : "0"),
      messageDate: qf.messageDate ? qf.messageDate.stringValue : ""
    });
  }

  // 4. Deduplicate
  var newPayments = payments.filter(function(p) {
    return !existing.some(function(e) {
      return e.senderName.toLowerCase() === p.senderName.toLowerCase() &&
             e.amount === p.amount &&
             e.messageDate === p.messageDate;
    });
  });

  // 5. Match to students and write
  var added = 0;
  for (var j = 0; j < newPayments.length; j++) {
    var p = newPayments[j];
    var bestMatch = null, bestScore = 0;

    for (var k = 0; k < students.length; k++) {
      var words = students[k].parentName.split(/[\s\/]+/).filter(function(w) { return w.length > 2; });
      var score = 0;
      for (var w = 0; w < words.length; w++) {
        if (p.senderName.toLowerCase().indexOf(words[w].toLowerCase()) >= 0) score++;
      }
      if (score > bestScore) { bestScore = score; bestMatch = students[k]; }
    }

    var status, sid;
    if (bestMatch && bestScore > 0) {
      sid = bestMatch.id;
      var fee = bestMatch.fee;
      if (fee > 0 && (p.amount === fee || (p.amount > fee && p.amount % fee === 0))) {
        status = "auto";
      } else {
        status = "review";
      }
    } else {
      sid = null;
      status = "unmatched";
    }

    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var id = "";
    for (var c = 0; c < 7; c++) id += chars[Math.floor(Math.random() * chars.length)];

    var fields = {
      id: { stringValue: id },
      senderName: { stringValue: p.senderName },
      amount: { doubleValue: p.amount },
      messageDate: { stringValue: p.messageDate },
      scannedAt: { stringValue: new Date().toISOString() },
      status: { stringValue: status }
    };
    if (sid) { fields.sid = { stringValue: sid }; }
    else { fields.sid = { nullValue: null }; }

    UrlFetchApp.fetch(BASE + "/zelle_queue/" + id, {
      method: "patch",
      contentType: "application/json",
      payload: JSON.stringify({ fields: fields }),
      muteHttpExceptions: true
    });
    added++;
  }

  return ContentService.createTextOutput(JSON.stringify({
    found: payments.length,
    added: added,
    skipped: payments.length - newPayments.length
  })).setMimeType(ContentService.MimeType.JSON);
}
