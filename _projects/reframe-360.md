---
layout: project
title: "ReFrame 360"
description: "An R&D project utlising Unreal Engine 5 to warp a live VR feed to create new immersive visual angles in sports broadcast."
category: "Professional"
order: 4
image: "/assets/images/projects/reframe-360/reframe-hero.jpg"
youtube_id: "3ozX-bb8N9w"
tags: ["R&D","UE 5", "HLSL", "Materials", "Blueprints", "Broadcast"]
---

An innovative research and development project designed to integrate immersive 360° VR feeds into traditional 2D television broadcast, enabling dynamic, never-seen-before visual perspectives.

### Project Details
- **Role**: Lead Unreal Engine Developer
- **Engine**: Unreal Engine 5
- **Platform**: PC (Broadcast)
- **Team Size**: 1 (Solo Research Project)
- **Duration**: 2 months

The goal of this solo initiative was to expand the creative possibilities of sports broadcasting by bridging the gap between VR and 2D media. I developed a workflow that allows a broadcast operator to take a live equirectangular VR feed and manipulate it in real-time to generate high-value 2D shots—such as "tiny-planet" views or ultra-wide-angle perspectives—for immediate use in live 2D telecast.

As the sole developer, I was responsible for the entire technical pipeline, from low-level shader math to a prototype operator interface.

### Key Achievements
- Authored a high-performance **HLSL-based material** for real-time warping and manipulation of equirectangular video feeds. This allowed for extremely low-latency processing, essential for live broadcast environments.
- Built a game-controller-based input system that gives operators tactile, fluid control over the video "warp," allowing them to find and frame unique shots dynamically.
- Developed a backend system to record and trigger operator presets, allowing for the instant recall of specific visual angles during a fast-paced live show.
- Designed and implemented a Widget-based UI that provides real-time color grading and adjustment controls, ensuring the output feed matches the visual standard of the primary broadcast.

### Learnings
This project was born out of a desire of mine and my company founder to solve a real-world problem: how do we make immersive VR content useful for the millions watching on standard TV screens?. It was my most intensive dive into shader math and HLSL, teaching me that technical constraints often lead to the most creative visual solutions. Unfortunately due to unforeseen circumstances this project could not be deployed in a production environment :(.