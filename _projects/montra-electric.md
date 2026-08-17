---
layout: project
title: "Montra Electric Racing"
description: "A four-player time-trial racer built in Unreal Engine 5 for Montra Electric's expo booth, with Logitech G29 wheel rigs and an operator-run race console."
category: "Professional"
order: 1
domain: "Racing · Multiplayer"
role: "Technical Lead & Systems Programmer"
status: "live"
filter_tags: "ue5"
image: "/assets/images/projects/montra-electric/MontraHero.jpg"
youtube_id: "RHN9KnMZE74"
gallery_images: "/assets/images/projects/montra-electric/stills/montra-event.jpg,/assets/images/projects/montra-electric/stills/montra-admin-1.jpg,/assets/images/projects/montra-electric/stills/montra-trim.gif"
gallery_captions: "Event Setup::Admin UI for Player Details::Admin UI for Vehicle Selection"
tags: ["UE5", "C++", "Multiplayer", "Logitech G29", "PC"]
---

<div class="doc-numbered" markdown="1">

## Overview

Montra Electric, an electric-vehicle manufacturer, wanted a racing game for its booth at a major mobility expo in January 2025. Four visitors would race at once on steering-wheel rigs, while an operator ran each session from a control desk. It was the first game our company had built, and I was the technical lead on a team of six.

My job was part decision-making, part code. Early on I turned what was meant to be a full four-car race into a time-trial, because a head-to-head race couldn't be built and tested properly in the time we had. I wrote the core of the multiplayer control system that let the operator run each race, set the performance budget the team optimized against, and built an experimental force-feedback plugin for the wheels. The game ran eight to ten hours a day across the three-day event, and more than 1,000 people played it.

### Project Details

- **Engine**: Unreal Engine 5 (5.4)
- **Platform**: PC, wired LAN (all machines on a dedicated router)
- **Hardware**: Logitech G29 wheel-and-pedal rigs
- **Team Size**: 6 (3 programmers, 3 creatives)
- **Duration**: ~2 months (Nov 2024 – Jan 2025)

## What I Owned and Decided

#### Making it a time-trial

The client first asked for a single-player game that four people would play side by side. Partway in, they wanted it to be a race instead. A real head-to-head race, where all four cars share a track and see each other, means network prediction, collision, and physics all have to hold up under contention, with the rigorous testing that implies. The tracks would also have to be rebuilt wide enough for four cars. With less than two months to the event, a six-person team, and no prior experience building vehicle physics, I didn't think we could build and test all of that in time.

So I proposed a time-trial. All four players sit in one multiplayer session, but each player only ever sees their own vehicle, never the other three on track. Everyone drives the same course against the clock. When a player finishes, their client reports its lap time to the host; anyone who doesn't finish inside the time limit gets a DNF. The host collects the times, builds the leaderboard, and sends the rankings back to every client.

Computing lap times on each client isn't something I'd do for a game shipped to the public, since a client can lie about its time. For a booth running on machines we owned and supervised, that risk wasn't real, so I kept the timing where it was simplest.

#### The operator's control desk

The client wanted one person running the floor, so the host of the session isn't a player at all. It's an operator console. I wrote the core logic that makes the host a non-playing authority: from a UMG panel, the operator enters each player's details, picks one of the two cars for everyone (so every race is on equal machines), and starts and stops the race for all four. A teammate integrated that core into the finished game.

#### Two vehicles that had to feel different

Both cars were Montra's own upcoming vehicles: a three-wheeler auto rickshaw and a four-wheeler mini-tempo. On a real steering wheel they started out feeling identical to drive. Making them feel like two different machines meant tuning three things at once for each: the vehicle physics in Unreal, how Unreal read the wheel's input, and the wheel's own behaviour through Logitech's driver software. One of the programmers and I spent days on it. By the end, the rickshaw and the tempo accelerated, turned, and held the road like genuinely different vehicles across the course.

#### The first-person camera, late in the build

The game was third-person, the camera on a spring arm behind the car. Late in the build, the client asked to also show the vehicles' interiors, since these were cars they were about to launch. The catch: the creative team had never rigged the interiors, because nobody was meant to see them, so the in-car steering wheels didn't turn with the player's input. The client's suggestion was a small picture-in-picture window showing an interior camera with the wheel cropped out of frame. I didn't want that, because it meant rendering a second camera in real time, which the performance budget had no room for. We tried it anyway to be sure, and it cut the framerate steeply, well past what the budget allowed. Instead, I had the creatives rig the steering wheels on both cars, and the team added a proper first-person view the player could switch to with a button on the wheel.

## The Haptics Plugin

Force feedback was never in the original scope. Once we had a G29 on the desk and the client agreed to supply the same wheels for the event, I wanted to try it. There was no Unreal plugin and no docs related Unreal integration for it. Logitech's support pointed me to an SDK that was just a set of `.dll` and supporting files to integrate myself. I'd never built a plugin like that. Unreal ships a Third-Party Plugin template meant for exactly this, so I worked out how to wire the SDK's libraries and headers into it, leaning on LLMs to understand how those files are meant to be handled, and used Logitech's provided API reference to expose their functions as a Blueprint library our vehicle code could call directly.

With that in place I built two effects, chosen because they slotted in without disturbing my teammates' work: the wheel shakes on bumps and collisions, and it stiffens as the car speeds up, so it's harder to crank at speed than when crawling. In testing, the team and management liked them, but everyone agreed they were still rough, especially for people who had never driven with a wheel before, and this was late in the schedule. We decided not to ship the haptics: the plugin worked, but the feel wasn't ready for a booth full of first-time players.

## Key Achievements

- Led the six-person team as technical lead, taking the game from architecture through to delivery on the exhibition floor.
- Made the scope call to build a time-trial rather than a head-to-head race, and wrote the core of the multiplayer control system that let a non-playing operator run every session.
- Set the performance budget and min-spec target the team optimized against; the game held 55–60 FPS and ran 8–10 hours a day, crash-free, across all three days for more than 1,000 players.
- Built an Unreal third-party plugin wrapping Logitech's haptics SDK, exposed it to Blueprint, and prototyped two force-feedback effects.
- Resolved a last-minute first-person-camera request without breaking the frame budget, by having the interiors rigged properly instead of double-rendering the scene.

</div>
