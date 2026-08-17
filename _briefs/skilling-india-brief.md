# Project Brief — Skilling India - MR Training

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

- **Title / working title:** Skilling India - MR Training
- **Client / employer** (past and present names if renamed): Vodafone Idea (Vi)
- **Timeline** (check the repo/git history — memory lies): Sept 2025 - Oct 2025
- **Engine + exact versions, and why that version:** Meta-fork of UE5.5
- **Platform / hardware:** PC
- **Team size** (dev team only): 2 Unreal programmers + 1 Web dev + 3 creatives
- **My official role:** Technical Lead (For claude - I did not write any code so I have not counted myself in the Team size)
- **Status:** shipped - at Vi's booth in India Mobile Congress (IMC) 2025

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

| Feature / system                       | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebSockets based remote control system | I developed the prototype, team integrated it in the actual project                               | Developed a working prototype showcasing a web-based front end controlling things in a packaged Unreal Engine game. Created a small game where the pawn movement was happening based on inputs provided from a localhosted webpage, where both the Unreal game and the webpage were connected to WebSockets backend made in Python running in the background. Explained this concept to the dev team and they implemented it in the actual project. |

- Things people might _assume_ I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"): Did not write code in the actual project, just created the Web Sockets prototype myself.
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material: Designed the technical architecture of the project, defined performance budgets for a standalone MR app running on Quest 3, also developed and handled on-site operations for livestreaming the headset POV of the application while being used by users on TV installed at the booth.

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:

- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

(For claude - These are not "hard" problems per se, but some interesting parts of the project in which I hand some involvement)

### 1. WebSockets Remote Control

Since we started developing XR applications we always faced one issue, new technology is intimidating for people - especially for people who are not very tech-savvy. In regular tech devices like a smartphone or a TV, etc. someone else can easily guide the user on how to operate the device. But when it comes to XR headsets its a major challenge because the user wearing the headset usually cannot see anyone else and the outsiders cannot see what is happening on the headset's display. So we always thought of creating a way to have some way of "holding the user's hand" or controlling the virtual experience while the user just observes. This is where the WebSockets Remote Control functionality came in.

(For claude - There nothing very special about it so I might not be going into extreme detail as its already quite self-explanatory.)

So when the idea first came to me, I created a small prototype in Unreal Engine where I made a chess pawn which could move one step in any direction on chess board based on the input provided from a localhosted website. The website and the Unreal Engine game would be connected to a python-based websocket server which would basically broadcast information from one client to everyone else. This prototype was made by me a couple of months before the actual project had come in.

When this project started, the client as well the UX team said that this experience should have some sort of external control mechanism to help users through the experience incase they are not able to understand the inputs or they are overwhelmed in general. The primary reason for this was that the expo where this experience was going to be showcased was a very very prestigious event with a lot of HNI's and VVIPs in attendance. In case someone like that wanted to use the experience, the client did not want to complicate things by forcing them to learn how the headset works and how the experience's input system works, etc. During these discussion I thought of using my prototype's WebSockets system to add a remote control/guided experience feature to the entire app.

So I got my Unreal devs and our Web dev together, explained them this entire concept and they integrated this system into the entire experience. If the user was not tech-savvy, operators on-site just had to launch the experience in the headset (app automatically connected to the websocket server running on a laptop connected to the same network) and put the headset on the user's head and then control the headset using a tablet which had a website running on it hosted on the websocket server laptop over LAN WiFi. The website running on the tablet was completely reactive to whatever was happening currently inside the headset, hence the control of the experience could be switched seamlessly between the tablet the headset at any point of time.

### 2. Defined the technical performance budgets

Similar to the Riddler's Ransom experience, I defined the performance budgets for this project and ensured that project ran between 60 to 72 FPS at any cost.

Also handled technical QA and testing, and did high-level performance profiling using "OVR Metrics" tool provided by Meta to analyze application performance on device.

### 3. Developed and operaeted a local livestreaming pipeline

(For claude - This is not that big of a deal, I'm just providing this information to add some content, but I don't think we need to dedicate a lot of words to this in the final article.)

While users were experiencing the application, the client wanted a way to showcase user's POV to the rest of audience in the booth. So I created a small livestreaming workflow where we used Meta Developer Hub's casting feature and vMix to stream content from the headset live to a TV installed at the booth. I also operated it personally during the 3-day event.

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): Nothing was chosen over anything as such, just the technical architecture was my responsibility and I lead the technical team to deliver the required output.
- Anything where I used stock/standard tech deliberately instead of building custom (this mainly _constrains claims_ — it gets printed only if the choice was a real decision with a tradeoff, like Meta's engine fork over OpenXR; stock-by-default, like material nodes or UMG, stays unmentioned): We chose Meta's fork of UE5.5 because a lot of features in the Meta XR SDK are much better supported and much more stable in the Meta fork. This is especially true for the Mixed Reality side of things, where components like Stereo Layers are very important for rendering UI in the best possible quality in 3D space with depth perception.
- Anything risky I _refused_ to do, and why: Nothing as such in this project.

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: 60-72 FPS [measured]
- Scale (users, sessions, hours, capacity): Ran on multiple headsets across a 3-day event where we showcased it almost 1400+ people [measured]

## 6. Failures, bugs, war stories

(For claude - I don't want to add failures or such things in this one, just to change things up)

## 7. What should this article prove about me?

Leadership, delivery, people management ?? I'm not sure honestly. I mainly worked on leading the team and delivering an output on this project as I was parallely myself working on the AI for Fashion project for the same event. The team did the execution themselves and I believe that I ensured the best possible enviroment and constraints for them to deliver their work on time and in the expected quality.

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** project-forward
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** compact
  (Size governs _scope_ — which sections/stories make it in — never sentence room. compact = tight structure, no padding; sentences still get the words a first read needs. full = the material supports multiple deep sections.)
- Any tone notes for this piece: Nothing special, let's just not make it too long or too short just for the sake it. Let the content breathe and let's not dwell much on what I did. I would strongly recommend not using the "What I owned and decided" title, just doesn't make sense for this one.

## 9. Media

- Hero image / YouTube ID:TP7cfuatu3k
- Gallery images + captions: None
- CTA buttons (store page, paper, repo, build): None

## 10. Raw dump

Everything else — stream of consciousness welcome. The writer mines this for texture and follow-up questions, but no claim from here reaches the article without being confirmed above or in the interview.

I think "The hard problems" section is almost like a Raw Dump, let me know if you have any questions.
