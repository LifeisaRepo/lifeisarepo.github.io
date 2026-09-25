# CLAUDE.md — Portfolio Site (life is a repo)

## What this project is

A Jekyll 4.4.1 static site that serves as both a personal devlog and professional portfolio for Sanjyot Dahale, an Unreal Engine developer and technical lead (games, XR, virtual production, GenAI). The site showcases client and personal work while also hosting technical devlog posts. Originally built with AI assistance ("Antrigravity"), the site uses a fully custom dark theme with no frontend framework — just vanilla JS, custom CSS, and Liquid templating.

Live at **https://sanjyotdahale.dev** (custom domain via `CNAME`, served from GitHub Pages).

## Current status

**Redesign largely shipped.** The site now runs the "Runtime Viewport" HUD design: a single-page homepage with a left section rail and seven numbered sections, plus standalone Projects / Devlog / About pages. SEO metadata, sitemap, feed, and privacy-friendly analytics are all live. Ongoing work is refinement rather than rebuild. No specific deadline has been set.

## Key decisions made so far

Decisions visible in the committed code:

- **Custom domain** — `sanjyotdahale.dev` (`CNAME` + `url` in `_config.yml`)
- **Build timezone pinned to `Asia/Kolkata`** — without it GitHub builds in UTC and posts dated 00:00–05:30 IST roll back a day, breaking both the date and the URL
- **Privacy-friendly analytics** — GoatCounter via `_includes/analytics.html`; no cookies, no consent banner. Disable site-wide by removing `goatcounter_url` from `_config.yml`
- **SEO layer** — `_includes/head-meta.html` (canonical, OpenGraph, Twitter card, JSON-LD), plus `jekyll-sitemap`, `jekyll-feed`, `robots.txt`, and Google Search Console verification
  - ⚠️ **Open bug:** `_config.yml` sets `og_image: "/assets/images/og-default.png"`, but that file does not exist. It's the last fallback in head-meta's resolution order (`page.og_image` → `page.image` → `page.cover` → `site.og_image`), so any page without an image of its own emits an `og:image` pointing at a 404. Fix by adding a 1200×630 PNG at that path.
- **Homepage is the hub** — navbar links point at homepage anchors (`#skills`, `#experience`, `#client`, `#personal`, `#about`); only Devlog is a separate destination in the nav

## Active constraints

- **Stack is Jekyll** — any changes must stay within Jekyll's Liquid templating + static output model (no Node/React etc. unless explicitly introduced)
- **Custom CSS only** — no CSS framework (Bootstrap, Tailwind, etc.). Four `.css` files exist on disk but only two are wired up:
  - `style.css` — loaded by **every** page; this is effectively the whole design system
  - `syntax.css` — loaded by `post.html` only (Rouge code highlighting)
  - `home.css`, `projects.css` — **dead**, referenced by nothing since the redesign. Don't add rules to them; they're deletion candidates.
- **Design tokens live in `:root` at the top of `assets/style.css`** — 27 custom properties, all defined in that one block. Surfaces are `oklch()`, accents are hex:
  - surfaces `--bg` `--bg-2` `--surface` `--surface-2`; text ramp `--text` `--muted` `--faint` `--dim` `--ghost`; hairlines `--line` `--line-2` `--line-3`
  - signature accent `--accent: #ff9133` (amber), with `--accent-rgb` for alpha use
  - semantic/functional, intentionally constant: `--live: #43e08a`, `--onair: #ff5a5f`, `--wire: #4dd6e6`, `--c-xr: #a98bff`
  - layout `--maxw: 1180px`, `--gutter: 2.5rem`, `--rail: 56px` (left HUD rail; collapses to `0px` on mobile)
- **Fonts** (Google Fonts, one shared `<link>` per layout): `--font-display` Sansation, `--font-body` Hanken Grotesk, `--font-mono` JetBrains Mono. Bricolage Grotesque is also requested in the font URL but isn't bound to any token — either wire it up or drop it from the URL.
- **No backend** — contact goes to `site.email` / LinkedIn / GitHub (all driven off `_config.yml`); resume is a static PDF at `assets/docs/Sanjyot-Dahale-Unreal-Programmer.pdf`, linked from the navbar, footer, and homepage
- **Projects use `order` frontmatter** for sort order; `order` must be **> 0** to appear. `-1`, `0`, or a missing `order` hides the card.

## Architecture overview

```
_layouts/
  home.html       ← Homepage: standalone full document. The HUD — viewport frame,
                    left section rail, live readout, hero, then 7 sections:
                    01 skills · 02 experience · 03 client work · 04 personal & R&D
                    · 05 devlog · 06 about · 07 contact
  post.html       ← Devlog posts: standalone full document (+ syntax.css, lightbox.js)
  project.html    ← Project detail pages: standalone full document
  default.html    ← Minimal base wrapper. Only 404.html still uses it.

  (home / post / project do NOT extend default — each emits its own <html>,
   and all four pull in head-meta + header + footer + analytics.)

_includes/
  head-meta.html      ← SEO + social metadata: canonical, OG, Twitter, JSON-LD.
                        Purely additive — emits no visible markup.
  header.html         ← Navbar: brand, anchor nav, "open to work" status, resume button
  footer.html         ← Footer links + resume
  analytics.html      ← GoatCounter snippet, gated on site.goatcounter_url
  project-card.html   ← Project card markup; used by projects.html
  about-content.html  ← About copy, shared by about.html and home.html's #about
  carousel.html       ← DEAD. Replaced by the .doc-shot gallery + shared lightbox.
                        Its CSS lived in the now-unreferenced projects.css.

Root pages (about/projects/devlog are layout: null — standalone documents):
  index.markdown  ← layout: home
  about.html      ← /about/
  projects.html   ← /projects/   (full grid, uses project-card.html)
  devlog.html     ← /devlog/     (post index)
  404.html        ← layout: default
  robots.txt      ← templated, emits the sitemap URL

_projects/        ← Jekyll collection (output: true, permalink /projects/:name/)
                    12 projects + TEMPLATE.md
_posts/           ← Devlog entries (7)
_data/
  experience.yml  ← Drives the homepage #experience "commit history" timeline
_briefs/          ← Project intake briefs (input to the write-up system)

assets/
  style.css       ← Global — tokens + the entire component system. Loaded everywhere.
  syntax.css      ← Rouge highlighting; post.html only
  home.css        ← DEAD (unreferenced)
  projects.css    ← DEAD (unreferenced)
  js/
    nav.js        ← Shared header behavior; loaded on every layout
    main.js       ← Homepage-only logic (hero type-on, filters, motion prefs)
    lightbox.js   ← Shared lightbox: zoom, pan, keyboard nav.
                    window.Lightbox.create() → { open(items, index) }
  images/         ← Project images, post cover images
  docs/           ← Resume PDF

Gitignored (present locally, not committed): _site, .jekyll-cache,
  /design_handoff_portfolio_site/, /_career/, *.vsix, /Portfolio_Session_Log.md,
  /_briefs/ (private working notes; the repo is public)
```

## Project frontmatter schema

`_projects/TEMPLATE.md` is the authoritative, fully-commented reference — copy it to start a new project. Summary:

```yaml
# _projects/*.md
layout: project                # REQUIRED — always "project"
title: "..."                   # REQUIRED — page H1 + card title
description: "..."             # REQUIRED — page lede, card blurb, SEO meta description
category: "Professional" | "Personal"   # REQUIRED — routes to #client or #personal
order: 1                       # REQUIRED to be visible; must be > 0

# Header meta
domain: "..."                  # card kicker + accent label above the title
role: "..."                    # renders as the "Role" fact in the detail-page rail
status: "live" | "rnd"         # optional badge — green dot / amber dot
status_note: "..."             # free text after the status, e.g. "live · Meta Quest Store"

# Homepage filtering
filter_tags: "ue5 vr"          # space-separated; valid: ue5 vr cast ai

# Hero media — pick ONE; youtube_id wins if both are set
image: "/assets/..."           # card thumbnail + hero
youtube_id: "..."              # YouTube video ID only, not a full URL

tags: ["UE5", ...]             # pill badges, max 4-5 on the card

# Action buttons — fixed order: [cta_primary] [source] [build] [cta_secondary]
# Each needs BOTH text and url to render.
cta_primary_text / cta_primary_url        # filled accent button (faint "$" prefix)
github_url                                # source button
game_build_url                            # build button (e.g. a Google Drive link)
cta_secondary_text / cta_secondary_url    # trailing outline button

# Sidebar gallery — counts should match
gallery_images: "a.jpg,b.jpg"             # comma-separated paths
gallery_captions: "First::Second"         # "::" separated, same order

# Visibility / indexing
published: false               # hides the file entirely (TEMPLATE.md uses this)
noindex: true                  # optional — keep out of search results
sitemap: false                 # optional — keep out of sitemap.xml
```

Body convention: wrap sections in `<div class="doc-numbered" markdown="1">` for auto-numbered `##` headers (01, 02, 03…). The `markdown="1"` attribute is required or the Markdown inside won't parse.

## Project write-up system

Project articles are written through a defined process, not ad hoc:

- **`_design_system/writeup-guide.md`** — the writer persona + rules (tone, honesty protocol, structure, jargon tiers, voice dial). Sibling of `copy-guide.md`.
- **`_design_system/project-brief-template.md`** — the structured intake Sanjyot fills per project (briefs live in `_briefs/`).
- **`/write-project` skill** (`.claude/skills/write-project/`) — orchestrates: interview until gates pass → draft to root `<slug>.DRAFT.md` → traceability self-check → one automatic pass by the `writeup-critic` agent → present with open questions.
- **`writeup-critic` agent** (`.claude/agents/writeup-critic.md`) — fresh-eyes hiring-manager review; read-only; may never suggest adding facts.

Iron rules: never draft into `_projects/` (it publishes); never invent or smooth over facts (ask or omit); drafts are reviewed via `<!-- DISCUSS n -->` comment tags.

Note: `_design_system/components/`, `_design_system/layout/`, and `_design_system/tokens/` are **stale** pre-redesign HTML swatch pages. They're excluded from the Jekyll build and do not reflect the current design system — `assets/style.css` is the source of truth. Only the four `.md` guides in that folder are current.

## Session log

`Portfolio_Session_Log.md` in this directory is the running discussion history for the redesign project. Append to it after every meaningful exchange — never overwrite from scratch.

It is **local-only**: the repo is public, so the log was untracked and gitignored on 2026-09-25. Never `git add` it back.
