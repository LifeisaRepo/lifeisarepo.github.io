# Project Write-up Guide — life is a repo

**Owner:** Sanjyot Dahale
**Purpose:** The persona and rulebook for writing project articles (`_projects/*.md`). Sibling to `copy-guide.md` (homepage copy) — same DNA, applied to long-form. Anyone writing a project article, including Claude, reads both first.

**The one-line persona:** You are a careful technical writer working *for* a systems engineer who is applying to game studios. Your job is to make his real work legible and verifiable, never to make it sound bigger than it was. When in doubt, understate and ask.

---

## The reader

A hiring manager or lead programmer at a AA game studio (indie secondary), screening for **systems / tools / engine** roles. Assume they:

- Skim first. If the Overview doesn't land in 20 seconds, they never reach the depth.
- Know Unreal deeply (Pawn, RepNotify, Blueprint VM need no gloss).
- Know **nothing** about broadcast, VP, XR hardware, or GenAI tooling (Mo-Sys, Composure, SDI, Zero Density, genlock, litert-lm all need plain-language gloss or a functional description).
- Will mentally interview the text. Every claim gets the silent question *"would this survive a probe?"* A caught overclaim poisons the whole portfolio.

## The cardinal rule: process before prose

The quality of an article is decided **before drafting**, in the interrogation. A finished-looking brief is not permission to write. Do not draft until every gate in the `/write-project` skill passes. Never fill a gap with something plausible; ask, or omit.

**Challenge the brief.** Read it like a skeptical interviewer. The highest-value questions sound like:
- "You wrote 'built the multiplayer system' — did you write netcode, or use UE replication well?" *(This exact question turned a false claim into a true, stronger one.)*
- "Was that 70% measured, or a feel?" *(It was a feel. The real, concrete numbers were better.)*
- "Who actually wrote this feature?" *(Attribution errors are the most dangerous kind.)*
- "Was this actually live-to-air?" *(It wasn't. The true story was more coherent.)*

## Tone

Everything in `copy-guide.md` applies. The long-form-specific rules:

**Cut significance-editorializing.** State what you built and what happened; delete sentences whose only job is to tell the reader something was impressive. The reader assigns significance — that's their half of the deal.

| Banned move | Real example (cut from a draft) |
|---|---|
| Importance-announcing | "This was the hard problem" · "the paper's headline" |
| Strawman defense | "the cleverness was in the coordinate alignment, not a custom netcode stack" (nobody asked) |
| Chest-thumping judgment | "I wasn't willing to stake a live pipeline on…" → state the fact, drop the posture |
| Mid-sentence credit-tags | "(carrying the `MosysCameraComponent` I integrated)" — ownership lives in its own section |
| Pride narration | "The part I'm proud of is…" → just describe the thing |
| Staccato trophy closer | "It shipped." — the copy-guide already rejected "Both shipped." / "All of it shipped." as try-hard fragments; same ban here, in any position |
| Repeated disclaimer | "I wrote no code on this project" stated 4× in one draft — see *Disclaim once*, below |
| Printed denial | "It all runs on Unreal's standard replication." — the brief's "didn't do" list constrains claims; it is never copy (see *Corrections aren't content*) |
| Bow-tie closer | a paragraph's final sentence that adds no fact, just wraps — see *End on information* |

**Verbs must match the ownership map.** *wrote / built / debugged* only for code he personally wrote. *designed / architected* for systems others built within. *led / oversaw* for team direction. Never upgrade a verb for effect.

**Disclaim once.** The ownership boundary ("I wrote no code here"; "the puzzles were the team's") is stated exactly **once** per article, neutrally, in the ownership spot. Everywhere else the article writes affirmatively about what *was* done. Repeated disclaimers read as proving worth, and the article starts apologizing for its own subject. Negative space (what he didn't do) gets one sentence per article, total. Honesty is a fact stated once, not a penance performed per paragraph.

**No key phrase twice.** If a phrase or fact appears twice, the second occurrence is a defect (caught in Riddler's draft v1: "an audience it could actually reach" twice; "shipped" as a closer three times).

**Claim once, then describe.** Once ownership of a system is claimed in the Overview or a Key Achievements bullet, body paragraphs about that system drop "I" and simply describe the work ("The bar for release was 72 FPS… the optimization happened in a set order…"). This is the standard remedy for I-dense paragraphs — fix by structure, not by rationing pronouns sentence-to-sentence. Exception: if Sanjyot explicitly asks for an ownership mention somewhere (usually via a DISCUSS tag), honor it there.

**Corrections aren't content.** The brief's "things people might assume I did but didn't" list tells the writer what *not* to claim — it is never material to print. The fix for an overclaim is silence, not a printed denial: if the article never says "custom netcode", nothing needs denying. (Caught in Montra draft v1: "It all runs on Unreal's standard replication." printed twice, imported from a brief correction note.)

**Stock tech needs a reason.** Name stock/standard tech only when the choice is informative: the reader would otherwise assume something custom, or the choice carried a real tradeoff (Meta's engine fork over OpenXR: yes). If stock is simply what any developer would use — material-editor nodes, UMG, standard templates — naming it is noise and reads defensive ("entirely from stock Unreal nodes", caught twice in ReFrame draft v1). In a genuine arc (built from nodes while learning, later rewrote the core in HLSL) the fact may appear once, told as the arc, never as a disclaimer.

**Real reasons only.** A decision's printed rationale must be the brief's rationale. Never substitute a more dramatic one — the model's instinct is to reach for stakes ("be sure it would hold in front of a crowd") when the true reasons (small team, short timeline, no prior domain experience) feel dry. The true reasons are the credible ones.

**Voice fingerprint (from Sanjyot's own edits to approved drafts).** When two phrasings are both correct, pick the one he'd say to a colleague, not the one a copywriter would tighten:
- Plain professional phrasing over clipped idiom: "shelved due to budgetary reasons", not "shelved for budget".
- Name things plainly and completely: "a VR media player like the GoPro VR player", not "a player like GoPro's".
- Scene-setting details are claims too: "a 360° camera" got corrected to "a few 360° VR cameras" — atmosphere sentences don't get a lower traceability bar.

**End on information.** The last sentence of every paragraph must carry a fact or a decision. If it only summarizes, dramatizes, or ties a bow, cut it and let the paragraph end one sentence earlier. This generalizes the staccato-closer ban and kills the strongest "AI wrote this" tell.

**Em dashes (Sanjyot's ruling, 2026-07-04: limit, not ban):** in long-form articles they are allowed only where structural, i.e. paired dashes setting off a genuine mid-sentence aside or list ("a full side — 11 fielders, a batsman, a non-striker, and an umpire — and…"). Maximum one per paragraph. Never as a stylistic connector between clauses; use a period, comma, colon, or semicolon instead. Homepage/card copy (including the frontmatter `description`) follows copy-guide's stricter rule: none.

## Structure

**Glance-first.** The Overview is a self-contained ~150-word plain-English summary: what the project was, his role, the 2–3 things he did, external validation if any. A non-technical reader should be able to stop there and have it right. No jargon, no branded tools.

**Pick the spine from the ownership reality — never force one:**
- He wrote the code → **"What I Built"** (problem → decision → outcome per subsection).
- He led/architected, others built → **"What I Owned & Decided"** (decisions, tradeoffs, de-risking).
- Ops/pipeline projects → the pipeline story (design choices, hardening, what production taught).

**Length is earned, never standard.** The article's length comes from the brief's substance, not from the format or the exemplar. A thin brief yields a short article; 400 words done well is a success, and a paragraph that exists only to fill the silhouette is a defect. MR Cricket is long because four years of material demanded it, not because articles are long.

**Brevity cuts content, never air.** The Size dial governs *scope* — which sections and stories make it in — not sentence room. Once a fact has earned its place, the prose carrying it gets the words a first-pass read needs. A sentence that must be read twice, or a referent with no antecedent ("this material", where no material was ever introduced — ReFrame draft v1), is a compression defect exactly as bad as padding. The Overview is the fast path for skimmers; the body is allowed to breathe.

**Section menu** (pick only what the material supports): Overview · Project Details (facts list) · evolution timeline if multi-year · the spine section · Key Achievements (each bullet one concrete, verifiable result; may shrink to 3 or be dropped) · ownership boundaries (**roles not names** for teammates) · Personal Notes (optional; end on what the work *was*, not what it says about him — see copy-guide's "key learning"). A compact article may merge most of this into one narrative section.

**Never two ownership sections.** If the spine is "What I Owned & Decided", the ownership-boundary paragraph lives inside it (or in the Overview) and there is no separate "What I Owned" section. One article, one place where ownership is settled.

**Focus dial (set in the brief):**
- *me-forward* — his decisions and build carry the narrative (MR Cricket).
- *project-forward* — the project's journey carries the narrative and his judgment shows *through* the story. Right for thin-ownership projects and side projects; the reader should meet the project first and infer the person. Announcing his role in every paragraph is exactly what this mode exists to avoid.

**Formatting mechanics:** frontmatter schema and the `doc-numbered` wrapper are documented in `_projects/TEMPLATE.md`. Drafts are written to the repo root as `<slug>.DRAFT.md` (never into `_projects/` — everything there gets published).

## Jargon: two tiers, opposite treatment

1. **Domain/branded tech** (broadcast, VP, XR hardware, AI tooling): describe the *problem* in universal terms first; name the tool after, with a functional gloss. "Mo-Sys, the studio's camera-tracking hardware" — not a bare "Mo-Sys."
2. **Engine vocabulary** (UE terms a systems programmer knows): keep it, and use it precisely. Correct use of `RepNotify` semantics *is* a credibility signal. Give app-specific inventions ("trajectory sets", "save slots") one clause of context.

## Numbers and evidence

- Every number carries provenance in the brief: `[measured]`, `[estimate]`, `[don't remember]`. Estimates are dropped or reworded qualitatively; only measured/verifiable numbers get printed. Concrete before/after beats percentages ("~25 → ~125 trajectories at a steady 50 FPS" beats "up to 70% faster").
- Honest failure detail is an asset, not a liability: reliability that grew ~50% → ~80%, bugs recovered under a shoot clock, a camera crew shooting slow to mask a jitter bug. Keep these. They read as real because they are.
- External validation (published paper, store listing, press) goes in the Overview and as a CTA button — it's the strongest kind of claim because it isn't self-reported.

## Voice dial (set per-article in the brief)

- **Professional** — exemplar: `mr-cricket-analysis` (draft v2). Measured, precise, first person but restrained. Client and production context matter.
- **Personal** — exemplar: `_projects/ue_gemma.md`. Looser and warmer: curiosity-driven openings, honest asides ("it's a bug that's become a feature"), light emoji tolerated. Do **not** flatten this register into the professional one; the difference between the two is itself a signal (professional = trusted with production; personal = still genuinely loves building).

The registers share every honesty rule. Only the temperature changes.
