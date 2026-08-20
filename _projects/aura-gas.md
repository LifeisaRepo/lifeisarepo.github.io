---
layout: project
title: "Aura - Master of Elements"
description: "Top Down RPG made using Unreal's Gameplay Ability System"
category: "Personal"
order: 2
domain: "Gameplay + Systems"
role: "Solo Developer"
engine_label: "UE5 · GAS"
image: "/assets/images/projects/aura-gas/AuraHero.jpg"
youtube_id: "Hn18mp03d3Q"
gallery_images: "/assets/images/projects/aura-gas/start.jpg, /assets/images/projects/aura-gas/SpellMenu.jpg, /assets/images/projects/aura-gas/AttributeMenu.jpg, /assets/images/projects/aura-gas/fireblast.jpg, /assets/images/projects/aura-gas/CharacterClasses.JPG, /assets/images/projects/aura-gas/AbilityInfo.JPG, /assets/images/projects/aura-gas/Data.JPG, /assets/images/projects/aura-gas/Damage.JPG, /assets/images/projects/aura-gas/InputTags.JPG, /assets/images/projects/aura-gas/MVVM.JPG, /assets/images/projects/aura-gas/EnemyMontage.JPG"
gallery_captions: "Basic instructions mentioned at the start::Spell Menu::Attributes Menu::FireBlast! 🔥::This Data Asset defines the in-game character classes.::This data asset holds the critical data related to all abilities.::All the data assets and curve tables used for the gameplay logic::This curve table defines the damage dealt by Aura's abilities at a certain level.::Gameplay Tags have been used to handle inputs so that actual key bindings can be changed without changing the core logic.::Load Menu uses MVVM framework for data flow.::Goblin's Anim Montage"
github_url: "https://github.com/LifeisaRepo/Aura_GAS"
game_build_url: "https://github.com/LifeisaRepo/Aura_GAS/releases/tag/v1.2-dev"
tags: ["UE5", "Game", "GAS", "C++", "RPG"]
---

<div class="doc-numbered" markdown="1">

## Introduction

> A game, no matter how big or small runs on systems.

Systems define frameworks for different aspects of a game. The more complex a game is, the more systems it usually has. **Gameplay Ability System aka GAS** is one such system created by Unreal Engine which is meant for developing RPG-style games or other complex games where a lot of parameters and stats drive a player's gameplay.

At the start of 2026, I decided that I wanted to learn something new and challenging. I did some research and realized that GAS was exactly the kind of challenge I was looking for. So I picked up this course I found and started building a Top-Down RPG game with the Gameplay Ability System at its heart.

This game is a culmination of almost **5-months** of my learning journey which started around Feb 2026.

## What's the game about ?

Aura is a top-down RPG game where we play as Aura, an Elementalist who fights different types of monsters with different elemental magical powers.

- Aura has access to several **Fire, Lightning and Arcane** type abilities. These abilities unlock by gaining **XP** and leveling up.
- The player gains **Attribute Points** and **Spell Points** every time Aura levels up. Attribute points can be spent to upgrade Aura's attributes such as Strength, Resilience, Vigor, etc. which also control other attributes such as Critical Hit Chance, Critical Hit Resistance, etc. Spell Points can be spent to upgrade currently unlocked abilities or to unlock new abilities.
- The game also has different types of enemies like Goblins with Spears & Slingshots, Shamans, Ghouls and Demons.
- The game has multiple levels and players can save their progress by walking on to checkpoints.

> Except for the Save & Load system, the game is actually made to be PvE multiplayer-ready.

<!-- ## Gameplay Ability System

The Gameplay Ability System is made up of different components like **Attribute Sets, Ability System Components, Gameplay Abilities, Gameplay Cues, etc.**. Each of these components have their own logic and their own sub-components which work together to provide game developers maximum flexibility to design the game logic and mechanics as per their needs. This is how I have implemented GAS in my game, -->

## Attributes

Aura and the enemies have their own attributes like Health, Mana, Strength, Resilience, etc. These attributes are handled by a `UAttributeSet` class. The attributes are classified into different categories as follows,

- **Primary Attributes:** These attributes are the basis of all the gameplay stats. Players can spend the Attribute Points they earn after leveling up to upgrade these attibutes. Upgrading an attribute results in an upgrade of the secondary and vital attributes that are dependent on it.
- **Secondary Attributes:** These values cannot be modified by the player directly, specific formulas and calculations are done using the Primary Attributes to derive the Secondary Attributes.
- **Vital Attributes:** These are also technically Secondary attributes as they cannot be modified by the player directly. Health and Mana are the Vital attributes in this game which define if the player has enough HP to continue and if the player has enough Mana points to launch the next attack.
- **Meta Attributes:** These values are the values that handle modification of certain critical values. In case the player takes damage, we set the incoming damage in a meta attribute which validates the damage on the server and then reduces it from the actual Health attribute. This ensures that the players/clients don't have direct access to modifying important stats.

The AttributeSet is further connected to an `AbilitySystemComponent` or `ASC` which is the crux of the GAS framework. Both Aura and the enemies have their own ASCs and their own AttributeSets.

## Gameplay Abilities

<!-- The core logic of gameplay mechanics like attacks, pickups, hit-reacts, etc are defined by the `UGameplayAbility` classes. Gameplay Abilities must be granted to a character before they can be used. -->In the beginning, Aura starts with only one ability called **Firebolt**. It's a ball of fire that homes on the target enemy. As the player levels up, they earn **Spell Points** which can be used to unlock new abilities or upgrade the one's that are already unlocked.

Aura has **4 Active** and **2 Passive** abilities in total. Active abilities are attack abilities that cost Mana points every time we use them. Passive abilities are boosters which improve Aura's stats while they are equipped, and they don't consume any Mana points.

The game starts with only one active ability and the rest have to unlocked by leveling up and spending Spell Points.

> Each Active ability also has its own levels, and players can spend their Spell Points to to level up the abilities.

### Active Abilities

- **Firebolt:** Shoots fireballs from Aura's staff which home to the target location. Number of fireballs and per fireball damage increases on level up.
- **Fire Blast:** Shoots 12 fireballs simultaneously in a circle around Aura. These fireballs boomerang back to Aura's location and explode on the way back. Attack damage increases on level up.
- **Electrocute:** Creates an arc of lightning from Aura's staff to the target. On leveling up this ability, additional arcs spawn from the location of the targeted enemy and hit other enemies within a certain radius.
- **Arcane Shards:** Rock-like shards emerge from the ground on the targeted location and cause damage to enemies within their radius. On leveling up, more shards emerge around the targeted location causing even more damage.

### Passive Abilities

- **Life Siphon:** Gives Aura a percentage bonus of HP from every Health Pickup. Ability can be leveled up to increase the amount of bonus HP.
- **Mana Siphon:** Gives Aura a percentage bonus of Mana Points from every Mana Pickup. Ability can be leveled up to increase the amount of bonus Mana Points.

Enemies also have their own gameplay abilities like **Melee, Ranged and Summon**. To keep the development simple I gave them only one gameplay ability each.

## Gameplay Effects

This game has several gameplay effects which drive the core logic for the attack abilities, taking damage, calculating costs and applyling cooldowns. It also has special gameplay effects which apply and update the Primary, Secondary and Vital attributes of Aura as well as the enemies.

I have used **Curve Tables** and **Data Assets** in combination with `Modifier Magnitude  Calculations`, `Execution Calculations` and `Set-by-Caller` modifiers to calculate and apply appropriate values for individual gameplay effects.

## Gameplay Cues

Most of the SFX and VFX in this game related to gameplay abilities is handled using `Gameplay Cue Notifies`. I have used **Replicated** as well as **Non-Replicated** Gameplay Cues to ensure that the number of active RPCs stay within the defined limits, and RPCs are not wasted on cosmetic effects instead of being used for critical backend tasks.

## Other Features and Learnings

Outside of the GAS system, I also learned a lot of other skills while making this game. As this article has already run super long, I will just list them down instead of going in detail about everything,

- Implemented **EQS Query** system for Ranged Enemy AI so that they can attack Aura from a safe distance.
- Gained in-depth knowledge about the **Save/Load** system in UE5. Understood how actor states are saved by using `SaveGame` meta property to save serialize important actor variables.
- Learned `NetSerialization` while creating a custom `FGameplayEffectContext` struct.
- Learned inheritance in **Animation Blueprints** by creating a master ABP for enemies and then deriving child ABPs for each enemy to avoid repeated code.
- Implemented **Motion Warping** in Animation Montages to make characters face target locations.
- Created custom **Async Tasks** for use in Gameplay Abilities.
- Learned and implemented both the **View-Controller-Model (VCM)** and the **Model-View-ViewModel (MVVM)** frameworks while developing UI for this game. The Main Menu and Load Menu were made using the `MVVM` framework, while the in-game UI like the Main HUD, Attributes Panel and Spell Panels were all made using the `VCM` framework.

## Final Notes

_I intended this project to be a learning exercise primarily meant to teach me the Gameplay Ability System, but it taught me so much more along the way. Many of the features and frameworks that I implemented here actually changed my day-to-day coding practices. Now my next step is to expand the game further by building some more features which I can call as my own._
