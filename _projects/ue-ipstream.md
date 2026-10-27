---
layout: project
title: "UE_IPStream"
description: "An Unreal Engine 5.3 plugin that plays live RTSP camera streams through Unreal's own Media Player, with FFmpeg doing the decoding."
category: "Personal"
order: 1
domain: "Engine + Video"
role: "Solo Developer"
status: "rnd"
status_note: "v0.1.2-beta"
filter_tags: "ue5"
image: "/assets/images/projects/personal/ue-ipstream/hero.jpg"
youtube_id: "XT4aLqlNvqM"
gallery_images: "/assets/images/projects/personal/ue-ipstream/hero.jpg"
gallery_captions: "Live RTSP stream from OBS on a Media Texture"
github_url: "https://github.com/LifeisaRepo/UE_IPStream"
game_build_url: "https://github.com/LifeisaRepo/UE_IPStream/releases/tag/v0.1.2-beta"
tags: ["C++", "FFmpeg", "Media Framework", "RTSP", "Multithreading"]
---

> **Please Note: This is a work in progress!**<br>
> The plugin, IPStreamMedia, is at v0.1.2-beta and runs only on **Windows 64-bit** with **Unreal Engine 5.3**. I've tested it with one IP camera (H.265, 1280×720, 25 fps) and with OBS (H.264, 1280×720, 25 fps). It plays video only, no audio.

<div class="doc-numbered" markdown="1">

## Introduction

Unreal Engine can play video files and HLS/DASH web streams out of the box, and video from capture cards through vendor plugins. What it doesn't have is a built-in way to bring in a live stream from an IP camera (RTSP). So I decided to build a plugin for it.

I didn't want a custom API bolted on the side. The goal was a proper **Media Framework player**, so that a stock Media Player and Media Texture just work when you give them an `rtsp://` URL. The end goal is a game with a live camera feed on an in-game monitor, like a security screen in a level.

## Features

- Plays live RTSP streams through Unreal's standard media assets. You choose IPStreamMedia as the player, either in a Media Source's player overrides or with *Set Desired Player Name* before *Open Url*, and from there it behaves like any other media. _(The choice is needed because Unreal's built-in Windows player, WMF, also claims `rtsp://` links, can't actually play them, and gets asked first. I wrote about that in [IPStreamMedia #6](/devlogs/2026/10/12/ipstream_6.html).)_
- Does its networking and decoding on its own thread, so the game keeps running while the stream connects.
- **Reconnects by itself** with backoff when a stream drops, and reports it through the standard Media Player events: *Playback Suspended* and *Playback Resumed* around a reconnect, *Media Open Failed* if a URL never connects, and *End Reached* once it runs out of attempts. The reconnect limit can be set from Blueprint (default 3).
- Blueprint can read the video's size, frame rate and codec.
- Packaged and tested as a standalone Windows build.

## How It Works

Unreal's Media Framework is the engine's video system: a Media Player asset opens a URL, and a Media Texture puts the picture on any material. The Media Player doesn't do any decoding. It hands that work to a player plugin, and IPStreamMedia is one of those. Here's how its pieces fit together:

- **Player factory**: A small second module that tells Unreal "I can play `rtsp://`". It only holds information about the player, so it loads even where the player can't.
- **Player**: Implements Unreal's `IMediaPlayer` interface, so the Media Player talks to it the same way it talks to Unreal's built-in players.
- **Decode worker**: A dedicated `FRunnable` thread that connects to the stream, reads and decodes it with FFmpeg, converts each frame to BGRA and hands it to Unreal's sample queue. Unreal always shows the newest frame _(latest frame wins)_, which keeps latency down.
- **Events**: The worker never touches game-thread state. It queues up news _(opened, lost, back, failed)_ in a lock-free queue, and the player passes it on during Unreal's tick.
- **Shutdown**: Closing a stream means stopping a thread that may be stuck waiting on the network. While FFmpeg waits, it calls back into my code, and that callback checks a stop flag. The thread is joined in under 100 ms (worst measured: 92.8 ms).

## Technical Setup

### FFmpeg inside Unreal's build system

FFmpeg is included as unmodified shared DLLs (LGPL v3), wrapped as an External module so Unreal's build system can link against it, and the DLLs are delay-loaded from the plugin's own folder. _(Delay-loading means Windows doesn't go looking for the DLLs when the program starts. The plugin loads them itself when its module starts up.)_ The plugin's own code is MIT.

The first build wouldn't even start the editor. It compiled and linked cleanly, then failed at startup because the FFmpeg DLLs couldn't be found. The `.lib` files I had downloaded turned out to be GNU-format import libraries, and Microsoft's linker silently ignores delay-loading for those, so Windows went looking for the DLLs before the plugin could load them. The fix was to regenerate the `.lib` files from FFmpeg's own `.def` files with `lib.exe`. The full hunt is in [IPStreamMedia #5](/devlogs/2026/09/16/ipstream_5.html).

### Threads, timing and color

The first throwaway prototype froze the game for 1 s every time it grabbed a frame, and for 6 s on a bad URL ([IPStreamMedia #4](/devlogs/2026/09/14/ipstream_4.html) covers that version). In the real player all of that happens on the decode worker, and opening a stream blocks the game thread for 1.7 ms.

A first measurement puts the latency at about 250 ms from camera to screen, but it's a rough one: the camera filmed a phone clock, which I compared against a PC clock across 25 screenshots from a single run.

The colors needed fixing too. The camera doesn't say which color formula it uses, and FFmpeg falls back to the old SD one (BT.601). Assuming the HD one (BT.709) instead made the colors match VLC.

## Learnings

A few of the things this project taught me:

- **Unreal's Media Framework from the inside**: especially that the "facade", the engine layer sitting between the Media Player and every player plugin, is the one running the show.
- **Threads you can actually stop**: a blocking network read needs a way to be interrupted, and only the FFmpeg library's own callback could reach it.
- **Shipping native libraries in Unreal**: import libraries, delay-loading, staging DLLs in packaged builds, and what the LGPL asks of you.

Next up is a proper latency write-up and a per-stage profile in Unreal Insights, followed by audio. The later phases planned in the repo add two more streaming protocols, SRT and then RTMP. I'm writing about the whole process as I go, starting with [IPStreamMedia #1](/devlogs/2026/08/23/ipstream_1.html).

</div>

_Big Buck Bunny footage © 2008 Blender Foundation, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)._
