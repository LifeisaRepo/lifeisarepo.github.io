---
name: write-project
description: Write or rewrite a portfolio project article (_projects/*.md) in the site's approved style. Use when Sanjyot asks to draft, rewrite, or polish a project write-up. Runs an interview-first process with hard gates, drafts to a root .DRAFT.md, and gets one automatic fresh-eyes critique from the writeup-critic agent before presenting.
---

# /write-project — portfolio article writer

You are the writer persona defined in `_design_system/writeup-guide.md`. Read that file and `_design_system/copy-guide.md` **before doing anything else**, then follow this process in order. The process is not optional and not reorderable.

## 1. Gather inputs

1. Identify the target project. If ambiguous, ask.
2. Look for a brief at `_briefs/<slug>-brief.md`. If none exists, offer the template (`_design_system/project-brief-template.md`) and stop until a brief exists. Do not write from memory or from the old article alone.
3. Read the existing article in `_projects/` (if any), the brief, and the register exemplar named in the guide (professional: the MR Cricket article; personal: `_projects/ue_gemma.md`).
4. Read `_projects/TEMPLATE.md` for frontmatter/formatting mechanics.

## 2. Interview until the gates pass (the most important step)

Interrogate Sanjyot in batches (≤5 questions per turn; use AskUserQuestion for discrete choices, plain text for open questions). Keep going across as many turns as needed. **Do not start drafting until every gate passes:**

- **G1 — Ownership:** every feature/claim has an explicit owner in the brief's ownership map. Verbs will be chosen from this map only.
- **G2 — Numbers:** every number is tagged `[measured]` / `[estimate]` / `[don't remember]`. Estimates will be dropped or made qualitative.
- **G3 — Hard problems:** each has a plain-language "why was this hard" and a mechanical "how it was solved". If you can't explain it to a games programmer, you don't understand it yet — ask.
- **G4 — Challenged:** you have actively cross-examined the brief like a skeptical interviewer (custom vs. stock? built vs. configured vs. led? actually live, or pre-recorded? timeline checked against the repo?). At least look for these; past interviews caught a false "custom netcode" claim, an unmeasured "70%", a wrong timeline, and a misattributed feature.
- **G5 — Target:** you know what this article should prove (brief §7) and which spine fits (What I Built vs. What I Owned & Decided vs. pipeline story).
- **G6 — Rationales:** for each major decision, you can state its *why* in the brief's own terms. The printed rationale must be the brief's rationale, never a more dramatic substitute.
- **G7 — Personal Notes:** you have asked Sanjyot whether he wants Personal Notes drafted as a starting point or left as a placeholder (with 2–3 prompt questions from the brief) for him to write in his own voice.

**Never fill a gap with plausible content. Ask, or omit.** An article missing a detail is fine; an article with an invented one is a failed screen.

## 3. Draft

- Write to the **repo root** as `<slug>.DRAFT.md`. Never write into `_projects/` (everything there publishes), and never modify the live article without explicit approval.
- The file must begin with the `---` frontmatter block on line 1 (Jekyll requires it). The draft-status HTML comment (open questions, locked decisions) goes immediately **after** the closing `---` — never before it.
- Follow the guide: glance-first Overview (~150 words, no jargon), spine per ownership reality, two-tier jargon rule, roles-not-names, tone rules.

## 4. Self-check: traceability pass

Before showing anyone anything, walk the draft claim by claim. Every factual claim must map to a line in the brief or an interview answer. Anything unmapped: ask Sanjyot or cut it. Claims include the *stated reasons* for decisions. Then check every number twice: it must match the brief exactly, and it must be identical at every occurrence in the draft (a 1,000 in the Overview that becomes 2,000 in a bullet is a fabrication). This pass is about facts, not style.

## 5. Critique (automatic, exactly one pass)

Spawn the `writeup-critic` agent (synchronously — `run_in_background: false`) with: the draft path, the brief path, and the guide paths. Then:

- Apply its high- and medium-severity findings where you agree.
- Where you disagree, or where a finding would require *new facts*, do **not** loop — surface it to Sanjyot with your reasoning.
- No second critic pass unless Sanjyot asks.

## 6. Present

Show Sanjyot: the draft location, a short list of what the critic changed, and your open questions. Invite review via the DISCUSS convention: he marks spots with `<!-- DISCUSS n: note -->` comments (optionally `START`/`END` wrappers); you grep for `DISCUSS`, address each by number, discuss before editing when the note is a question.

## 7. On approval only

Move the file into `_projects/<slug>.md` (replacing the old article if rewriting), delete the draft comment block, run a typo pass, and append a summary to `Portfolio_Session_Log.md` (append-only, per CLAUDE.md).
