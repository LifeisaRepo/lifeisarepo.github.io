---
layout: project
title: "Bow & Arrow Mechanics"
description: "A modular, reusable bow-and-arrow combat system — clean codebase, designed to drop into any project and tune the feel fast."
category: "Personal"
order: 3
domain: "Game Mechanics"
role: "Solo Developer"
engine_label: "Unreal Engine"
image: "/assets/images/projects/personal/bow-arrow/hero.png"
youtube_id: "Io9d1OaSde0"
gallery_images: "/assets/images/projects/personal/bow-arrow/1.png,/assets/images/projects/personal/bow-arrow/3.png,/assets/images/projects/personal/bow-arrow/2.png,/assets/images/projects/personal/bow-arrow/4.png,/assets/images/projects/personal/bow-arrow/hero.png"
gallery_captions: "Integrated Mixamo character animations on Manny::Aiming mode with AimOffset animations for looking up or down::Arrow Kill-cam::Arrow Kill-cam::Assassin's Creed style slow-mo mode (it's a bug that's become a feature 🙃)"
github_url: "https://github.com/LifeisaRepo/ArcheryMechanics"
game_build_url: "https://drive.google.com/file/d/1Y513e4Rp1G6CS0nYeTaluddzyKEdP-eT/view?usp=sharing"
tags: ["Blueprints", "Modular Codebase", "Game Mechanics"]
---

<div class="doc-numbered" markdown="1">

## Overview

Created a bow and arrow gameplay system on top of the third person template in Unreal Engine 5. The system has been designed to be modular in such a way that it can be used by both Player character as well as AI characters.

The system mainly consists of the `BowMechanics` Actor Component which handles all the logic for drawing, aiming and shooting arrows. Additionally the `Bow` and `Arrow` actor classes handle the animations and individual traits/attributes of the bow and arrow respectively. This system allows me to create multiple types of bows and arrows with their specialised attributes.

Since most of the assets were taken from free online resources, I had to tweak several of them to make sure everything worked well together. For example:

- The bow draw animation and the character draw animation were out of sync, so I adjusted the animations to match properly.
- The audio files I found online weren’t exactly what I needed, so I used Audacity to trim and tweak the sounds to better fit the game.
- Created a simple arrow trail niagara effect to give more immersion
</div>
