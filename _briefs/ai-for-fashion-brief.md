# Project Brief — Swadeshi — Local to Global

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

- **Title / working title:** Swadeshi — Local to Global
- **Client / employer** (past and present names if renamed): Vodafone Idea (Vi)
- **Timeline** (check the repo/git history — memory lies): Sept-Oct 2025
- **Engine + exact versions, and why that version:** NA
- **Platform / hardware:** Web
- **Team size** (dev team only): 3
- **My official role:** GenAI Workflow Development and Prompt Engineering
- **Status:** shipped — Vi booth at India Mobile Congress 2025

## 2. Ownership map _(the most important section)_

One row per feature/system a reader might ask "who built this?" about (5–10 rows is typical). Be exact — the article's verbs are chosen from this table and nothing else.

The four values, and the verbs each one licenses:

- `I wrote it` — hands on keyboard, code is mine → _built, wrote, implemented, debugged_
- `I designed it, another built it` — my architecture, their code → _designed, architected_ (never _built_)
- `teammate built it` — their feature, even if on my foundation → context/credit only
- `team effort` — genuinely inseparable joint work. Use SPARINGLY — not as modesty, not to blur. If you designed and they built, use the second value.

Use the Notes column for the precise slice that cuts across a row (e.g. "feature was his; the trajectory math and the lazy-load idea were mine").

**Solo project?** The question shifts from _which person_ to _which source_: course/tutorial-following vs. my own extension, template or marketplace content, AI-assisted code. Same honesty, same table.

**No code / pipeline or ops project?** Swap "feature/system" for _pipeline stage or deliverable_ and "code" for _hands-on work_. The values translate: `I did it hands-on` (researched / designed / configured / operated it myself), `I designed it, teams executed it` (my architecture or SOPs, others ran them), `another team's / vendor's domain` (client apps, CDN, vendor software), `team effort` (same warning). And note: in pipeline work, _evaluating and selecting_ the stack under real constraints IS the engineering — "researched and selected X over Y" is a first-class hands-on row, not a footnote.

<!-- Worked example (MR Cricket):
| HoloLens×Mo-Sys camera-sync core | I wrote it | anchors, session logic, Mo-Sys integration, output path |
| C++ re-architecture | I designed it, another built it | base classes + replication patterns mine; teammates rebuilt their features within it |
| Hawkeye Pitch | teammate built it | my trajectory math + lazy-load idea; his implementation |
-->

| Feature / system                         | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort`                                                           | Notes (what exactly was mine)                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GenAI Workflow Design                    | I designed it and developed a prototype, teammate integrated it into the actual backend                                                                     | Created a custom GenAI workflow using Google Gemini and Google Nano Banana to create high-quality images where luxury western apparel was reimagined with traditional Indian textiles. Learned NodeRED and bit of JavaScript to develop and test the workflow before handing it over for production implementation to our Web Developer. |
| Prompt Engineering                       | Desgined the tailor-made prompts for our use-case which were capable of being modified by changing certain pre-defined parameters to get different results. | Created dynamic prompts which had certain pre-defined variables which could be set as per the user inputs provided from the front-end. These prompts would generate high-quality GenAI images custom-made as per each user's input selection.                                                                                            |
| Website Development (Frontend + Backend) | Teammate did it, i'm not a web developer                                                                                                                    | Teammate handled the actual web development part, while I handled the GenAI workflow development in NodeRED and provided him working implementations which he implemented in the actual production after converting the logic to JavaScript.                                                                                             |

- Things people might _assume_ I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"): Did not do any web development apart from prototying on NodeRED and writing a bit of JavaScripts in the custom functions in NodeRED. Did not create custom AI models or did any sort of fine-tuning, just used stock Google Gemini and Google Nano Banana models.
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material: As the AI workflow also required input images, I guided the creative teams to create the right kind of images which could be used as input to Google Nano Banana.

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:

- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

### Developing GenAI workflows for the first time

Before this project I was already using GenAI tools to improve my productivity. Drafting emails, trying to understand complex pieces of code that someone else has written, generating images and videos for fun or work - I knew how to use GenAI to in my day-to-day tasks to make life simpler. But this was the first client project where I had to think about creating custom GenAI workflows for a customer-facing web application.

The idea was to create a web app which can reimagine western luxury apparels designed using traditional Indian textiles and art styles like Lucknowi chikankari, Warli art style, Patola, etc. This web app was deployed on a kiosk installed on the Vi booth at IMC 2025. Users were asked to select any apparel (ex. Kaftan, Evening Gown, Bomber Jacket, Tuxedo, etc.) or any accessory (ex. Shoes, Handbag, Clutch, etc.) they would like to reimagine and then user would be asked to select any Indian textile or art style. Based on both these inputs a dynamic prompt was created by Google Gemini which would go to Google Nano Banana which would finally provide the users an editorial style high-res image of a model wearing their selected apparel designed using their selected Indian textile. The users could scan a QR code to download the image on their phones.

My task to figure out the GenAI workflow to generate the results explained above, so I knew that I had to start looking into GenAI APIs and understand their json schemas and try to understand the quality that could be acheived/expected from these models, and the most difficult part - try to understand how much would it cost per image, etc. During this project Nano Banana was the latest SOTA model for image generation and so we decided to use it irrespective of the high costs as IMC is a very prestigious event with a lot of HNI's and VVIPs visiting the expo and Vi did not want to risk any issues with the image generation.

As I'm not a web developer, I started finding simpler ways to create and prototype this workflow similar to n8n but completely free and open-source. That is when I found NodeRED and due to my experience with using Blueprints in Unreal it didn't take me a long time to figure out how to use NodeRED. Then I started developing the workflow step-by-step using it. Prompt engineering was also a part of the developing the workflow. The idea was to create a detailed information block with dynamic variables filled as per user input from backend. This information block would go to Google Gemini with a detailed prompt to turn that information into a high-quality prompt specialised for Nano Banana. Gemini would then provide the prompt, which was sent ahead to Nano Banana, which would then generate the final image.

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): Chose Google Gemini Flash for its response speed and Google Nano Banana for its State-of-the-Art quality at the time of the project.
- Anything where I used stock/standard tech deliberately instead of building custom (this mainly _constrains claims_ — it gets printed only if the choice was a real decision with a tradeoff, like Meta's engine fork over OpenXR; stock-by-default, like material nodes or UMG, stays unmentioned): NA
- Anything risky I _refused_ to do, and why: NA

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: NA
- Scale (users, sessions, hours, capacity): NA
- Reliability / stability changes over time: NA
- External validation (paper, store page, press, award) + links: NA

## 6. Failures, bugs, war stories

(For claude - Nothing much to say here, not such a deep or important project for me)

## 7. What should this article prove about me?

Just that I have delved into the world of GenAI as well and I do broadly know how things work, if you know what I mean.

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** me-forward / project-forward (For claude - You decide)
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** compact
  (Size governs _scope_ — which sections/stories make it in — never sentence room. compact = tight structure, no padding; sentences still get the words a first read needs. full = the material supports multiple deep sections.)
- Any tone notes for this piece: Keep it short and simple, I have added this project just to show that I'm up-to-date with the latest AI trends as well, but I'm not sure how relevant it is to my portfolio. But please DO NOT USE short weird sentences, staccato endings, and don't compress sentences just to make things short. Cut content rather than cutting words if you know what I mean.

## 9. Media

- Hero image / YouTube ID:AReWxYd4QTk
- Gallery images + captions: "/assets/images/projects/ai-for-fashion/ai-for-fashion-1.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-2.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-3.png"; "A Harrington jacket reimagined with Lucknowi Chikankari::A Skirt made from Paithani textile::A clutch design inspired by the Chikankari pattern"
- CTA buttons (store page, paper, repo, build): None

## 10. Raw dump

(For claude - I think I have written pretty much everything in section 3 itself, but please interview me if you need more information.)
