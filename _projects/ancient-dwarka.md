---
layout: project
title: "Ancient Dwarka"
description: "An 8K 360° VR short film about the mythological city of Dwarka, rendered entirely in Unreal Engine 5 and shown as a dome experience at India Mobile Congress 2024."
category: "Professional"
order: 6
domain: "VR Film · Rendering"
role: "Lead Unreal Engine Developer"
status: "live"
filter_tags: "ue5 vr"
image: "/assets/images/projects/ancient-dwarka/ancient-dwarka-hero.jpg"
youtube_id: "U2wFjBlA2iA"
tags: ["UE5", "VR 360° Rendering"]
---

<div class="doc-numbered" markdown="1">

## Overview

Ancient Dwarka is an 8K 360° VR short film that tells the story of the mythological city of Dwarka, rendered entirely in Unreal Engine 5. It was made for Vodafone Idea (Vi) to run as a dome experience at their booth at the India Mobile Congress 2024, where it played to an audience of more than 2,000.

This was a creative-heavy project: two developers and four creatives, with most of the work being art and cinematics rather than code. As Lead Unreal Engine Developer, my part was the render pipeline: getting nearly six minutes of 8K, 360° video out of Unreal reliably and on deadline. That meant choosing the engine version, specifying the hardware, setting the performance and memory budgets the creative team worked within, and solving the problems that only surface when you try to render at that resolution.

### Project Details

- **Engine**: Unreal Engine 5.4
- **Platform**: VR media render (8K 360° video)
- **Client**: Vodafone Idea (Vi)
- **Team Size**: 6 (2 developers, 4 creatives)
- **Duration**: ~1 month (Sept–Oct 2024)

## Rendering 8K 360° out of Unreal

Unreal has supported panoramic rendering since UE4, but the feature stayed broken through most of UE5's early releases and only came back working in **UE 5.4**. That fixed the engine version for us: 5.4 was the first build where rendering a full 360° sequence through the Movie Render Queue was actually reliable.

As tech lead I defined the performance and memory budgets at the start of the project to keep the scenes render-safe at 8K, and I built the occasional Blueprint and material the creative team needed along the way. For the render hardware, online render farms didn't fit on cost or turnaround, so I rendered on-premises on workstations we controlled.

We couldn't run true 8K render tests until late in the schedule, and that's when the trouble showed up: the renders kept crashing the editor. Watching memory during lower-resolution tests showed why. When the VRAM filled up, Unreal spilled the overflow into system RAM, and at 8K the RAM filled up too, taking the editor down and sometimes Windows with it. A single render was chewing through more than 24 GB of VRAM and 64 GB of RAM at once. The fix was capacity: more RAM on the in-house machine, plus a rented workstation with an AMD Threadripper, an RTX 4090, and 256 GB of RAM. Even then, making the deadline meant two nights in the office keeping the renders running.

The film was projected onto an 8-metre dome, and the projection team needed the footage as 4K 180° fisheye rather than the 360° equirectangular format Unreal produces, where the whole sphere is flattened into one rectangular frame. Unreal had no built-in fisheye output, and there was no time or budget to buy and test a marketplace plugin for it. The team's call was to render 8K 360° equirectangular out of Unreal and convert it to 4K 180° fisheye in Premiere Pro; the creative team handled that conversion along with the sound, voiceover, and colour.

</div>
