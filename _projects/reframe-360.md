---
layout: project
title: "ReFrame 360"
description: "An R&D tool that reshapes a live 360° VR feed inside UE5 into new camera angles for standard 2D sports broadcast."
category: "Professional"
order: 4
domain: "R&D · Real-Time Graphics"
role: "Lead Developer"
status: "rnd"
filter_tags: "ue5 cast"
image: "/assets/images/projects/reframe-360/reframe-hero.jpg"
youtube_id: "3ozX-bb8N9w"
tags: ["R&D", "UE5", "HLSL", "Materials", "Blueprints", "Broadcast"]
---

<div class="doc-numbered" markdown="1">

## Overview

On a cricket broadcast, viewers see a director cutting between the cameras positioned around the ground. In 2023 our team had also put a few 360° VR cameras on the ground: the kind that capture the whole scene as one immersive sphere, meant for headset viewers. ReFrame 360 grew out of a question the company's founder put to me after that season: could the spherical feed coming from these cameras also feed fresh shots to the normal TV broadcast?

The starting point is something consumer VR players already do. In a VR media player like the GoPro VR player, you can move around inside a 360° video: zoom into a detail, tilt and rotate the view, or push the projection into the warped "tiny-planet" look, where the whole scene curls into a little globe. Those tools work on recorded files, offline. ReFrame does the same thing to a live feed, while the match is happening. An operator steers inside the sphere with a game controller and pulls out flat 2D shots on the fly — anything from a tight zoom to an ultra-wide angle to a full tiny-planet — and can save any framing as a preset to snap back to during a fast show.

I took it on as an R&D project and built the first version alone. It culminated in a live test during the 2025 IPL season: a real 360° stadium feed, reframed in real time for the JioStar production team to watch as the match went on. The tool never reached air, and the project was later shelved due to budgetary reasons.

### Project Details

- **Engine**: Unreal Engine 5 (5.2, then 5.5)
- **Platform**: PC (broadcast)
- **Team Size**: 1 in v1, 3 in v2
- **Duration**: Two R&D phases (v1 Jul–Sept 2023, v2 Mar 2025)

## The build

ReFrame is really three problems: turning the spherical feed into a controllable flat shot, giving an operator a natural way to find and frame those shots, and moving live video through Unreal at broadcast quality.

### From a 360° feed to a steerable shot

A 360° camera stores its picture as a single flattened rectangle: the whole sphere stretched into one frame, distorted toward the top and bottom the way a flat world map stretches the poles. The technical name is an equirectangular image. To get a normal, flat shot out of it, you map that rectangle back onto a sphere and take a fresh virtual photograph of a chosen slice; to get the tiny-planet warp, you bend that projection in ways a real lens can't.

All of that reprojection happens inside a single Unreal material that processes every frame of the incoming feed. I knew from the start that this material would be most of the work, and I wasn't a shader specialist going in. So the first version was a slow, deliberate build: I studied the projection math, worked out the conversions between the sphere and the flattened frame, and assembled the material in Unreal's material editor piece by piece as the concepts clicked. At one point a single coordinate conversion stalled me for days, until a teammate turned up a ready-made node that did exactly what I needed; I simply hadn't known it existed.

In v2 I rewrote the math-heavy core of the material in HLSL, hoping a hand-written version would trim the per-frame cost, though I never got the chance to profile the two versions against each other.

### Controls an operator would trust

Because the whole point is a person finding shots live, the controls had to feel like operating a camera, not like working a menu. I took the material's parameters — where the virtual view points, how wide it goes, how far to push the warp — and mapped them to a game controller instead of a keyboard and mouse. The reason came off the studio floor: operators running a jimmy-jib camera crane work a joystick for slow, continuous moves, and a controller's analog sticks and triggers give that same gradual control where a keyboard only offers hard on-off presses. Every operator's hands are different, too, so I built a small on-screen panel where they can tune the stick and trigger sensitivity until the movement feels right to them.

A live show gives you no time to hunt, so I added preset angles: an operator can save a framing and snap straight back to it mid-play instead of chasing it by hand.

### Feeding it a live show

Getting video in and out of Unreal was familiar ground from my virtual-production years. Unreal ingests the live 4K VR feed, runs it through the material, and sends a standard HD 2D feed back out to the broadcast chain, every frame. In v1 I also built a basic color-correction tool, with on-screen color wheels for highlights, mids and shadows. In v2, two engineers joined me to harden and extend the project; one of them added OCIO, the industry-standard color-management setup, for accurate color conversions in and out of the engine.

## The live test

The open question the whole time was latency. A 360° VR feed is costly long before it reaches Unreal: the camera's lenses have to be stitched into one live sphere at the stadium, then the feed has to travel to the broadcaster before ReFrame ever sees it. Moving 4K video in and HD video out of Unreal on every frame adds more on top, and Unreal's video pipeline is not built to do that for free. Enough delay and the tool would sit too far behind the live action to be any use.

We tested it for real during the 2025 IPL season at JioStar's offices: a live 360° feed from the match stadium, reframed as the game went on, with the outputs put in front of the production team. End to end, from the stadium camera to the production control room, the live test measured 9 seconds, most of it the stitching and transport the feed already carried before it reached ReFrame.

## Key Achievements

- Built the tool's core material end to end, from learning the projection math to rewriting its math-heavy core in HLSL, turning a live 360° feed into operator-steered flat 2D shots in real time.
- Designed the controller-based operator controls, modeled on jimmy-jib camera rigs, with saved preset angles for instant recall during a live show.
- Proved the full pipeline in a live test on a real stadium feed during the 2025 IPL season, at a measured 9 seconds end to end, most of it inherited upstream.

</div>
