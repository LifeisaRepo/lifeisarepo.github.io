# Project Brief — Montra Electric Racing

## 1. Hard facts

- **Title / working title:** Montra Electric Racing
- **Client / employer** (past and present names if renamed): Montra Electric
- **Timeline** (check the repo/git history — memory lies): from Nov 2024 to Jan 2025
- **Engine + exact versions, and why that version:**
- **Platform / hardware:**
- **Team size** (dev team only): 6 total including me (3 programmers, of which I'm one, + 3 creatives)
- **My official role:** Technical Lead & Systems Programmer
- **Status:** shipped. 3 day event installation at Montra Electric's booth in the Bharat Mobility Expo 2025

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

| Feature / system                                                    | Ownership: `I wrote it` / `I designed it, another built it` / `teammate built it` / `team effort` | Notes (what exactly was mine)                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technical Game Loop (How the game goes from Main Menu-to-Game Over) | I designed it, the team built it                                                                  | Designed the technical flow of the entire game's journey. How will the game session be controlled by an Admin and how the users will be on-boarded each session and how each race will be managed.                                                                                                                   |
| Multiplayer Admin Control System                                    | I wrote the core logic, another teammate integrated it into the final game                        | Created an Admin game control system which allowed the Server (Host) to be a non-playing member of the multiplayer session with the authority to set user details, set the race vehicle, start the race for all the players and finally manage the race results by showing a leaderboard                             |
| QA                                                                  | team effort                                                                                       | The entire team including me did their own QCs as per their departments and we also did a lot of gameplay tests in multiplayer to check for game stability and gauging fun metrics                                                                                                                                   |
| Performance Optimization                                            | I designed it, team executed it                                                                   | I defined performance budgets and min spec hardware for the game to work. Then the team worked backwards from there to optimize every asset that they had used, they did their best in the time that they had. I guided them in figuring out the right assets to optimize to get the best possible results           |
| Logitech Haptics Integration                                        | I wrote it                                                                                        | Created a custom third-party plugin to integrate Logitech's haptics sdk with the Logitech G29 Steering wheel for the game. This never shipped in the final game as I couldn't finish fine-tuning for the game within the timeline and it was deicded that it might make the game very difficult in its current state |

- Things people might _assume_ I did but didn't (pre-empt the wrong impression — e.g. "multiplayer was stock UE replication, not custom netcode"; "never live-to-air, segments were pre-recorded"): Multiplayer for stock UE replication - not custom as the original article implies, I did not do any level design or race track design myself - I only helped the creatives with the right kind of approach, the logitech haptics never shipped with the final build.
- Things I did that don't show up in the feature list (research that killed a bad approach, authoring tools, pipelines, SOPs, mentoring, on-set ops) — for the systems/TD positioning this bullet often yields the best material: Mentored and guided the team on race track design and performance optimzation, Defined hardware specs, created hardware requirement lists for the event setup, and helped in hardware procurement. Provided on-call support to the team members who were on-site during the actual event.

## 3. The hard problems (pick 2–3, this is the heart of the article)

For each:

- **What was the problem?** (plain words — imagine explaining to a games programmer who knows nothing about this domain)
- **Why was it actually hard?** (what would break / what constraint made the obvious answer fail)
- **What did I try that DIDN'T work, and why?**
- **What was the solution, mechanically?**
- **What did it look like when it worked?**

### 1. Multiplayer setup

Initially this game was supposed to be a single-player game played by 4 players at the same time. Later the client mentioned that they would like to make it into a race between those 4 players. Given the remaining timeline of less than 2 months (we officially kicked-off the project in Nov 2024 and the event where this was supposed to be deployed was in 2nd week of Jan 2025) I was not sure if we could develop a fully multiplayer racing game, where all the players would actually see their cars lined up against each other in-game and they could race with each other exactly like the standard racing games like Need For Speed or Forza, etc. This would have required handling and rigorous testing of a lot of things such as network prediction, physics, collisions, etc. Something which we did not have time for. Apart from that the race track and level design would also have to change as per providing enough space for 4 vehicles rather than just 1.

So I came up with the plan of making a time-trial style game where even though all the players are in the same multiplayer session each player only sees their own vehicle in the session. So basically if the pawn is not owned by the client then it does not spawn (I think we did something along these lines but I'm not entirely sure). Additionally the client also wanted an Admin control panel, where an operator could enter the players' details, select the vehicle for all the players (admin could choose one vehicle out of two, whichever vehicle was selected by the Admin was given to all the 4 players to ensure healthy competition), and start/stop the game. The Admin control panel was basically the Server (Host) of the multiplayer session and I had written the core logic in such a way that the Host is also not a part of the race, he just sees the Admin control panel which is a UMG where he can control the race for the actual players.

When the race started all the players had to complete the race within a fixed time, anyone who didn't finished used to get a DNF and everyone else who finished would return their laptime to the server based on which the server would calculate the leaderboard and send it back to all the clients to show the rankings. I knew that calculating race times at individual client's end was not very secure from hacking POV but as this game was running in an event which is a very controlled environment instead of being shipped to consumers I thought that there is no risk in handling it on the client side.

### 2. Logitech Steering Wheel and Vehicle Physics Tuning for Gameplay Feel

Connecting the Logitech G29 Steering Wheel to Unreal Engine was not a difficult task, but getting the feel of the game right with it was really a task of trial-and-error. Me and one of the programmers on the team spent days on testing and perfecting the vehicle physics, steering input sensitivity, steering rotation limits, steering hardness etc. to make the gameplay experience feel as real-to-life as possible.

Both vehicles in our games were actually client's own vehicles which they were gonna launch in that expo. Once of them was a three-wheeler auto rickshaw and the other one was a 4-wheeler mini-tempo. Both vehicles very totally different in their physics and their behaviour with the roads and their weights, center of gravity, etc. Hence it was a lot of trial and error to perfect there gameplay feel from 3 sides at the same time, tuning their physics, tuning the steering inputs received in Unreal and tuning the steering behavior using the Logitech's GHUB app.

When we started both vehicles felt the same to drive, felt the same to accelerate/decelerate, felt the same to turn, etc. but after rigorous testing till the end by me and the programmers and adjustments and fine-tunings done by them, we ensured that both vehicles felt unique to drive on the steering across different terrains.

### 3. Last minute FPS camera request

Our game was supposed to be a third-person game, where the camera is connected to a spring arm attached to the backside of the vehicle, similar to all racing games. Near the end of the development cycle the client said that they wanted to also integrate first-person view in this game because they also wanted to showcase their vehicles interiors. The problem with taking this request was that our creative team had not rigged the vehicles from inside as they were never going to be looked at from the inside, which meant that the vehicles in-game steering wheels did not rotate when the player actually tried to turn the vehicle. When we told them about this issue, the client suggested us to add a small PiP window on the screen during the race which would show the FPS camera to the player, and we could try to smartly crop out the steering wheel by changing the FOV of the camera. I did not like this idea as it meant rendering 2 cameras in real-time and our performance budgets did not have that accounted. We still tried for the sake of testing and my concerns were right, we saw a ~40% [measured but don't remember exactly] drop in performance after adding the 2nd camera.

So I requested the creative team to provide us new versions of the vehicle models with the steering wheel rigged for both the vehicles and then the programming team integrated the new models and create a camera switch option where the players could switch between third-person and first-person cameras by clicking a button on the steering wheel.

### 4. Logitech Haptics Plugin

Adding haptics to the game was never in the initial scope, but when we got our hands-on a Logitech G29 steering wheel (and also when the client promised to get the same for the event) we though why not try to get this working. So I starting looking around for plugins and documentation for Unreal Engine support but I found nothing, I also sent an email to their support and they pointed me to an SDK which was a bunch of .dlls and .libs which I had to integrate myself. So I took it as a challenge and started figuring out how to integrate this in my project. During my research I realised that Unreal Engine provides a Third Party Plugin template for exactly this purpose but I had never made any plugin like this before, so I did my research, I got help from LLMs to understand how `.dll` and `.lib` and `include` files should be handled in this plugin template to connect the logitech SDK to my Unreal system.

Logitech had also provided decent documentation in the form of a pdf which was like a API reference which documented every function that I could call, its use and its argument definitions. I used this to create a blueprint function library in my plugin which could be used to directly connect haptics functions to our vehicle code which was mainly handled in blueprints.

After connecting the haptics sucessfully I started going thru Unreal forums, stack overflow and math forums to understand how to integrate the haptics effects to my vehicle for accurate haptic feedback. I found that there were a lot of different things I could do and this is the kind of thing which can be integrated into every single part of the vehicle physics to get a very true-to-life haptics feedback - the possibilities were endless. Finally I implemented 2 features which I could easily integrate without modifying too much of work done by my teammates. One was to added collision and terrain haptics which shook the steering wheel in case of any bumps or collisions of the vehicle, the second one was to increase the steering rotation hardness proportional to the speed of the vehicle so on higher speeds its difficult to turn the wheel a lot as compared on slower speeds. I had already started working on this late in the project, so when I tested this feature with my teammates and senior management they all enjoyed it, but they said that the haptics are still rough and they need some more fine-tuning, especially for people who have never used steering wheels with racing games before, so we didn't integrate the plugin and the haptics in the final game.

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): I think the "1. Multiplayer setup" in the previous section defines one of the key technical decisions
- Anything risky I _refused_ to do, and why: 1. I was developing the Logitech Haptics plugin myself and it was almost complete development-wise but needed quite some fine-tuning to adapt to the feel of te vehicles and the in-game terrain. After testing with multiple team members we collaboratively decided that it was not a good idea to integrate the haptics into the game in their current state, the primary reason being that they might be too uncomfortable for novice players or people who have never played racing games with steering wheels. 2. The game was supposed to be third-person by default such that players see their vehicle from a camera attached to the back of the vehicle, but around the end of development the client wanted us to provide a PiP display which showcased the car's interior view (first-person camera) in a small window on the same screen. I refused to do this as this meant we had to render 2 cameras at the same time which was not considered in the performance budget, on the insistence of the client we tried it and it reduced out FPS by almost 40% which was not good at all, so we provided to this problem by allowing players to switch between third-person and first-person view if they wanted with the click of a button on the steering wheel.

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- Performance before/after: 55-60 FPS [measured] on the defined min-spec hardware (Intel i7, 16Gb RAM, RTX 4060)
- Scale (users, sessions, hours, capacity): [measured] Ran 8-10 hours continuously with 1000+ people playing the game across 3 days of the event.

## 6. Failures, bugs, war stories

I don't think there's anything to add here apart from whatever I have mentioned previously.

## 7. What should this article prove about me?

This was basically the first "game" that our company ever made - and it happened under my technical leadership. So I would like to this article to prove that I have got what it takes to lead and work with teams to make games and get my hands dirty with code if needed. While I don't want to sound like I can lead the entire technical direction of a game or that I can lead the entire development team of a AAA or AA studio, but I just want to showcase that I have led a small team and made a game, so I can do it with other teams too.

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** me-forward / project-forward (For claude - I will let you decide the focus based on the content that I have provided)
  (project-forward = the project's story leads and my judgment shows through it; right when my hands-on share was thin or the project is the star. me-forward = my decisions/build carry the narrative.)
- **Size:** compact (For claude - justify the content rather than making it long or short just to match the exemplar)
  (compact = short single-narrative article; the writer must not pad a thin brief to match a long exemplar — brevity beats filler.)
- Any tone notes for this piece: Confident yet humble. I have lead a team to make a game, but I know that this game is not directly comparable to a shipped game as it was running in a controlled environment with a lot of things pre-defined, so I don't want to sound all high and mighty, but at the same time this was a challenging project to pull off in two months and we did execute it successfully.

## 9. Media

- Hero image / YouTube ID: RHN9KnMZE74
- Gallery images + captions: "/assets/images/projects/montra-electric/stills/montra-event.jpg,/assets/images/projects/montra-electric/stills/montra-admin-1.jpg,/assets/images/projects/montra-electric/stills/montra-trim.gif", "Event Setup::Admin UI for Player Details::Admin UI for Vehicle Selection"
- CTA buttons (store page, paper, repo, build): Nothing

## 10. Raw dump

As I mentioned before this was the first "game" that we made as a company. Due to my interest in game development, the company looked at me for most of the answers regarding the management part of the project as well like timelining and scope definition. I helped define the timelines and define manpower requirements for this project. Additionally as per my usual responsibility I also handled defining the hardware that would be needed at the event location to run the experience, including the min spec hardware for the game.

Again as I have mentioned before I don't want to sound overconfident and cocky about the fact that I have shipped a game because I know that this is not a "game" in the sense that something that's launched on Steam is. This game was supposed to run in a controlled environment and it was made for a specific target hardware and maybe there were a lot of things missing which are a part of standard racing games or any other game for that matter - but still this was a game and I'm more proud of this game than Riddler's Ransom because the team genuinely came together and everyone built it together and delivered it in the defined timeframe without any issues. I can say that we actually overdelivered with the entire FPS camera feature added at the last minute.
