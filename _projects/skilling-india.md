---
layout: project
title: "Skilling India — MR Training"
description: "A mixed-reality training experience for Vodafone Idea's India Mobile Congress booth, imagining how a headset could guide a hands-on repair."
category: "Professional"
order: 5
domain: "Mixed Reality · Training"
role: "Technical Lead"
status: "live"
status_note: "India Mobile Congress 2025"
filter_tags: "ue5 vr"
image: "/assets/images/projects/skilling-india/skilling-india-hero.jpg"
youtube_id: "TP7cfuatu3k"
tags: ["UE5", "Mixed Reality", "WebSockets"]
---

<div class="doc-numbered" markdown="1">

## Overview

Skilling India was a mixed-reality training experience built for Vodafone Idea's booth at the India Mobile Congress 2025. It imagined a near future where a technician, or anyone, could look at a machine through a headset and see what's wrong with it and how to fix it. The scenario was motorbike repair: a real motorbike stood in the booth with a virtual copy lined up over it, so the guidance graphics appeared to hang on the real bike itself.

I was the technical lead. I set the project's architecture and performance targets, introduced the approach that let an operator guide a first-time user through the whole experience from a tablet, and ran the on-site pipeline that streamed each user's point of view to a screen for the crowd. Over three days at the show, the experience was shown to more than 1,400 visitors.

### Project Details

- **Engine**: Unreal Engine 5.5 (Meta fork)
- **Platform**: Meta Quest 3 (standalone)
- **Client**: Vodafone Idea (Vi)
- **Event**: India Mobile Congress 2025
- **Team Size**: 6
- **Duration**: ~2 months (Sept–Oct 2025)

## The experience

Making the graphics feel like they belonged to the real bike came down to alignment. We modelled a digital twin of the motorbike, stood the real motorbike in the booth, and positioned the twin to sit exactly over it. The twin stayed invisible for most of the experience and served as the anchor: the guidance graphics all rendered against it. Because it lined up with the physical bike, users read those graphics as belonging to the real object, not to a model they never saw.

## Guiding a first-time user

XR is intimidating for people who have never worn a headset, and it carries a problem ordinary devices don't. Once the headset is on, the user can't see anyone around them, and the people around them can't see what the user is seeing. The usual way of helping someone, leaning over and pointing at their screen, simply doesn't exist. The show drew a lot of first-time users, including high-profile guests we didn't want to hand a controller and a tutorial, so that gap had to be closed.

The answer was to let an operator drive the experience from the outside. I had built a prototype earlier that proved a web page could control a packaged Unreal app: the page and the game both connected to a small WebSocket server, which relayed input from one to the other. When this project needed exactly that kind of external control, I brought the approach to the team and they implemented it in the experience.

On the floor it worked like this. The headset launched and connected automatically to a server running on a laptop on the booth's local network. An operator put the headset on the visitor, then drove the experience from a tablet: a simple 2D panel of buttons that triggered events in the app, with status indicators showing what was happening inside the headset. Control could pass back and forth between the tablet and the headset at any moment, so a confident user could take over and a lost one could be walked through.

## Delivering the build

The performance budget the team built against was a standalone Quest 3 app holding 60 to 72 FPS at all times. I ran QA and profiled the build on-device with Meta's OVR Metrics tool, so anything that risked the frame budget was caught before the event.

We built on Meta's fork of Unreal 5.5 rather than a stock engine. Meta maintains its own build where the XR SDK is better supported and more stable, which matters most for mixed reality: Stereo Layers, the feature that renders UI panels crisply and at a true depth in 3D space, is far more reliable there.

The client also wanted the crowd to see what each user saw. I set up and ran a simple live pipeline for that: the headset's point of view was cast off the device through Meta's Developer Hub, its desktop companion tool, into vMix, a live-production switcher, and out to a TV on the booth. I operated it throughout the event.

</div>

### Personal Notes

_I have made endless XR applications till date and the most common issue with all of them is the struggle of getting someone new to try it. The hesitance of people comes from the fact that XR hardware is already very overwhelming when you imagine yourself wearing it, and now they have to also understand how to use it and how to orient themselves at the same time so they don't fall or embarrass themselves in the real-world - when they can't even see the real-world... now that's a lot of things to worry about. So the motivation behind building the WebSockets remote application came from the idea of reducing that overwhelming sensation of the user that **they have to do everything**. Instead now an operator can just ask the user to wear the headset and tell them to relax and enjoy the ride while they control the whole experience on their tablet for the user to enjoy._
