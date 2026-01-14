---
layout: project
title: "Cricket Analysis using Mixed Reality for Sports Broadcast"
description: "A Mixed Reality + Virtual Production tool focused on cricket analysis for Sports Broadcast."
category: "Professional"
order: 2
image: "/assets/images/projects/mr-cricket-analysis/mr-cricket-hero.jpg"
youtube_id: "kcyfOtrmEAI"
tags: ["SMPTE", "UE 4", "C++", "Multiplayer", "Mixed Reality", "Virtual Production"]
---

An interactive Mixed Reality (MR) broadcast tool developed for Star Sports to provide real-time, data-driven cricket analysis during live telecasts of major tournaments like the IPL and T20 World Cup.

### Project Details
- **Role**: Lead Unreal Engine Developer
- **Engine**: Unreal Engine 4
- **Platform**: PC (Mixed Reality & Virtual Production)
- **Hardware**: Microsoft HoloLens 2
- **Team Size**: 4
- **Duration**: 4 years* _(Used to be active for 3-4 months per year)_

This project combined Mixed Reality with Virtual Production to allow cricket experts to simulate and analyze complex match scenarios (bowling trajectories, batting, and fielding) in real-time for sports broadcast. As the Lead Unreal Engine Developer, I architected a custom workflow that synchronized MR headset data (graphics) with broadcast camera tracking, providing a real-time composited output for the broadcast control room.

{% include carousel.html 
    images="/assets/images/projects/mr-cricket-analysis/mr-cricket-hero.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-menu.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-fielding.jpg,/assets/images/projects/mr-cricket-analysis/mr-cricket-video-wall.jpg" 
    captions="Virtual Pitch with ball trajectory simulated from real-world data::Cricket Expert can interact with the virtual graphics using the HoloLens::Fielding Pod::Video Wall"
%}

I managed a cross-functional team of developers and artists through the entire development journey, overseeing the system design and the transition from a Blueprint-heavy **version1.0** to a high-performance C++ architecture.

#### Key Achievements
- I am the co-author of a technical paper published in the <a href="https://journal.smpte.org/periodicals/SMPTE%20Motion%20Imaging%20Journal/133/4/17/" target="_blank">SMPTE Motion Imaging Journal</a> regarding this application's innovative use of MR in sports broadcast.
- Led a major Blueprint-to-C++ port of the project in 2023, which resulted in upto 70% performance improvement in complex simulation scenarios.
- Developed a custom multiplayer server-client system that connected the MR headset's session (server) with multiple Virtual Production clients (cameras) for real-time augmentation of MR graphics from the point-of-view of the broadcast cameras.
- Personally developed the interactive fielding table module, allowing experts to visualize and simulate strategic fielding positions for specific batsmen on a virtual mini cricket field.
- Created custom Editor Utility Widgets to streamline pre-shoot setups and operator controls, ensuring stability during high-stakes live broadcasts.

### Personal Notes
_This project was a personal turning point as it was one my first large-scale projects. It forced me to move past the **"it works on my machine"** stage of development. In the world of live TV, there is no "undo" button and no room for a system that is only almost ready._

_Working under the intense, time-sensitive pressure of live broadcast taught me that a truly production-ready product isn't just about cool features—it’s about absolute reliability. It was a humbling process of discovery that shifted my focus from just solving technical puzzles to building robust, resilient systems that can stand up to the most demanding real-world environments._