---
layout: post
title: "Unreal Programming Essentials #1"
date: 2025-11-01 22:24:00 +0530
categories: devlog
cover: /assets/images/gameplay-schematic.png
cover_source: '<a href="https://dev.epicgames.com/documentation/en-us/unreal-engine/gameplay-framework-in-unreal-engine?application_version=5.6" target="_blank">Src: Unreal Engine Docs</a>'
---

Imagine you want to make a car ...🤔. Your mind has probably started making a list of things that you would need to build a car. Now using my mystical powers of deduction I can say that the first few things that popped in your mind would be the **Engine/Electric Motor, Chassis, Wheels, Car Body, etc**. Certainly there are a lot more things that you need to build a car - but these are some parts without which you just can't make a car. This logic stays generally the same when developing anything <small>(_this is clearly a segue now.._)</small> and so it's also the same with creating an app in Unreal Engine.

Unreal Engine has a few critically important classes which **have to be** a part of your application and each of them has a dedicated responsibility and a dedicated scope where it works. Either you add those classes yourself or Unreal will automatically add them for you, but without them the application just **DOES NOT WORK**. In this devlog we are gonna discuss about a few of these important classes <small>(_I will try not to be too boring but I can't promise anything lol 🤷‍♂️_)</small> which I have listed as follows,

1. Game Mode/Game Mode Base
1. Player Controller
1. Pawn

#### NOTE: See I'm not going to explain every single detail about these classes here, you can easily get that information in the [Unreal docs](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-6-documentation). My goal is to just explain their general purpose in a simple way which helps you use them in the right way.

---

## Game Mode / Game Mode Base

> We can think of the Game Mode class as an Orchestra Conductor; as soon as a Level is launched the Game Mode springs into action first.

Let's imagine that we are making an FPS Shooter. A general FPS shooter has multiple different gameplay modes like Deathmatch, Battle Royale, etc. where each gameplay mode is unique and has its own set of rules and method of play. Conceptually <small>(_for the sake of simplicity_)</small> we can say that each gameplay mode will be defined as a GameMode class. It can be more-or-less complicated than this as per your game, but that's the gist of it.

So in theory we would have multiple Game Mode classes such as `TDM_GameMode, Conquest_GameMode, CTF_GameMode, BR_GameMode, etc.` These Game Mode classes will hold all the rules of play and govern the game from start to end. As I said before the Game Mode is the first class to spawn once a Map is loaded and the Game Mode holds the reference of all the other important classes which need to spawn for this game to work `ex. Player Controller, Pawn, Game State,etc`... I think that's all there is to talk about the GameMode class when it comes to the basics.

Okay some important facts about the GameMode apart from my ramblings above,

- There is a difference between GameMode and GameModeBase classes. For now, even I remember the difference using this simple thought in my head,
  - Single-Player Game = Use `GameModeBase`
  - Multiplayer Game = User `GameMode`
- The GameMode class spawns **only on the Server** <small>_(this information probably doesn't fall into the **"basics"** category but it's good to know none the less)_</small>. In a multiplayer game there are different types of Actors <small>_(I'm using the term Actor here as its the technically right term, but please understand that all Actors are basically classes/sub-classes)_</small> some of which are spawned only on the Server, some only on the Client and some exist on both. A GameMode class exists only on the Server so that no Client instance can tamper with it and the Server remains the single point of validation of the game using the Game Mode.
- I will add more if I think of something interesting...

## Player Controller

> Its like the controller of a remote-controlled car. Its the class that sits between the player and the pawn that they are gonna control in-game. As said in the Unreal docs - it's the "brain" to a Pawn's "body".

The Player Controller class as the name suggests is a controller which controls the Player Pawn. Usually all the programming related to the Input systems is programmed into the Player Controller and also any critical information about the player's game state can also be saved in the Player Controller (_we actually have Player State class for that but sometimes its just simple to use the Player Controller_). Similar to different types of GameModes you can have different types of Player Controllers depending on various factors. This is again subjective to your game, hopefully the example ahead will help...

Continuing the example of our FPS Shooter. Lets say that the game allows user's to play as an Infantry soldier but they can also drive Tanks for certain missions. In this situation we can create 2 separate Player Controllers; one for the Soldier pawn and other for the Tank Pawn, as they have completely different Input requirements. But this completely depends on personal preference and also depends on your game framework. You can actually end up using the same PlayerController for almost everything if you program it in that way.

Again some important facts about the Player Controller class,

- The Player Controller Actor is ideally not supposed to be a participating member of the game i.e. it's just an invisibile actor that sits at one place from start to finish and controls the pawn. As said in the Unreal docs, it's a **"non-physical actor"**
- Unlike the GameMode, the PlayerController is spawned only in the Player Client and Server. The data travels from the Player Client to the Server.
- Each unique player will have their own Player Controller. So if its a 100-player Battle Royale you will have 100 Player Controllers in the game at the same time.
- AIController is the brother of PlayerController with the difference of the Input system.

## Pawn

> The Pawn is the actual shit, the pig that's fattened up for slaughter, the one who does the player's dirty work, the henchmen, the fall guy... who becomes a ragdoll at the end 💀.

I genuinely spent too much time on the quote above 🙃. The pawn is the physical actor in the game that is controlled by the Player Controller and in turn by the player. The pawn class defines the exact entity that's gonna be controlled by the Player. Based on our FPS Shooter scenario, the Infantry soldier and the Tanks are the different pawns that the player can control during the game.

All the visual elements like the soldier's 3D model, its collisions, its animations, etc. are all stored inside its dedicated pawn class. Sometimes in-case of using the same Player Controller for different Pawn classes, we can also program every Input's unique behaviour for that Pawn inside the pawn class. For ex. `Space Key` for the soldier pawn can mean Jump but for the Tank it can be the Handbrake.

Pawn is the most vulnerable class in the Gameplay Framework as the player has direct connection with it. Hence its very important in multiplayer games that critical game data sent by the Pawn is always validated by the Server before its saved/used.

Some important facts,

- Pawn is the only class within the one's within the one's we have discussed which is present everywhere. Its present in the Server, on the controlling Player's client and on the other player clients as well. Whenever any action is triggered by the player it is first validated by the server and only then its sent to the other player clients.
- As I said before Pawn is the most hackable class hence any critical data which can result in an unfair advantage to a player should either be validated by the server or it should just not be stored in the Pawn if that's an option.
- If I remember anything else I will add it later...

### Fin...

I guess thats all for this one. I'm too tired now, I'm not used to writing so much. Anyways the next one's not gonna be a part 2 of this - I will do that sometime later... the next one's gonna be a bit practical so hopefully y'all will not be as sleepy as you are by now.

Have a nice weekend! Cheers 🍻!
