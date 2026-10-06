import { Link } from "react-router-dom";
import { CaseLayout, Chapter, Tradeoff, Callout, Numbers, Steps } from "../components/CaseLayout.jsx";

const chapters = [
  { id: "problem", label: "The problem" },
  { id: "evidence", label: "What I observed" },
  { id: "decision", label: "What I built" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "results", label: "Results" },
  { id: "next", label: "What I'd measure next" },
];

const phases = [
  "Plan",
  "Confirm",
  "Execute",
  "Test",
  "Pull request",
  "Review",
  "Validate",
  "Deploy",
  "Document",
];

export default function CaseForge() {
  return (
    <CaseLayout
      world="ember"
      kicker="AI platform work at G2, 2026"
      title="Forge: an agentic workflow from plan to pull request"
      summary="Product specs were waiting on engineering capacity, and every engineer used AI coding tools their own way. I designed a nine-phase agentic workflow with human gates that takes a plan to reviewed pull requests, and the team standards that make it safe to run."
      facts={[
        ["Role", "Architect and product owner"],
        ["Scope", "Workflow design, agent roles, model routing, team standards"],
        ["Shared here", "Headline numbers and the general pattern"],
      ]}
      chapters={chapters}
    >
      <Chapter id="problem" title="The problem">
        <p>
          By early 2026 the product team had more validated ideas than the engineering team had
          capacity to ship. At the same time, AI coding assistants were everywhere in the codebase, with
          three different tools configured three different ways, no shared standards for tests or
          security boundaries, and no memory between sessions. Each engineer re-explained the codebase
          to the model every morning.
        </p>
        <p>
          The gap wasn't model quality. It was that nobody owned the workflow around the model: what an
          agent is allowed to do, when a human has to look, and how context survives from one task to
          the next.
        </p>
      </Chapter>

      <Chapter id="evidence" title="What I observed">
        <ul>
          <li>
            <strong>Most agent failures were context failures.</strong> An agent would write good code
            against the wrong assumption because it couldn't see last week's decision.
          </li>
          <li>
            <strong>One model for everything was slow and expensive.</strong> Planning needs a careful
            model. Looking up a file does not. Treating them the same wasted both time and budget.
          </li>
          <li>
            <strong>Nobody trusted fully autonomous runs.</strong> Engineers were happy to let an agent
            draft, but wanted to approve the plan before execution and the result before merge.
          </li>
        </ul>
        <Callout>
          <p>
            The product insight was that the unit of work is a phase with a gate, not a prompt. Design
            the phases and the gates, and the models become interchangeable.
          </p>
        </Callout>
      </Chapter>

      <Chapter id="decision" title="What I built">
        <p>
          Forge is a nine-phase workflow. Each phase has a defined input, a defined output, and a
          specialized agent responsible for it. Humans gate the two moments that matter: approving the
          plan before anything is built, and approving the result before it ships.
        </p>
        <ol className="forge-phases" aria-label="The nine phases">
          {phases.map((p, i) => (
            <li key={p} className={i === 1 || i === 6 ? "is-gate" : ""}>
              <span>{i + 1}</span>
              {p}
              {(i === 1 || i === 6) && <em>human gate</em>}
            </li>
          ))}
        </ol>
        <Steps
          items={[
            {
              title: "Specialized subagents with narrow permissions",
              body: "Nine agent roles, each with its own permissions, temperature, and model assignment: a planner, a decision-maker for hard calls, explorers that read but never write, reviewers, and documenters. Up to five tasks run concurrently.",
            },
            {
              title: "Persistent memory through shared tool servers",
              body: "Seven Model Context Protocol servers give agents the same memory engineers have: an organizational knowledge graph, the issue tracker, source control, live library docs, and diagrams. Decisions made on Monday are visible on Friday.",
            },
            {
              title: "Task-aware model routing",
              body: "A proxy routes each phase to one of seven models based on the job: the most careful model for planning, the fastest for lookups, a different family for adversarial decisions, and a visual model for diagram work.",
            },
            {
              title: "One standard for every tool",
              body: "An agents file in the repository defines how every AI assistant, whichever vendor, must behave: coding standards, test requirements, and security boundaries. Browser-driven test generation means agents verify behavior step by step rather than guessing at test code.",
            },
          ]}
        />
      </Chapter>

      <Chapter id="tradeoffs" title="Trade-offs I made on purpose">
        <Tradeoff
          chose="Two hard human gates"
          over="A fully autonomous run from plan to deploy"
          because="Autonomy demos well and ships badly. The plan gate catches wrong assumptions before they become thousands of lines of code. The validation gate keeps a human accountable for what reaches production. Everything between the gates runs without interruption, which is where the speed comes from."
        />
        <Tradeoff
          chose="Seven models behind a routing layer"
          over="One frontier model for every phase"
          because="Routing adds operational complexity and one more thing to maintain. It also cut cost and latency on the phases that don't need a careful model, and made the system resilient when any one provider degraded. The abstraction paid for itself in the first month."
        />
        <Tradeoff
          chose="Vendor-neutral team standards in the repo"
          over="Letting each engineer configure their own assistant"
          because="Standardizing is unpopular for about a week. After that, every tool enforces the same tests and security rules, onboarding a new engineer means reading one file, and the workflow isn't hostage to any one vendor's roadmap."
        />
        <Tradeoff
          chose="Persistent memory as infrastructure"
          over="Longer prompts and bigger context windows"
          because="Stuffing context into every prompt is simple and doesn't scale. A shared knowledge graph costs more to set up, but it's the reason agents stop repeating last week's mistakes, and it's what makes multi-day work possible."
        />
      </Chapter>

      <Chapter id="results" title="Results">
        <Numbers
          items={[
            ["9", "phases, plan to document"],
            ["2", "human gates per run"],
            ["7", "models routed by task"],
            ["Daily", "use across multiple repositories"],
          ]}
        />
        <p>
          Forge moved from a demo to the way the team ships. Since launch it has run every working day
          across multiple repositories, taking plans through to reviewed, production pull requests with
          dozens of background agents working in parallel on each run. The same pattern, applied as a
          parallel research tree, produced the migration specification for a legacy monolith that was then
          executed end to end through AI coding sessions. The throughput keeps climbing, which is why this
          page describes the system rather than quoting a number that is stale by the next morning.
        </p>
        <Callout tone="accent">
          <p>
            The number I'm proudest of isn't the line count. It's that engineers kept using it after the
            demo, because the gates made it feel like a tool and not a gamble.
          </p>
        </Callout>
      </Chapter>

      <Chapter id="next" title="What I'd measure next">
        <ul>
          <li>Share of pull requests from Forge merged without a human rewrite, by phase of origin.</li>
          <li>Cost per merged pull request, split by model, to keep routing honest.</li>
          <li>Plan-gate rejection rate, which tells me whether the planner is improving or the humans are rubber-stamping.</li>
          <li>Time from ticket creation to first reviewable pull request, compared with the pre-Forge baseline.</li>
        </ul>
        <div className="cs__next">
          <Link className="btn" to="/work/narthana">
            Back: Narthana Studio Manager
          </Link>
          <Link className="btn btn--ghost" to="/#contact">
            Get in touch
          </Link>
        </div>
      </Chapter>
    </CaseLayout>
  );
}
