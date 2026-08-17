---
layout: project
title: "Cricket Analysis in Mixed Reality for Broadcast"
description: "A mixed-reality + virtual-production tool for data-driven cricket analysis on sports broadcast, and the system behind a published SMPTE paper."
category: "Professional"
order: 2
domain: "Mixed Reality · Broadcast"
role: "Lead Unreal Engine Developer"
status: "live"
filter_tags: "ue5 vr cast"
image: "/assets/images/projects/mr-cricket-analysis/mr-cricket-hero.jpg"
youtube_id: "kcyfOtrmEAI"
cta_primary_text: "Read the paper"
cta_primary_url: "https://journal.smpte.org/periodicals/SMPTE%20Motion%20Imaging%20Journal/133/4/17/"
gallery_images: "/assets/images/projects/mr-cricket-analysis/mr-cricket-hero.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-menu.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-fielding.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-video-wall.jpg"
gallery_captions: "Virtual pitch with ball trajectories simulated from real Hawkeye data::The presenter interacts with the graphics directly, through the HoloLens::The Fielding Pod::Video Wall"
tags:
  ["SMPTE", "UE4", "C++", "Multiplayer", "Mixed Reality", "Virtual Production"]
---

<div class="doc-numbered" markdown="1">

## Overview

For three IPL seasons, Star Sports (Disney Star, now JioStar) ran a mixed-reality tool that let a cricket presenter analyse the game with their bare hands. Wearing a headset, the presenter could pull up ball trajectories from real match data, move fielders around a virtual pitch, and scrub through video. All of those graphics appeared correctly on the broadcast cameras, from each camera's own angle.

I was the lead engineer on it. I built the piece at the core of the system: the part that keeps the headset's graphics locked to the real world so several moving cameras all see them in the right place. I also led the project's rebuild from Blueprint into C++, and built the fielding-analysis module end to end. The work became a peer-reviewed paper I co-authored in the [SMPTE Motion Imaging Journal](https://journal.smpte.org/periodicals/SMPTE%20Motion%20Imaging%20Journal/133/4/17/) (2024).

### Project Details

- **Engine**: Unreal Engine 4 (4.26, then 4.27 from 2022)
- **Platform**: PC (Mixed Reality + Virtual Production)
- **Hardware**: Microsoft HoloLens 2 · Mo-Sys camera tracking · Zero Density
- **Team Size**: 4
- **Duration**: ~3–4 months/year across three IPL deployments (2021, 2022, 2024)

## What I Built

### How it evolved

The project ran in three generations, each a step up in architecture:

- **v1 (Oct 2021, UE 4.26):** a rushed single-PC prototype. The camera-tracking component only worked when it was _possessed by the player_, so the headset had to be the player pawn and the tracked camera a hacked-on extra running off the same machine. It worked, barely, and it was very unstable.
- **v2 (2022, UE 4.27):** a Blueprint **multiplayer** setup that finally split the headset and each camera into independent entities, each on its own PC. This is the foundation the camera sync (below) is built on. We moved to UE 4.27 here and stayed on it to the end. By the time UE5 arrived, Microsoft's HoloLens support had ended at a single UE 5.0 build, and moving to a brand-new major version wasn't a risk worth taking on a live pipeline.
- **v3 (Jan–Jun 2024):** the full **C++ re-architecture**.

(There was no 2023 edition; that season the team delivered the [360° VR IPL broadcast](/projects/vr-broadcast/) instead.)

### Syncing the headset to the broadcast cameras

To composite the presenter's graphics onto a camera's footage, the graphics have to be drawn from _that camera's_ exact viewpoint, and the cameras are always moving. Microsoft's and Epic's earlier demos (the HoloLens 2 launch, Epic's _Apollo 11_) handled this by mounting a second headset on the camera to track where it was pointing.

That approach didn't fit us, for three reasons:

- Our shows used several cameras at once, news-style. We'd have needed more headsets bolted onto cameras than we had presenters wearing them, which the budget couldn't justify.
- Those cameras already carried **Mo-Sys** rigs (the studio's existing camera-tracking hardware), and a headset bolted on top would get in their way.
- Microsoft's and Epic's setups ran the whole experience _natively on the headset_. Our graphics were far too heavy for that, so we ran the project on PCs and streamed it to the headset instead, a different architecture that the camera-mounted-headset trick didn't suit.

So I approached it from the other end. Every system involved — the headset, the Mo-Sys trackers, Unreal — measures space from its own zero point. If I could describe the Mo-Sys zero point _inside_ the headset's own map of the room, then the graphics and the presenter's interactions would line up from every camera's angle. One thing worked in my favour: all the Mo-Sys cameras in the studio were calibrated to a single shared origin, so I only had to line up that one point.

To do it, I built a calibration map in Unreal. Before each shoot, an operator (usually me) would wear the headset and drop anchor points into the real room, with controls to nudge them until they were exact: one anchor marking the Mo-Sys origin, the rest marking where each graphic should sit.

At showtime, the PC driving the headset acted as the server, and each camera ran the same project on its own PC as a client. On every camera's PC, a virtual camera **pinned itself to the Mo-Sys-origin anchor** and then moved in lockstep with the real camera, fed live by Mo-Sys. Because all the PCs shared one session, each drew the same graphics, just from its own camera's viewpoint, and sent that out to the studio's compositing chain to be laid over the real footage.

The result was a multi-camera mixed-reality setup that needed no headset mounted on any camera, let the cameras move and change settings freely, and kept the presenter's interactions aligned across every angle. The headset and cameras stayed in sync over Unreal's built-in replication.

### Rebuilding the foundation in C++

Through its first two generations the system was almost entirely Blueprint, and it was alpha-grade: in those early deployments there was, on a bad day, roughly a **50% chance something broke**. The honest story of the C++ port is that it was less a language win and more a chance to go back to the drawing board and write the thing properly, now that I understood where the costs actually were.

I separate the wins deliberately, because some I could have done in Blueprint and some genuinely needed C++:

- **Better design (didn't strictly need C++):** swapping the 14 fielder `Character` actors for plain `Pawn`s (we never needed character movement), loading only the ball-trajectory set the presenter actually selected instead of eagerly loading all three saved scenarios into memory, tearing actors and components down explicitly, and properly ordering steps that had been racing each other.
- **Genuinely needed C++:** moving the heavy trajectory/spline generation and the tight single-frame spawn loops off the Blueprint VM, and reworking replication around C++'s stricter `RepNotify` behaviour (in Blueprint a RepNotify fires locally even on the server; in C++ it only fires on remote clients, so we had to add explicit delegates where we'd been relying on that side effect).

The outcomes were concrete. The fielding module's spawn step had been crashing the editor **~10–15% of the time** and hitching visibly on camera; afterwards, the crashes and hitches were gone. And the ball-trajectory feature, which used to fall over past **~25 trajectories**, later handled an accidental **~125 in a single load** at a steady **50 FPS**. Across the deployments, reliability went from roughly 50% to around 80%.

### The Fielding Pod

The Fielding Pod is the one feature I built end to end. It spawns a tabletop virtual cricket ground with a full side — 11 fielders, a batsman, a non-striker, and an umpire — and lets the presenter **point at a fielder and tap a spot on the ground to send them there**, so they can walk the audience through a fielding strategy on air.

It's driven by data, not hand-placed. An authoring tool lets an operator set up as many as three scenarios before a show: the fielding side, the batting side, and a preset (e.g. _"Spin during Powerplay"_). At runtime the fielders spawn into the preset formation with the correct team's jerseys (CSK yellow, RCB red). A per-player data table (batting handedness among other attributes) lets it work out each batsman's leg side and off side, so the placements make cricketing sense.

## Key Achievements

- **Co-authored the SMPTE Motion Imaging Journal paper** describing this system, and built the camera-alignment method at the heart of it: multi-camera broadcast MR with no headset mounted on any camera.
- **Designed the anchor-based Mo-Sys ↔ headset calibration** that lined up three coordinate systems, so the cameras could move and change settings freely over standard Unreal replication.
- **Led the Blueprint → C++ re-architecture**: cleared the spawn crashes and frame hitches, and took the trajectory feature from a ~25 ceiling to ~125 at a steady 50 FPS.
- **Owned the broadcast output path**, from Unreal through the studio's compositing chain (Composure → SDI → Zero Density) with genlock timing, along with the daily on-set calibration routine.
- **Hardened experimental, alpha-stage tech** from ~50% toward ~80% reliability across three IPL deployments (2021–2024).

## What I Owned

On a four-person team, I owned the **headset-to-Mo-Sys core** (the calibration map, the anchors, the multiplayer session logic, the Mo-Sys integration, and the path that sends the composited graphics out to broadcast), the **C++ system design** the team rebuilt within, and the **Fielding Pod** end to end. The **ball-trajectory (Hawkeye) feature** was another engineer's, built on that architecture; I contributed the trajectory math and the lazy-loading fix. A teammate built the 3D menu and the video wall; a freelance artist produced the 3D assets. I trusted the team to own their modules rather than looking over their shoulders.

</div>

### Personal Notes

_This project was a turning point: one of my first large-scale builds, and the one that forced me past the "it works on my machine" stage. We never went live-to-air with it; experimental tech gets pre-recorded for a reason, and even then we'd get a 45-minute window to capture a 7-minute segment with anchors that might drift the moment a shoot started. Learning to recover fast under that clock — re-calibrating in minutes, leaning on the camera team to shoot slow and smooth around a jitter bug we hadn't killed yet — taught me that production-ready isn't about cool features. It's about reliability you can stake a broadcast on, built up patiently from something that barely worked._
