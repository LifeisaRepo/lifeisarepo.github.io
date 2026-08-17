# CLAUDE.md — Portfolio Site (life is a repo)

## What this project is

A Jekyll 4.4.1 static site that serves as both a personal devlog and professional portfolio for Sanjyot Dahale, an Unreal Engine developer and Systems Designer. The site showcases work across Game Development, XR, GenAI, and Virtual Production, while also hosting technical writeup posts. Originally built with AI assistance ("Antrigravity"), the site uses a fully custom dark theme with no frontend framework — just vanilla JS, custom CSS, and Liquid templating.

## Current status

**Active redesign phase.** The initial build is live and functional. The owner now wants to refresh the site with improved navigation, a rethought project showcase layout, and an updated look and feel. No specific deadline has been set.

## Key decisions made so far

_None locked in yet — redesign is in early discussion phase._

## Active constraints

- **Stack is Jekyll** — any changes must stay within Jekyll's Liquid templating + static output model (no Node/React etc. unless explicitly introduced)
- **Custom CSS only** — no CSS framework (Bootstrap, Tailwind, etc.) currently in use; three CSS files: `style.css` (global), `home.css` (homepage), `projects.css` (projects + detail pages)
- **Fonts**: Sora (UI body) + JetBrains Mono (code, tags, badges) via Google Fonts
- **Color palette**: bg `#0f0f12`, primary accent `#00aaff` (electric blue), hero gradient uses `#aa6be8` (purple)
- **No backend** — contact links go directly to email/LinkedIn/GitHub; resume is a static PDF in `assets/docs/`
- **Projects use `order` frontmatter** for sort order; `order: -1` hides a card from the grid

## Architecture overview

```
_layouts/
  home.html       ← Homepage only (hero + skills + latest posts)
  default.html    ← Base for all other pages (header + main.content)
  post.html       ← Devlog posts (extends default)
  project.html    ← Project detail pages (standalone, no default wrapper)

_includes/
  header.html     ← Navbar (Home / Projects / About)
  carousel.html   ← Image carousel + lightbox (self-contained vanilla JS)

_projects/        ← Jekyll collection; each .md = one project card + detail page
_posts/           ← Devlog entries (3 so far)

assets/
  style.css       ← Global: body, navbar, typography, blockquotes, code, about page
  home.css        ← Homepage: hero, skills grid, latest-posts list
  projects.css    ← Projects grid, project detail, carousel, lightbox
  images/         ← Project images, post cover images
  docs/           ← Resume PDF
```

## Project frontmatter schema

```yaml
# _projects/*.md
layout: project
title: "..."
description: "..."      # shown on project card
category: "Professional" | "Personal"
order: 1                # sort order; -1 = hidden
domain: "..."          # discipline/domain tag — card kicker + accent label above the title (e.g. "Mixed Reality · Broadcast")
role: "..."            # your job title on the project — renders as the "Role" fact in the detail-page rail (e.g. "Lead Unreal Engine Developer")
image: "/assets/..."   # hero + card thumbnail
youtube_id: "..."       # optional — embeds YouTube player
github_url: "..."       # optional — shows GitHub link button
game_build_url: "..."   # optional — shows Google Drive button
tags: ["UE 5", ...]    # shown as pill badges
```

## Project write-up system

Project articles are written through a defined process, not ad hoc:

- **`_design_system/writeup-guide.md`** — the writer persona + rules (tone, honesty protocol, structure, jargon tiers, voice dial). Sibling of `copy-guide.md`.
- **`_design_system/project-brief-template.md`** — the structured intake Sanjyot fills per project (briefs live in `_briefs/`).
- **`/write-project` skill** (`.claude/skills/write-project/`) — orchestrates: interview until gates pass → draft to root `<slug>.DRAFT.md` → traceability self-check → one automatic pass by the `writeup-critic` agent → present with open questions.
- **`writeup-critic` agent** (`.claude/agents/writeup-critic.md`) — fresh-eyes hiring-manager review; read-only; may never suggest adding facts.

Iron rules: never draft into `_projects/` (it publishes); never invent or smooth over facts (ask or omit); drafts are reviewed via `<!-- DISCUSS n -->` comment tags.

## Session log

`Portfolio_Session_Log.md` in this directory is the running discussion history for the redesign project. Append to it after every meaningful exchange — never overwrite from scratch.
