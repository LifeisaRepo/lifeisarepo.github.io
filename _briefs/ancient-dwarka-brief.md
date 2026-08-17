# Project Brief — Ancient Dwarka

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

- **Title / working title:** Ancient Dwarka
- **Client / employer** (past and present names if renamed): Vodafone Idea (Vi)
- **Timeline** (check the repo/git history — memory lies): 1 month (Sept-Oct 2024)
- **Engine + exact versions, and why that version:** UE5.4
- **Platform / hardware:** VR Media Render (8K 360° Equirectangular video)
- **Team size** (dev team only): 2 devs + 4 creatives
- **My official role:** Lead Unreal Engine Developer
- **Status:** shipped - Vi booth at India Mobile Congress 2024

## 2. Ownership map _(the most important section)_

One row per feature/system a reader might ask "who built this?" about (5–10 rows is typical). Be exact — the article's verbs are chosen from this table and nothing else.

The four values, and the verbs each one licenses:

- `I wrote it` — hands on keyboard, code is mine → _built, wrote, implemented, debugged_
- `I designed it, another built it` — my architecture, their code → _designed, architected_ (never _built_)
- `teammate built it` — their feature, even if on my foundation → context/credit only
- `team effort` — genuinely inseparable joint work. Use SPARINGLY — not as modesty, not to blur. If you designed and they built, use the second value.

Use the Notes column for the precise slice that cuts across a row (e.g. "feature was his; the trajectory math and the lazy-load idea were mine").

**Solo project?** The question shifts from _which person_ to _which source_: course/tutorial-following vs. my own extension, template or marketplace content, AI-assisted code. Same honesty, same table.

<!-- Worked example (MR Cricket):
| HoloLens×Mo-Sys camera-sync core | I wrote it | anchors, session logic, Mo-Sys integration, output path |
| C++ re-architecture | I designed it, another built it | base classes + replication patterns mine; teammates rebuilt their features within it |
| Hawkeye Pitch | teammate built it | my trajectory math + lazy-load idea; his implementation |
-->

| Feature / system | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine)                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Render Piepline  | I designed it                                                                                     | Architected the render workflow for Panoramic renders using the Movie Render Queue in Unreal Engine. Also defined min hardware specs for render servers and was guarantee engineer for rendering content out from Unreal Engine. |

- Things people might _assume_ I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"): This was a VR short-film that we made in Unreal Engine, there was not much code to write. Small blueprints here and there which were handled by the team itself.
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material: Similar to every other project where I'm tech lead, I defined performance and memory budgets for this project so that we could ensure successful rendering in 8K VR quality on the best rendering servers that were available to us.

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:

- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

(For claude - I didn't have much major contributions to this project apart from the rendering pipeline as this was a creative-heavy project. So lets not add content just for the sake of it. I'm providing you the following information just to have something available to you for writing, but it's not necessary to develop a long article.)

### 1. Rendering in 8K VR

Panoramic Rendering has been a part of Unreal's rendering workflows since UE4, but when UE5 came along, it brought the new "Movie Render Queue" system for rendering sequences and it was a welcome change apart from the fact that Panoramic Rendering was broken till UE5.4 came along. When we started working on this project we tried to arrange the best servers possible for rendering. Online render farms were not feasible for us cost-wise and also from a TAT point of view, also many online render farms were not ready to guarantee results and wanted to runs some tests before confirming. We did run some tests with a few vendors but they were not promising, so I decided on renting an on-prem high performance workstation machine.

Initially my assumption was that Panoramic rendering in 8K would need a lot of GPU VRAM and CPU processing, so I got the best I could which was an Intel i9 with a Nvidia RTX 6000 card and 128 GB of RAM. Sadly this didn't work out as the RTX 6000 GPU was not stable with Unreal Engine and the machine kept crashing mid-renders. We also had another high-performance workstation in house with an Intel i9, 64 GB RAM and an RTX 3090 card, which I switched to but here instead of the whole system crashing the Unreal Editor started crashing mid-render. When I started analyzing system performance figures during renders, I tried rendering in lower resolutions and realised that during renders when the VRAM was full the memory was overflowing into the RAM. But during 8K rendering the RAM was filling up as well, which was resulting in the Unreal Engine crashing (and sometimes resulting in a Memory related Windows BSOD). So I realised that the renders were literally chewing through 24GBs of VRAM and 64GBs of RAM when rendering in 8K and hence we added an additional 64GBs of RAM to our in-house workstation and got a rented a new workstation with AMD Threadripper, RTX 4090 and 256 GBs of RAM just to be safe.

This entire R&D took a lot of time and hence at the end I had to spent two nights in the office to ensure that the renders were delivered on deadline.

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): Nope
- Anything where I used stock/standard tech deliberately instead of building custom (this mainly _constrains claims_ — it gets printed only if the choice was a real decision with a tradeoff, like Meta's engine fork over OpenXR; stock-by-default, like material nodes or UMG, stays unmentioned): Nope
- Anything risky I _refused_ to do, and why: Nope

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: Rendered almost 6 minutes of 8K 30FPS VR Equirectangular.
- Scale (users, sessions, hours, capacity): 2000+ audience
- Reliability / stability changes over time: NA
- External validation (paper, store page, press, award) + links: NA

## 6. Failures, bugs, war stories

Please check "1. Rendering in 8K VR" in The Hard problems section.

## 7. What should this article prove about me?

This is just a project showcase to show something different that I have handled apart from the previous app dev projects. I don't want to prove anything as such but just showcase variety.

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** project-forward
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** compact
  (Size governs _scope_ — which sections/stories make it in — never sentence room. compact = tight structure, no padding; sentences still get the words a first read needs. full = the material supports multiple deep sections.)
- Any tone notes for this piece:

## 9. Media

- Hero image / YouTube ID: U2wFjBlA2iA
- Gallery images + captions: None
- CTA buttons (store page, paper, repo, build): None

## 10. Raw dump

This project was actually deployed on an 8mtr diameter 180-deg dome projection screen at IMC 2024. The dome projection was handled by a seperate team and they wanted us to provide the media in 4K 180-deg fisheye projection instead of equirectangular. Unfortunately Unreal Engine did not have that option built-in and we didn't have the time or budget to buy and test marketplace plugin which that feature, so we decided to render the content in 8K 360-deg equirectangular projection from Unreal and then converted it to 4K 180-deg fisheye using Premiere Pro.

Then the creative team also handled sound design, VO and color correction to deliver the final film.
