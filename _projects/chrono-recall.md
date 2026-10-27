---
layout: project
title: "Chrono Recall"
description: "A time-rewind ability built with C++ and Unreal's Gameplay Ability System. Leave a blast behind, rewind 3 seconds, and get back the health you lost."
category: "Personal"
order: 2
domain: "Gameplay + GAS"
role: "Solo Developer"
filter_tags: "ue5"
image: "/assets/images/projects/personal/chrono-recall/hero.jpg"
youtube_id: "3Vs4yQPH6fc"
gallery_images: "/assets/images/projects/personal/chrono-recall/hero.jpg"
gallery_captions: "Mid-rewind: the blast radius, afterimages, path trail and telemetry"
github_url: "https://github.com/LifeisaRepo/ChronoGAS"
game_build_url: "https://github.com/LifeisaRepo/ChronoGAS/releases/tag/v1.0.0-beta"
tags: ["UE5", "C++", "GAS", "Gameplay Ability"]
---

> **Please Note:**<br>
> Chrono Recall was made with **Unreal Engine 5.3**, and the build runs on **Windows 64-bit** with a DirectX 12 GPU (tested on a GTX 1060). The packaged build is single-player.

<div class="doc-numbered" markdown="1">

## Introduction

My last GAS project, [Aura](/projects/aura-gas/), was built by following a course, and I finished it wanting to build some features which I could call my own. Chrono Recall is a gameplay ability I designed and built outside of any course. It was also a short break from a longer project, [IPStreamMedia](/projects/ipstreammedia/).

It's a time-rewind ability. Press E, the spot you're leaving explodes, and you fly back along your own path to where you were 3 seconds earlier. It took about 5 days to go from the Third Person template to the release build.

## What's the ability about?

- **Record**: The character always remembers its last 3 seconds of movement and health.
- **Blast**: The explosion damages and knocks back anyone nearby. The longer the path you covered in those 3 seconds, the bigger the blast. If you've been standing still there's nothing to rewind, so the ability won't fire.
- **Rewind**: The game holds on the blast for a moment in slow motion, then you retrace your path at speed, with afterimages trailing behind you and the camera turning to watch the explosion.
- **Restore**: You land where you were, still carrying the momentum you had then, and you're healed back to the health you had there.
- **Cooldown**: 3 seconds before you can use it again.
- **Debug view**: A path trail colored by speed and a live telemetry overlay show what the ability is recording.

The character, animations and input come from the Third Person template. Every effect is C++ plus a couple of materials.

## Recording the Past

Everything starts with a recorder, `UTemporalBufferComponent`, that sits on the character. Twenty times a second it takes a snapshot of where the character is, which way it's facing, how fast it's moving and how much health it has.

The snapshots go into a **ring buffer**. _(A ring buffer is a fixed row of slots that you fill in a circle. Once the last slot is written, recording wraps around and overwrites the oldest one.)_ At 20 snapshots a second, 3 seconds is 60 slots, allocated once at the start, so recording never allocates memory after that. Reading "the snapshot from 10 steps ago" is just counting backwards around the circle.

The rate stays at 20 a second whatever the frame rate is. Each frame adds its time to a counter, a snapshot is taken whenever the counter passes 0.05 s, and the leftover time carries over to the next frame. The recorder also runs after physics, so it reads where the character actually ended up after moving that frame.

## The Ability

The ability, `UGA_ChronoRecall`, is a C++ class with a Blueprint child that holds the tuning values and effect classes. Pressing E activates it by its gameplay tag, as long as two checks pass: the cooldown is over, and there's at least a little recorded path to rewind (25 cm).

### The blast

A full 3-second sprint maxes out the blast's power, and the radius, damage and knockback all scale with it. Damage goes through GAS: the damage effect gets its amount at runtime as a **Set by Caller** value and writes it into an `IncomingDamage` **meta attribute**. It's the same damage pattern I had learned in Aura.

My first plan for the knockback was a physics impulse, but that would do nothing here: characters in Unreal move on a capsule that doesn't simulate physics. Instead, the blast launches them through their movement component (`LaunchCharacter`), harder near the center and softer at the edge. When the blast kills a training dummy, it turns into a ragdoll that keeps the blast's velocity, so the body flies with the explosion.

### The heal

When the rewind finishes, the server compares the health in the oldest snapshot with the health now, and heals the difference through another gameplay effect with a Set by Caller value. If you're healthier than you were 3 seconds ago, nothing happens.

## The Rewind

The rewind itself is a custom **ability task**, `UChronoRewind`. _(An ability task is a piece of work an ability starts and then waits on, like an animation playing out. This one ticks every frame and runs the whole rewind.)_ When it's done it reports back to the ability, which heals and ends.

**Taking over movement**: For the rewind, the task takes the character away from the Character Movement Component's normal rules. It switches the character to flying so gravity and floor checks don't fight the path, turns off collision so it doesn't snag on walls or dummies, and ignores movement input. At the end it hands everything back and gives the character the velocity from the oldest snapshot. If you were running at that point, you come out of the rewind still running, and if you were mid-jump, you keep falling. All of the cleanup lives in the task's `OnDestroy`, which always runs, so the character is handed back safely even if the ability gets canceled halfway.

**Smooth playback**: The rewind plays those 3 seconds of snapshots back in under a second, easing in and out, so most frames land between two snapshots. If the character just jumped from snapshot to snapshot, it would hold still and then teleport, like stop-motion. That's worst in the slow start and end, and it would look different at every frame rate. Instead, every frame the task works out where it is between two snapshots and blends between them: position in a straight line, rotation along the shortest turn. It's the same idea as network smoothing or sampling animation keys. Because it moves through the snapshots by time rather than distance, it keeps the rhythm of the original path: stretches where you sprinted rewind faster than stretches where you walked.

## Making It Look Good Without Art

- **Camera pulse**: A sine curve rises and falls over the rewind, peaking at its fastest moment. It drives a wider field of view, chromatic aberration and motion blur. The original camera settings are restored at the end.
- **Slow motion**: The world drops to a fifth of normal speed at the moment of the blast and eases back near the end of the rewind. The player is sped up by the same factor, so the world slows down but the rewind itself runs at full speed.
- **Afterimages**: Ghost copies of the character are left along the path, each frozen in the character's pose at that moment and fading out. They come from a pool of 8, created on the first rewind, so characters that never rewind pay nothing. The ghost's fade effect also runs on real time, otherwise slow motion would make the ghosts linger and pile up.
- **Body glow**: A glowing overlay material on the character follows the slow-motion curve.

Smaller extras: the speed-colored path trail (green for walking, through yellow, to red at the speeds you only reach when falling), the cooldown readout, health bars for the player and the dummies, a damage pad for losing health to test the heal, and the `Chrono.DrawPath` console variable that toggles the trail.

## Multiplayer

The ability is network-ready, and I tested it in the editor with 2 clients. It's **locally predicted**: the client starts its rewind straight away from its own recording, and the server runs its own rewind from its own recording. Snapshots are never sent over the network. Damage, knockback and healing only happen on the server, while the camera effects, ghosts, glow and telemetry only run for the local player.

That raised three problems:

- **Server corrections**: The server normally pulls a client back whenever their positions disagree by more than a couple of centimeters, and the rewind moves much further than that every frame. Corrections are paused for the length of the rewind.
- **Ending early**: Each side ends the ability on its own, without telling the other, so a client that finishes first can't cut the server's rewind short.
- **Slow motion**: The world's time speed is shared by every player, so slowing it down would slow everyone. Slow motion only runs in single-player.

Under heavy simulated lag there's a small snap at the end of the rewind, which I've accepted.

## Learnings

I knew GAS from Aura, but most of what's above was new to me: ring buffers, custom ticking ability tasks, the local prediction gotchas, and easing curves for nearly every effect. A few smaller things I picked up along the way:

- **Freezing a pose cheaply**: a `UPoseableMeshComponent` can copy a skeletal mesh's pose once and hold it, which is all an afterimage needs.
- **Reading a cooldown from GAS**: the telemetry finds the time left on the cooldown with an `FGameplayEffectQuery` for effects that grant the cooldown tag.

## Final Notes

_Right now the character glides back along its path. Next up is reverse locomotion: feeding the recorded velocity to the movement component and letting the Animation Blueprint play the walk and run cycles backwards while the rewind is active, so the character actually runs backwards instead._

</div>
