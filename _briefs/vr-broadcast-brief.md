# Project Brief — 360° VR Broadcast

<!-- ============================================================
  Seeded by Claude (2026-07-09) from the old article, the ReFrame
  brief, and past session facts. EVERYTHING marked (?) is inference —
  correct it. Fragments are fine; the interview chases the rest.
  Tag EVERY number:  [measured]  [estimate]  [don't remember]
============================================================ -->

## 1. Hard facts

- **Title / working title:** 360° VR Broadcast
- **Client / employer** (past and present names if renamed): JioStar / Liminal
- **Timeline** (check the repo/git history — memory lies): 2023-2024
- **Engine + exact versions, and why that version:** NA
- **Platform / hardware:** Live broadcast
- **Team size** (dev team only): 20+ (Don't remember exact team size as we had a big team during broadcast split into multiple smaller teams)
- **My official role:** Stadium-to-CDN Broadcast pipeline architect and Lead Technical Producer
- **Status:** live - broadcasted live on JioCinema app

## 2. Ownership map _(the most important section)_

**No-code / pipeline project translation:** rows = pipeline stages or deliverables, not features. Values: `I did it hands-on` (researched/designed/configured/operated it myself) / `I designed it, teams executed it` / `another team's or vendor's domain` / `team effort` (sparingly). Remember: _evaluating and selecting_ the stack under real constraints IS the engineering here — selection rows are first-class hands-on rows, not footnotes.

| Pipeline stage / deliverable                                                                                        | Ownership                                                                                                     | Notes (what exactly was mine)                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| End-to-end pipeline architecture (stadium → CDN)                                                                    | I did it hands-on and I was the lead but it was a collaborative effort                                        | the R&D phase: overall design of capture → stitch → production → transport → CDN handoff                                                                                                                                                                                                                                                                                                                                                             |
| Hardware/software stack research & selection (360° cameras, stitching solution, vMix, encoders, SRT/RTMP transport) | I did it hands-on and I was the lead but it was a collaborative effort                                        | The hardware and software stack changed multiple times during the R&D period. We tried different cameras, and different stitching software and different streaming protocols and streaming hardware and software.                                                                                                                                                                                                                                    |
| SOPs + training modules                                                                                             | Co-developed with the Lead Executive Producer                                                                 | I co-developed the SOPs and the training modules collaboratively with our Lead Executive Producer, I don't think we can specifically define who did what as it was a genuine collaboration from start to end.                                                                                                                                                                                                                                        |
| On-site technical production, primary team (IPL 2023)                                                               | I did it hands-on                                                                                             | Lead Technical Producer. Ensured all the technical SOPs were followed and was the guarantee engineer for the Camera-to-CDN part of the broadcast of my team during live matches.                                                                                                                                                                                                                                                                     |
| Supervision of the other broadcast teams' technical producers                                                       | I led it                                                                                                      | 3 other teams in IPL 202 and 4 teams in IPL 2024, and singular teams during other tournaments that happened in between and Bigg Boss OTT 2023. I was not personally on-site or leading my own team in IPL 2024                                                                                                                                                                                                                                       |
| 2024 pipeline optimization (~30% hardware + manpower reduction)                                                     | I designed it in collaboration with JioStar broadcast engineers, teams executed it                            | In IPL 2023 each camera needed 2 high-performance workstations, where one handled stitching and the other handled video production and SRT encoding + transmission. In IPL 2024 we managed to acheive the everything with only 1 workstation per camera. In the first year we did not have enough time to optimize our pipeline, but in the second year we ran some tests at JioStar's offices and optimized the hardware through rigourous testing. |
| VR stitching software/hardware itself                                                                               | Camera vendor's proprietory software. Hardware was defined by us as per the spec requirements of the software | selected and operated, not built. I would not like to name the exact brands, but the stitching software was developed by the camera vendor and exclusively supported their cameras to provide a real-time stitched output in upto 8K resolution.                                                                                                                                                                                                     |
| CDN, JioCinema app, playback & distribution                                                                         | another team's domain (JioStar)                                                                               | My responsibility ended with the SRT transmission. We worked with a streaming partner who specialized in VR content distribution. They provided us SRT endpoints where we had to transmit our camera feeds and ensure that they reached the endpoints successfully without any hiccups from our end.                                                                                                                                                 |

- Things people might _assume_ I did but didn't: built streaming software or the player app — the pipeline was assembled and operated from professional broadcast products; JioStar another vendor owned the app/CDN side. Wrote code: literally zero
- Things I did that don't show up in the rows: the pipeline R&D phase itself; hardware requirement lists + procurement; training non-experts to run a pipeline you designed; Bigg Boss OTT 2023 as a second deployment context.

## 3. The hard problems (pick 2–3 — these are the interview questions anyway)

(For claude - The following bullet points were created by you in a different chat. While these points are really good and maybe I will expand upon them some day, I don't want to do it now. This project is not exactly related to game development and I don't wish to spend a lot of time on this right now. I think the ownership map and the original vr-broadcast article and some figures I have mentioned after this section should be enough for you to write a decent semi-compact article. In sections also I might not provide you information for some things which I don't think are very important and can be ignored for now.)

1. **Getting a live 4K 360° feed out of a packed stadium.** What actually breaks — bandwidth, connectivity, transport tuning (why SRT vs RTMP?), redundancy? What was the failover plan when something died mid-match?

2. **Real-time stitching.** It costs 5–6 seconds — what was the quality vs latency vs hardware tradeoff, and how was the solution chosen?

3. **Scaling one person's pipeline design across simultaneous teams/venues.** The SOP story: how do you make a pipeline runnable by people who didn't design it, consistently, at multiple venues at once? (?)

4. **The 2024 optimization.** Cutting ~30% of hardware and people from a live pipeline is a risk decision — what gave you confidence it wouldn't cost you a match?

(Answer the ones that have real stories; delete the rest.)

## 4. Decisions and tradeoffs

- Key technical decisions + what I chose them **over** (rejected alternatives are half the story): stack selections — cameras, stitching, vMix, SRT/RTMP — with what they beat and why: I can't talk much about exact hardware and software brands or names but I can say that we chose SRT as wer found it to be the most stable for our use-case and as SRT is open-source we could use publicly available softwares for encoding it. As the camera feed was handled completely over IP, we used RTMP to internal transmission of the feed from the camera to the video production software (vMix) but due to the unstable nature of RTMP, we chose SRT for the final transmission to the CDN endpoint.
- Where did the redundancy budget go? (For claude - ignoring this)
- Anything risky I _refused_ to do, and why: (For claude - ignoring this)

## 5. Numbers and evidence _(tag every one: [measured] / [estimate] / [don't remember])_

- ~30% hardware + manpower reduction in 2024 — measured how? (invoices, headcount, rig count?): 2 workstations were required to stream 1 camera in IPL 2023, we reduced to 1 workstation per camera in IPL 2024 [measured]. Also in IPL 2023 we had 9 people per on-ground broadcast team but later we optimized it to 4-5 people per team in later tournaments and IPL 2024.
- Stitching latency 5–6 s [from your ReFrame brief — confirm tag]: (For claude - ignoring this)
- Events covered: IPL 2023, IPL 2024, Bigg Boss OTT 2023 — matches / venues / live hours? (?): Entire seasons of IPL 2023, IPL 2024 and Bigg Boss OTT 2023 and also did a few more cricket tournaments in 2023 and 2024. The team also covered a FIBA match in the Philippines in 2024 (as I was not on-site I don't have remember the exact details).
- Team: 20+ (from §1) (For claude - ignoring this)
- Viewership / uptime / incident numbers you can actually stand behind, if any: I remember that we had a peak concurrent viewership of approximately 500K users on the JioCinema app during one of the IPL 2023 matches.

## 6. Failures, bugs, war stories

The honest stuff — mid-match failures, recoveries under pressure, weather/power/heat at venues, help from other teams. This project probably has the best war stories of any on the site; don't skip this section.

(For claude - ignoring this section as discussed previously)

## 7. What should this article prove about me?

Suggested (edit in your own words): "That I can architect a production system end to end and then lead the teams that run it live, at scale, where failure is public and immediate." This is the project where the "in live TV there is no undo button" lesson truthfully lives.

## 8. Voice, focus & size dials

- **Register:** Professional
- **Focus:** project-forward
- **Size:** semi-compact. Do not over extend if I have not given you enough information. You can interview me if you like for more information and then take it from there if needed.
- Any tone notes for this piece: no game-dev reader knows broadcast — this article leans on the two-tier jargon rule harder than any other; every term (CDN, SRT, vMix, stitching, genlock) needs the plain-problem-first treatment.

## 9. Media

- Hero image / YouTube ID: d8yYr_thnVs (from the old article; keep the "Video Src: Jagran HiTech YouTube Channel" attribution note)
- Gallery images + captions: none on the old page — add if you have event photos
- CTA buttons (store page, paper, repo, build): none

## 10. Raw dump

Everything else — stream of consciousness welcome. The writer mines this for texture and follow-up questions, but no claim from here reaches the article without being confirmed above or in the interview.

It was an amazing experience to wet my fingers in the sports broadcast industry. I had seen a glimpse of it before during the MR cricket analysis project, but this project was on a completely level. Meeting new people, learning a lot of new technical things, traveling to different locations, understanding and living the broadcast lifestyle was really exciting and adventurous and a welcome change from the development work that we had been doing.
