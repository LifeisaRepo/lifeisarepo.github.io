# Project Brief — ReFrame 360

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

- **Title / working title:** ReFrame 360
- **Client / employer** (past and present names if renamed): JioStar + Liminal R&D
- **Timeline** (check the repo/git history — memory lies): v1-beta happened between Jul 2023 to Sept 2023 and v2-beta happened in Mar 2025
- **Engine + exact versions, and why that version:** v1-beta = UE5.2, v2-beta = UE5.5
- **Platform / hardware:** PC (Unreal Editor)
- **Team size** (dev team only): 1 programmer (me) during v1-beta and additional 2 for bug-fixing and feature addition during v2-beta
- **My official role:** Lead developer
- **Status:** R&D — live broadcast

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

| Feature / system                                                              | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine)                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Equirectangular VR tp 2D material                                             | I wrote it                                                                                        | Developed the core material code in Unreal nodes + HLSL which converted equirectangular VR feed to standard flat 2D perspectives in real-time                                                     |
| Live VR feed ingest and 2D feed output pipeline inside Unreal                 | I developed it                                                                                    | Created the entire Media I/O workflow which handled ingest of 4K VR live feed, processing through the material, and pushing the 2D feed out at the lowest latency possible                        |
| Gamepad/Controller integration for VR feed manipulation controls with presets | I wrote it                                                                                        | Created an input system which used a controller to map the dynamic material parameters to change POV of the content being rendered in the 2D output                                               |
| Basic color-correction system                                                 | I wrote v1/ teammate wrote v2                                                                     | Created a basic color correction system which provided on screen controls to adjust color-correction using color wheels for Highlights, Mids and Shadows. Teammate added OCIO configs to it in v2 |
| Added input sensitivity adjustment UI                                         | I wrote it                                                                                        | Created an on-screen UI which an operator could use to adjust the controller joystick and trigger button sensitivity to their taste                                                               |

- Things people might _assume_ I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"): Never went live-to-air - was cancelled due budgetary constraints.
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material: Led technical production during a real-world test which happened during the 2025 season of IPL. The test happened at JioStar offices where we took the camera feed from a live 360 VR camera running at the match stadium and provided "ReFramed" outputs for the JioStar production to see live.

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:

- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

(For claude - I don't want to get into intense detail of this project because its my R&D and I dont want to reveal everything, so I'm going to keep things vague in some places.)

This project started with an idea that our company's founder threw my way. After our first successful season of 360 VR broadcast in IPL 2023, he and I were jamming about more ways to integrate the live VR feed into live cricket broadcast. From there this idea came of how VR media players such as the Go Pro player allow us to manipulate the POV of VR videos in real-time. They allow us to zoom, rotate and tilt VR videos to generate interesting POVs (one very popular example is the tiny-plane view). He challenged me to figure out a way to do this with live VR camera feed coming from the stadium. I decided to take on that challenge and started working on this R&D project.

I knew from the get go that most of the grunt work is going to be about creating a material which handles this, but I was not an expert in material code though I knew a bit of material maths. I started learning more material maths and started understading the concepts of stereographic projections and equirectangular projections and the math to convert one system to the other and so on, and I slowly started to build the material day-by-day. Eventually I reached a point where I got stuck with a certain coordinate system conversion and I was stuck on it for days, then I asked a teammate of mine for help and luckily he was able to find a readymade material node which did exactly what I wanted. After that I was able to successfully finish v1 of the material.

Then I added material parameters to control the output feed's POV and I connected these parameters to a controller-based input system.

Due to my previous experience with Virtual Production, creating the Media I/O pipeline inside Unreal Engine was not a big deal, during v1-beta I realised there was a color conversion issue in my pipeline which was later fixed by a teammate in v2 by adding OCIO configs to the pipeline for accurate color conversions to and from the engine.

During v2 I also converted most of the material code to HLSL in the hopes of getting better performance. (But I don't know if it actually did make any changes in the latency, so we can mention it in some different way, maybe without giving an exact reason)

The most concerning part of this entire workflow was latency. We already knew from doing 360 VR broadcast that the camera-to-SRT output from stadium latency was almost 5-6 seconds due to real-time VR stitching, after which the feed was received at the JioStar end and routed to us which meant a ball-park 8 seconds latency average before the feed has entered our system, we also knew that Unreal engine's Media I/O pipeline's are not extremely efficient especially in our case as we were ingesting UHD (VR) and pushing out FHD (flat 2D) every frame. Still at the end when we did our real-time test in the JioStar studios we had stadium-to-ReFrame-to-PCR latency of just 9 seconds.

## 4. Decisions and tradeoffs

(For claude - There's not much to say here, I'm just adding what I can)

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): Used controllers over keyboard+mouse for finer, granular, analog control over movement rather than sharp inputs. The motivation behing using a game controller was the jimmy-jib joystick controllers that camera operators use for smooth movements of cameras attached to a jimmy jib crane.
- Anything where I used stock/standard tech deliberately instead of building custom (say so — it will be written as the honest, confident choice it was): In v1 I created the entire material code using standard material nodes, but later I learned HLSL and converted most of material code to HLSL in the hopes of reducing latency and improving performance, but I was never able to profile old vs. new.

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: 9 seconds latency camera-to-PCR [measured]

## 6. Failures, bugs, war stories

(For claude - I think I have written most of what I can in Section 3 and 4.

## 7. What should this article prove about me?

That I love taking on challenges and I developed this solution almost entirely from scratch, so even if I don't have a team and even if I have to do something myself I can still do it even after primarily working as a Tech Lead for the past many years. Again don't want to sound cockey and over-confident but just want to put across my point

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** me-forward
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** compact
  (compact = short single-narrative article; the writer must not pad a thin brief to match a long exemplar — brevity beats filler.)
- Any tone notes for this piece: This entire project was almost fully made by me. So please don't use the "What I owned and decided" header. Think of something else, other wise write this one in a different way than the other shipped projects.

## 9. Media

- Hero image / YouTube ID:3ozX-bb8N9w
- Gallery images + captions: None
- CTA buttons (store page, paper, repo, build): None

## 10. Raw dump

I think I have already written everything I can in section 3 and 4
