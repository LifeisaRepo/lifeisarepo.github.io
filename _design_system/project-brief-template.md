# Project Brief — [PROJECT NAME]

<!-- ============================================================
  HOW TO USE
  1. Copy this file to  _briefs/<slug>-brief.md  (create _briefs/ if
     needed — underscore folders are ignored by Jekyll).
  2. Fill what you can. Leave "?" where you don't know or don't
     remember — the writer is REQUIRED to ask rather than guess,
     so an honest "?" is more useful than a vague sentence.
  3. Structure = importance. The writer treats Ownership, Hard
     Problems, and Numbers as load-bearing; the Raw Dump is mined
     for color, never for claims.
  4. Tag EVERY number:  [measured]  [estimate]  [don't remember]
     Untagged numbers will be treated as estimates and left out.
============================================================ -->

## 1. Hard facts

- **Title / working title:**
- **Client / employer** (past and present names if renamed):
- **Timeline** (check the repo/git history — memory lies):
- **Engine + exact versions, and why that version:**
- **Platform / hardware:**
- **Team size** (dev team only):
- **My official role:**
- **Status:** shipped / live / R&D / cancelled — and where (store link, event, broadcast)?

## 2. Ownership map  *(the most important section)*

One row per feature/system a reader might ask "who built this?" about (5–10 rows is typical). Be exact — the article's verbs are chosen from this table and nothing else.

The four values, and the verbs each one licenses:
- `I wrote it` — hands on keyboard, code is mine → *built, wrote, implemented, debugged*
- `I designed it, another built it` — my architecture, their code → *designed, architected* (never *built*)
- `teammate built it` — their feature, even if on my foundation → context/credit only
- `team effort` — genuinely inseparable joint work. Use SPARINGLY — not as modesty, not to blur. If you designed and they built, use the second value.

Use the Notes column for the precise slice that cuts across a row (e.g. "feature was his; the trajectory math and the lazy-load idea were mine").

**Solo project?** The question shifts from *which person* to *which source*: course/tutorial-following vs. my own extension, template or marketplace content, AI-assisted code. Same honesty, same table.

**No code / pipeline or ops project?** Swap "feature/system" for *pipeline stage or deliverable* and "code" for *hands-on work*. The values translate: `I did it hands-on` (researched / designed / configured / operated it myself), `I designed it, teams executed it` (my architecture or SOPs, others ran them), `another team's / vendor's domain` (client apps, CDN, vendor software), `team effort` (same warning). And note: in pipeline work, *evaluating and selecting* the stack under real constraints IS the engineering — "researched and selected X over Y" is a first-class hands-on row, not a footnote.

<!-- Worked example (MR Cricket):
| HoloLens×Mo-Sys camera-sync core | I wrote it | anchors, session logic, Mo-Sys integration, output path |
| C++ re-architecture | I designed it, another built it | base classes + replication patterns mine; teammates rebuilt their features within it |
| Hawkeye Pitch | teammate built it | my trajectory math + lazy-load idea; his implementation |
-->

| Feature / system | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine) |
|---|---|---|
|  |  |  |
|  |  |  |

- Things people might *assume* I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"):
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material:

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:
- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story):
- Anything where I used stock/standard tech deliberately instead of building custom (this mainly *constrains claims* — it gets printed only if the choice was a real decision with a tradeoff, like Meta's engine fork over OpenXR; stock-by-default, like material nodes or UMG, stays unmentioned):
- Anything risky I *refused* to do, and why:

## 5. Numbers and evidence  *(tag every one: [measured] / [estimate] / [don't remember])*

- Performance before/after:
- Scale (users, sessions, hours, capacity):
- Reliability / stability changes over time:
- External validation (paper, store page, press, award) + links:

## 6. Failures, bugs, war stories

The honest stuff — drift, crashes, recoveries under pressure, help you got from other teams. This is where the article gets its credibility and its color.

## 7. What should this article prove about me?

One or two sentences. (e.g. "That I can design systems other engineers build within" / "That my hands are still dirty.") The writer aims every section at this.

## 8. Voice, focus & size dials

- **Register:** Professional / Personal
- **Focus:** me-forward / project-forward
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** full / compact
  (Size governs *scope* — which sections/stories make it in — never sentence room. compact = tight structure, no padding; sentences still get the words a first read needs. full = the material supports multiple deep sections.)
- Any tone notes for this piece:

## 9. Media

- Hero image / YouTube ID:
- Gallery images + captions:
- CTA buttons (store page, paper, repo, build):

## 10. Raw dump

Everything else — stream of consciousness welcome. The writer mines this for texture and follow-up questions, but no claim from here reaches the article without being confirmed above or in the interview.
