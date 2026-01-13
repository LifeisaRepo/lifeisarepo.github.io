---
layout: project
title: "Montra Electric Racing"
description: "A multiplayer time-trial style racing game with Logitech G29 steering wheel and pedal integration for Montra Electric."
category: "Professional"
order: 3
image: "/assets/images/projects/montra-electric/MontraHero.jpg"
youtube_id: "RHN9KnMZE74"
tags: ["UE 5", "C++", "Multiplayer", "PC", "Logitech G29"]
---

Montra Electric Racing is a competitive racing game made in Unreal Engine 5 featuring real-world hardware integration and local multiplayer functionalities.

### Project Details
- **Role**: Technical Lead & Systems Programmer
- **Engine**: Unreal Engine 5
- **Platform**: PC / LAN
- **Hardware**: Logitech G29 Driving Force
- **Team Size**: 5
- **Duration**: 2 months

This project was developed for Montra Electric to provide an immersive brand experience at a major automotive exhibition. The goal was to create a competitive four-player racing game that felt "physical" and responsive while allowing an administrator to manage the race flow from a central hub.

{% include carousel.html 
    images="/assets/images/projects/montra-electric/stills/montra-event.jpg,/assets/images/projects/montra-electric/stills/montra-admin-1.jpg,/assets/images/projects/montra-electric/stills/montra-trim.gif" 
    captions="Event Setup::Admin UI for Player Details::Admin UI for Vehicle Selection"
%}

As the Technical Lead, I defined the project’s architecture and mentored the development team, while personally engineering a few critical system modules to ensure high-fidelity performance.

#### Key Achievements
- I personally integrated the Logitech G29 haptics libraries into the project by creating a C++ plugin, creating a direct interface between the steering wheel rig and Unreal Engine’s physics engine. This allowed for high-fidelity force feedback during gameplay.
- I architected and coded a simple server-client synchronization system. This allowed a central administrator (**Server**) to manage vehicle selection and race states across four local clients, maintaining minimal latency for the competitive environment.
- Guided the creative and technical teams through iterative level designing and physics tuning to balance realism with accessibility for a general exhibition audience.
- Conducted rigorous technical QA and performance profiling to ensure the application could run continuously for 10+ hours a day in a high-traffic exhibition environment without crashes or memory leaks.
