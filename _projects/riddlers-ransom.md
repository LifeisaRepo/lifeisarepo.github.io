---
layout: project
title: "Riddler's Ransom — VR Escape Horror"
description: "A VR escape-room horror that started as an internal PC-VR game jam and shipped standalone to the Meta Quest Store."
category: "Professional"
order: 3
domain: "VR · Standalone"
role: "Technical Lead · QA"
status: "live"
status_note: "Meta Quest Store"
filter_tags: "ue5 vr"
cta_primary_text: "store page"
cta_primary_url: "https://www.meta.com/en-gb/experiences/riddlers-ransom-escape-horror/24702477826005564/"
image: "/assets/images/projects/riddlers-ransom/Hero.png"
youtube_id: "6Z24FtihEgM"
gallery_images: "/assets/images/projects/riddlers-ransom/stills/6.jpg,/assets/images/projects/riddlers-ransom/stills/4.jpg,/assets/images/projects/riddlers-ransom/stills/5.jpg"
gallery_captions: "Puzzle environment::Physics-based object interactions::Environment art rebuilt for Quest 3 budgets"
tags: ["UE5", "Standalone VR", "Meta Quest 3", "Meta XR SDK"]
---

<div class="doc-numbered" markdown="1">

## Overview

Riddler's Ransom is a VR escape-room horror game, live on the Meta Quest Store. It began as an internal game jam, held to refresh the team's skills after they came back from the [360° VR broadcast of the 2024 IPL season](/projects/vr-broadcast/): a prototype built in a few days, never meant for release. Management liked it enough to ask whether it could become the company's first published game, on one condition: it couldn't pull anyone off client work.

Getting from jam build to store page took about thirteen months of part-time work. The game was rethought as a standalone Quest title, moved onto Meta's fork of Unreal Engine, optimized down to mobile hardware budgets, and carried through Meta's compliance process to publication. I led that path as Technical Lead. The code and the art were the team's; the platform call, the engine choice, the performance budgets, the playtesting, and the store submission were mine.

### Project Details

- **Engine**: UE 5.3 (jam) → Meta's Quest fork of UE 5.4 (release)
- **Platform**: Meta Quest 3 (standalone)
- **Team Size**: 7
- **Duration**: ~13 months, part-time between client projects

## From Game Jam to Store Page

### The platform call

The path of least resistance was to publish the jam build as PC-VR, close to as-is. I chose standalone Quest instead, for three reasons: PC-VR's audience lives on Steam, where a small escape-room title would struggle to stand out; testing a PC-VR release properly means testing across many headsets, and we owned two Quest devices; and the Quest Store already had a thriving escape-room category, so the game had a real audience there. Standalone meant trading a PC's horsepower for a mobile chip, i.e. more optimization work.

Since we were shipping for Quest only, I also moved the project onto Meta's fork of Unreal Engine and its Quest-specific XR SDK instead of the cross-platform OpenXR route. The fork trades portability, which we didn't need, for Quest-tuned performance features we did: Application SpaceWarp (renders at half rate and synthesizes the in-between frames), Dynamic Resolution, and Mobile Multiview (draws both eyes in a single pass). On a part-time schedule that headroom mattered; the team didn't have to hand-polish every asset to hold frame rate.

### Making a jam build shippable

A jam rewards a playable idea, not a shippable one. Every light in the prototype was dynamic, textures and materials were unoptimized, much of the gameplay was hard-coded, and the game leaned on someone standing next to the player explaining what to do.

The bar for release was 72 FPS on device, inside Quest 3 memory budgets, and a game a stranger could play unassisted. From there the optimization happened in a set order (texture resolutions before material code, dynamic lighting rebaked to static, then draw calls), with every build tested against that bar along the way. The jam prototype had run at 30–40 FPS on a PC; the final standalone build holds 68–72 on the headset itself.

Two changes from those testing rounds stand out. The first puzzle originally bound the player's hand to a wall with a physics-constraint chain; on device it turned janky and fell through walls before collision finished loading, so we replaced it with a grated door and a lock that restricted the player identically at none of the simulation cost. And the second puzzle, a riddle solved from cards hidden around the room, was too hard for anyone playing unassisted, so we moved the cards to findable spots, extra clues were added, and rounds of internal playtesting confirmed the game was actually becoming more playable.

### The first submission

This was the first game the company had published anywhere, so the route to a store page had to be figured out from scratch. I owned that route: Meta's Virtual Reality Checks (the compliance bar every Quest Store title clears), the build requirements, and the submission itself, end to end.

## Key Achievements

- Shipped the company's first published game to the Meta Quest Store, owning VRC compliance and the submission end to end.
- Called the move from PC-VR to standalone Quest 3 and onto Meta's engine fork, and set the 72 FPS and memory budgets the team built against; the release holds 68–72 FPS on device.
- Defined the optimization sequence that took a 30–40 FPS jam prototype to a shippable standalone build, testing builds against budget alongside the team.

</div>

### Personal Notes

_This was the first project I took all the way to a store page, and it taught me the half of game development that has nothing to do with building features: budgets, compliance, playtesting, and deciding what to cut.Taking the game from a jam-prototype to a store-ready version was a journey longer than I had honestly expected. Having walked the full distance between the two once, I know what that road looks like for the next one._
