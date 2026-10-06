import { Link } from "react-router-dom";
import { CaseLayout, Chapter, Tradeoff, Callout, Numbers, Steps } from "../components/CaseLayout.jsx";
import QuickPayDemo from "../components/QuickPayDemo.jsx";

const chapters = [
  { id: "problem", label: "The problem" },
  { id: "evidence", label: "What I observed" },
  { id: "options", label: "Options I weighed" },
  { id: "decision", label: "What I built" },
  { id: "ai", label: "How I used AI" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "results", label: "Results" },
  { id: "next", label: "What I'd measure next" },
];

export default function CaseNarthana() {
  return (
    <CaseLayout
      world="amber"
      kicker="Side project, product owner and builder, 2026"
      title="Narthana Studio Manager"
      summary="A dance studio was reconciling Zelle payment texts against a spreadsheet by hand. I built a mobile-first app where the core workflow takes five seconds, then onboarded a second studio in an afternoon."
      facts={[
        ["Role", "Product, design, and build"],
        ["Users", "Two studio owners, 144 students"],
        ["Stack", "React, Firebase Firestore, GitHub Pages"],
        ["Built with", "Claude Code from my specs"],
      ]}
      chapters={chapters}
    >
      <Chapter id="problem" title="The problem">
        <p>
          Narthana is a dance studio with 64 students across four monthly fee tiers, from $60 to $150.
          Most families pay by Zelle. Every payment arrives as a text message on the owner's phone:
          a sender name and an amount, nothing else.
        </p>
        <p>
          Once a week the owner sat down at a laptop, scrolled through the texts, and matched each one
          to a row in a spreadsheet. That took about 30 minutes, and it was the kind of 30 minutes that
          gets skipped when the week is busy. Skipped weeks turned into awkward "did you pay?"
          conversations with parents.
        </p>
        <Callout>
          <p>
            The payment arrived on a phone, instantly. The record of it was created on a laptop, days
            later. Everything that went wrong lived in that gap.
          </p>
        </Callout>
      </Chapter>

      <Chapter id="evidence" title="What I observed">
        <p>I sat through the weekly reconciliation before designing anything. Three things stood out.</p>
        <ul>
          <li>
            <strong>Zelle texts show the parent's name, not the student's.</strong> The spreadsheet was
            organized by student. Every match required a mental lookup from parent to child.
          </li>
          <li>
            <strong>Sibling families break the lookup.</strong> One parent pays one amount for two
            students. The owner had to remember which families had siblings and split the amount by
            hand. This was the most common source of errors.
          </li>
          <li>
            <strong>The job was desktop-bound for no good reason.</strong> The owner had the phone in
            hand when the text arrived. The only reason to wait for the laptop was the spreadsheet.
          </li>
        </ul>
        <p>
          That gave me the north star for the product: record a payment at the moment it arrives, from
          the device it arrives on, using the name it arrives with.
        </p>
      </Chapter>

      <Chapter id="options" title="Options I weighed">
        <Steps
          items={[
            {
              title: "Keep the spreadsheet, add a mobile form",
              body: "Cheapest option. But a form still needs the parent-to-student lookup done in the owner's head, and it does nothing for siblings. It moves the chore, it doesn't remove it.",
            },
            {
              title: "Buy studio management software",
              body: "Products in this category are built for larger studios with class scheduling, attendance, and card processing. They charge monthly, and none of them read a Zelle text. The studio would pay to keep doing the matching by hand.",
            },
            {
              title: "Build a small app around the one workflow",
              body: "Highest effort, but the only option that attacks the actual gap. A mobile-first app that searches by parent name, shows siblings together, and syncs to the laptop instantly. I chose this.",
            },
          ]}
        />
      </Chapter>

      <Chapter id="decision" title="What I built">
        <p>
          The whole product is designed around one flow, which I called Quick Pay. A Zelle text arrives,
          the owner taps one button, types the first few letters of the parent's name, and every student
          for that parent appears with their fee pre-filled. One save records every sibling, with
          today's date and Zelle as the method, and the laptop dashboard updates within a second.
        </p>
        <div style={{ margin: "8px 0" }}>
          <QuickPayDemo />
        </div>
        <p>Around that flow sit the things a studio actually needs:</p>
        <ul>
          <li>A monthly dashboard showing collected versus expected, with a list of who hasn't paid.</li>
          <li>Multi-month payments, since families often pay two or three months at once.</li>
          <li>A Zelle queue that auto-matches incoming payments to parents and lets the owner approve or dismiss each one.</li>
          <li>Per-student payment history and invoices.</li>
          <li>Offline persistence, so a payment recorded without signal syncs when the phone reconnects.</li>
        </ul>
        <p>
          Smart defaults carry most of the weight. Date is today, method is Zelle, amount is the
          student's tier. The owner only types when the default is wrong.
        </p>
      </Chapter>

      <Chapter id="ai" title="How I used AI to build it">
        <p>
          I did not write most of the code. I wrote the product. Each feature started as a short spec:
          the user, the trigger, the steps, the expected result, and the edge cases I had seen in the
          studio. Claude Code built from that spec, I tested it on my phone against real payment texts,
          and I sent back a fix list. The loop ran many times a day.
        </p>
        <Steps
          numbered
          items={[
            {
              title: "Frame the problem in the studio's words",
              body: "Every spec opened with the moment it served: 'Nalini just sent $240 for two kids. Record it from the phone in one go.' That kept the agent building workflows, not screens.",
            },
            {
              title: "Let the agent build, then break it on a real device",
              body: "I tested on the owner's actual phone with actual texts. The commit history is full of what that surfaced: a blank page on GitHub Pages from a JSX runtime mismatch, a dashboard that didn't refresh after a phone entry, off-by-one dates across time zones.",
            },
            {
              title: "Push back on product decisions, not syntax",
              body: "When the first search box only matched student names, I rewrote the spec, not the code: match on parent name, sort alphabetically, show siblings together. The agent rebuilt it in one pass.",
            },
            {
              title: "Spend my attention on the edges",
              body: "Duplicate-month warnings, the six-month back-dating window for late payers, approving a Zelle match for the right month. These came from watching real use, and they're where I added the most value.",
            },
          ]}
        />
        <Callout tone="accent">
          <p>
            The lesson I took to work: an AI coding agent is only as good as the spec, the test device,
            and the person willing to say "that's not the workflow." That's a product manager's job
            description.
          </p>
        </Callout>
      </Chapter>

      <Chapter id="tradeoffs" title="Trade-offs I made on purpose">
        <Tradeoff
          chose="Search by parent name, show siblings together"
          over="A student picker, which is how every studio tool works"
          because="The input is a Zelle text with the parent's name on it. Matching the product to the input removed the lookup the owner was doing in their head, and made sibling payments a single action instead of two."
        />
        <Tradeoff
          chose="One perfect mobile workflow first"
          over="Feature parity with a desktop admin system"
          because="Ninety percent of the studio's pain was one five-second moment on a phone. Shipping that moment early meant the owner used the app from week one, and real use told me what to build next. Desktop views came after."
        />
        <Tradeoff
          chose="Firebase Firestore"
          over="A custom backend with my own API"
          because="Real-time sync, offline persistence, and optimistic updates came for free, which is exactly what a phone-first app needs. The cost is vendor lock-in and no server-side validation. For two studios and one owner each, that's the right trade. I'd revisit it at the point where multiple staff need different permissions."
        />
        <Tradeoff
          chose="A single-file app with no build step"
          over="A bundled project from day one"
          because="Zero toolchain meant I could fix a bug from any machine and the owner never waited on a deploy pipeline. It held up for the first few thousand lines. Once the app grew, I added Vite for local development, which is the kind of debt you take on knowingly and pay down when it's due."
        />
        <Tradeoff
          chose="Free static hosting on GitHub Pages"
          over="A hosted app with an auth layer"
          because="Zero cost was a constraint, not a preference. A studio with 64 students can't justify a monthly bill. The trade is no login and a public repository, which is acceptable for fee records with no card data, and is the first thing I'd change before a third studio."
        />
      </Chapter>

      <Chapter id="results" title="Results">
        <Numbers
          items={[
            ["30 → 2 min", "weekly reconciliation"],
            ["~5 sec", "to record a payment"],
            ["6 hours", "to onboard studio two"],
            ["$0", "infrastructure per month"],
          ]}
        />
        <p>
          Weekly reconciliation went from about 30 minutes to under 2, and most payments are now
          recorded the moment the text arrives. The app manages 64 students and over 290 payment
          records at the first studio. A second studio with 80 students was onboarded in six hours by
          extending the same platform. Infrastructure cost is zero on Firebase's free tier and GitHub
          Pages.
        </p>
      </Chapter>

      <Chapter id="next" title="What I'd measure next">
        <p>
          The headline number is time saved. The numbers I actually care about going forward are about
          trust in the data, because that's what makes a studio owner stop keeping a backup spreadsheet.
        </p>
        <ul>
          <li>Share of Zelle payments auto-matched by the queue without a manual correction.</li>
          <li>Median time from a Zelle text to a recorded payment.</li>
          <li>Payment reminder accuracy: reminders sent to families who truly hadn't paid.</li>
          <li>Payments and invoices processed per month across both studios, as a pilot metric for a third.</li>
        </ul>
        <div className="cs__next">
          <Link className="btn" to="/work/forge">
            Next: Forge
          </Link>
          <a className="btn btn--ghost" href="https://github.com/aroshapattnayak/narthana-studio-manager" target="_blank" rel="noreferrer">
            View the repository
          </a>
        </div>
      </Chapter>
    </CaseLayout>
  );
}
