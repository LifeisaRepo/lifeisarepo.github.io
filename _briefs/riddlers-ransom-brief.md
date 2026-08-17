# Project Brief — Riddler's Ransom Escape Horror

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

- **Title / working title:** Riddler's Ransom Escape Horror
- **Client / employer** (past and present names if renamed): Liminal (Self-published. Not made for client)
- **Timeline** (check the repo/git history — memory lies): Started in 1st week of June 2024 as an internal game-jam project for PC-VR. Then we continued working on it till July 2025 for publishing to the Meta Quest Store, as and when we got time between client projects.
- **Engine + exact versions, and why that version:** UE5.3 for internal game-jam and then we switched to Meta's fork of the source UE5.4 for the Meta Store publishing build.
- **Platform / hardware:** Meta Quest 3 (Native)
- **Team size** (dev team only): 7 total = 6 (programming + creative, all part-time, fluidly taking over each other's work) + 1 (me - tech lead)
- **My official role:** Tech Lead, QA
- **Status:** shipped. (https://www.meta.com/en-gb/experiences/riddlers-ransom-escape-horror/24702477826005564/)

## 2. Ownership map _(the most important section)_

One row per feature/system. Be exact — the article's verbs are chosen from this table and nothing else.

| Feature / system                                                                        | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine)                                                                                                                                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Original PC-VR game-jam prototype                                                       | built by 4 Unreal devs who are part of the team. I was not a part of the team.                    | I was a tech mentor for both teams in the game-jam                                                                                                                                             |
| Gameplay / puzzle / interaction systems                                                 | the same 4 guys handled this                                                                      | I wrote no code on this project                                                                                                                                                                |
| Optimization strategy (asset refactoring, material simplification, draw-call reduction) | I researched and designed it, the same team handled it                                            | This happened post the game-jam. I researched and designed a guideline of sorts to optimize the PC-VR performance first and then also to optimize it for running natively on the Meta Quest 3. |
| PC-VR → Quest standalone migration approach                                             | I researched and designed it, the same team handled it                                            | Switch to the Meta-fork of UE, memory and performance budgets were set by me; execution was done by the team                                                                                   |
| Performance and gameplay testing                                                        | I did it myself, along with other team members                                                    | hands-on QA against the 72 FPS budget / memory targets, gameplay feel, visual quality, etc.                                                                                                    |
| Meta Quest Store submission (VRCs)                                                      | I did it myself                                                                                   | end-to-end: requirements, compliance, submission                                                                                                                                               |
| Environment art & 3D asset optimization for standalone                                  | executed by the same team                                                                         | guided by the perf budgets I had set                                                                                                                                                           |

- Things people might _assume_ I did but didn't: wrote the gameplay and optimization code, or used profiling tools for performance QA. I didn't write any code on this project, my job was to support the team technically by designing systems, providing budgets, testing and shipping.
- Things I did that don't show up in the feature list (research, tooling, pipelines, mentoring, ops): Did my research to figure out the advantages of using the Meta-fork of Unreal Engine rather than using vanilla UE. Defining memory and performance budgets. Setting up step-by-step processes for optimization (for ex. optimize the texture resolutions before optimzing the material code, etc.), the VRC compliance work, mentoring the team through standalone-first thinking and during the game-jam as well.

## 3. The hard problems (pick 2–3, this is the heart of the article)

There weren't a lot of hard problems as such but a lot of bad quality work in the first version of the game, mainly because of the game-jam timelines. The team focused on delivering a playable experience rather than an optimized and smooth running game. In the inital version all the lights were dynamic, textures and materials were not optimised and much of the gameplay was hard-coded. It relied heavily on someone explaining the player what is the goal and how to play the game. During the conversion to a packaged build I firstly tried to find all such issues and then we tried to solve them as much as we could.

The hardest problem though for me was refining the puzzle design, there were 2 puzzles in the game and the first one was decent but the second one was (and still is) very difficult. Both puzzles were initially designed during the game-jam itself by the team (not me). In the 2nd puzzle, the player had to find some cards hidden across the room and then solve the riddle based on the information on those cards. We tried to make this easy by hiding the cards in more easily find-able spaces, added some more clues to make things slightly less challenging so we did a lot of internal testing to check if the game's playability had improved.

Also as this was going to be our first game to be published, my responsibility was to figure out the entire publishing process, compliance, performance guidelines, etc.

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): After the game-jam, the initial idea was to publish this as a PC-VR game so that there is minimum effort to go from the game-jam version to a publish-ready packaged game. I chose not to go with that route for 2 reasons, maximum PC-VR players are on Steam - and the quality and quantity of the game was not good enough for Steam in my opinion. Also with PC-VR i thought that it would be difficult to test the game on different VR headsets as we only had the Meta Quest 2 and Quest 3 headsets. Later when I checked the Meta Quest store I realised that a lot of "Escape Room" games are already published stand-alone in the store, so we would also find target audience in the Quest store with a stand-alone game. Hence I decided going with a standalone android build which could be published to the Meta Store rather than a PC-VR build. It was mainly due to the game not being a great candidate for Steam in my opinion.
- Anything where I used stock/standard tech deliberately instead of building custom (say so — it will be written as the honest, confident choice it was): During researching for a provious VR client project I had found out that Meta has its own fork of the Unreal Engine source code which has some modifications to the engine code to provide better optimizations for Meta Quest deployments. Hence after we had finalised a standalone game I decided switching to the Meta-fork of UE (I will call this Meta UE going ahead) would be a good choice, primarily because we were anyways only planning to deploy this game for the Meta Quest headsets. The additional features in the Meta UE were only compatible to Quest headsets and they worked well if we used the Meta XR SDK rather than the OpenXR SDK (which allows development across all XR devices). As I mentioned before we were only delploying for the Quest headsets so we didn't care about the OpenXR SDK and the upgrades provided by Meta UE were pretty great especially from a lighting and optimization POV - this meant we didn't have to spend a lot of time optimizing something to perfection because it tools like Application Spacewarp, Dynamic Resolution, Mobile-multiview helped us get us decent performance even when we didn't.
- Anything risky I _refused_ to do, and why: Nothing much that way, it was a side project for the entire team and the goal was to just publish something and see how it goes.

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: 30-40 FPS [measured] PC-VR during game-jam / 45-50 FPS [measured] PC-VR after game-jam on high-performance hardware / 68-72 FPS [measured] final standalone build on Meta Quest 3
- Scale (users, sessions, hours, capacity): 150+ lifetime installs on the Quest Store [measured]

## 6. Failures, bugs, war stories

(For Claude: I'm going to write some very honest things. We don't have to say some of these things out loud , but I'm just being honest here)
Honestly, I was never a fan of the game in the state that it was launched. It was below average gameplay, bad puzzle design and just so optimization for it to barely work on the Quest 3 headset. The team and I were putting whatever time we could building the game but it was not enough to make it great. Around March 2025 I was directed by the company's senior management to launch the game in whatever condition it was as soon as possible. I got some time from them to polish the rough edges and ensure that we a build that would pass compliances and be visually decent looking.

One interesting bug that I remember, in the original version of the game in the first puzzle the player's hand was bound by a chain attached to a wall. This puzzle happened at one corner of the room which was like a corridor, so the idea was that the player is not allowed to move around the rest of the room unless they free themselves from the chain by solving the first puzzle. Now this chain was made in UE using physics constraints and it was kinda heavy processing-wise. It worked better on the PC-VR build, but in the standalone builds during testing I noticed that the chain used to feel very janky and it also used to pass through walls before all the collisions were properly loaded and then it used to get stuck there by the time the actual game started. This was causing a lot of bugs and weird artifacts. So after a lot of testing and trial-and-error we decided to get rid of the chain and just add a grated wall with a grated door and a lock on it which put the same restrictions on the players as the chain did without the annoying bugs.

## 7. What should this article prove about me?

I think this project proves that I can lead/manage/own end-to-end SDLC (for lack of better words). This was the first project which was published on any store and I was the one who figured all the things that were required and ensured that we took care of them all. This project is important for me because this is an actual "game" in my portfolio which is published.

## 8. Voice dial

- **Register:** Professional
- Any tone notes for this piece: I have led this project, not executed anything myself (apart from testing). Please let the tone be leadership driven than execution driven.(For claude - I don't know what exact difference would there be and if what I'm asking for even makes sense for the portfolio, but I will let you be the judge)

## 9. Media

- Hero image / YouTube ID: 6Z24FtihEgM
- Gallery images + captions:
- CTA buttons (store page, paper, repo, build): Store Page - https://www.meta.com/en-gb/experiences/riddlers-ransom-escape-horror/24702477826005564/

## 10. Raw dump

This project started as a game-jam demo. Me and my colleague decided it would be a great idea to do a game-jam after the team had come back from finishing the 2024 of season of IPL doing 360 VR broadcast. As almost all of our team were Unreal Engine devs and creatives we deciced to host an internal game-jam just to refresh everyone's skillsets. There were 2 teams of 4 people each and both the teams worked for 4 days (i guess i don't remember exactly) to create the games/experiences they wanted. The only constraint was that the game/experience has to be for VR (as we are a XR company). The first prototype of this game was ready after 4 days of efforts by the team. When the senior management saw the game they liked it a lot and they asked me look into the possibility of publishing this game, but they asked me to handle this without affecting on-going client projects. The game-jam prototype had quite a few bugs and issues which had to be fixed before going ahead. So we decided that the plan of action would be make the game playable from start-to-end first without changing the target platform. And so we did that for the better part of 2024 and then around Oct 2024 we switched to Meta UE for dedicated development for the standalone Meta Quest platform.

Then we optimized all the assets, switched from dynamic to baked lighting, optimized a few meshes, etc. as per mobile hardware budgets and then finally deployed it.

As I said before I'm not proud of the output that we put out at the end, but I definitely learnt a lot along the way and I'm fairly confident that if we had the time and budgets to do it right, I would have been able to pull off a better product.
