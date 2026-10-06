// Every outcome below is written in XYZ form:
// "Accomplished X, as measured by Y, by doing Z."

export const profile = {
  name: "Arosha Pattnayak",
  title: "Senior Product Manager",
  location: "Austin, Texas",
  email: "aroshapattnayak@gmail.com",
  linkedin: "https://linkedin.com/in/aroshapattnayak",
  github: "https://github.com/aroshapattnayak",
  resume: "Arosha_Pattnayak_Resume.pdf",
  intro:
    "I'm a product manager who finds the leverage point in a workflow, ships the fix, and measures what changed. Ten years across G2, Gartner, E2open, Delivery Hero and Amazon, and I still build my own products on weekends.",
};

// "How I think": each principle is backed by one real outcome.
export const principles = [
  {
    title: "Remove the step nobody wants.",
    body:
      "Buyers on G2 hated giving a phone number because vendors called nonstop. I removed phone collection and routed buyers to a web call instead.",
    proof: "43% of buyers opted into the web call in the first month, then grew 0.7% week over week for the next three weeks.",
  },
  {
    title: "Match the input to how it actually arrives.",
    body:
      "Zelle payments show up as a text with the parent's name, not the student's. So the studio app searches by parent name and shows every sibling at once.",
    proof: "Reconciling a payment dropped from a 30-minute weekly chore to under five seconds per payment, from a phone.",
  },
  {
    title: "Give both sides of a marketplace what they came for.",
    body:
      "Buyers wanted control over who contacts them and when. Vendors still needed contact details. The buyer workspace lets buyers pick vendors and self-schedule while vendors keep the data they pay for.",
    proof: "Appointment show-up rate rose to 76% against 56% in the control group.",
  },
  {
    title: "Price a new thing by what it is, not what it replaces.",
    body:
      "An AI chatbot that auto-qualifies buyers produces a different lead than a human-verified one. I launched it as a new product priced below human-verified leads instead of pretending they were equal.",
    proof: "SMB vendor budget utilization grew 14% in the test market, and the chatbot converted 23% of visitors against 21% for static calls to action.",
  },
  {
    title: "Build it yourself when that's the fastest way to learn.",
    body:
      "I write specs, then build with AI coding agents so I can feel the trade-offs instead of reading about them. Forge and the Narthana studio app both came out of that habit.",
    proof: "Forge now runs every working day across multiple repositories, taking plans through to reviewed pull requests with humans gating only the two decisions that matter.",
  },
];

// AI product work at G2 (public headline numbers only).
export const aiWork = [
  {
    name: "Agent chatbot for lead qualification",
    xyz: "Grew SMB vendor budget utilization 14% in a test market by launching an AI chatbot that auto-qualifies buyers into agent-verified leads, a new product priced below human-verified leads.",
    metric: "14%",
    metricLabel: "budget utilization growth",
  },
  {
    name: "Call scoring from transcripts",
    xyz: "Cut advisor note-taking from 20 minutes to 4 and delivered leads to vendors 33% faster by auto-scoring calls against 16 benchmark checks from call transcripts, with live post-call feedback.",
    metric: "20 → 4 min",
    metricLabel: "note-taking per call",
  },
  {
    name: "Buyer accounts platform",
    xyz: "Drove $105,000+ in vendor-appointment revenue in one month and an 89% improvement in advisor follow-up tracking by building a buyer-accounts platform with AI scoring across 3M+ profiles to flag repeat and cross-sell targets.",
    metric: "3M+",
    metricLabel: "profiles scored",
  },
  {
    name: "Forge, an agentic delivery workflow",
    xyz: "Turned product plans into reviewed, production pull requests across multiple repositories, in daily use since launch, by architecting a 9-phase agentic workflow from plan through deploy with specialized subagents, persistent memory, and human gates.",
    metric: "Plan to PR",
    metricLabel: "in one gated workflow",
    link: "/work/forge",
  },
];

export const experience = [
  {
    company: "G2",
    role: "Sr. Product Manager, Central & Vendor Experience",
    period: "Feb 2026 – Present",
    location: "Austin, TX",
    bullets: [
      "Grew SMB vendor budget utilization 14% in a test market by launching an AI chatbot that auto-qualifies buyers into agent-verified leads.",
      "Raised buyer appointment show-up rate to 76% against 56% in the control by building a workspace where buyers choose vendors and self-schedule.",
      "Reached 43% buyer opt-in to a web-call experience by removing phone-number collection and routing buyers to a web call.",
      "Drove $105,000+ in monthly vendor-appointment revenue and an 89% improvement in advisor follow-up tracking by building a buyer-accounts platform with AI scoring across 3M+ profiles.",
      "Cut advisor note-taking from 20 minutes to 4 by auto-scoring calls against 16 benchmark checks from call transcripts.",
      "Cut time-to-first-call by 2.2 minutes and lifted form fills 8%+ month over month by architecting a real-time Twilio and 8x8 telephony integration.",
      "Drove 46% partner channel growth in 2 months by launching a PartnerStack-integrated partner portal.",
      "Improved buyer-vendor match relevance 22% year over year and pay-per-lead vendor participation 15% with a rule-based scoring engine.",
      "Helped lift sales revenue 16% year over year by integrating the product catalog with SugarCRM so Sales could focus on top vendors.",
    ],
  },
  {
    company: "Gartner",
    role: "Technical Product Manager, Platforms & Vendor Ecosystem",
    period: "Oct 2022 – Jan 2026",
    location: "Austin, TX",
    bullets: [
      "Owned roadmap and delivery for platform products serving about 2,000 vendors and partners, working with 5 engineers across 2 squads.",
      "Improved conversion capture 12% over two years by redesigning the buyer conversion funnel with consistent data schemas on a Kafka-based event architecture.",
      "Grew vendor adoption 20% year over year by launching a self-service vendor portal with advanced bidding, automated invoice generation, and real-time performance visibility.",
      "Cut the end-of-month invoicing cycle from 8 days to 2 by building an end-to-end data pipeline from buyer leads to billable usage to financial statements.",
      "Enabled 83% of vendor accounts to be filled with third-party data without re-contacting vendors, and reached 90% data refresh reliability against a 5-minute SLA, by leading the ZoomInfo and Clearbit integrations.",
    ],
  },
  {
    company: "E2open",
    role: "Principal Product Manager, Sales & Vendor Platforms",
    period: "May 2022 – Oct 2022",
    location: "Austin, TX",
    bullets: [
      "Improved data accuracy 80% and month-end close accuracy 40%, and removed 2,700+ duplicate campaigns, by standardizing vendor master data and consolidating overlapping campaigns.",
      "Sustained 87% accuracy in payment collection and invoice generation for 130+ vendors by leading the MVP of the NetSuite and Salesforce integration for vendor financials.",
    ],
  },
  {
    company: "Talabat (Delivery Hero)",
    role: "Senior Business Analyst, Strategic Analytics & PMO",
    period: "Nov 2020 – Aug 2021",
    location: "Dubai, UAE",
    bullets: [
      "Cut payroll input errors 45% and processing time 30% by designing and launching an automated dark-store payroll system.",
      "Reduced customer churn from 4.5% to 2.9% by partnering with engineering on e-wallet churn prediction models.",
      "Exceeded loyalty campaign participation targets by 45% by driving campaign strategy through UI improvements.",
      "Cut manual reconciliation by 50 minutes per day per team by automating data pipelines across CMS, Salesforce, and billing.",
    ],
  },
  {
    company: "Amazon",
    role: "Data Analyst, Strategy (Operations & Process Improvement)",
    period: "Aug 2019 – Nov 2020",
    location: "Dubai, UAE",
    bullets: [
      "Built the first automated data-quality monitoring for warehouse operations, later adopted regionally, by shipping SQL and R anomaly detection.",
      "Reached 90%+ reporting accuracy by standardizing EMEA employee attendance data collection across warehouses.",
    ],
  },
];

export const education = [
  { school: "Arizona State University, W. P. Carey School of Business", degree: "M.S. Business Analytics (STEM)", period: "2021 – 2022" },
  { school: "BITS Pilani", degree: "B.E. (Hons.) Computer Science", period: "2014 – 2018" },
];

export const skills = {
  Product: ["Roadmapping", "OKRs", "PRDs", "RICE", "A/B testing", "User research", "Go-to-market", "North star metrics"],
  Technical: ["SQL", "Python", "R", "React", "Node.js", "Firebase", "GitHub Actions", "Kafka", "API design", "Tableau", "Looker"],
  "AI / ML": ["Agentic workflows", "MCP", "LLM evaluation", "Multi-model orchestration", "Prompt engineering", "RAG"],
};
