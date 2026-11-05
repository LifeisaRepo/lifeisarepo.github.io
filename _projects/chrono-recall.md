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
youtube_id: "9ztOQyAfum0"
gallery_images: "/assets/images/projects/personal/chrono-recall/hero_extra.jpg,/assets/images/projects/personal/chrono-recall/BlastFX.jpg,/assets/images/projects/personal/chrono-recall/ElectrcArcFX.jpg,/assets/images/projects/personal/chrono-recall/GC_ChronoBlast_BlastFX.jpg,/assets/images/projects/personal/chrono-recall/GC_ChronoBlast_OnBurst.jpg,/assets/images/projects/personal/chrono-recall/GA_ChronoRecall_Blueprint.jpg,/assets/images/projects/personal/chrono-recall/ApplyRewindPose.jpg,/assets/images/projects/personal/chrono-recall/SnapshotRecording.jpg,/assets/images/projects/personal/chrono-recall/TemporalBufferSnapshot.jpg,/assets/images/projects/personal/chrono-recall/All_GEs.jpg"
gallery_captions: "Mid-rewind: the blast, afterimages, electric arcs and telemetry::NS_ChronoBlast, the blast's Niagara effect::NS_ElectricArcs, the arcs that play on the character during the rewind::GC_ChronoBlast plays the blast's effect and sound::On Burst: the blast radius sets the Niagara effect's size and the camera shake's scale::BP_GA_ChronoRecall holds the tuning values and effect classes::ApplyRewindPose blends between the two snapshots around the current position::Recording at a fixed rate, whatever the frame rate::What each snapshot stores::The gameplay effects, and the damage pad for testing the heal"
github_url: "https://github.com/LifeisaRepo/ChronoGAS"
game_build_url: "https://github.com/LifeisaRepo/ChronoGAS/releases/tag/v1.2.0"
tags: ["UE5", "C++", "GAS", "Gameplay Ability", "Niagara"]
---

> **Please Note:**<br>
> Chrono Recall was made with **Unreal Engine 5.3**, and the build runs on **Windows 64-bit** with a DirectX 12 GPU (tested on a GTX 1060). The packaged build is single-player.

<div class="doc-numbered" markdown="1">

## Introduction

My last GAS project, [Aura](/projects/aura-gas/), was built by following a course, and I finished it wanting to build some features which I could call my own. Chrono Recall is a gameplay ability I designed and built outside of any course. It was also a short break from a longer project, [IPStreamMedia](/projects/ipstreammedia/).

It's a time-rewind ability. Press E, the spot you're leaving explodes, and you fly back along your own path to where you were 3 seconds earlier. The core ability took about 5 days, and the effects, sounds and camera shakes took another 2.

## What's the ability about?

- **Record**: The character always remembers its last 3 seconds of movement and health.
- **Blast**: The explosion damages and knocks back anyone nearby. The longer the path you covered in those 3 seconds, the bigger the blast. It has its own visuals, sound and camera shake, and the visuals grow with it. If you've barely moved there's nothing to rewind, so the ability won't fire.
- **Rewind**: The game holds on the blast for a moment in slow motion, then you retrace your path at speed, with electric arcs on the character, afterimages trailing behind you and the camera turning to watch the explosion.
- **Restore**: You land where you were, still carrying the momentum you had then, and you're healed back to the health you had there.
- **Cooldown**: 3 seconds before you can use it again.
- **Debug view**: A live telemetry overlay shows what the ability is recording. A path trail colored by speed and a sphere showing the blast radius can be switched on as well.

The character, animations and input come from the Third Person template.

## Recording the Past

Everything starts with a recorder, `UTemporalBufferComponent`, that sits on the character. Twenty times a second it takes a snapshot of where the character is, which way it's facing, how fast it's moving and how much health it has.

The snapshots go into a **ring buffer**. _(A ring buffer is a fixed row of slots that you fill in a circle. Once the last slot is written, recording wraps around and overwrites the oldest one.)_ At 20 snapshots a second, 3 seconds is 60 slots, allocated once at the start, so recording never allocates memory after that. Reading "the snapshot from 10 steps ago" is just counting backwards around the circle.

The rate stays at 20 a second whatever the frame rate is. Each frame adds its time to a counter, a snapshot is taken whenever the counter passes 0.05 s, and the leftover time carries over to the next frame. The recorder also runs after physics, so it reads where the character actually ended up after moving that frame.

## The Ability

The ability, `UGA_ChronoRecall`, is a C++ class with a Blueprint child that holds the tuning values and effect classes. Pressing E activates it by its gameplay tag, as long as two checks pass: the cooldown is over, and there's enough recorded path to rewind (at least 120 cm).

### The blast

The blast's power comes from the length of the recorded path, reaching its maximum at 2,500 cm, and the radius, damage and knockback all scale with it. On flat ground, walking for the full 3 seconds gets you to about 60% at most, and sprinting gets you close to the top at about 96%. Damage goes through GAS: the damage effect gets its amount at runtime as a **Set by Caller** value and writes it into an `IncomingDamage` **meta attribute**. It's the same damage pattern I had learned in Aura. The ability also fires a Gameplay Cue (more on that below) for the blast's visuals and sound, with the radius and power as parameters.

Dummies that survive the blast are knocked back with `LaunchCharacter`, harder near the center and softer at the edge. Dummies that don't survive turn into ragdolls and are thrown with `AddImpulse`.

### The heal

When the rewind finishes, the server compares the health in the oldest snapshot with the health now, and heals the difference through another gameplay effect with a Set by Caller value. If you're healthier than you were 3 seconds ago, nothing happens.

## The Rewind

The rewind itself is a custom **ability task**, `UChronoRewind`. My first plan was a 0.6 s rewind and nothing else, but you need to see the blast before you leave it. So there's a 0.2 s hold on the blast first, followed by a 0.8 s rewind. In single-player the hold plays in slow motion, which stretches it to about 1 second of real time.

**Taking over movement**: For the rewind, the task takes the character away from the Character Movement Component's normal rules. It switches the character to flying so gravity and floor checks don't fight the path, turns off collision so it doesn't snag on walls or dummies, and ignores movement input. At the end it hands everything back and gives the character the velocity from the oldest snapshot. If you were running at that point, you come out of the rewind still running, and if you were mid-jump, you keep falling. All of the cleanup lives in the task's `OnDestroy`, which always runs, so the character is handed back safely even if the ability gets canceled halfway.

**Smooth playback**: The rewind plays those 3 seconds of snapshots back in 0.8 s, easing in and out, so most frames land between two snapshots. If the character just jumped from snapshot to snapshot, it would hold still and then teleport, like stop-motion. That's worst in the slow start and end, and it would look different at every frame rate. Instead, every frame the task works out where it is between two snapshots and blends between them: position in a straight line, rotation along the shortest turn. Because it moves through the snapshots by time rather than distance, it keeps the rhythm of the original path: stretches where you sprinted rewind faster than stretches where you walked.

## Making It Feel Good

### Gameplay Cues

The ability's cosmetics run as **Gameplay Cues**, there are two of them:

- **Blast** (`UChronoBlastCue`): A one-shot cue. Its Blueprint child plays the Niagara effect I made for the blast, a sound and a camera shake. The blast's radius sets the Niagara effect's size and the camera shake's scale, so the biggest blasts shake the hardest.
- **Rewind** (`AChronoRewindCue`): A looping cue, which is an actor that stays alive for as long as the cue is active. It's added when the ability activates and removed when the ability ends, and it receives the hold and rewind durations as parameters, so it needs no access to the ability.

The rewind cue runs three effects:

- **Electric arcs**: A second Niagara effect, playing on the character.
- **Afterimages**: Ghost copies of the character are left behind, each frozen in the character's pose at that moment and fading out. They come from a pool of 8, created the first time a character's rewind cue runs, so characters that never rewind pay nothing. The ghost's fade effect runs on real time, otherwise slow motion would make the ghosts linger and pile up.
- **Body glow**: A glowing overlay material on the character.

### Camera and time

These run in the rewind task, not the cues:

- **Camera pulse**: A sine curve rises and falls over the rewind, peaking at its fastest moment. It takes the field of view from 90° to 125° and back, and drives the motion blur. The original camera settings are restored at the end.
- **Chromatic aberration**: Starts at its peak on the blast and fades out over the rewind.
- **Slow motion**: In single-player, the world drops to a fifth of normal speed at the moment of the blast, and the player slows down with it during the hold. Once the rewind starts, the player is sped up by the same factor, so the world stays slow but the rewind itself runs at full speed. The world eases back to normal over the last 30% of the rewind.
- **Camera turn**: Look input is ignored and the camera turns toward the blast, but only once the player is more than 1 m away from it, to avoid wild swings near the blast point.

### Sound and extras

The rewind and its exit each have their own sound too, and the walk and run animations have footsteps with variations.

Smaller extras: the speed-colored path trail (green for walking, through yellow, to red at the speeds you only reach when falling), the cooldown readout, health bars for the player and the dummies, a damage pad for losing health to test the heal, and the `Chrono.DrawPath` console variable.

## Multiplayer

The ability is network-ready, and I tested it in the editor with 2 clients, including the Gameplay Cues. It's **locally predicted**: the client starts its rewind straight away from its own recording, and the server runs its own rewind from its own recording. Snapshots are never sent over the network. Damage, knockback and healing only happen on the server, and the camera effects, telemetry and path trail only run for the local player.

That raised a few problems:

- **Server corrections**: The server normally pulls a client back whenever their positions disagree by more than a couple of centimeters, and the rewind moves much further than that every frame. Corrections are paused for the length of the rewind.
- **Ending early**: Each side ends the ability on its own, without telling the other, so a client that finishes first can't cut the server's rewind short.
- **Slow motion**: The world's time speed is shared by every player, so slowing it down would slow everyone. Slow motion only runs in single-player.
- **Other players' view**: Clients that didn't activate the ability still need to see and hear it, which is why the cosmetics are Gameplay Cues.
- **Sprint speed**: Sprinting changes `MaxWalkSpeed`, which isn't replicated. If only the client knew about it, the server's character would walk, and the server's recording, and so the blast it calculates, wouldn't match the client's. A server RPC, `ServerSetSprint`, sends the speed so both recordings follow the same path.

Under heavy simulated lag there's a small snap at the end of the rewind, which I've accepted.

## Learnings

I knew GAS from Aura, but most of what's above was new to me: ring buffers, the local prediction gotchas, real time versus world time under slow motion, and easing curves for nearly every effect. A few smaller things I picked up along the way:

- **Freezing a pose cheaply**: a `UPoseableMeshComponent` can copy a skeletal mesh's pose once and hold it, which is all an afterimage needs.
- **Reading a cooldown from GAS**: the telemetry finds the time left on the cooldown with an `FGameplayEffectQuery` for effects that grant the cooldown tag.

## Final Notes

_Currently the character switches to the Falling animation and glides back along its path during the rewind. If I came back to this project, I'd add reverse locomotion: feeding the recorded velocity to the movement component and letting the Animation Blueprint play the walk and run cycles backwards while the rewind is active, so the character actually runs backwards instead, though I'm not sure if it'll actually look good._

</div>
