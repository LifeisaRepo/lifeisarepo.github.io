---
layout: project
title: "360° VR Broadcast"
description: "A stadium-to-CDN pipeline for real-time 360° VR coverage of major cricket tournaments."
category: "Professional"
order: 7
domain: "Live Broadcast Pipeline"
role: "Pipeline Architect & Lead Technical Producer"
status: "live"
status_note: "JioCinema"
filter_tags: "cast"
image: "/assets/images/projects/vr-broadcast/vr-broadcast-hero.jpg"
youtube_id: "d8yYr_thnVs"
tags: ["Live Broadcast", "360° VR", "SRT", "vMix", "IPL"]
---

<sup>Video Src: Jagran HiTech YouTube Channel</sup>

<div class="doc-numbered" markdown="1">

## Overview

For the 2023 and 2024 IPL seasons, cricket fans could watch the tournament in live 360° video, inside the JioCinema app. Three cameras sat at fixed positions around the ground, each capturing the whole scene at once and streaming its own immersive feed. In the app you chose which camera to watch from and looked wherever you liked, on your phone, or with the phone slotted into one of Jio's VR headsets, as if you were standing in the stadium while the match happened.

Behind that was a live broadcast pipeline that carried real-time 360° video all the way from the stadium to viewers' screens. I architected that pipeline end to end, then led the teams that ran it during live matches. The work started with hardware research and system design and ran through to being the engineer responsible, on match day, for one team's feed reaching the network cleanly. It covered full IPL seasons, Bigg Boss OTT 2023, and other tournaments, and peaked at roughly 500,000 concurrent viewers during one 2023 match.

### Project Details

- **Platform**: Live broadcast (stadium to CDN)
- **Client**: JioStar (JioCinema)
- **Coverage**: IPL 2023 & 2024, Bigg Boss OTT 2023, other tournaments
- **Team**: Large broadcast crew, split into multiple on-site teams

## The pipeline, stadium to CDN

Getting a live 360° feed out of a packed stadium and onto a phone is a chain of steps, and every link can break under match-day conditions. Each camera captures the full scene through several lenses, which have to be fused into one seamless 360° image. That image goes into live production for switching and framing, then travels out of the stadium, over the internet, to the content-delivery network (CDN) that streams it to viewers. We ran this chain three times over, once per camera, so each of the three positions reached the app as its own feed.

Most of the engineering was in choosing and proving that chain. There was no off-the-shelf answer, so the R&D phase worked through different cameras, different stitching software, and different streaming hardware and protocols before the stack settled. The cameras captured at up to 8K, and the stitching software fused each camera's lenses into a single real-time 360° image, which we downscaled to 4K for broadcast. Live switching ran through vMix, a professional video-production application. For the final transmission out to the CDN we used SRT rather than RTMP, which isn't stable enough to stake a mission-critical live broadcast on. The pipeline was assembled and operated from professional broadcast products, with the CDN and the JioCinema app handled downstream by a streaming partner and JioStar.

## Running it live, across venues

The pipeline was designed by a small core, but live coverage needed many more people executing it identically, at several venues, at the same time. So alongside the Lead Executive Producer I co-developed the standard operating procedures and training modules that turned the design into something a non-specialist crew could run: pre-production setup and live on-site scenarios, documented so every team followed one technical protocol.

During IPL 2023 I was on-site as Lead Technical Producer for my own team, the engineer who guaranteed the camera-to-network chain stayed up through every live match, while supervising the technical producers of three other broadcast teams running the same setup elsewhere. In 2024 I stepped off-site: I oversaw four teams' technical producers and focused on redesigning the rig.

In 2023, every camera feed needed two high-performance workstations. The first season left no time to optimize; in the second, we ran tests at JioStar's offices and reconfigured the rig to do the same work on a single workstation per camera. On-site teams shrank from around nine people to four or five, a cut of roughly 30% in hardware and manpower with no drop in broadcast quality.

Beyond the IPL, the same pipeline covered Bigg Boss OTT in 2023 and a handful of other tournaments, and in 2024 the team took it to a FIBA basketball match in the Philippines.

</div>
