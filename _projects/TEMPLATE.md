---
# ============================================================================
#  PROJECT TEMPLATE  —  duplicate this file to start a new project write-up.
# ============================================================================
#  HOW TO USE:
#    1. Copy this file and rename it, e.g. _projects/my-new-project.md
#       (the filename becomes the URL: /projects/my-new-project/)
#    2. DELETE the `published: false` line below — that's what hides this
#       template. Your real project must not have it.
#    3. Set `order` to a number > 0 so the card shows on the homepage.
#       (order: -1 or 0, or a missing order, keeps a project hidden.)
#    4. Fill in the fields. Delete any OPTIONAL field you don't need.
# ============================================================================

published: false          # ← DELETE this line on a real project (keeps template hidden)

layout: project           # REQUIRED — always "project". Don't change.

# ---- Core identity --------------------------------------------------------
title: "Project Name — Short Tagline"   # REQUIRED. Shows as page H1 + card title.
description: "One or two sentences that sum up the project. Used as the page lede, the card blurb, and the SEO meta description."   # REQUIRED.

# ---- Listing & sorting ----------------------------------------------------
category: "Professional"  # REQUIRED — "Professional" or "Personal".
                          #   Professional → "Work" section + back-link to #client
                          #   Personal     → "Personal & R&D" section + back-link to #personal
order: 1                  # REQUIRED to be visible. Lower = earlier. Must be > 0.

# ---- Header meta ----------------------------------------------------------
domain: "Gameplay & Systems" # OPTIONAL. Discipline/domain tag: card kicker + accent label above the title.
role: "Gameplay Programmer"   # OPTIONAL. Your job title on the project; renders as the "Role" fact in the rail.
status: "live"               # OPTIONAL — "live" (green dot) or "rnd" (amber dot). Omit for no badge.
status_note: "Meta Quest Store"  # OPTIONAL. Free text appended after the status,
                                 #   e.g. renders: live · Meta Quest Store. Needs `status` set.

# ---- Filtering (homepage filter buttons) ----------------------------------
filter_tags: "ue5 vr"     # OPTIONAL. Space-separated keywords the homepage filters match.
                          #   Valid values: ue5  vr  cast  ai   (use any that apply)

# ---- Hero media (pick ONE; youtube_id wins if both are set) ---------------
image: "/assets/images/projects/my-new-project/Hero.png"   # Card thumbnail + hero. Recommended.
youtube_id: ""            # OPTIONAL. YouTube video ID only (e.g. 6Z24FtihEgM), not full URL.
                          #   If set, the hero shows an embedded player instead of the image.

# ---- Tags (pill badges) ---------------------------------------------------
tags: ["UE5", "Blueprints", "Standalone VR"]   # OPTIONAL. Shown on the card (max 4–5) and page.

# ---- Action buttons (all OPTIONAL — omit any field to hide its button) -----
#   Buttons always render in this fixed left-to-right order:
#       [ cta_primary ]  [ source ]  [ build ]  [ cta_secondary ]
#   cta_primary is the filled accent button (gets a faint "$" prefix);
#   cta_secondary and the rest are outline buttons. All open in a new tab.
#   The primary/secondary text is fully yours — "Store Page", "Watch Trailer",
#   "Read Paper", "Live Demo", anything. Both text AND url are needed to show.
cta_primary_text: "Store Page"            # leading filled button — your label
cta_primary_url: "https://example.com"    # leading filled button — its link
github_url: ""            # Shows a "⌥ source" button (and a link on Personal cards).
game_build_url: ""        # Shows a "↓ build" button (e.g. a Google Drive link).
cta_secondary_text: "Trailer"             # trailing outline button — your label
cta_secondary_url: "https://example.com"  # trailing outline button — its link

# ---- Sidebar gallery (OPTIONAL — clickable thumbnails + lightbox) ----------
#   gallery_images:   comma-separated image paths.
#   gallery_captions: captions in the SAME order, separated by "::" (double colon).
#   The counts should match; a missing caption just shows no text.
gallery_images: "/assets/images/projects/my-new-project/stills/1.jpg,/assets/images/projects/my-new-project/stills/2.jpg"
gallery_captions: "Caption for the first image::Caption for the second image"
---

<!--
  BODY  —  everything below the frontmatter is your write-up (Markdown).

  AUTO-NUMBERED HEADERS:
  Wrap a section in the <div> below to get the numbered-header styling:
    ##  heading  → auto-numbered 01, 02, 03 …  (resets per wrapper)
    ### heading  → prefixed with a "#" accent marker (not numbered)
    #### heading → plain, no marker
  The `markdown="1"` attribute is REQUIRED — without it, Markdown inside the
  div won't be parsed. Keep blank lines after the opening tag and before </div>.
  Content OUTSIDE the wrapper renders as normal, un-numbered Markdown.
-->

<div class="doc-numbered" markdown="1">

## Overview

Open with the short version: what the project is and why it mattered. One to
three tight paragraphs. **Bold** the phrases that carry the point.

### Project Details
- **Engine**: e.g. Unreal Engine 5
- **Platform**: e.g. Meta Quest 3
- **Team Size**: e.g. 7
- **Duration**: e.g. 2 months

## What I Built

Walk through the actual work — the problems, the decisions, the things that
were new territory. This is the heart of the write-up.

#### A finer point
Use a level-4 heading (no marker) for small sub-points under a section.

## Key Achievements

- Lead with outcomes and numbers where you have them (e.g. 40 → 72 FPS).
- Keep each bullet to one clear, concrete result.
- Note what you owned versus what the team did.

</div>
