# Portfolio Session Log

Running discussion history for the portfolio redesign project. Newest entries at the bottom. Do not overwrite — append only (minor edits to older entries are fine for accuracy).

---

## Session 1 — 2026-06-21

### Initial briefing & codebase audit

**User's intent:**
Sanjyot wants to refresh his Jekyll portfolio site ("life is a repo"). Three goals were stated:
1. Easier navigation
2. Better project showcase presentation
3. Updated look and feel

He built the original site a few months ago with AI assistance ("Antrigravity") and is happy with it as a starting point but wants a meaningful refresh — not just a tweak.

**What was established about the current site:**

- **Stack**: Jekyll 4.4.1, custom dark theme, vanilla CSS + JS, no frontend framework. Hosted on GitHub Pages (`lifeisarepo.github.io`).
- **Pages**: Home, Projects, About, 404.
- **Design system**: Dark bg (`#0f0f12`), electric blue accent (`#00aaff`), purple hero gradient (`#aa6be8`), Sora + JetBrains Mono fonts, glassmorphism cards.
- **Projects collection** (`_projects/`): 11 entries spanning Professional and Personal categories. Project cards show a thumbnail, title, description, and tech tags. Clicking opens a detail page with a hero image, optional YouTube embed, body content, and an image carousel with lightbox.
- **Devlog posts** (`_posts/`): 3 entries so far.
- **Key custom component**: `_includes/carousel.html` — a self-contained image carousel with dot navigation and a click-to-fullscreen lightbox, all in vanilla JS.
- **CSS structure**: Three files — `style.css` (global), `home.css` (homepage), `projects.css` (projects + detail + carousel).

**Files created this session:**
- `CLAUDE.md` — project context file for future AI sessions
- `Portfolio_Session_Log.md` — this file

**What has NOT been decided yet:**
- Exact font choices (user wants a full refresh — current Sora + JetBrains Mono are out)
- Specific color palette changes (dark theme is confirmed, accent TBD)
- Exact layout/section order for the single-page redesign

---

### Visual audit — live site (lifeisarepo.github.io)

Screenshots taken via Playwright/Chromium at 1440px desktop and 390px mobile. Key observations:

**Home page**
- Hero background image (HeroTitle.png — a collage of project screenshots) is almost completely hidden by the dark gradient overlay. The image asset is wasted.
- "Hi!" title and subtitle text are readable and the fade-in animation works.
- CTA buttons ("View Projects", "About Me") are small outline buttons that blend into the hero — low visual impact.
- Skills section ("CORE TECHNOLOGIES") is extremely low contrast; the label and tag text are barely legible — intentional but may be too subtle.
- "Latest Devlogs" at the bottom: plain text links with dates only, no visual interest.

**Projects page**
- Two-column grid (at 1440px). Cards look clean with glassmorphism + blue hover glow.
- Professional and Personal sections are separated only by a subheading — easy to miss mid-scroll, no other visual break.
- No filtering, no sorting UI. Just one long vertical scroll.
- Card image thumbnails (200px height) work but all cards feel the same weight regardless of project importance.

**About page**
- Centered, readable layout. Content is good (bio, Liminal reference, SMPTE paper).
- "SD" initials circle feels like a placeholder rather than a deliberate design choice.
- Very sparse — minimal personality for a personal site.
- "Resume" button is visually distinct (blue highlight) which works.

**Project detail page (Riddler's Ransom)**
- Strongest page on the site. Hero image + overlay title, YouTube embed, body content, carousel, and tech tags all flow well.
- The carousel/lightbox works correctly.
- This is the best template to build from for the redesign.

**Mobile (390px)**
- Navbar: "Sanjyot Dahale" wraps to two lines because no hamburger menu exists — looks broken.
- Hero adapts fine. Skills grid becomes two loose columns, takes a lot of vertical space.
- No mobile-specific navigation solution in place.

**Overall verdict:**
The design system (dark theme, blue accent, Sora + JetBrains Mono fonts) is solid and worth keeping. The main weaknesses are: (1) hero image wasted behind opaque gradient, (2) no mobile nav / navbar wraps, (3) projects page lacks visual pacing and differentiation between sections, (4) About page is too sparse.

### Design direction locked in by user

**1. Identity — Games Programmer first**
The site needs to lead with the fact that Sanjyot is a games programmer. That identity should be felt in the aesthetic, the tone of copy, and how work is presented — not just mentioned in text.

**2. Personality — Human and fun, not AI-ish**
The current site reads as clean and competent but cold and generic. The redesign needs warmth and personality. "Fun without being show-offy" — avoid gimmicks, but let a human voice through.

**3. Architecture — Single-page scroller**
Collapse the current multi-page structure into one long scrollable home page containing:
- Hero
- Projects (cards, not the current dedicated /projects page — that can go away or redirect)
- About / bio
- Contact / links
Each project still gets its own detail page (current /projects/:name URLs stay).
Motivation: recruiters shouldn't have to click around; everything important should be one scroll away.

**4. Fonts — Full refresh**
Current Sora + JetBrains Mono are rejected. User wants a completely different font pairing. Nothing chosen yet — to be discussed.

**5. Dark theme — Non-negotiable**
Dark mode stays. It's core to the developer identity.

**Correction after real Chrome inspection (supersedes Playwright observations above):**
The hero background image is actually visible and compelling in real Chrome — the Playwright screenshots over-compressed it. The collage of project screenshots (cricket simulation, Riddler's Ransom, architectural viz) makes for a strong hero backdrop. The project cards also look significantly better with vivid real images. Revised issue list:
1. **Latest Devlogs** (homepage) — still the weakest section: plain title + date rows, no visual treatment, just floats at the bottom
2. **Professional → Personal transition** (projects page) — just a heading, easy to miss mid-scroll; no visual separator or pacing
3. **Personal projects** — only 2 cards, which makes this section feel thin
4. **About page** — the centered bio text is a long wall when centered; the SD avatar is generic but not as bad as it looked compressed; no footer on the page (site just ends)
5. **No footer anywhere** — all pages end abruptly with no footer
6. **No mobile hamburger menu** — confirmed still absent

---

## Session 2 — 2026-06-23

### Context carry-over

This session continued implementation from a previous context that ran to the limit. Sanjyot returned from Claude Design with a complete "Runtime Viewport HUD" design handoff in `design_handoff_portfolio_site/`. The previous context had already decided all key design direction questions (amber accent, Bricolage Grotesque + Hanken Grotesk + JetBrains Mono fonts, tweaks panel kept until deployment, "gameplay programmer" wording) and had begun implementation.

### What was implemented this session

All remaining implementation tasks were completed, resulting in a full Jekyll port of the Runtime Viewport HUD design.

**`_layouts/home.html`** — Full single-page Liquid template. 7 sections (Hero, Skills, Experience, Client Work, Personal R&D, Devlog, Contact) with vp-frame corners, left section rail (7 anchor links + scroll progress bar), bottom-right live readout (FPS / SMPTE timecode / resolution), and tweaks panel. Liquid loops driven by `site.data.experience`, `site.projects` (filtered by category and order), and `site.posts`.

**`assets/js/main.js`** — All inline JS extracted from the handoff's `index.html` into a standalone file. Covers: mobile nav toggle, hero role type-on animation, live FPS/timecode/resolution readout via `requestAnimationFrame`, client work filter + collapse (6 cards default), IntersectionObserver scroll reveal, left rail progress + section spy, tweaks panel state (localStorage), brand typewriter.

**`_layouts/project.html`** — Rewritten. YouTube embed or hero image, 2-col grid with markdown body and sticky aside facts panel. CTA buttons for GitHub and build links.

**`_layouts/post.html`** — Devlog post layout with author strip, 2-col grid, and auto-generated sticky TOC sidebar (JS-built from h2 elements, scroll-spy).

**`_layouts/default.html`** — Minimal base layout for any future inner pages using the new design tokens.

**`devlog.html`** — Devlog listing page at `/devlog/` with empty state.

**`about.markdown`** — Converted to `<meta http-equiv="refresh">` redirect to `/#about`.

**`projects.html`** — Redirect stub at `/projects/` → `/#client`.

**`_config.yml`** — Added `exclude:` block for design handoff, session log, CLAUDE.md, and _design_system.

### Build status

`bundle exec jekyll build` completes cleanly — no Liquid errors, no conflicts.

### Still pending (before deployment)

- **Tweaks panel removal** — `#tweaks` div in `_layouts/home.html` and its CSS in `style.css` should be removed before going live.
- **Hero visual** — `.hero-visual` placeholder needs either a photo or YouTube showreel embed.
- **Content review** — skills chips, project descriptions, and experience bullets were inferred; Sanjyot should review for accuracy.
- **Devlog posts** — `_posts/` is empty; the "coming soon" placeholder shows until first post is added.
- **Old CSS files** — `assets/home.css` and `assets/projects.css` can be deleted (no longer referenced).

---

## Session 3 — 2026-06-26

### Copywriting pass — continued from Session 2

**Sections completed and applied to `_layouts/home.html` this session:**
- Skills subtitle — revised again mid-session. Final: "Most of the range here came through production work — a brief landed in a new domain, and the skills followed." Sanjyot removed the closing line ("That's just how the years stacked up") himself.
- Personal & R&D subtitle — locked: "The scope here is mine to define and goes as far as the problem needs. These exist because something — a mechanic, a system, an architecture question — felt worth following all the way to a working implementation." Em dashes kept intentionally.
- "Shipped under fire." title — reviewed and kept.
- Hero `.hl` span — applied to "games, XR, and real-time production pipelines." Bold removed from `.hl` CSS (was `font-weight: 700`).
- All four banked sections applied to `home.html` and verified in browser.

**About section — in progress (not yet applied):**
Sanjyot shared his own draft (`aboutme.txt`). Key decisions made:
- Do NOT rebuild from scratch — tune his original draft, maintain its soul
- Origin story (age 14) — explicitly rejected by Sanjyot, feels emotionally overloaded
- MR Cricket and 360 VR Broadcast MAY be named in the About — they are landmark R&D projects demonstrating out-of-domain capability. One "outside my domain" line is acceptable here since the rest of the site has been neutralised.
- "think outside the box", "as per client spec", "staying up-to-date with the game dev scene" — all to be removed
- Don't reuse copy patterns from the rest of the site — the About should feel original and personal
- Don't close with an explicit job ask

**Remaining:**
- About section body (3 paragraphs) — resuming next session
- Contact section

---

## Session 4 — 2026-06-27

### About section body — completed and applied

Worked the About body paragraph-by-paragraph, in chat, tuning Sanjyot's own `aboutme.txt` draft rather than generating full variants. He edited in his own voice between turns; the work was targeted word-replacement and structural unsticking.

**Key decisions made this session:**
- **P1** split the long second sentence at the role change ("...Virtual Production Supervisor role. There I helped clients..."). Dropped "professional journey" (LinkedIn-y) and the doubled "involved."
- **P2** locked the present-tense framing — Sanjyot is *still* the technical lead, and the VP Supervisor role grew naturally into it at the same place, so "I now lead" carries the progression. The named-projects line stays career-wide ("projects like the MR Cricket Analysis and the 360 VR Broadcast"), positioned as *examples* of boundary-pushing work, not as trophies. Fixed "pushed me think" grammar, killed "think outside the box."
- **P3** lands the game-dev throughline. Sanjyot flagged he hasn't shipped a personal *game* yet — reworked to "prototypes in my own time to explore new systems and mechanics" (accurate, not inflated). Closing softened to "the kind of work I'd like to be doing more of" — an indirect hint at wanting a game studio, no explicit job ask.

**Rejected this session:**
- A hiring-manager-optimized rewrite with punchy paragraph-closers ("Both shipped.", "The next step is a game studio.") — Sanjyot found it cringe/try-hard. Confirmed staccato closers read as performative here.
- Direct/dramatic closing lines generally — the soft trailing ending is the right register.

**Applied to files:**
- `_layouts/home.html` — replaced the old `.about-body` (which still had the killed "go learn the stack, wire the systems, and ship it" / "figure-it-out" refrain) with the three approved paragraphs.
- `_design_system/copy-guide.md` — added the full About section entry with reasoning.
- Facts panel beside the About was left unchanged (structured data, no contradiction).

**Remaining:**
- Contact section (heading + body) — only copy section left.

**Also done this session (same day, continuation):**
- Replaced the 5-item `.facts` panel beside the About body with a portrait photo + slim 2-row meta strip (Focus: Gameplay & Systems · Based in: Mumbai, India · open to relocation). Photo lives at `assets/images/about/sanjyot.jpg`. New classes: `.about-portrait`, `.portrait-frame`, `.pf-corner` (amber corner ticks matching the vp-frame aesthetic), `.portrait-meta`, `.pm-row`, `.pm-k`, `.pm-v`. Old `.facts`/`.fact` CSS left intact — still used by `project.html`. Portrait aspect ratio: `1/1` (square).


---

## Session 5 — Contact section copy (2026-06-27)

The last remaining copy task. Closed it out.

**Direction:** Sanjyot wanted the contact section to break the dry-technical register the rest of the page holds, in favour of something plainly warm and humble. Reference points he gave: "Let's Connect / I'm actively seeking opportunities..." and "Hey you! / I'm open to joining a team or jumping into a collab." Also asked to add explicit game-development specificity to the role.

**Approved and applied (E+):**
- eyebrow: "open to work"
- h2: "Let's build **something together.**" (highlight on "something together.")
- body: "I'm looking for a full-time role in game development, and I'm always open to a good collaboration. If you're working on something and think I'd fit, I'd love to hear from you."

**Process this session:** Generated dry-wit variants first (rejected — too performative for the contact moment), then plain/humble variants matching his references, then added game-dev + full-time specificity. Tried E+ and F+ live in the file to compare on the page; settled on E+.

**F+ kept as backup** (not applied): h2 "Building a game?" / body "I'm open to joining a game dev team or teaming up on an idea. Drop me a line — the inbox is the fastest way to reach me." Flagged that F+'s body uses an em dash, which we avoid site-wide.

**Killed:** the old contact heading "Need a games programmer who *figures it out?*" — the exact "figured it out" refrain banned everywhere except the one About line.

**Applied to files:**
- `_layouts/home.html` — replaced the contact eyebrow/h2/body (lines ~645-653).
- `_design_system/copy-guide.md` — added the full Contact section entry; updated footer note to "All home-page sections now have approved copy."

**Status:** All home-page copy sections are now done. Copy initiative complete.

---

## Session 6 — project.html fixes: carousel → gallery + aside screenshots (2026-06-27)

Worked the project detail page against the Claude Design reference at `design_handoff_portfolio_site/design/project.html`.

**Audit findings (what was broken):**
1. **Carousel had no CSS on project pages.** Project bodies still called `{% include carousel.html %}`, but its styles lived in the now-unreferenced `assets/projects.css`. The new `_layouts/project.html` loads only `style.css`, so the carousel + lightbox rendered completely unstyled. 8 projects affected (7 active + `coming-soon`, whose include is commented out).
2. **Aside screenshot slot was a near no-op** — only rendered when a project had *both* `image` and `youtube_id`, and just re-showed the hero image.
3. (Noted, not actioned) Some project bodies carry a `### Project Details` list that duplicates the facts panel — content cleanup for a later pass.

**Decisions (asked Sanjyot):**
- Carousel fix → **replace the carousel with a native `.doc-shot` gallery** (not re-link projects.css, not just port CSS).
- Scope → **carousel + aside screenshot**.

**What was implemented:**
- **`_includes/gallery.html`** (new) — drop-in replacement for `carousel.html` with the same `images=` / `captions=` param interface. Renders a `.doc-gallery` 2-col grid of `.doc-shot`-styled tiles (real images at full opacity, monospace caption scrim, hover "◢ view" gizmo). Keeps a shared fullscreen **lightbox** (the genuinely useful part of the old carousel) — click/Enter to open, prev/next, Esc/arrow-key nav, single shared overlay built once via JS. Keyboard-accessible tiles (`tabindex`/`role=button`).
- **`_layouts/project.html`** — added gallery + lightbox CSS to the inline `<style>` block (alongside the other `.doc-*` rules). Reworked the aside: now loops an optional **`aside_shots`** frontmatter list into `.doc-shot` tiles; falls back to the old youtube+image behaviour when `aside_shots` is absent.
- **7 active project `.md` files** — swapped `{% include carousel.html %}` → `{% include gallery.html %}` (riddlers-ransom, mr-cricket-analysis, bow-arrow-mechanics, aura_gas, ue_gemma, ai-for-fashion, montra-electric). `coming-soon.md` left as-is (commented).
- **`riddlers-ransom.md`** — populated `aside_shots` with two stills (1.jpg, 5.jpg) as the worked example of the new aside.

**Verified:** `bundle exec jekyll build` clean (no Liquid errors). Rendered `_site` confirms gallery tiles + lightbox markup on YouTube and image-only projects; Riddler's aside renders two screenshot tiles. `carousel.html` and `projects.css` are now fully unused by the new layouts (left in place, not deleted).

**Remaining / follow-ups:**
- `assets/projects.css` + `assets/home.css` + `_includes/carousel.html` are now dead — candidates for deletion (deferred; Session 2 already flagged the CSS files).
- Body-content cleanup (the `### Project Details` duplication vs. the facts panel) still open.

### Revision (same day) — all images moved into the aside

Sanjyot reviewed and decided the Claude Design reference doesn't want in-body images at all: **all** project images should live in the aside panel only, still clickable into the fullscreen lightbox, and captions should appear **only on hover** (he liked the bottom-caption style).

Re-architected accordingly — the image data moved from inline includes into **frontmatter** so the layout controls aside placement:

- **Frontmatter schema** — added `gallery_images` (comma-separated paths) and `gallery_captions` (`::`-separated) to the 7 gallery projects. The strings are the *exact* same values the old include calls used, just relocated and quoted (low-risk move, no per-item retyping). Replaced the short-lived `aside_shots` field (only riddlers had it) with this richer pair.
- **`_layouts/project.html`**:
  - Aside now loops `gallery_images`/`gallery_captions` into clickable `<figure class="doc-shot">` tiles (img + hover `◢ view` gizmo + `figcaption.cap`), keyboard-accessible (`tabindex`/`role=button`/`aria-label`).
  - `.doc-shot` CSS rewritten: full-opacity image, amber hover border + lift, and the caption scrim **hidden by default, fades up on hover/focus**. Removed the old decorative `opacity:0.55` placeholder styling and the unused `.doc-shot .lbl`.
  - Removed the in-body `.doc-gallery` grid CSS (no longer used).
  - Lightbox JS **moved out of the include and into the layout** (runs once per page, groups all `.doc-shot[data-src]` tiles; click/Enter to open, prev/next, Esc + arrow nav).
- **7 project `.md` files** — removed the inline `{% include gallery.html %}` blocks; bodies are now pure writeup. (ai-for-fashion also lost its now-orphaned "Following are some results…" lead-in line.)
- **Deleted `_includes/gallery.html`** — fully superseded by the layout-driven aside.

**Verified:** clean `jekyll build`. Rendered `_site` confirms aside tile counts match each project's image count (riddlers 3, bow-arrow 5, ai-for-fashion 3, mr-cricket 4), figcaptions present, emoji/apostrophe captions intact, no `doc-gallery` left in any body.

**Updated follow-ups:**
- New project-gallery schema is `gallery_images` + `gallery_captions` in frontmatter (document in CLAUDE.md schema block when convenient).
- `assets/projects.css`, `assets/home.css`, and `_includes/carousel.html` remain dead and deletable.

### Revision 2 (same day) — sticky image rail

Sanjyot asked for the aside images to be sticky too (not just the facts panel). Wrapped the whole aside (facts + image tiles) in a new sticky `.doc-rail` container (`position:sticky; top:90px`) and moved the sticky off `.doc-aside`. Capped the rail at `max-height:calc(100vh - 110px)` with `overflow-y:auto` + a thin custom scrollbar, so tall stacks (e.g. bow-arrow's 5 tiles) stay fully reachable via internal scroll instead of getting cut off. Facts panel and tiles get `flex-shrink:0` so the aspect ratios hold. Mobile (`max-width:760px`) resets the rail to static/visible. Clean build verified.

**Bugfix (immediately after):** the rail wasn't moving at all — it sat static at the top and scrolled away with the page. Cause: `.doc-grid` uses `align-items:start`, so the `<aside>` grid item was only as tall as the rail itself → a `position:sticky` element needs its containing block to be *taller* than it to have any travel room, and there was none. (It worked before the rail wrapper only because the loose image tiles gave `<aside>` extra height for the sticky facts panel to travel within.) Fix: `.doc-grid > aside { align-self:stretch; }` so the aside stretches to the full body-height grid row, giving the sticky rail room to move. NOTE: not yet visually confirmed in-browser — the Claude Chrome extension was disconnected at the time, so Sanjyot needs to verify on localhost:4000 (recommended page: MR Cricket Analysis, long body).

---

## Session 7 — Mobile pass (2026-06-27)

Sanjyot tested the live site on his phone (Chrome Android) and filed `mobile_view_issues.txt`. We discussed feasibility + agreed two design forks via AskUserQuestion before executing: **keep the hero vertically centered** (reduce slack, don't top-align) and **sync the vp-corners via the VisualViewport API** (not hide them). Guiding constraint throughout: do not regress the desktop/large-screen UX. Implemented all six items; five are inherently mobile-scoped (media queries / touch-gating), so desktop is structurally protected.

**Tweaks-panel mobile toggle (precursor, same session):** added a floating gear button (`.tw-fab`) created in `main.js` and styled in `style.css`, shown only on `(hover:none) and (pointer:coarse)`, so the dev tweaks panel can be opened on a phone without the backtick key. Stays in sync with all toggle paths.

**Homepage**
1. *Hamburger ↔ navbar gap* — added `margin-top:-1px` to the mobile `.nav-links` dropdown to pull it flush under the 58px navbar. Pixel-level; needs on-device confirm.
2. *Work layout cards-on-mobile / list-on-desktop* — desktop default flipped to `list` (`home.html` body + `#projGrid`, and `main.js` tweak default). All `.proj-grid[data-layout="list"]` rules **gated behind `@media (min-width:721px)`**, so phones fall back to the base card styling automatically regardless of the attribute. Removed the now-redundant mobile list overrides. Desktop list look unchanged. (Note: persisted `liar_v2_tweaks` localStorage on a device can still force `cards` during dev; the deployed default is `list` once the panel/JS are stripped.)
3 & 4. *Hero top gap + last-line→cue gap* — root cause is the full-height (`100vh-58`) hero with vertically-centered content, so the gaps are centering slack, not padding. Kept centering; on mobile trimmed `min-height` to `calc(82svh - 58px)`, padding to `3.25rem 0`, and `.hero-scroll` bottom to `1.25rem`. svh also stabilises the hero against URL-bar resize. **First-pass values — tune live with Sanjyot** (knobs: the `82svh` and the paddings).
5. *vp-corners lagging the browser chrome* — **RESOLVED by hiding, not syncing.** First attempt: a shared `assets/js/vpframe.js` using the `visualViewport` API (resize/scroll, later hardened with window `scroll` + rAF) to track the visual viewport. On Sanjyot's device it never tracked smoothly — Chrome Android doesn't update `visualViewport.height` progressively during the URL-bar/island animation, so the corners still snapped. Per his call, **dropped the JS entirely** (deleted `vpframe.js` + its script tags from all 4 layouts; no more `visualViewport` usage anywhere) and **hid `.vp-frame` on phones** via `display:none` in the `≤720px` media query. Desktop frame unchanged. Net: no jitter, no extra JS.

**Projects**
1. *Lightbox arrows → swipe on mobile* — `.lightbox-btn` hidden via `@media (hover:none) and (pointer:coarse)` (with `!important` to beat the JS inline `display`), and added touchstart/touchend swipe (>45px horizontal, dominant-axis) to the lightbox in `project.html`. Desktop keeps arrows + keyboard nav.

**Verified:** clean `jekyll build`, both JS files pass `node --check`, `vpframe.js` present on home + project output, `data-layout="list"` in home output, `min-width:721px` gate in compiled CSS.

**Needs Sanjyot's on-device confirmation (couldn't drive the phone myself):** nav-gap flushness (#1), hero spacing feel + exact values (#3/#4), vp-corner sync smoothness (#5), and lightbox swipe (Projects #1). New file `mobile_view_issues.txt` can be ticked off / kept for the next round.

---

## Session 8 — Project detail page design pass (2026-06-27)

Focused entirely on `_layouts/project.html` (the project detail page) plus a reusable template. Reference throughout: `design_handoff_portfolio_site/design/project.html` (Claude Design handoff). User noted only two things still differed from that mock — the editable status badge and the numbered-header system — both now built. All work verified via clean `jekyll build`.

**1. Wider doc-body.** Project body felt cramped on large displays vs the devlog. Bumped `.doc { max-width }` 860px → **1140px** (matches `post.html`). Removed the `max-width:680px` cap on `.doc-lede` and switched `text-wrap:balance` → **`pretty`** (balance was equalising line lengths and making short descriptions look artificially narrow). Title was already full-width.

**2. Editable status badge.** New optional frontmatter `status_note`. The badge keeps its status-driven dot color (`live`=green / `rnd`=amber) and appends `· {{ status_note }}` → e.g. `live · Meta Quest Store`. Omit it → plain badge as before. Wired into riddlers-ransom.

**3. Auto-numbered headers (opt-in wrapper).** Pure CSS counters, no JS, scoped to a wrapper so it's sectional/opt-in (user's choice over "all h2 automatically"). Authoring: wrap markdown in `<div class="doc-numbered" markdown="1"> … </div>` (the `markdown="1"` is required — kramdown won't parse markdown inside a raw div otherwise; config has no global `parse_block_html`). Behavior: `h2` → `01, 02…` via `counter(docsec, decimal-leading-zero)` accent-mono prefix; `h3` → a `#` accent marker (user picked a programming symbol over alphanumeric, then later the linter/user set it to `#`); `h4`+ → plain. Counter resets per wrapper (so one continuous sequence = one wrapper). Demonstrated by restructuring the riddlers-ransom body (prose preserved, headers promoted).

**4. Themed + super-thin aside scrollbar.** The sticky `.doc-rail` spawns a scrollbar when image tiles overflow. Made it **4px** with an accent-blue thumb (`rgba(var(--accent-rgb),0.3)`, hover `0.55`), transparent track. KEY GOTCHA: in Chromium 121+, setting the standard `scrollbar-width`/`scrollbar-color` switches the element to native scrollbar rendering and **ignores all `::-webkit-scrollbar` rules** — so the color applied but width wouldn't shrink. Fix: removed the standard props from the base rule (lets webkit pseudo-elements drive exact 4px in Chrome/Edge/Safari) and re-added them **inside `@supports (-moz-appearance:none)`** (Firefox-only; false in Chromium so it doesn't re-poison the webkit path). Firefox floor is `thin` (~8–10px) — true 4px is Chromium/WebKit-only, documented as a hard limitation.

**5. Project template — `_projects/TEMPLATE.md`.** User wanted a duplicate-to-start file documenting all the frontmatter we've accumulated, hidden from the site. Used **`published: false`** (fully inert — no page generated, never in `site.projects`; verified not in `_site/`). Header has a 4-step "how to use" (rename → delete the `published:false` line → set `order > 0` → fill fields). Every field documented inline (REQUIRED/OPTIONAL), incl. the `filter_tags` valid values (`ue5 vr cast ai`), `image` vs `youtube_id`, and the `gallery_images` (`,`) vs `gallery_captions` (`::`) separators. Body pre-stubbed with the `doc-numbered` wrapper + heading-level guide. (Hiding mechanism context: homepage loops filter `p.order > 0`; `projects.html` is just a redirect to `/#client`.)

**6. Dynamic optional CTA buttons.** The design's two end-of-body buttons ("store page" filled / "trailer" ghost) are now optional with fully custom text+url. New frontmatter: `cta_primary_text`/`cta_primary_url` (leading, `btn-primary`) and `cta_secondary_text`/`cta_secondary_url` (trailing, `btn-ghost`). Fixed render order regardless of which are set: **`[cta_primary]  ⌥ source  ↓ build  [cta_secondary]`**. Each shows only if both its text+url are present; all `target="_blank"`. Decisions via AskUserQuestion: match-the-design styling, no extra icons ("exactly like the reference" — note the filled `btn-primary` already gets a faint `$` prefix from `.btn-primary::before` in style.css, which IS the reference look), emphasis-based field names. Documented in TEMPLATE.md; demonstrated on riddlers-ransom (store page + trailer).

**Note:** `mobile_view_issues.txt` is now considered redundant by the user (superseded) — ignore it going forward.

**Not yet visually confirmed in-browser this session** — all changes build clean and HTML output was grepped to confirm structure (button order/classes, numbered headers, template excluded), but no live localhost eyeball. Recommended check page: Riddler's Ransom (exercises every new feature).

---

## Session 9 — Write-up critique, MR Cricket rewrite, write-up system (2026-06-29 → 2026-07-04)

**1. Hiring-manager critique of all `_projects/` write-ups.** Key findings: professional write-ups were "manager voice" outcome-lists with no engineering reasoning; unearned numbers ("up to 70%"); personal projects carried the real technical substance; **`aura_gas.md` body is a copy-paste of `ue_gemma.md`** (still to be fixed — Sanjyot will write the real GAS article); recurring typos ("Assualt", "upto", "one my first").

**2. Career positioning clarified (drives all future copy).** Sanjyot targets **systems/tools/engine roles → Technical Director track**, NOT gameplay programming. Games-first, engine-as-primary-stack; open to adjacent real-time fields but explicitly NOT interested in on-set VP, web dev, or GenAI work. Strategy settled: professional projects = breadth + architectural judgment (spine: "game-engine tech applied to hard real-time, ship-or-die problems"); personal projects = hands-on depth. Honest ownership framing over inflated verbs, always.

**3. MR Cricket deep-dive + rewrite (`mr-cricket-analysis.DRAFT.md` in repo root, v2, approved in tone).** Multi-day interview captured in `MR_Project_Answers_For_Claude.md`; SMPTE paper (`Paper.pdf`, SMPTE Motion Imaging Journal Jul/Aug 2024, authors Mishra/Ranjan/Dahale) verified — Sanjyot's owned camera-sync subsystem (anchor-based HoloLens↔Mo-Sys alignment, no headset on cameras) is the paper's central novelty. Truth corrections baked in: stock UE replication (not custom netcode); pre-recorded segments (never live-to-air); "70%" was an estimate → replaced with concrete numbers (~25→~125 trajectories @50FPS; crash rate ~10–15%→0; reliability ~50%→~80%); 3 generations (v1 Oct 2021 UE4.26 single-PC hack, v2 2022 UE4.27 BP multiplayer, v3 Jan–Jun 2024 C++ port; no 2023 edition — VR broadcast year); Hawkeye feature was another engineer's (Rajesh), built on Sanjyot's architecture. Draft v2 fixed Sanjyot's 15 DISCUSS notes: de-cockified (cut significance-editorializing), glance-first ~150-word Overview, broadcast jargon glossed, roles-not-names credits. Pending: final read-through, then move into `_projects/`.

**4. Write-up system built** (see CLAUDE.md "Project write-up system"): `_design_system/writeup-guide.md`, `_design_system/project-brief-template.md` (briefs → `_briefs/`), `/write-project` skill, `writeup-critic` agent. Decisions: writer lives in main loop (sub-agents can't interview), critic is a one-shot sub-agent (auto, single pass), one guide covers both registers via voice dial (professional exemplar: MR Cricket v2; personal: ue_gemma). Core insight encoded: article quality comes from the interrogation (challenge-the-brief, traceability, number provenance), not from style mimicry.

**Open items:** Aura GAS article (brief + first `/write-project` run); rewrites of remaining projects; MR Cricket draft final read → move into `_projects/`; typo pass on other project files.

**Em-dash ruling (resolved 2026-07-04):** limit, not ban. Long-form articles: structural paired asides/lists only, max one per paragraph, never as a clause connector; frontmatter descriptions and homepage copy get none. Encoded in `writeup-guide.md`; MR Cricket draft v2 cleaned from ~19 em dashes down to 3 structural ones.

---

## Session 10 — Riddler's Ransom /write-project stress test (2026-07-06)

First real run of the skill (brief: `_briefs/riddlers-ransom-brief.md` → `riddlers-ransom.DRAFT.md` v1). Sanjyot's verdict on v1, all confirmed: padded to fit the MR Cricket silhouette (~900 words for a part-time side project); "It shipped." staccato closer (a pattern copy-guide history explicitly rejects); duplicate ownership sections ("What I Owned & Decided" spine AND "What I Owned"); defensive tone (the "I wrote no code" boundary restated 4×).

**System fixes applied:**
- `writeup-guide.md`: length-is-earned rule (sections are a menu, not a quota); *disclaim once* rule (ownership boundary stated exactly once; negative space max one sentence per article); *no key phrase twice*; never-two-ownership-sections; staccato closers + repeated disclaimers added to banned-moves table; **focus dial** (me-forward vs project-forward — project-forward for thin-ownership projects, judgment shows through the story).
- Brief template §8: now three dials — Register, Focus (me/project-forward), Size (full/compact).
- `writeup-critic`: new tests 8 (defensiveness — count the "I didn't" statements) and 9 (repetition & padding, incl. duplicate sections = HIGH); staccato closers + subtle verb upgrades ("myself" where brief says "with the team") added to cocky test.

**Decisions:** Sanjyot's candid low opinion of the shipped game stays OFF the public page (brief §6 honesty is interview material); platform reasoning softened to audience-fit. Riddler's rewritten as draft v2: compact (~600 words), project-forward, one ownership statement (in Overview), 3 achievement bullets, jam→store narrative spine.

**Traceability catch for Sanjyot:** brief says team = 2 programmers + 3 creatives + him = **6**; old live page and draft v1 said **7**. Flagged in v2's draft comment. Also: v1's "I ran QA myself" softened to "alongside the team" per brief.

*(Later resolved: Riddler's team = 7 total, Sanjyot + 6 part-timers with fluid roles; draft + brief updated. Also added the "claim once, then describe" rule to the guide — once ownership is claimed in the Overview or a bullet, body paragraphs drop "I" and describe the work; DISCUSS tags can override.)*

---

## Session 11 — Montra /write-project run: the AI-tells round (2026-07-07)

Second skill run (brief: `_briefs/montra-electric-brief.md` → `montra-electric.DRAFT.md` v1). Better than Riddler's v1 — interview ran, provenance rule correctly turned "~40% [measured but don't remember exactly]" into qualitative wording, haptics honestly framed as built-but-cut. Sanjyot's theme for the remaining failures: "sounds more like AI than human."

**New failure classes found and encoded:**
- **Printed denial** (worst offender, ×2: "It all runs on Unreal's standard replication."): the writer imported a correction note from the brief's "didn't do" list as publishable copy. New guide rule *Corrections aren't content* — the fix for an overclaim is silence, not a printed denial.
- **Dramatized rationale**: draft justified the time-trial call with "hold for three days in front of a crowd" instead of the brief's real reasons (small team, <2 months, no vehicle-physics experience). New guide rule *Real reasons only*; critic traceability now covers *stated reasons*.
- **Bow-tie closers**: paragraph-final sentences that add no fact. New guide rule *End on information* (generalizes the staccato ban).
- **Number fabrication**: brief says 1,000+ players; Overview printed it right, a Key Achievements bullet said "2,000". Critic + skill self-check now cross-check every number against the brief AND against every other occurrence in the draft (drift = HIGH).
- **Malformed file**: v1 placed the draft comment BEFORE the frontmatter and dropped the opening `---` (file wouldn't parse in Jekyll). Skill now specifies frontmatter-first; critic mechanics test flags violations as HIGH.

**Decisions:** Personal Notes policy = new interview gate G7, writer asks per-project (Montra: Sanjyot writes it himself). Event name (Bharat Mobility Expo 2025) correct but kept out of copy. Montra facts confirmed: team = 6 *including* Sanjyot (old page's "5" wrong; brief updated); all PCs wired LAN on a dedicated router; stability never profiled, but observed 8–10 h/day × 3 days crash-free; vehicle names (rickshaw/mini-tempo) approved in copy.

**Draft v2 written** with all five DISCUSS fixes + the number fix + frontmatter repair + "a week out" → "late in the build" (unsupported specificity). Personal Notes left as a prompt-comment for Sanjyot.

---

## Session 12 — ReFrame 360 run: stock-tech noise + the choked-prose round (2026-07-08)

Third skill run (`_briefs/reframe-360-brief.md` → `reframe-360.DRAFT.md` v1). Trend is right — each draft better than the last — but two new failure classes, both now encoded:

- **Unmotivated stock-tech mentions.** "Stock Unreal nodes" printed ≥2×. Root cause was the *brief template itself*: §4's "used stock tech? say so — it will be written as the honest, confident choice" invited printing defaults. New guide rule *Stock tech needs a reason*: name stock/standard tech only when the reader would otherwise assume custom or a real tradeoff was made (Meta fork: yes; material-editor nodes/UMG: never). Template §4 prompt reworded (constrains claims; printed only if a real decision). Counter-example that stays: "never reached air" in the ReFrame Overview — disclosure earns its place exactly when the reader *would* otherwise assume.
- **Over-compression under the compact dial.** Sanjyot's clarified semantics: **Size governs scope, never sentence room.** v1 had choked sentences and an orphaned referent ("this material" with no material ever introduced). New guide rule *Brevity cuts content, never air*; Size dial definitions rewritten in the template; critic gained test 10 (*First-read test*: second-pass sentences, missing antecedents, choked constructions = findings).

**Also this session:** discovered the ReFrame session had *self-applied* most of the Montra-round system changes (G6/G7, critic denial/bow-tie/frontmatter items) from the session log — my re-additions created duplicates in SKILL.md and writeup-critic.md, now deduped. Draft v2 written with all DISCUSS fixes: Overview expanded to breathe, ultra-wide restored (real output type between flat and tiny-planet), material introduced before first reference, stock-node mentions removed (nodes→HLSL arc told once as an arc), VP framing fixed (360° broadcast was neither VP nor UE), Role = "Lead Developer" per Sanjyot (led technical production beyond UE; I endorsed — accuracy over keyword). Confirmed: description, Blueprints tag, v2-team handling, deliberately-vague material method. Personal Notes = drafted version, Sanjyot to rewrite in his voice.

**v2 approved with Sanjyot's own wording edits (2026-07-08)** — he also removed the draft comment block himself, so the file is move-ready except Personal Notes (still the drafted version, pending his rewrite). His edits were encoded into the guide as a "Voice fingerprint" note: plain professional phrasing over clipped idiom ("due to budgetary reasons" not "for budget"); name things plainly ("a VR media player like the GoPro VR player"); scene-setting details are claims too (singular camera corrected to "a few 360° VR cameras").

---

## Session 8 — project.html: font check + navbar typewriter bug (2026-06-27)

Sanjyot flagged two things on the project detail page: (1) Bricolage Grotesque showing instead of Space Grotesk, (2) the navbar brand text not cycling between "life is a repo" / "Sanjyot Dahale" like it does on the homepage.

**#1 — investigated, turned out not to be a real divergence.** Both `home.html` and `project.html` ship `data-type="editorial"` on `<body>`, and there's no CSS rule for `data-type="editorial"` — only `"mono"` and `"grotesk"` have overrides — so both pages fall through to the same root default, `--font-display: "Bricolage Grotesque"`. Session 2 already locked this pairing in. The one real inconsistency found: the tweaks panel's Typography toggle had a stale `class="on"` on the **Grotesk** button instead of **Editorial**, cosmetically implying Grotesk was the live default when it isn't — fixed (`home.html`). Working theory for what Sanjyot actually saw: toggling the tweaks panel during earlier testing persists the chosen typography to `localStorage` (`liar_v2_tweaks`) and reapplies on every home.html reload — but project pages never load that JS, so they always show the hardcoded default regardless. Flagged for Sanjyot to confirm via incognito/cleared site data; no font values were changed.

**#2 — genuine bug, root-caused and fixed.** The brand-name typewriter *and* the mobile hamburger's click handler both lived entirely inside `assets/js/main.js`, which is loaded **only by `home.html`**. `header.html` (with the `.brand-txt` span and `#navToggle`/`#navLinks`) is included on every layout, but `project.html`, `post.html`, `default.html`, and the standalone `devlog.html` never loaded `main.js` — so on all non-home pages the brand text sat static AND **the hamburger menu button did nothing when tapped** (bigger bug than what was reported; found while tracing the typewriter).

**Fix:** extracted the two truly page-agnostic header behaviors into a new shared **`assets/js/nav.js`** (mobile nav toggle + brand typewriter, both self-contained, both already null-guarded). Removed the duplicate blocks from `main.js` (would have double-run the typewriter on home.html otherwise). Loaded `nav.js` on all five pages that include `header.html`: `home.html`, `project.html`, `post.html`, `default.html`, and `devlog.html`. `main.js` remains home-only (its other contents — hero animation, live readout, work-grid filter, rail scroll-spy, tweaks panel — are genuinely homepage-specific).

**Gotcha caught mid-fix:** the original typewriter string used real non-breaking-space characters (` `, matching the static `&nbsp;` entities in `header.html`'s brand markup) between the words in `'life is a repo'` — invisible in an editor, easy to lose when retyping. First pass into `nav.js` silently normalized these to plain spaces; caught it via `cat -A` byte inspection and fixed with a targeted Node string-replace rather than retyping, then reconfirmed the bytes on disk.

**Verified:** both JS files pass `node --check`; clean `jekyll build`; `nav.js` present in build output on home, project, and devlog pages; `main.js` absent from project/devlog output; no duplicate `brand-txt` typewriter code remains in `main.js`; tweaks-panel `class="on"` now correctly marks Editorial.

**Follow-up for Sanjyot:** confirm in an incognito window whether the homepage still shows Space Grotesk — if it does, that's a genuine site-wide default question (keep Bricolage per the Session 2 decision, or switch the locked default to Space Grotesk) worth a real answer, not a bug fix.

**Correction:** Sanjyot clarified — he wants Space Grotesk site-wide (it's what the homepage was already showing him, and he wants that everywhere, not Bricolage). This **supersedes the Session 2 font-pairing decision** (which had locked Bricolage Grotesque as the display font). Changed the actual root token in `assets/style.css`: `--font-display` is now `"Space Grotesk", sans-serif` (was Bricolage Grotesque). Since every page's `<body>` carries `data-type="editorial"` with no CSS override for that value, all five pages (home, project, post, default, devlog) now resolve to the same root default — Space Grotesk, everywhere, verified via build. Left the tweaks panel's `data-type="grotesk"` override as-is (now redundant with the new default, both render Space Grotesk) rather than repointing it to Bricolage under a mismatched "Grotesk" label — the tweaks panel is dev-only and already flagged for removal before deployment, so not worth the semantic rework. `Bricolage Grotesque` remains loaded via the Google Fonts link (harmless, unused) but is no longer referenced by any CSS rule.

---

## Session 9 — /write-project: Skilling India rewrite (2026-07-09)

Rewrote `_projects/skilling-india.md` from the brief (`_briefs/skilling-india-brief.md`) via the full /write-project process. Register **Professional**, focus **project-forward**, size **compact**. Per Sanjyot's §8 note, deliberately **no "What I Owned & Decided" section**, and the separate Key Achievements list was dropped (it would only have repeated prose).

**Interview caught / resolved before drafting:**
- **Platform contradiction:** brief §1 said "PC" but everything else (OVR Metrics on-device, Stereo Layers, 60–72 FPS budget) said **Meta Quest 3 standalone** — confirmed standalone; "PC" was a slip.
- **No Vision AI.** The live article's "Vision AI" framing was aspirational. The build used **no** Vision AI — it was an honest *visualisation of a future* where Vision AI could assist repair, presented transparently as such. Handled via future-tense framing, never a printed denial ("corrections aren't content").
- **Subject matter wasn't in the brief at all.** Motorbike-repair scenario + the **invisible digital-twin overlaid on a real bike** (twin as anchor, graphics read as belonging to the physical bike) came out only in the interview. Now the "The experience" section. **Backfill flagged:** this mechanic should be added to the brief so the two stay in sync.
- **WebSockets ownership corrected.** Live article overclaimed ("I personally developed the core functionality"). Truth per brief: Sanjyot built an earlier standalone prototype and **brought the approach**; the **team implemented** the production version. He wrote **no production code** on this project. Chess-pawn metaphor omitted (his call — self-explanatory).
- **Number:** used "over 1,400" (brief `[measured]`), not the live article's 1,500.
- Named the client + event openly: **Vodafone Idea (Vi)**, **India Mobile Congress 2025** (added as `status_note`).

**Critic pass (one, automatic):** applied its repetition/tone findings (cut a restated ownership triad, a repeated "visualisation" line, a significance flourish "what made it convincing…", a dramatized FPS rationale; glossed a bare "Developer Hub"; made the card `description` concrete). **Overruled its one HIGH** — it flagged the digital-twin mechanic as unsupported because it only checked the brief file; the mechanic is confirmed by Sanjyot's interview answer, so it stayed.

**Sanjyot's two DISCUSS fixes applied:**
1. Tablet was **not** screen-mirroring — it was a **2D panel of buttons (trigger app events) + status indicators** (operator sees what's happening in the headset). Corrected.
2. Removed the bare "I wrote no production code" line — he noted, correctly, that "Disclaim once" is a *cap* not a requirement, and nothing in the article implies he coded, so the line was better omitted.

**Approved and published** (2026-07-09): moved draft → `_projects/skilling-india.md`, deleted `skilling-india.DRAFT.md`, stripped the comment block, typo pass done. Frontmatter: `role: "Mixed Reality · Training"` (Sanjyot: "ok for now, figure later"), Team Size 6 (dev+creative team, he's excluded as lead), Duration ~2 months (Sept–Oct 2025). Personal Notes = drafted starting point, his to rewrite in his own voice.

---

## Session 10 — /write-project: Ancient Dwarka rewrite (2026-07-09)

Rewrote `_projects/ancient-dwarka.md` from the brief (`_briefs/ancient-dwarka-brief.md`) via the full /write-project process. Register **Professional**, focus **project-forward**, size **compact**. Per Sanjyot's brief note ("I didn't have much major contributions apart from the rendering pipeline... let's not add content just for the sake of it"), the spine is a single **pipeline story** and the separate Key Achievements list was dropped (it only restated the Overview).

**Interview caught / resolved before drafting:**
- **Blueprint/materials overclaim corrected.** Live article claimed "building custom Blueprints and complex materials." Sanjyot: he authored *some* but doesn't remember specifics → kept to one bare, vague affirmative line ("the occasional Blueprint and material the creative team needed"), not the old detailed claim.
- **Fisheye conversion = team's call.** The 8K equirectangular → 4K 180° fisheye Premiere conversion (UE has no fisheye output) was the dome/creative team's decision, not his. Printed as context, not an achievement.
- **Numbers confirmed solid:** nearly 6 min of 8K/30fps content; audience 2,000+. Hardware specs (24 GB VRAM / 64 GB RAM consumption, Threadripper/RTX 4090/256 GB) are facts.
- **description reworded:** dropped the live version's unverified "underwater heritage world" and its em dash.
- **UE 5.4** chosen because panoramic rendering via Movie Render Queue was broken until 5.4 — real "why this version" decision, kept.

**Critic pass (one, automatic):** applied its findings — dropped the restated Key Achievements section; standardized "artists" → "creatives"/"creative team" (matches brief + the sound/VO/colour line); cut two significance-editorializing bits ("the developer's real job is the render pipeline", "weren't a formality"); trimmed the Blueprint line's unbackable "for specific effects"; softened "ate most of the schedule" → "took a lot of time"; made role title consistent. Two MED findings on subject-framing and the Blueprint line were surfaced to Sanjyot rather than silently changed.

**Sanjyot's answers + two DISCUSS fixes applied:**
- Subject = **"mythological city of Dwarka"** (his call: mythological with historical evidence, but call it mythological). Vi naming and the vague Blueprint line approved as-is.
- **DISCUSS 1:** compacted the render-hardware problem from three paragraphs to **one** — dropped the RTX 6000 / RTX 3090 machine-swap blow-by-blow; kept the VRAM→system-RAM overflow diagnosis, the capacity fix, and the two-night deadline crunch.
- **DISCUSS 2:** fixed budget causality — budgets were defined **up front**; true 8K test renders only became possible late in the schedule, which is why the memory issues surfaced near the deadline. Now sets up the crash story.

**Approved and published** (2026-07-09): moved draft → `_projects/ancient-dwarka.md`, deleted `ancient-dwarka.DRAFT.md`, stripped the comment block, typo pass done. No Personal Notes (his choice). Frontmatter kept: `order: 6`, `role: "VR Film / Rendering"`, `status: live`, `youtube_id: U2wFjBlA2iA`, tags `["UE5", "VR 360° Rendering"]`, Team Size 6 (2 devs + 4 creatives).

---

## Session — 2026-07-10

### Project write-up: Swadeshi — Local to Global (AI for Fashion) — `/write-project`

Rewrote `_projects/ai-for-fashion.md` from the brief (`_briefs/ai-for-fashion-brief.md`). Vi GenAI kiosk at India Mobile Congress 2025; 3-person team; his role was GenAI workflow + prompt engineering. Register: professional. Focus: project-forward (brief delegated the call). Size: compact.

**Interview outcomes:**
- **"10-day development sprint"** — confirmed **measured/accurate**; kept as a printed number (Duration: "10-day development sprint (Sept–Oct 2025)").
- **Python tag** — confirmed a **misattribution**; dropped. Work was Node-RED + a little JavaScript. Tags now: Google Gemini · Nano Banana · Node-RED · Prompt Engineering.
- **Personal Notes** — he chose a modest drafted starting point (kept).

**Overclaims removed from the previous live article:**
- "custom-tuned AI model" / "prompt architecture fine-tuned for Nano Banana" — brief §2 states **no custom models, no fine-tuning**. Cut.
- Restored **Gemini's role**: it's a two-stage pipeline (Gemini writes the Nano Banana prompt → Nano Banana renders), which the old article omitted.

**Critic pass (writeup-critic, one pass, verdict "ready with minor fixes"):** cut a printed denial ("no custom model / no fine-tuning" — article never claims custom); dropped the redundant Key Achievements block (body already carried all three on a compact piece); trimmed the "I am not a web developer" second boundary and the "n8n" cross-reference. Declined the low-severity I-density thinning (would force passive voice Sanjyot asked to avoid).

**Approved and published** (2026-07-10): moved draft → `_projects/ai-for-fashion.md`, deleted `ai-for-fashion.DRAFT.md`, stripped the comment block. No changes requested on review ("looks good as it is"). Frontmatter kept: `order: 8`, `role: "GenAI Workflow & Prompt Engineering"`, `status: rnd`, `youtube_id: AReWxYd4QTk`.

---

### Frontmatter cleanup: split `role` into `domain` + `role` (2026-07-10)

Sanjyot flagged that the `role:` frontmatter field was overloaded — on some cards it held a **discipline/domain tag** ("Mixed Reality · Broadcast", "R&D · Real-Time Graphics"), on others an actual **job title** ("Technical Lead · Systems"). Worse, the field rendered in three places (card kicker, title kicker, AND a facts-rail fact literally labeled **"Role"**) while most articles *also* carried a hand-written `- **Role**: <job title>` line in the body — so a page like MR Cricket showed the word "Role" twice, meaning two different things.

**Diagnosis:** the field was originally *designed* as a discipline label for the card (every `card-role` in the Claude Design handoff is a domain tag); the "Role" facts-rail label is what invited job titles to creep in.

**Decisions (via AskUserQuestion):**
- Kicker field renamed `role:` → **`domain:`** (facts rail keeps a "Role" fact, now holding the real job title).
- Job title → promoted into its own `role:` frontmatter field, rendered as the rail "Role" fact; the redundant body `- **Role**:` lines were **removed** from every article.
- Three solo personal projects (aura_gas, ue_gemma, bow-arrow) → `role: "Solo Developer"`.
- Two outliers whose old `role` was a job title got proper domain tags: **montra-electric** → `domain: "Racing · Multiplayer"`; **riddlers-ransom** → `domain: "VR · Standalone"`.
- **ai-for-fashion** had no real job title on record (body repeated the discipline) → `role: "GenAI & Prompt Engineer"` (Sanjyot's pick), domain kept as "GenAI Workflow & Prompt Engineering".

**Applied:**
- `_layouts/project.html` — title kicker now reads `page.domain` (was `page.role`); the rail "Role" fact (`page.role`) now correctly holds the job title. No other change.
- `_layouts/home.html` — both card kickers (`.lbl` overlay + `.card-role`, client grid) and the personal-grid `.lbl` now read `project.domain` (3 spots).
- `_projects/TEMPLATE.md` — frontmatter documents both `domain:` and `role:`; removed the body `- **Role**:` guide line.
- All 11 live project `.md` files — `role:` → `domain:` + new `role:`; body `**Role**:` line removed where present. Verified via grep: every project now has both fields, no stray body `**Role**` lines remain.

**Flagged, not touched:** the two `*.OLD.md` backup files in `_projects/` still use the old `role`-as-domain and lack `domain:`, so their kicker will go blank and their rail "Role" will show a domain string. They look like leftover backups; left for Sanjyot to fix or delete. Also: no live `jekyll build` was run this pass (edits are trivial variable renames; verified by grep).


---

### Knowledge graph build (`/graphify`, 2026-08-02)

Built a persistent knowledge graph over the repo so the corpus (project write-ups, briefs, design system, layouts, session log) is queryable across sessions. Outputs live in `graphify-out/` (`graph.html`, `graph.json`, `GRAPH_REPORT.md`, `manifest.json`, `cache/`).

**Scope call:** detection tripped the 2M-word corpus warning, but the number was inflated by binary image bytes (a 15.8 MB PNG, the 10.3 MB `Paper.pdf`, a 7.5 MB GIF) - not real text. Sanjyot chose **text only, whole repo**: 66 files (61 docs + 2 PDFs + 3 JS), images excluded. Including the 63 images would have meant ~66 vision subagents instead of 3.

**Result:** 293 nodes, 439 edges, 14 communities. 77% EXTRACTED / 22% INFERRED / 1% AMBIGUOUS. 500,293 tokens across 3 parallel extraction subagents.

**God nodes (most connected):** `Portfolio_Session_Log.md` (33 edges), `writeup-guide.md` (23), the design-handoff `index.html` (18), `writeup-critic` agent (14), the resume PDF (14). The write-up system is the densest subgraph in the repo - denser than the site code.

**Two real issues surfaced during extraction, not yet fixed:**
1. `_projects/aura-gas.md` has `github_url` and `game_build_url` pointing at the **UE_Gemma** repo and release tag - looks like a copy-paste from `ue_gemma.md`. Captured as an AMBIGUOUS edge rather than asserted.
2. `assets/docs/resume.pdf` still carries the **"70% increase in performance"** MR Cricket claim that Session 9 retired as an unmeasured estimate, and says "5+ years" where the site says six. The graph links both nodes, so the conflict is queryable.

**Also noted by extraction:** `_design_system/*.html` has drifted from the live site - the specs hardcode the `#00aaff` electric-blue palette and Sora/JetBrains Mono, while the live layouts run `data-palette="amber"` with Bricolage/Hanken/Space Grotesk. Design-system nodes were linked to live counterparts as `semantically_similar_to`, not `implements`. Separately, `_includes/carousel.html` and `_layouts/project.html` each build their own lightbox with identical class names and no shared code path (project.html adds swipe, carousel does not).

**Graph health:** OK apart from 4 collapsed undirected edges - two node pairs that legitimately carry two relation types each. No dangling or missing endpoints.

**To re-use:** `/graphify query "<question>"` answers from the built graph without rebuilding; `/graphify <path> --update` re-extracts only changed files (all 66 are cached).


---

### Resume project kickoff (2026-08-02)

New workstream alongside the site: rebuild `assets/docs/resume.pdf` (authored in Standard Resume) off the updated portfolio. Claude engaged as a games-industry hiring manager / positioning consultant. Target: programming roles in games, plus other Unreal-based industries **excluding Virtual Production and broadcast**.

**Read for context:** the current resume PDF, all 11 project write-ups, `_data/experience.yml`, home layout hero/about/skills copy, `_config.yml`.

**Diagnosis of the current resume (2 pages):**
1. It argues Sanjyot is a broadcast/VP engineer — 5 of 9 experience bullets and 3 of 4 projects sit in the exact domain he wants to leave.
2. **Aura (GAS) is absent**, and it's the single most on-target artifact for a gameplay role. UE_Gemma also absent.
3. Resume vs site conflict: "Senior Unreal Engine Engineer / 5+ years / starts Aug 2020" vs "Lead UE Developer & Tech Lead / six years / starts Aug 2019 (Unity)".
4. The retired **"70% increase in performance"** claim is still on the resume; the site replaced it with the defensible "~25 → ~125 trajectories at a steady 50 FPS".
5. Skills block misses literal ATS keywords: GAS, replication, multiplayer, Animation Blueprints, Niagara, UMG, Unreal Insights, Meta Quest, OpenXR, Android, Agile/Jira.
6. Two Udemy certs + Languages block occupy space the GAS project should have. Publications stays — the SMPTE paper is a genuine differentiator.
7. Summary line is generic; doesn't say shipped-to-store or led-a-team.

**Strategic call recorded:** don't delete VP/broadcast (it's ~3 of 6 years; a thin 2020–23 is worse than the domain) — **re-encode it as engine-engineering work**. Hardware SDK integration in C++, latency-critical pipelines, performance budgets, and the MR Cricket anchor calibration reframed as transform-math + replication.

**Honest calibration given:** no game-studio time on the CV, so "Senior Gameplay Programmer" at established studios is a stretch band; strongest realistic targets are small-to-mid studios valuing breadth/ownership, tools & tech-lead roles, and Unreal-based simulation/training/automotive/installation work.

**Plan written to `_career/RESUME_PLAN.md`** (underscore folder — Jekyll excludes it, nothing publishes). Five artifacts proposed: `master-resume.md` (Career Fact Base with provenance pointers), `base-resume.md` (Standard Resume field-mapped), `variants/`, `jd-playbook.md`, and an on-demand JD fit-report workflow. Optional sixth: a `/tailor-resume` skill mirroring `/write-project`. Six phases, Phase 0 = intake.

**Bug re-flagged, still unfixed:** `_projects/aura-gas.md` `github_url` + `game_build_url` still point at the UE_Gemma repo/release (first caught by the graphify pass).

**Blocking questions put to Sanjyot:** target roles + seniority band, target markets/visa, official current title, whether to restore the Aug 2019–Sep 2020 Unity role (recommended: yes), any Riddler's Ransom store numbers, and one page vs two (recommended: one-page base + two-page variant). Also asked: NDA/client-naming clearance, Standard Resume field capabilities, and whether a live JD is available to test the pipeline.

**Targeting locked (Sanjyot's answers):** target roles = Gameplay Programmer + Systems/Generalist + Tools/Pipeline (**not** Technical Lead — he wants to stay hands-on IC); markets = remote-first anywhere + UK/EU/Nordics; official title = **Lead Unreal Engine Developer & Tech Lead**; length = one-page base + two-page variant.

**Positioning tension identified:** he holds a *Lead* title but is applying to *IC* roles. Left alone that reads as overqualified or as a demotion. Resolution: title stays (must survive a reference check), the summary reconciles it ("currently a tech lead; deliberately looking to stay hands-on"), and leadership becomes evidence-of-scope inside bullets rather than the opening line. The current resume's first bullet — "Managed a cross-functional team of 7" — is exactly the wrong headline for these applications.

**Phase 1 delivered — `_career/master-resume.md`** (Career Fact Base, ~700 lines). Every professional and personal project mined from the 11 write-ups, `experience.yml` and the home layout into a provenance-tagged superset: 11 projects with hard metrics, variant-tagged bullet inventories `[G]/[S]/[T]/[L]`, canonical 3-entry employment history, a VP→engineering reframing table, a retired-claims table, an ATS keyword bank split into evidenced vs **not** evidenced, three summary drafts, and 12 numbered gaps.

**Phase 2 delivered — `_career/base-resume.md`** (one-page gameplay/systems draft). Structural call: because all professional work is at one employer, client projects live as bullets *inside* Experience and "Selected Projects" holds only personal work — which gives Aura a section where it isn't competing with client work. Riddler's Ransom leads the current role. Includes cut-list with reasons, Standard Resume field mapping, and a 12-point ATS checklist.

**Retired-claim ledger built.** Beyond the known "70%" issue, three more found on the live PDF: "5+ years" (should be 6); "40 FPS → stable 72 FPS" for Riddler's, which silently compares a **PC** number to a **Quest 3** number as one curve (the honest version — 30–40 on PC → 68–72 on a mobile chip — is stronger); and "Integrated Logitech G29 SDK for immersive haptic feedback", which omits that **the haptics were cut and never shipped**.

**Open gaps blocking the strongest version (G1–G12 in the fact base):** Riddler's store metrics; the Aura repo link (the `aura-gas.md` → UE_Gemma copy-paste bug, still unfixed); how much of Aura's architecture he drove vs followed from the course; UK/EU work authorisation; whether he's ever line-managed vs technically led; which of the un-evidenced ATS keywords (Unreal Insights, Nanite/Lumen, Behavior Trees, Jira/Agile, C#, console platforms) he can honestly claim; NDA clearance on client names; Standard Resume field capabilities; and the `experience.yml` Aug–Sep 2020 date overlap.

**Still to build:** variants (`_career/variants/`), `jd-playbook.md`, the on-demand JD fit-report workflow, and optionally a `/tailor-resume` skill mirroring `/write-project`.

**Phase 5 (partial) delivered early — `_career/jd-playbook.md`**, since it was unblocked by the open gaps and is half of the stated goal. Covers: how to tell a real requirement from a wishlist item; the three hard filters (visa, console, AAA) checked before anything else; six Unreal-role archetypes mapped to his evidence with honest fit ratings (XR strongest, Engine Programmer weak — no engine-source work); mechanical keyword extraction into HAVE-on-resume / HAVE-but-missing / DON'T-HAVE; the tailoring dial separating the invariant core (titles, dates, metrics — never move) from what changes per application; a 20-minute procedure; the fit-report format and 0–10 scoring bands he'll get whenever he pastes a JD; and rehearsed honest answers for the seven challenges he will actually face ("you've never worked at a game studio", "one employer for six years", "you're a Lead applying for an IC role", no console, no rollback netcode).

**Flagged Technical Designer as an under-considered seventh archetype** — the Fielding Pod authoring tool, curve-table ability tuning and GAS work fit it unusually well, and it's a less crowded field than gameplay programming. Consistent with the systems/tools→TD positioning noted earlier in the write-up-system work.

---

### Resume project — all 12 gaps answered, fact base + base resume rebuilt (2026-08-02)

Sanjyot answered G1–G12. Four answers changed the plan materially; the rest were confirmations. `_career/master-resume.md` updated throughout (gaps table now a resolved-answers table, plus three new sections §11–§13), `base-resume.md` rebuilt as v2, `jd-playbook.md` amended.

**G3 — Aura is course-guided, and this is the biggest change.** He authored the gameplay-ability logic for the **two passive abilities**; everything else follows the course with minor non-architectural deviations. Ulibarri-style GAS course projects are recognisable on sight to a lot of Unreal hiring managers, so presenting Aura as authored architecture risks the far worse read — *"presented guided work as his own"* — which would contaminate every other claim on the page. The portfolio write-up is already honest about it ("I picked up this course I found… my learning journey"), so the rule adopted is: **the resume must never be less honest than the site.** Aura stays, relabelled as a five-month GAS study project, verbs changed to *worked through / covering / independently implemented*, with the passive-ability authorship named. Repo is public: `github.com/LifeisaRepo/Aura_GAS`.

**Consequence — gameplay evidence re-ranked (new §12).** With Aura demoted, his strongest *independently authored* gameplay work is: 1) the **Fielding Pod** (data-driven spawning of 14 actors, authoring tool, per-entity placement rules — entirely his), 2) Montra multiplayer core + vehicle feel, 3) UE_Gemma, 4) Bow & Arrow, 5) Aura. So the Fielding Pod was **promoted into the Experience section** and Bow & Arrow onto the one-pager. Standing recommendation recorded: **one original gameplay project** — extending Aura with genuinely authored ability or tooling work is the cheapest path and would do more than any rewording. Also flagged in the playbook that pure gameplay-programmer ads are now his *weakest* strong option; Systems, Tools and XR are better odds.

**G4 — no work authorisation anywhere; sponsorship required in every market (new §11).** Corrected the "remote-first, anywhere" target: most remote roles are remote *within* a region, and hiring an India-resident employee needs a local entity or EOR — so remote realistically means **contractor**, a separate track. Ranked markets by sponsorship-friendliness: **Sweden, Finland, Germany (EU Blue Card — his most accessible route) first**; Netherlands, Denmark/Norway, Poland/Czechia, UK, Canada second; US effectively closed (H-1B lottery). Decided **not** to put "requires sponsorship" on the resume — every application form asks anyway, so it only moves the rejection earlier; the real cost is time on non-sponsoring studios, fixed by target filtering. Visa checking is now hard filter #1 in the playbook.

**G8 + G4 timing flag.** He plans to resign end of Aug 2026 with a 2-month notice (available ~Nov 2026). Sponsored hiring adds 1–3 months post-offer, so a realistic start is Dec 2026–Feb 2027 measured from an offer he doesn't have yet. Flagged (his call): "currently employed" is a stronger position, a 2-month notice is unremarkable internationally, and applications should start now rather than in November.

**G1 — Riddler's has ~100+ installs and no reviews → use no numbers.** Recorded the reasoning: 100 installs is worse than silence, programmer hires aren't assessed on sales, and the portfolio omits the figures too. Never call it "successful"; "the studio's first published title" is true and sufficient.

**G5 — real line management, confirmed.** First UE hire at the company; has personally interviewed every game-engine hire since; **10 hired**; 3 Unreal programmers as direct reports at peak plus tech artists reporting jointly with the creative head; technically leads every non-web project. So the old "team of 7" claim is defensible — but placement rule recorded: **one leadership line at the bottom of the current role, never the summary, never the first bullet**, because he's applying IC.

**G7 — client anonymisation (new §13).** Nameable: Montra Electric, the MR Cricket broadcaster, Liminal. Not nameable: Vodafone Idea → "a major Indian telecom operator"; JioStar/JioCinema → "a national streaming platform". Also avoid naming India Mobile Congress where it identifies the client by inference → "a national technology expo". Costs nothing — scale does the persuading and these aren't household names to a Nordic or German hiring manager.

**G6** — can claim Behavior Trees, Blackboard, Agile/Scrum, C#; added. Console platforms remains a genuine filter failure (handle in prose, not as a keyword). **G12** — the Aug/Sep 2020 overlap was real (he ran both roles during the transition); clean boundary set at **Sep 2020** with full Unity duration preserved. **G9** URL unchanged · **G10** nothing off-portfolio · **G11** Standard Resume supports reordering, per-item URLs, custom sections and multiple saved versions.

**New minor open items:** does he use Unreal Insights / `stat` commands / Session Frontend (performance JDs almost always name a profiler and he does the work without claiming the tool)? · name the GAS course? · is Chaos Physics fair to claim from the vehicle work?

**Site fixes now blocking the resume:** `_projects/aura-gas.md:14-15` github/build URLs → `Aura_GAS` (drop `game_build_url` until a build exists); `_data/experience.yml:9` Unreal start Aug → Sep 2020; `assets/docs/resume.pdf` still carries "70%" and "5+ years".

**Profiling gap closed (2026-08-02).** Sanjyot confirmed his actual profiling toolchain: console stats (`stat unit`, `stat gpu`, `stat fps`), in-editor optimisation viewmodes (shader complexity, lightmap density, texture streaming/mips, **Nanite visualisation**), **ISM/HISM instancing** for draw-call reduction, texture mip and lighting optimisation, plus **OVR Metrics** and **Meta Developer Hub** for on-device XR profiling. He has **not** used Unreal Insights, Unreal Trace or Session Frontend.

Consequence: **Profiling is now its own skills group** on the resume — it was previously three vague words buried inside "Graphics", which badly undersold one of his real strengths. Unreal Insights / Trace / Session Frontend stay off the document; when a JD names Insights the playbook now has a prepared answer (name the toolchain he does use, note that Insights is a tool rather than a skill and a day-one pickup for someone already reading GPU and draw-call costs daily).

**Nanite claimed narrowly and deliberately** — filed under *profiling* as "Nanite visualisation modes", a diagnostic claim, not an authoring one. Most of his shipping work is Quest/mobile (no Nanite) or UE4. New open question: has he actually built with Nanite — enabled it on meshes, worked within its constraints, made fallback calls? If so that's a stronger separate claim worth promoting to the rendering group.

**Two site fixes applied:** `_projects/aura-gas.md` — removed the stale `game_build_url` pointing at the UE_Gemma release (the `github_url` had already been corrected to `Aura_GAS`); `_data/experience.yml` — Unreal role start `Aug 2020` → `Sep 2020`, removing the overlap with the Unity role while preserving its full duration. The third fix (regenerating `assets/docs/resume.pdf`) needs a Standard Resume export and stays with Sanjyot.

---

### Resume graded D — diagnosed against Standard Resume's own guidance, rebuilt as v3 (2026-08-02)

Sanjyot built the v2 content in Standard Resume; it graded **D** and ran to **3 pages** (`assets/docs/sanjyot-dahale-standard-resume.pdf`). He supplied four wiki links (style, think-like-a-recruiter, understand-the-ats, skills-and-keywords). All four read and the export analysed page by page. **Two of the four causes were mine, and are recorded as such.**

**Cause 1 — the skills section (my error).** 57 items across 8 groups; Standard Resume renders one item per line, so it consumed an entire page on its own. It directly contradicted their guidance: *"ATSs rarely do a keyword scan and almost never automatically reject resumes based on keywords — Greenhouse, Lever and Ashby don't offer keyword scanning"* and *"simply listing keywords without context can make your resume appear spammy."* I had built that block as an ATS keyword bank defending against automated keyword rejection — **a risk that is largely a myth for modern ATSs.** Balanced position recorded: recruiters *do* search candidate databases in Workday/Taleo so keywords retain some value, but not a page of readability's worth. **Skills cut 57 → 25 across 5 groups**, on the principle **"name the system, not its parts"** (GAS implies attribute sets/tags/effects/cues; "actor replication" covers RepNotify and NetSerialization; "GPU & CPU profiling" covers `stat` commands and viewmodes). The full bank stays in the fact base — its role is now to be pulled back **into a bullet** when a JD names something, never pasted as a list.

**Cause 2 — bullet length (my error).** Every bullet ran three lines, 38–48 words, against *"keep your resume as short and to the point as possible"* and the recruiter's *"quick scan… in large numbers."* Ten uniform three-line blocks fail their ten-second test outright. All bullets rewritten to **20–30 words, two lines maximum**.

**Cause 3 — my punctuation habits leaked in.** Em-dash subclauses in nearly every bullet plus two `→` arrow chains, one of which broke across a line in the export. Rule set: one em-dash per bullet maximum, no arrows.

**Cause 4 — jargon density.** Their guidance says recruiters may lack technical background. **Pushed back on a literal reading** — for programming roles the second reader is an engineer who wants exactly that detail. The fix adopted is **ordering, not dumbing down**: outcome first in plain language, technical specifics second and fewer, so the recruiter gets the first clause and the engineer gets the rest.

**Recommendation revised: two pages, not one.** Earlier advice was a one-page base. On the evidence of the export, one page in this template requires deleting genuine evidence at six years across three roles; two pages is conventional for UK/EU and the grade penalises the three-page sprawl, not two. A one-pager becomes a variant for studios that ask for one.

**A 10-point writing-rules block added to `base-resume.md`** (word limits, outcome-first ordering, punctuation, verbs, active voice, name-the-system, British spelling for the UK/EU target, ten-second test). `jd-playbook.md` §3 and §4 amended so tailoring can't silently re-inflate the document.

**Template finding, reported as low-risk and not acted on:** the exported PDF's text layer is not in visual reading order — page 1 emits Work Experience first and the name/contact/summary last. Modern parsers reconstruct from glyph coordinates, and **the previous resume Sanjyot has been using has the identical characteristic** since it's the same template. Worth knowing, not worth fixing, and not something introduced here.

**Also caught in the export:** the header dropped `github.com/LifeisaRepo` — needs restoring, since a browsable GitHub outranks the phone number for a programming role.

**Open questions put to Sanjyot:** where is `REST` evidenced (it appeared in his export's Networking group and is not in the fact base)? · does the grade breakdown itemise which metrics it penalises? · is the three-column skills layout controllable? · does the grade update live, so the skills cut alone can be measured?

**Grade flags obtained, v4 written (2026-08-02).** Sanjyot reported Standard Resume's actual breakdown: too many bullets in the current role · bullets too long across almost all roles · **too many bold words per bullet** · summary too long. The grade also **updates live**.

**The bold-density flag was not anticipated** and is a fair catch by their grader. Bold works by contrast — 1–3 bold spans in every bullet means nothing is emphasised. New rule: **at most one short bold span per bullet, most bullets none; bold the number or proper noun, never the phrase around it.** v2 had ~15 bold spans across 10 bullets; v4 has 4 across 9.

**v4 changes:** current role 6 → **5 bullets** (cut the hiring/leadership bullet — real and differentiating, but the title already says *Lead* and he's applying IC, so it was the cheapest of the six to lose; it moves to the lead/tools variant and the cover note). Bullets 38–48 words → **19–26 words**. Summary 55 → **34 words**, with a 40-word alternative to try if the grade holds. VP role 4 → 3 bullets (source control merged into the performance-budget bullet). Skills 57 → **26**.

**REST resolved.** He has *integrated* REST APIs in Unreal projects multiple times but has never authored one. Recorded as **"REST API integration"**, never bare "REST" — the bare term implies building them. Added to the Networking group and to fact base §8 with the distinction spelled out.

**Method note added: use the live grade as an instrument.** Change one thing at a time in a prescribed order (skills → summary → current-role bullets → other roles → projects) and re-grade after each. Asked Sanjyot to report any step that *doesn't* move the grade — that's more diagnostic than the final letter, since it reveals what the metric actually weighs.

**Question 3 withdrawn** — he didn't follow it and it no longer matters. It was asking whether the 3-column skills layout is adjustable, because narrow columns forced long entries to wrap (his "optimisation viewmodes (shader complexity, lightmap density, texture streaming, Nanite)" wrapped across three lines inside one column). With 26 short items every entry fits on one line at any width.

**Writing rules expanded to 12** in `base-resume.md`, now including the graded limits (5 bullets/role, 1 bold span/bullet, 19–26 words/bullet, summary under 40). `jd-playbook.md` §4 updated so tailoring respects them and watches the live grade.

**Skills layout finalised (2026-08-02).** Standard Resume allows a **maximum of three adjacent columns**, fewer possible, never more. Two consequences: every skill entry must fit one line at one-third width (the old wrapping entries like "optimisation viewmodes (shader complexity, lightmap density, texture streaming, Nanite)" are gone), and the group count should be a multiple of three or the last row reads as unfinished. So skills went **5 groups → 6**, splitting the old Tools group into **Tools** and **Performance** — same 26 items, one extra label, and it fills a clean 3×2 grid. Side benefit: **Performance as a visible heading is a selling point** rather than tooling trivia buried inside Tools, and it's the first thing an optimisation-focused JD looks for. Entry order recorded so the groups flow into two balanced rows.

---

### A+ achieved (2026-08-02) — `assets/docs/sanjyot-dahale-standard-resume-v3.pdf`, 2 pages

Sanjyot built v4 in Standard Resume and it scored **A+** at two pages, down from D at three. Export verified.

**Grading experiment results — what actually moves the score:**
- ❌ Skills **column count** — no effect (confirmed by Sanjyot; purely cosmetic, so the 5→6 group split was unnecessary though harmless)
- ✅ Skills **quantity** — the 57 → 26 cut was the main lever
- ✅ **Bold density**, **bullet length and count**, **summary length**
- ✅ **Institution website links** — the grader wanted a university URL. Unexpected; now added.
- ❌ **Project description length** — no effect. **The useful finding.**

**Key finding: the grader weights Work Experience, not Projects.** The A+ export kept the **long v2 project descriptions** (UE_Gemma ~52 words over 3 lines, Aura ~60 over 4, both with multiple bold spans) — my v4 shortening was never applied and it made no difference. So the word/bold/count limits are recorded as governing **experience bullets only**; projects get a softer ~60-word cap judged by eye. Good outcome — the projects are where Aura's honest course-guided labelling and UE_Gemma's technical substance live, and neither should be starved for a grader.

**Page 2 is ~60% empty, so there's headroom.** With A+ banked and the grade live, three things to add back one at a time and re-grade: (1) the **hiring/leadership bullet** cut in v4 — the only casualty I regret, and a 6th experience bullet so it's on the graded axis; (2) the **40-word summary** naming all three artifacts instead of the current 34-word version; (3) a **Languages entry** (English fluent), conventional for UK/EU applications.

**Still outstanding on the document:** the **GitHub profile URL is absent from the header** (flagged three times now) — for a programming role with three repo-linked projects it outranks the phone number. Open question raised: are the project titles actually hyperlinked to their repos in the export? If not, the repos are invisible and that's a real loss. Minor polish also noted: bullet 2 of the current role opens "Rebuilt **it**…", which depends on the previous bullet being read first — should be "Rebuilt the game…" since bullets get scanned out of order.

**Live-site issue flagged:** `_layouts/home.html` still links `/assets/docs/resume.pdf`, which is the **old** resume carrying the retired "70% increase in performance" claim and "5+ years". The site is currently serving the superseded document to anyone who clicks Resume.

---

### First JD run — Unreal Developer (dev support), Bangalore (2026-08-02)

Sanjyot supplied a JD and the current base export (`assets/docs/sanjyot-dahale-standard-resume-v4.pdf` — v4 has the GitHub URL restored, "Rebuilt the game" fix, 40-word summary and a Languages section; still 5 bullets, hiring bullet not re-added). Full report written to **`_career/jd-fits/2026-08-unreal-developer-bangalore.md`** — first use of the fit-report workflow.

**Read of the role:** despite the "Unreal Developer" title this is **engine/dev support**, not studio gameplay — supporting "hero project game studios" with escalated issues, guiding them on PlayStation builds, writing documentation. **Prospero/Orbis are the PS5/PS4 SDK codenames** and "hero project" is Sony's term for flagship titles, so this is PlayStation-adjacent, likely Sony's India centre or a vendor. The rigid "Notice: Immediate" plus skills-list formatting suggests a staffing intermediary.

**Verdict: Apply, leading with the notice period. Skills fit 7/10, practical fit 4/10.**

**The strategic case is stronger than the skills case, and it's the main finding.** Console experience is the one hard filter Sanjyot fails everywhere, and it cannot be self-remedied — you can't build PlayStation experience in a side project because you can't get the SDK. Only an employer opens that door. This role hands him Prospero/Orbis exposure, certification work and access to real studio codebases; two years there and the structural gap is gone. Counterweight recorded: dev support can be a cul-de-sac, so take it deliberately with an 18–24 month plan to convert platform exposure into a studio role, and keep personal gameplay projects alive. Also noted that although this is Bangalore rather than his stated UK/EU/Nordics target, **applying to those markets from a PlayStation-adjacent games role is far easier than from an XR studio** — this may be the faster route to the market he actually wants.

**Mandatory scoring: 8 of 11 met or exceeded.** Strongest match is **Unreal build systems/modules/plugins** (the Logitech third-party SDK plugin, the UPL/JNI Blueprint function library, Meta's engine fork, multi-platform packaging) — plus technical ownership/communication, where the SMPTE paper and portfolio write-ups are unusually strong for a role that names documentation as a duty. **Two real gaps:** animation depth (he has retargeting, montages, motion warping, AimOffset, ABP inheritance — but no blend shapes, IK/FK or morphable models, and the JD asks for "very good understanding"), and **Unreal-specific profiling tools** (no Insights/Trace/Session Frontend, in a job that is literally debugging support). Console is absent but is only a *good-to-have* here, which is precisely why the role is reachable.

**Hard filter — "Notice: Immediate" is the real obstacle**, not the skills. He has 2 months and hasn't resigned; even resigning today lands in October. Three options recorded in preference order: ask what they'll actually accept (an agency "immediate" is often an opening position, and a candidate meeting 8/11 is worth waiting for), notice buyout (standard in India), or negotiating shorter notice with Liminal. **Explicit advice: do not resign to chase this posting** — no offer in hand, and resigning removes his negotiating position across every other application.

**Tailoring edits specified:** headline → "Unreal Engine Developer — Gameplay, Build Systems & Performance"; JD-specific summary; skills additions `Animation retargeting` (honest, evidenced by Mixamo→Manny in Bow & Arrow — the only part of the animation mandatory he can truthfully claim; explicitly **not** IK/FK/blend shapes), `Object-oriented design`, and **restoring `Unreal plugin development` / `Build systems & modules` / `Third-party SDK integration`** which were cut in the D→A+ trim and are a named mandatory here — the first real vindication of keeping the full keyword bank in the fact base. Experience reordered to promote the Blueprint→C++ bullet to #2 and swap the data-driven scenario bullet for the Logitech plugin bullet. Projects reordered to Aura → UE_Gemma → Bow & Arrow, with an animation clause added to Bow & Arrow. **The Udemy OpenGL certificate goes back in** — this is the one application where it maps to a stated good-to-have.

**Cover note drafted** naming the notice period in sentence one and stating both gaps plainly, closing with console inexperience as the stated reason for wanting the role. **Interview prep flagged:** spend an evening in Unreal Insights on Aura before any interview so the profiling answer comes from experience rather than intent.

---

### Second JD run — Senior Game Engineer (Unreal), Supercell-backed mobile studio (2026-08-02)

Report at **`_career/jd-fits/2026-08-senior-game-engineer-supercell-backed.md`**. **Skills fit 8.5/10 — the best-matched posting assessed so far. Practical fit 2/10.**

**The wall: location.** Open to candidates in Finland, the UK, Canada, "and potentially elsewhere in the EU subject to employment arrangements." India isn't listed and isn't in the EU — the exact "remote means remote *within* a region" trap the playbook warns about. **But recommended one email rather than a silent skip**, for three reasons: the "potentially elsewhere… subject to employment arrangements" phrasing is unusually open; a small, lean, Supercell-funded early-stage team contracts internationally far more readily than a large one; and Finland/UK are both on his priority sponsorship list anyway. **Ask before investing an evening in tailoring.**

**Three requirements read as though written from his portfolio:**
1. *"Architectural and systems thinking… without under-engineering what needs to scale or over-engineering what doesn't"* — four documented instances: the Montra time-trial scope call, the client-side lap-timing threat-model decision, the picture-in-picture rejection after measuring cost, and the Riddler's physics-constraint → grated-door swap.
2. *"Strong Unreal-specific judgment — when to work with the engine, when to extend it, when a custom solution is justified"* — **the MR Cricket write-up already answers this in their own words**, in the section separating "design wins that didn't strictly need C++" from "what genuinely needed C++".
3. *"Open and proactive about AI-assisted development tools… expected as a core part of day-to-day workflow"* — **his standout differentiator.** Fine-tuned FunctionGemma and shipped it on-device in an Unreal Android build, designed a production GenAI client workflow, leads internal AI-tooling R&D, and is candid about using LLMs on an undocumented SDK and fixing what they got wrong. Most senior engineers have nothing here.

**Key reframing point recorded: Quest 3 standalone IS mobile hardware** (Snapdragon-class, hard 72 FPS target, memory and draw-call budgets) plus Android packaging on UE_Gemma. Their mobile-optimisation nice-to-have is genuinely met, but **it must be stated explicitly** — they'll read "VR" and miss it.

**Honest gaps flagged:** no live-service experience (real gap for a senior hire on a live-service game, despite being listed nice-to-have); **mobile F2P is a different discipline from mobile hardware** — claim the frame-budget competence, don't imply understanding of session length, retention or monetisation; no game-studio time, though "we're open to a range of strengths" and "happy to shape the role around you" is not rigid-bar language. **Explicit warning not to conflate his GenAI work with the "procedural or generative content systems" nice-to-have** — they mean PCG and runtime content generation, and the overclaim would be caught immediately. Notice period is a **non-issue** here, unlike Bangalore.

**Also noted:** their systems list ("player state, progression, persistence, content") maps directly onto Aura's progression economy and `SaveGame` persistence — on-topic despite being course-guided, and it stays labelled.

**Deliverable: a two-paragraph inquiry email drafted** that puts the location question first, leads with AI tooling, and links the MR Cricket article as direct proof of the judgement and communication they're screening for — no resume attached until location is answered. Resume edits specified for if they say yes, including swapping in the **Montra scope-call bullet** (currently absent from the resume, and his single best evidence for their central requirement).

**Comparison recorded:** the two live roles fail on *different* filters — Bangalore on notice period, this one on location — and neither costs much to test. Advice: ask both this week; if this one clears location it becomes the priority, since it's hands-on senior IC at a funded studio versus support work with cul-de-sac risk.

---

### Third JD run — Unreal Engine Engineer, Tanglewood Games (UK, fully remote) (2026-08-02)

Report at **`_career/jd-fits/2026-08-tanglewood-games-unreal-engineer.md`**. **Skills fit 8/10; practical fit unknown and decided by a single lookup.**

**Blocker: "fully remote positions within the UK"** — UK-remote only, so a Skilled Worker visa is required and Tanglewood must hold a **sponsor licence**. Fetched their site: no mention of sponsorship, relocation or right-to-work. **Action: search the gov.uk "Register of licensed sponsors: workers".** On it → apply, best-positioned application so far. Not on it → a zero. **Salary is unlikely to be the obstacle** (published bands £49,750 / £68,500 / £80,500 all sit above the general Skilled Worker floor as understood — flagged for verification against the current threshold and occupation-code going rate). The licence is the only real question.

**Why the fit is better than the light requirements list suggests: their business lines are his strengths almost verbatim.** Tanglewood sells **optimisation, porting, technology integration and consultation**. Optimisation is his single strongest area; **technology integration** is literally the Logitech G29 third-party plugin, the UPL/JNI native-Android bridge, and the camera-tracking/mocap C++ integration layers.

**🔑 The most valuable single edit across all three applications: reframe Riddler's Ransom as a *port*.** PC-VR → standalone Quest 3 is desktop GPU to mobile chip, with an engine-fork change, 30–40 → 68–72 FPS, plus platform certification and store submission. He has never described it as a port anywhere — on the site or the resume — and for a porting studio that's the framing that matters most. Recorded as a general reframe, not just a Tanglewood one.

**He meets all five stated requirements**, and they name **Perforce** specifically, which he owned studio-wide. Other favourable signals: the interview is explicitly *"a discussion rather than a formal coding exam"*, which plays to the paper, the portfolio write-ups and six years of explaining decisions to clients — a whiteboard test would serve him far worse. Founders are **ex-Epic programmers**, studio is ~30 people: small enough that a strong application reaches someone who can act, technical enough that the write-ups get read.

**This also fixes the console gap** — their credits (Hogwarts Legacy, Funko Fusion, Grounded, Quidditch Champions, F1 Manager) are console titles, and porting studios are where console experience is made. **On that axis it strictly dominates the Bangalore role**, being the same door-opener but in the UK at an Epic Gold Partner. Same services-work caveat applies, but noted that Tanglewood's credentials *travel* in a way Bangalore dev-support credentials don't.

**Level advice: present as Senior, state openness to Intermediate.** Realistic landing spot is **Intermediate at £49,750** given no studio time, no console experience and the cost of sponsorship — and that's fine as UK games-industry entry. Advised **not** to negotiate hard on a first offer: the visa is worth more than the band gap, and Senior is reachable internally within two years once console credits exist.

**Ranking across all three live applications, assuming the Tanglewood licence exists: Tanglewood ≈ Supercell-backed > Bangalore.** Tanglewood has the lowest bar, the most direct match to its actual business, and a blocker resolvable by a five-minute lookup rather than an email and a wait. **Advice: run all three this week** — they fail on independent filters, so pursuing all three costs little.

**Recurring gap now flagged three times: Unreal Insights.** At a studio that optimises for a living it will land harder than anywhere else. The "spend an evening in Insights on Aura" recommendation is now the highest-value single preparation action across the whole search.

**Tanglewood found on the gov.uk sponsor register (2026-08-02).** Sanjyot searched and Tanglewood Games appears in the licensed-sponsors CSV. Flagged three columns to verify before acting: the **town/city** should be Hartlepool or the North East (name collisions happen), the **Route** must include **Skilled Worker** (a licence can cover only other routes — Global Business Mobility, Temporary Worker, Scale-up — which wouldn't help), and the **rating must be A, not B** (B means a Home Office action plan restricting new Certificates of Sponsorship). Also recorded the limit of what this proves: a licence means they *can* sponsor, not that they will — sponsorship costs money and admin, so the real bar is being preferred over an equivalent UK-based candidate, which is why the port framing and technology-integration match matter.

**First full variant written — `_career/variants/tanglewood-unreal-engineer.md`**, ready to type into Standard Resume. Headline → "Unreal Engine Engineer — Optimisation & Platform Porting". **The Riddler's bullet is split into two: the port itself (desktop GPU → mobile chip, 68–72 vs 30–40 FPS) as bullet #1, and certification/submission as #2** — for a porting studio the port is the headline, ahead of the team-leading fact. Logitech plugin bullet swapped back in. VP role reordered so hardware-SDK integration and performance budgets lead and SMPTE goes third. Skills reordered with `Performance` and `Tools` at the top, `Perforce` first within Tools since the JD names it, and `Unreal plugin development` / `Build systems & modules` / `Third-party SDK integration` restored — their "technology integration" service line, cut during the A+ trim. `Mobile performance` added; `HoloLens 2` and `REST API integration` dropped to hold the count at 28 (fallback noted: drop `Niagara` and `PC` if the grade dips below A). Projects reordered UE_Gemma → Aura → Bow & Arrow. **OpenGL certificate restored** — one of only two applications where it earns its line.

**Covering message drafted.** Leads with the two matching specialisms rather than biography, points at the portfolio (the better artifact for a studio whose interview is explicitly a discussion), and puts sponsorship, the two-month notice and the console gap at the end — stated plainly, without apology, after the reasons to want him. Naming the register check is deliberate: it signals he did the work rather than applying blind and saves a round-trip, while acknowledging it's their decision rather than a formality.

**Tanglewood sponsor row verified — green light (2026-08-02).** `Tanglewood Games Limited` · Hartlepool · **Worker (A rating)** · Route: **Skilled Worker**. All three checks pass, so the application is unblocked.

**Urgent issue this surfaced, now fixed.** The Tanglewood covering message points a hiring manager at `lifeisarepo.github.io` — and the site's Resume button served `assets/docs/resume.pdf`, still the **superseded** document carrying the retired "70% increase in performance" claim, "5+ years" (vs six on the site and the new CV), and the old "Senior Unreal Engine Engineer" title. A reader following the link would have downloaded a resume that contradicted the CV attached to the application, on years of experience, job title and metrics — a direct failure of the "nothing contradicts the portfolio" checklist item, and actively risky the moment a live application points at the site.

**Fixed by copying `sanjyot-dahale-standard-resume-v4.pdf` over `assets/docs/resume.pdf`**, keeping the URL stable so any existing links resolve to the current document. The public artifact is deliberately the **base** resume, not a per-application variant. Old copy recoverable from git history.

**Noted, not actioned:** `assets/docs/sanjyot-dahale-standard-resume.pdf` (the 3-page D-grade v2) is still sitting in a public assets directory. Unlinked, so low risk, but worth deleting.

**🚨 Overclaim caught by Sanjyot (2026-08-02) — "Wrote C++ integration layers for external hardware SDKs".** He queried the basis of that VP-role bullet. Traced, and **it was fabricated by me during reframing.** Drift chain: his old `resume.pdf` said *"**Integrated** complex hardware ecosystems into Unreal Engine, including stYpe/Mo-Sys camera tracking, XSens/Qualisys Motion Capture, and Blackmagic Design broadcast hardware"* → the §6 reframing table rewrote that as *"Wrote C++ integration layers…"* → I then promoted the reframing straight into a resume bullet without checking whether the underlying activity was C++ authoring. "Integrated" and "wrote C++ integration layers" are different technical claims and I substituted one for the other.

**The portfolio does not support it.** Everything on the site describes building *on top of* Mo-Sys data — the calibration map, the anchors, the virtual camera pinning to the Mo-Sys-origin anchor "fed live by Mo-Sys". The briefs' ownership tables say "I wrote it — anchors, session logic, Mo-Sys integration, output path", confirming he **owned** the integration but saying nothing about C++ SDK-level work. All four vendors ship Live Link plugins, so the normal path is configuration plus logic on top.

**Why this one mattered more than a stylistic slip:** it's a specific, probeable claim ("which SDK, what did your layer do, how did you handle threading?"), **Tanglewood's business line is literally "technology integration"** so it's the bullet their interviewer drills hardest, and if it collapsed it would contaminate the **Logitech G29** claim — which is fully genuine and much stronger.

**Handled:** bullet put on HOLD in the Tanglewood variant with a safe replacement (*"Integrated camera-tracking, motion-capture and broadcast hardware into Unreal, feeding live transform data into real-time productions"*), §6 reframing row rewritten with a do-not-use warning, and new **fact base §14** documenting the drift chain and the open question. Noted that the C++ SDK-integration story stands without this bullet anyway, since Logitech (Montra) and the UPL/JNI bridge (UE_Gemma) are both already on the resume and both fully documented — so pulling it costs almost nothing.

**Open question to Sanjyot:** for stYpe/Mo-Sys, XSens/Qualisys and Blackmagic — did he write C++ against those SDKs, or configure the vendors' Live Link plugins and build logic on top? If the former, the bullet returns with specifics; if the latter, the safe version stands.

**Process lesson recorded:** the §6 reframing table is a *suggestion* layer, not a fact layer. Entries there must be re-verified against the portfolio before being promoted into any resume — reframing may change emphasis and vocabulary, never the verb describing what he actually did.

**Confirmed and corrected (2026-08-02): "I have not written anything in C++ for those SDKs."** The bullet is dead permanently. The C++ third-party SDK claim now rests solely on **Logitech G29** and the **UPL/JNI bridge** — both fully documented and both stronger than what was removed.

**Full audit of the §6 reframing table run as a result — it found a second fabrication.**

| Row | Verdict |
|---|---|
| Hardware SDKs → "wrote C++ integration layers" | 🚨 Fabricated. Removed. |
| Version control → "running Perforce for binary-heavy engine projects" | 🚨 **Second overclaim.** His old resume says **GitHub was primary**, Perforce for *specialised* projects. My reframe invented a rationale ("binary-heavy") and implied Perforce was the main system. **This one had leaked into the live A+ resume** as "owned Perforce source control studio-wide" — and into the Tanglewood variant, where Perforce is a *named JD requirement*, making it the worst possible place to overstate. |
| MR cricket → "three tracking systems" | ⚠️ Inaccurate (the three are headset, Mo-Sys, Unreal — Unreal isn't a tracking system). Corrected to "coordinate systems". Never leaked; the resume bullet was already right. |
| Stadium-to-CDN, performance budgets, rendering standards, VP workflows | ✅ Supported. |

**Two fabrications in seven rows, both the same failure mode: fact kept, verb or specifics upgraded.**

**Corrections applied to both live documents** (`base-resume.md` and the Tanglewood variant): the hardware bullet is now *"Integrated camera-tracking, motion-capture and broadcast hardware into Unreal, feeding live transform data into real-time productions"*; source control is now *"standardised… on GitHub with Perforce for specialised projects"*, near-verbatim his own prior wording. The Tanglewood covering message also updated to name **Logitech** explicitly rather than "an undocumented hardware SDK", so the strongest genuine integration claim is unambiguous and can't be confused with the removed one.

**Binding process rule recorded in §14b:** the §6 table is a *suggestion layer*, not a fact layer. Reframing may change emphasis and vocabulary; it may never change the **verb** (integrated ≠ wrote), the **technical specifics** (which system was primary, how many of what kind), or the **rationale** unless he gave one. Any row promoted to a resume must first be traced to a portfolio page, brief, or the old resume — and quoted, not paraphrased from memory.

---

### Aura project description rewritten (2026-08-02)

Sanjyot pushed back on the Aura description in `assets/docs/Sanjyot-Dahale-Unreal-Programmer.pdf` — "just a bunch of keywords… a bit too much." **Agreed, and the diagnosis went further than his objection.**

**What was wrong:** a colon followed by six comma-separated noun phrases — a keyword list wearing a sentence's clothing. Compare UE_Gemma, which he doesn't object to: there every technical term is attached to a capability, constraint or outcome ("running a 270M LLM fully on-device and offline", "driving five gameplay actions from speech or text"). Aura's listed six systems with the *why* stripped out to fit more nouns. Same instinct that produced the 57-item skills block, resurfacing in the project section after being cut from skills.

**The stronger reason to fix it, which Sanjyot hadn't named: enumerating the complete feature set of a known course project is the strongest possible signal that you followed the course.** To an interviewer who recognises it, the list reads as a syllabus — because it is one. Naming fewer systems and showing more judgment reads as genuine self-directed study, so the cut helps twice. ATS cost is ~zero: GAS and EQS are already in the skills section, and nobody searches a candidate database for "VCM".

**New description adopted (option A of three offered):** *"Five months learning Unreal's Gameplay Ability System by building a playable top-down RPG: attributes, effects and cues, EQS enemy AI, and save/load. Gameplay cues are split into replicated and non-replicated paths, so cosmetic VFX never spend RPC budget reserved for authoritative gameplay. The passive-ability system is my own work; the rest follows the course."*

**Governing rule recorded: one technical detail explained properly beats six listed flat.** The featured detail is marked **provisional** — it occupies the interviewer-bait position and will draw the first question, so it must be one he can defend cold. Question reframed for him: which system could he talk through for five minutes with the code closed, explaining *why* it's built that way and what breaks if it isn't? Candidates offered: meta-attribute damage validation, replicated vs non-replicated cues, curve tables + execution calculations, EQS enemy positioning, `SaveGame` serialization, MVVM vs VCM. **A detail he can't defend is worse than no detail.**

**Course naming — his call, and I agreed.** He wants to keep the course name for interview, arguing "course-guided" on the resume is transparency enough. Agreed: the material fact is the guidance, which is disclosed; the course's name is a detail that belongs in conversation. No gotcha risk remains either — if an interviewer recognises the project, the label has already conceded the point, so recognition becomes confirmation rather than exposure. **One condition attached:** if asked directly he must answer immediately without hedging, since hesitation would undo what the label bought. Also advised keeping the project's real name — retitling to something less recognisable would look like concealment in a way the current version doesn't.

**Bow & Arrow restored** (he'd dropped it from the latest export). It now carries extra weight as the only project that is entirely his own work — which is the underlying balance problem the Aura rewrite addresses. Description lightly tightened; optional animation clause noted for animation-heavy JDs ("with retargeted Mixamo animations and AimOffset aiming").

**Aura featured detail locked: meta-attribute damage validation (2026-08-02).** Sanjyot chose it from the six candidates. Final description: *"Five months learning Unreal's Gameplay Ability System by building a playable top-down RPG: attributes, effects and cues, EQS enemy AI, and save/load. Incoming damage routes through a meta attribute so the server validates it before it touches Health, keeping authoritative stats out of clients' reach. The passive-ability system is my own; the rest follows the course."*

Better than the cue/RPC-budget alternative because the justification is **architectural** (server authority) rather than performance — so the inevitable follow-up question has a real answer instead of trailing into "it was cheaper". Interview prep noted for him: the defining property to know cold is that **meta attributes are transient and not replicated**, existing only for the duration of effect application; plus why a meta attribute beats validating inside each ability (a single choke point every damage source funnels through), and that the calculation itself happens in a server-side execution calculation.

**Base resume is now final and ready to re-export.** Tanglewood variant is unblocked — sponsor row verified, overclaims corrected, covering message drafted.

**Featured technical detail removed from Aura (2026-08-02).** Sanjyot flagged the meta-attribute sentence as forced. **He was right, and the fault was the rule, not the sentence.** The sentence's subject was "incoming damage" rather than him or the project — documentation dropped into a paragraph about what he built and what's his — with a trailing clause ("keeping authoritative stats out of clients' reach") that merely restated the one before it. Redundancy is what padding feels like.

**Root cause: I turned "feature one detail" into a rule and applied it as a template** — pick detail, insert sentence — which is exactly how it read. An overcorrection from the 57-keyword problem into a different artifice. Second time this session that a mechanical rule produced worse writing than judgment would have.

**Replaced by a principle rather than a rule:** for a course-guided project the description has four jobs — name the framework, show it was substantial, disclose the guidance, claim what's his. A technical detail advances none of them; credibility comes from the disclosure and from the *other* projects, not from proving he knows what a meta attribute is.

**Final Aura description (35 words):** *"Five months learning Unreal's Gameplay Ability System by building a playable top-down RPG: attributes, effects and cues, EQS enemy AI, and save/load. The passive-ability system is my own; the rest follows the course."*

Alternative recorded for if he ever wants to steer the interview, phrased in his own voice so it invites rather than lectures: *"The part I'd want to talk about is server authority — why damage goes through a meta attribute instead of straight at Health."*

**Option B withdrawn (2026-08-02).** Sanjyot challenged whether the conversational alternative — *"The part I'd want to talk about is server authority…"* — actually works on a resume. **It doesn't, and it was offered as padding**: presented to make option A look like a considered choice rather than the only sensible one. Third instance this session of over-production caught by Sanjyot.

Why it fails: first-person-conditional is a **tonal seam** in a document where every other line is declarative and impersonal ("Ported a PC-VR title…", "Wrote the multiplayer core…"); **seven words of framing** precede any information, on a document where 57 skills were cut to 26 for economy; it **answers a question the reader hasn't asked**, reading as presumptuous before an interview decision or anxious after one; and it **doesn't survive skimming**, with the substance buried behind scaffolding.

**Constructive placement recorded:** that conversational register belongs in the **covering message**, which is genuinely addressed to a person — the Tanglewood note already uses it well ("I write my projects up in detail, including the decisions I got wrong"). On the resume itself, a topic worth surfacing becomes a plain noun phrase in the skills list (e.g. `Server-authoritative gameplay`), never an aside.

**Meta-observation for future sessions:** three corrections this session all trace to the same failure — converting instinct into mechanical rule, or generating alternatives to appear thorough rather than because they were viable. Sanjyot catches these reliably because the output stops sounding like him. That instinct is a better check on this document than any checklist in it.

**Aura description, final form (2026-08-02).** Sanjyot pushed back again — option A now felt *too short*. Correct: **I over-cut, stripping content along with the padding.** The 35-word version described GAS as a technology and said nothing about the game, leaving five months of work looking lighter on the page than UE_Gemma's 52 words. **The fix for a thin description is substance about the work, not more technical vocabulary.**

**Final (57 words):** *"A playable top-down action RPG, built over five months to learn Unreal's Gameplay Ability System properly. Aura fights through multiple levels with six levellable elemental abilities, an attribute and spell-point progression economy, four enemy types with their own AI, and checkpoint save/load. Designed PvE multiplayer-ready. The passive-ability system is my own; the rest follows the course."*

Everything added describes the **game** — scale, progression, enemies, persistence — rather than framework internals, so a reader can picture it instead of decoding it. It also leads with the artifact rather than the framework, which reads less like coursework while keeping the learning intent honest and in the first sentence.

**All facts verified against `_projects/aura-gas.md`:** multiple levels · 4 active + 2 passive abilities each independently levellable · XP → attribute + spell points · Goblin/Shaman/Ghoul/Demon · checkpoint save/load · PvE multiplayer-ready. **One caveat flagged:** the site says multiplayer-ready *except* save/load, so "Designed" is a deliberate softener — if asked whether save/load is replicated the answer is no and he should say so immediately. The sentence isn't load-bearing and can be dropped if he'd rather not defend it.

**Arc of this single description across the session:** 60-word keyword list → 35-word over-cut → 57-word substantive version. Both failures were mine and both were caught by Sanjyot's ear rather than by any rule in these documents.

**Aura honesty clause removed from the body (2026-08-02).** Sanjyot flagged the closing line — *"The passive-ability system is my own; the rest follows the course."* — as still bugging him. **Correct, for three reasons:** it disclosed a second time when the subtitle already says "course-guided study project"; it **quantified how little was his**, inviting the reader to compute two passive abilities out of a whole game; and the semicolon made it a concession sandwich — claim immediately undercut.

**It also contradicted a decision already taken.** When asked earlier about naming the course, Sanjyot said the label was transparency enough and I agreed. Repeating the disclosure in the body was belt-and-braces on a settled point, and **redundancy on a sensitive point reads as anxiety rather than candour** — the opposite of the intended effect.

**Position now: the disclosure lives in the subtitle and only there** (`Solo Developer · course-guided study project`), where it's the material fact and sits above the description, more visible than a closing line. The passive-ability authorship is still worth saying **out loud in an interview**, where it lands as a detail rather than a ratio.

**Final Aura entry (~48 words):** *"A playable top-down action RPG, built over five months to learn Unreal's Gameplay Ability System properly. Aura fights through multiple levels with six levellable elemental abilities, an attribute and spell-point progression economy, four enemy types with their own AI, and checkpoint save/load. Designed PvE multiplayer-ready."*

**"Undocumented" retracted from the Logitech claim (2026-08-02).** Sanjyot corrected me: Logitech supplied a **PDF API reference** covering function signatures, syntax and behaviour. The SDK *was* documented. **"Undocumented" was my word, not his, and it's false.**

**Third instance this session of the same failure mode** — taking a real fact and sharpening it into something punchier but untrue (after "wrote C++ integration layers" and "Perforce studio-wide"). The tell is consistent: reaching for a more dramatic adjective when the accurate one already carried the point.

**The accurate framing is stronger anyway.** What was missing wasn't documentation of the API — it was any **Unreal** path: no plugin, no guidance on wiring a C-style `.dll`/`.lib` into Unreal's Third-Party Plugin template, and he'd never built that kind of plugin before. Plenty of engineers have integrated a documented SDK; far fewer have brought raw libraries into Unreal's plugin system with no precedent. **"No Unreal support" is both true and the difficulty an engineer actually recognises.**

**Corrected bullet:** *"Built an Unreal third-party plugin around Logitech's G29 SDK, which ships as raw .dll and .lib files with no Unreal support, and exposed it to Blueprint."* Applied to the Tanglewood variant, its covering message, and fact base P3 (with a permanent do-not-use note on "undocumented").

**⚠️ Site inconsistency surfaced and left for Sanjyot:** `_projects/montra-electric.md` says *"There was no Unreal plugin and no documentation for it"* in one sentence and *"used Logitech's provided API reference to expose their functions"* two sentences later. Those contradict, and the site is what an interviewer reads. Worth tightening the first phrase to "no Unreal plugin and no Unreal integration path".

**Base resume finalised (2026-08-02).** Latest export addresses all five outstanding notes: "Meta Quest Store" restored to the summary, the "Tech lead now, looking to stay hands-on" clause restored (it pre-empts the overqualification read), Publications moved above Certifications, Logitech's G29 SDK named without the false "undocumented", "Mobile performance" corrected to sentence case, and the VP role reordered to lead with the SMPTE camera-alignment bullet. Bold density is 4 spans across the whole document; spelling and punctuation consistent; two pages.

**One substantive note remaining:** the summary says *"rebuilt a **live-broadcast** product from Blueprint to C++"* — planting "broadcast" in the first three lines of a resume whose entire strategy is de-emphasising broadcast. The experience bullet below already calls it "a live mixed-reality product"; recommended using that wording (or just "a live product") in the summary, since mixed reality reads as adjacent-to-games while broadcast reads as another industry.

**Variant note recorded:** the base trimmed *"raw .dll and .lib files with no Unreal support"* from the Logitech bullet and *"desktop GPU to mobile chip"* from the port bullet. Fine for a general base, but **both must be restored for Tanglewood**, where porting and integration difficulty is the entire proposition.

**Also noted:** page 2 is ~half empty, so the **Fielding Pod / data-driven scenario system** bullet can return as a straight swap against the Logitech bullet whenever a JD leans gameplay rather than tools — it remains his strongest independently-authored gameplay evidence.

**✅ Base resume complete (2026-08-02).** Summary fixed — "live-broadcast" → "live mixed-reality product", removing the last instance of the de-emphasised domain from the highest-value real estate. Skills also resolved into a clean 3×2 grid (Languages/Unreal/Networking, then Performance/Tools/Platforms) with every entry fitting one line at column width.

**Full final verification pass:** every claim re-checked against the fact base — 7-person team, Meta Quest Store, platform call/budgets/certification, 68–72 vs 30–40 FPS, Logitech G29 SDK wording, 10–15% crash rate, 25→125 instances, 1,000+ players crash-free, SMPTE and three coordinate systems, hardware integration (no C++ overclaim), GitHub-primary/Perforce-specialised, and all three project descriptions. **All accurate and defensible.** Dates consistent, bold at 4 well-spaced spans, British spelling held throughout ("Behavior Trees" correctly left American as Unreal's class name), periods on every bullet. Two pages.

**Site synced:** `assets/docs/Sanjyot-Dahale-Unreal-Programmer.pdf` copied over `assets/docs/resume.pdf`, so the portfolio's Resume button now serves the current document.

**Document is finished — further edits would be churn.** Remaining work is application execution, not writing: Tanglewood (restore the two difficulty clauses, apply variant, send), the Supercell location inquiry, the Bangalore notice question, and the Unreal Insights evening.

**Resume file housekeeping complete (2026-08-02).** Sanjyot updated all site references from `resume.pdf` to `Sanjyot-Dahale-Unreal-Programmer.pdf` and deleted the four superseded PDFs. Verified: the three source references (`_includes/header.html:22`, `_includes/footer.html:25`, `_layouts/home.html:674`) and every generated page under `_site/` all point at the new filename; `assets/docs/` now contains exactly one file (66,439 bytes, matching the verified final export); no broken references anywhere in the site source. The lone surviving mention of "resume.pdf" is prose in `design_handoff_portfolio_site/README.md:229` describing a generic folder layout — not a link.

Removing the duplicates also eliminates the drift risk that was flagged: with a single canonical file there's no stale copy to silently fall behind the next export.

**Resume workstream closed.** Remaining work is application execution only: Tanglewood (restore the two difficulty clauses, apply the variant, send), the Supercell-backed location inquiry, the Bangalore notice question, the Unreal Insights evening, and a LinkedIn pass to match the resume's title, dates and six-year figure.

---

### LinkedIn audit (2026-08-02) — `_career/linkedin-audit.md`

Sanjyot supplied `assets/docs/LinkedinProfile.pdf`. Audited against the final resume and `_data/experience.yml`. **Verdict: do not apply until four critical items are fixed** — the resume carries his LinkedIn URL, so a recruiter is one click from every contradiction.

**🔴 CRITICAL**

1. **Title contradiction: LinkedIn says CTO, resume says Lead Unreal Engine Developer & Tech Lead** — same company, same dates. When asked earlier which title was on payroll and LinkedIn, he answered "Lead UE Developer & Tech Lead", but LinkedIn shows **Chief Technology Officer**. Beyond the mismatch, "CTO" applying for a mid-to-senior IC programming role reads as bored/expensive/short-stay and invites "why is a CTO applying for this?" before any bullet is read. **Blocking question put to him: what is the title of record on payroll and contract?** Three paths mapped — if CTO, the resume must say CTO and the summary carries the hands-on-small-studio-CTO story; if Lead, LinkedIn is simply wrong and gets corrected; if both, use "CTO & Lead Unreal Engine Developer" everywhere.
2. **VP Supervisor dates differ by 18 months** — LinkedIn Aug 2020–**July 2024** (overlapping the CTO role) vs resume Sep 2020–**Jan 2023** (clean succession). The clean version reads better and is already on the resume.
3. **Degree named differently** — LinkedIn "Computer **Science**" at Shivajirao S Jondhale College; resume "Computer **Engineering**" at University of Mumbai. The degree name is a verifiable credential and one is wrong. Institution difference is reconcilable (SSJCOE is affiliated to Mumbai University); recommended wording for both: "Shivajirao S. Jondhale College of Engineering, University of Mumbai".
4. **Two email addresses** — `sanjyot.dahale@gmail.com` on LinkedIn vs `sanjyot.code@gmail.com` on the resume.

**🟠 HIGH:** "Google Workspace" occupies one of three **Top Skills** slots on a games programmer's profile — actively harmful; replace with C++ / Unreal Engine / Gameplay Ability System. Unity dates off by a month at both ends (third date discrepancy — starts to look like carelessness). Typo **"Architechture"** in the summary's first paragraph. English listed as "Professional Working", below "Full Professional", contradicting the resume's "Fluent" and understating him for UK/EU applications. Location Thane vs Mumbai.

**🟡 MEDIUM:** the summary leads with CTO, lists **Virtual Production** as a specialism (the domain he's leaving), puts Game development third of four, and **buries his best line** — *"currently spearheading R&D for AI-driven interactivity in Unreal Engine applications"*, which is exactly what the Supercell-backed role asks for. Experience bullets are the **old resume verbatim**, still carrying "Managed a cross-functional team of 7 through the full SDLC" and leading with the stadium-to-CDN broadcast pipeline — no Quest port, no performance numbers, no Montra, no Blueprint-to-C++ rebuild. **No Projects section at all**, so Aura, UE_Gemma, Bow & Arrow and Riddler's Ransom are invisible to anyone who finds him via LinkedIn.

**✅ Genuinely good, and one useful discovery:** the portfolio link is present, the SMPTE publication is listed, and **the GAS course is already listed under Certifications** as "Unreal Engine 5 - Gameplay Ability System - Top Down RPG". That means his LinkedIn already discloses the course publicly, so the resume's "course-guided study project" label is **consistent with his public record** rather than a one-off admission — a stronger honesty position than previously realised. Also confirmed the "7 years at Liminal" (LinkedIn) and "six years in C++ and Blueprint" (resume) don't contradict: the first year was Unity, Unreal starts 2020.

**LinkedIn title question resolved (2026-08-02).** `[SD]` **There are no official CXO roles at the company** — he is CTO in substance because nobody more technically senior exists at a small XR startup.

**Decision: `Lead Unreal Engine Developer & Tech Lead` everywhere; LinkedIn changes to match the resume.** Reasoning recorded: no formal CTO title exists on contract or payroll so nothing contradicts the Lead title, and **the absence of a formal title is what creates legitimate latitude** — not licence to inflate, but licence to pick the accurate description that fits the audience. More importantly, **"CTO" invites a title-inflation read**: a games hiring manager seeing CTO on a small XR studio profile, then bullets about porting a VR game and tuning frame budgets, may decide the title is puffed, which discounts everything else on the page. **A title must be congruent with the evidence beneath it**, and his evidence is hands-on engineering. It also pre-empts "why is a CTO applying for an IC role?" — flight risk, salary, boredom.

**CTO substance kept but relocated** into the description (technical direction, hiring, SOPs, R&D leadership), where it reads as scope rather than claim; LinkedIn has room the one-page resume doesn't. **Interview line recorded:** *"Functionally I'm the most senior technical person there — we don't have formal C-level titles, but I own what a CTO would own at that size."* **Situational exception noted:** for Principal / Technical Director / startup roles the CTO framing becomes an asset and should be surfaced — same facts, different accurate emphasis for a different audience.

**Also settled:** VP Supervisor dates and degree name will be corrected on LinkedIn to match the resume. Email stays `sanjyot.code@gmail.com`, deliberately separated for job-search organisation — so **LinkedIn must be updated to that address**, since recruiters use whichever they find first.

**Replacement LinkedIn copy written** into the audit file: a keyword-carrying searchable headline ("Unreal Engine Programmer — Gameplay & Systems | C++ | Shipped Meta Quest Store title | Open to relocation"), the corrected experience title, and a full summary rewrite that leads with *programmer* rather than CTO, drops Virtual Production as a stated specialism, and **promotes the AI-tooling R&D from the last clause of the last bullet into its own paragraph** — it's the requirement the Supercell-backed role names explicitly and almost no competing candidate can evidence.

**LinkedIn first pass reviewed (2026-08-02).** Sanjyot applied most of the audit. **Fixed:** title → `Lead Unreal Engine Developer & Tech Lead`; VP Supervisor dates → Sep 2020–Jan 2023; Unity dates → Aug 2019–Sep 2020; degree → University of Mumbai, Computer Engineering; "Architechture" typo; English → Full Professional with Hindi/Marathi added; Google Workspace removed from Top Skills; current-role bullets ported from the resume; VP role now leads with the SMPTE bullet; Unity role given a description. All four CRITICAL contradictions with the resume are resolved.

**Five items still open, one of them an unintended loss:**

1. **The AI/GenAI R&D mention has vanished from the profile entirely.** The old bullet ended *"currently spearheading R&D for AI-driven interactivity in Unreal Engine applications"*; replacing that bullet dropped the line and it didn't land anywhere else. **It is now nowhere on LinkedIn** — and it's his strongest differentiator for the Supercell-backed role, which names AI-assisted development as an explicit expectation. Flagged as the item he'd be least likely to notice himself.
2. **Top Skills are `Gameplay Programming · FunctionGemma · Gemma`.** Google Workspace is gone (the urgent part), but two of three slots now hold **model names with near-zero recruiter search volume**, while `C++` and `Unreal Engine` — the highest-value search terms in his field — are absent entirely. LinkedIn recruiter search leans heavily on skills.
3. **Email still `sanjyot.dahale@gmail.com`**, not the job-search address.
4. **Summary unchanged** — still lists Virtual Production as a specialism, Game development third of four, no AI, no "open to" statement. Highest remaining leverage; rewrite already sits in the audit file.
5. **The broadcast bullet took Montra's place** — the current role ends with the stadium-to-CDN pipeline while the **multiplayer-core bullet is missing**. Wrong trade: multiplayer argues for the target roles, broadcast argues for the domain he's leaving.

**Also flagged for checking on the live profile** (may be PDF-export artifacts): the summary exports as `Developer &amp; Tech Lead` with sentences running together (`in 2020.As Lead…`), and `-Built an Unreal third-party plugin` is missing the space after the hyphen. Projects section still absent.

**AI/GenAI copy written for LinkedIn (2026-08-02).** Sanjyot asked for help rewriting the vanished AI point; he'll write his own summary (my draft in the audit file didn't suit him), so the material was supplied as **drop-in components** rather than a full summary rewrite.

Two current-role bullets: leading studio R&D on AI-assisted development embedded in day-to-day workflows, plus the generative-AI client kiosk (model selection against quality/latency/per-image cost, working prototype the web developer took to production). Wording deliberately preserves the ownership boundary — he designed the workflow and built the prototype; the web dev reimplemented in JavaScript — and keeps Vodafone Idea and India Mobile Congress anonymised per fact base §13.

Summary paragraph supplied with a short variant. **The load-bearing sentence is "AI is part of how I work rather than something I'm evaluating"** — the Supercell-backed JD says adoption "as a core part of your day-to-day workflow is *expected*", phrasing that suggests they've been burned by candidates claiming openness they don't practise. Stating it as current practice and immediately backing it with a shipped artifact separates him from aspirational answers.

**Boundary recorded:** do not stretch this toward ML engineering. He fine-tuned an existing model using a reference notebook and a self-generated dataset — impressive for a gameplay programmer, and that is the claim; "ML engineer" would collapse in a technical conversation.

**Item 2 closed:** Top Skills render correctly on the live profile; the PDF export was misrepresenting them. Audit was working from the export, so his view of the live page governs.

**LinkedIn v2 reviewed (2026-08-02) — `assets/docs/LinkedinProfilev2.pdf`.** **Fixed:** Top Skills now `Unreal Engine · C++ · Gameplay Ability System`; AI/GenAI restored in *both* the summary and a current-role bullet; Montra multiplayer-core bullet added; **Game development moved to first** in the specialism list (was third); `&amp;` and run-together sentences resolved; bullet hyphen spacing fixed; Riddler's lead + port merged into one bullet.

**Four items remaining:**

1. **"Later rebuilt" has the chronology backwards.** The bullet reads as though the game shipped to the store and *then* got ported. Actual sequence: PC-VR jam prototype → rebuilt for standalone Quest 3 → certification → store release. As written it **undersells the port**, since the port is what made shipping possible. Replacement supplied that leads with the rebuild and ends with certification and release.
2. **Nothing on the profile states he's looking.** The summary describes what he does but never says what he wants; the site says "looking for a full-time role in game development" and LinkedIn doesn't. Recommended adding a closing line **and enabling LinkedIn's "Open to Work" with recruiters-only visibility** — invisible to his current employer, but that availability filter is used constantly in recruiter search and he's currently excluded from it. **Largest remaining functional gap on the profile for an active search.**
3. **Email still `sanjyot.dahale@gmail.com`** (third mention) — likely the account email rather than contact-info; fix is to add `sanjyot.code@` as a second address and set it primary.
4. **"RnD" in the summary vs "R&D" in the bullet below it.**

Projects section still absent (Aura, UE_Gemma, Bow & Arrow, Riddler's) — public repos invisible to anyone arriving via LinkedIn rather than the portfolio. Not blocking.

**LinkedIn aligned with the resume (2026-08-02).** Email updated to `sanjyot.code@gmail.com` and the Riddler's bullet adopted the ownership-based phrasing ("Set the engine choice and optimisation order that took it from a PC-VR prototype at 30–40 FPS to standalone Quest 3 holding 68–72"), resolving both the reversed chronology and the "We rebuilt" first-person-plural seam.

**Full cross-check passed:** title, all three date ranges, degree, 68–72/30–40 FPS, 10–15% crash rate, 25→125 instances, 7-person team, SMPTE, languages — LinkedIn and the resume now agree on every checkable fact. **No overclaims present:** the hardware bullet retains "integrated" rather than the retracted "wrote C++ integration layers", and the hiring claim is backed by the confirmed 10 hires.

**Two minor items open:** "RnD" in the summary vs "R&D" in the bullet below it; and the availability signal — the summary still doesn't state what he's looking for, and "Open to Work" (recruiters-only) cannot be verified from a PDF export, so he needs to confirm it's enabled. Projects section still absent (non-blocking).

**Both job-search documents are now complete and mutually consistent.** Remaining work is entirely application execution.

**Summary rewritten to stop duplicating the bullets (2026-08-02).** Sanjyot spotted that the resume summary repeated the current-role bullets — **"built the multiplayer core of a four-player racer" appeared verbatim in both**, roughly six inches apart, with "Meta Quest Store" and "Blueprint to C++" also repeating. All three of the summary's artifacts were bullets 1, 5 and 4 in compressed form. **He was right.**

**Diagnosis: the summary was a table of contents for the bullets rather than a frame for them** — doing the same job with less detail, which is exactly why it read as redundant. **A summary can do what bullets structurally cannot:** bullets are atomised and backward-looking, each describing one thing that happened; only the summary can state who he is, what kind of work he's good at, and what he wants next. The one line already doing that job — "Tech lead now, looking to stay hands-on" — was the strongest part of the paragraph.

**New summary (45 words):** *"Unreal Engine programmer, six years in C++ and Blueprint, across gameplay systems, multiplayer and engine tooling. Shipped a Meta Quest Store title; most of the rest ran on expo floors and live production under fixed frame budgets. Tech lead now, looking to stay hands-on."*

Adds **range** ("gameplay systems, multiplayer and engine tooling"), which no single bullet can convey, and **conditions** ("expo floors and live production under fixed frame budgets"), which characterise *how* he works rather than re-listing *what* he did — the through-line connecting Riddler's, Montra and the MR product, and genuinely distinctive since most candidates have never shipped something that had to work first time in front of an audience. **"Meta Quest Store" retained as a deliberate exception** — his most credible single phrase and the one that survives a ten-second scan, so it earns its one repetition.

**Trade-off recorded:** a summary-only reader now learns less about specific achievements and more about shape and fit. Judged correct at two pages, since bullet 1 sits immediately below and names Riddler's Ransom anyway — nothing is lost, it just isn't said twice.

**Summary adopted, one optional note (2026-08-02).** Sanjyot took the reframed summary but dropped the closing clause "under fixed frame budgets". Flagged as optional: that clause converted a statement about *venues* into a statement about *engineering* — as it now reads ("most of the rest ran on expo floors and live productions") it says where the work was deployed but not what was technically hard about it, and could describe a producer or AV engineer. It's the through-line connecting Riddler's, Montra and the MR product. Left to him, since shorter is a genuine virtue and the frame-budget story is still carried by the bullets and the Performance skills group.

**Resume declared finished.** Duplication resolved, range present, "Meta Quest Store" retained as the single deliberate repetition. No outstanding issues on either the resume or LinkedIn.

---

### Dinobyte Softworks — volunteer application answer (2026-08-02)

Sanjyot is applying for a **part-time unpaid volunteer programming role** at indie team Dinobyte Softworks and asked how to answer "Why are you interested in joining the team?"

**Framing given:** for an unpaid volunteer role the question is really *"will you still be here in two months?"* — the failure mode that kills indie volunteer teams is enthusiastic joiners who evaporate, and a senior candidate *raises* that worry rather than settling it. Second silent concern: will a Lead with six years and a published paper come in and take over a small volunteer team. So the answer must say why *them* specifically, make the motivation legible, show contribution without CV-dumping, and be concrete about hours.

**Review of his draft:** opening is good and worth keeping — the pivot from "six years across domains" to "games have always been the pull" is true and in his voice. Two problems: **(1) it's all appetite, no offer** — both sentences are "I love / I would love", nothing about contribution or commitment, which reads exactly like every answer from someone who disappeared in three weeks; **(2) "the kind of games this studio is working on" would arrive unchanged at any indie studio** — it proves taste alignment, not that he's looked at their work. Smaller: "make them feel" stops short (defensible as an absolute construction but reads as a dropped word), "the kind of games that I..." repeats twice in one breath, first sentence runs ~40 words.

**Revision supplied** keeping his opening, adding a second paragraph with contribution, the explicit "I want to be part of a game team rather than run one" (important reassurance for a small team receiving a Lead), and an under-promised hours figure with the line *"I'd rather give a number I'll actually hit than over-promise and drift off."*

**Advice recorded:** pick an hours number he'd hit in a bad week, not a good one — he's mid-search with three live applications, a notice period and a possible international move. **Don't frame it as filling a CV gap** even though it does; transactional framing is visible to volunteer teams. **Prompt flagged:** naming narrative games as his passion opens "which ones, and what did they do well?" — his portfolio is systems-and-performance heavy, so it's the one claim his public work doesn't back up, and he should have real answers ready.

**Strategic note:** this is a good move — it targets his single biggest CV gap (no experience inside a game team) and reads well to studios like the Supercell-backed one — but it must not slow the three live applications, which have windows in a way this doesn't.

**Dinobyte advice corrected (2026-08-02).** Sanjyot clarified the Google Form already captures **resume, portfolio and weekly hours (he answered 10–15 hrs/week)** as separate fields. That invalidates the second paragraph I'd suggested — "what I'd bring: C++ and Blueprint…" and "I can commit X hours" would both **repeat answers they already have**. Same principle just applied to the resume summary: if it's captured elsewhere on the same document, it isn't earning its space. **His instinct to keep the answer purely about motivation was closer to right than my revision.**

**What the answer still must do:** say why *them* specifically (unchanged — his sentence would arrive identically at any indie studio), and resolve the question his own resume creates. They'll read six years, a Lead title, a shipped Quest title and a published paper, then look at an unpaid volunteer application — so *"why does this person want this?"* and *"is he going to try to run our project?"* are unavoidable. **The resume creates that question, so only this field can answer it**, which makes it worth more than any other addition.

**Revised answer supplied:** his opening kept, plus a short second paragraph — *"My professional Unreal work has mostly been XR and real-time applications, and where it has been games, I've been the one leading them. What I want here is different — to work on a game I'd genuinely play, as part of a team rather than running one."* Does three jobs at once: explains the appeal of an unpaid indie role to someone at his level, signals he isn't arriving to take over, and makes the motivation sound durable rather than a passing enthusiasm — which is what they're actually screening for. 10–15 hrs/week judged a good number: believable and useful.

---

### Next portfolio project — plugin chosen over Aura extension (2026-08-20)

Sanjyot asked for a pro/con on two candidate portfolio projects: **(1) extending Aura with original features beyond the course content** — an idea I had pushed in earlier sessions — versus **(2) building an Unreal plugin for live IP video ingest (RTMP / RTSP / SRT)**, his own idea, drawn from his broadcast experience. He was upfront that he didn't know how hard the plugin would be.

**The case against Aura, including against my own earlier suggestion.** Aura's problem is *authorship* (gap G3 — only two passive abilities are his), and **you cannot out-build an authorship problem inside someone else's architecture.** Extending it shrinks the asterisk but never removes it: the honest label stays on the page either way, and what's on display remains feature-level judgment inside a design someone else made. Compounding this, the course is instantly recognisable to every UE hiring manager, so the artifact itself carries near-zero differentiation. It also closes none of the real gaps — no console, no game-team experience — and it is no longer load-bearing as personal proof now that UE_Gemma exists. **Recommendation: demote it (change `order`), leave the honest labelling exactly as written, and stop investing there.**

**Honest difficulty assessment of the plugin: hard but tractable — not research, not a weekend.** Unreal genuinely has this gap (Electra covers HLS/DASH/file, MediaIO covers SDI via vendor plugins, nothing covers IP streams). Doing it properly means implementing a Media Framework player module — `IMediaPlayer`, player factory, sample interfaces — so a standard `UMediaPlayer`/`UMediaTexture` just works. Real work sits in four places: third-party dependency wiring in a ThirdParty `.Build.cs` with per-platform binaries; decode threading feeding the sample queue with correct timing; YUV/NV12 → RGB **on the GPU**, or it eats the frame budget; and reconnect/timeout behaviour, which is what separates a demo from a plugin. Two things flagged up front: **the three protocols are not one feature** (RTSP is pull, SRT is caller/listener, RTMP is push-to-server and therefore a different architecture), and **licensing is a real decision** (FFmpeg is LGPL and turns GPL with certain components enabled; libsrt is MPL-2.0).

**What decided it in the plugin's favour: authorship, lane, rarity and story.** It's 100% his — which does more for the Aura problem than extending Aura does. It lands dead-centre in Tools-Pipeline, one of the three locked targets and the lane where the console gap costs least. Very few candidates have written a Media Framework player backend. And it carries **the best origin story in the portfolio**: two IPL seasons discovering RTMP wasn't stable enough, then building the ingest layer Unreal lacks. No other applicant owns that sentence — which matters disproportionately given every role requires sponsorship.

**The one serious objection, recorded because it doesn't go away: the plugin reinforces the exact broadcast pigeonhole he is trying to escape.** Mitigated, not eliminated, by three rules — demo it in a *game* context (a live feed on an in-game surveillance monitor), write it up as engine integration with streaming as the payload rather than the subject, and mention the broadcast history once as credibility rather than as category.

**Three conditions attached.** Scope to **RTSP only, Windows only, one stream to one texture**, with a measured latency figure (RTSP first because it's pull-model, easiest to test, highest everyday utility; SRT phase 2, RTMP phase 3). Defuse the pigeonhole as above. And run a **one-week go/no-go spike** with a single pass/fail question: can one decoded RTSP frame reach a material in Unreal? If yes, the rest is grind. If no, he's learned it cheaply — **and the fallback is explicitly not Aura.**

---

### Alternative project ideas considered (2026-08-20)

Before committing, he asked whether anything beat both options, adding a constraint: **he doesn't use and doesn't want to use creative software (Blender, Photoshop) — no art or DCC work.** Noted that this isn't a limitation but a filter that agrees with his strategy, since it points away from "make a game" and toward "make a tool." It is also a third argument against Aura: new abilities want VFX and animation, and a half-dressed ability reads worse than no ability.

**Reframe supplied: the 🚫 "explicitly NOT claimed" block in `master-resume.md` §8 is a shopping list, not a weakness list.** Console is unfixable and Lumen is irrelevant to his hardware; everything else on it is a project. Four alternatives generated on that basis:

- **A — Automated performance-regression harness.** Headless boot, scripted camera path, CSV profiler (`-csvprofile` + `PerfReportTool`) as the practical spine with Insights as the deep-dive layer, Gauntlet driving, build fails on regression. **Converts five 🚫s at once:** automated testing, CI/CD, Unreal Insights, Gauntlet, BuildGraph/UAT. Converts his manual `stat`-command profiling practice — the narrow-but-real documented gap — into its strongest version. Story shape matches the plugin's: *"six years holding 72 FPS by eyeballing stat unit on a device, so I built the thing that does it while I sleep."* Costs: unglamorous, no video, needs a self-hosted runner.
- **B — Asset-audit editor tool (Slate).** Scans a project against a budget config, sortable click-to-navigate report, also runnable headless in CI so it composes with A. Converts `Slate`, editor extension, asset registry, commandlets. Analyses art without making any. Safest and lowest-ceiling; his budget experience is what makes the thresholds credible.
- **C — MassEntity stress demo.** Tens of thousands of entities, data-oriented, with an A/B profiling comparison against a naive Actor implementation. Converts `Mass/ECS`. Looks impressive with primitives. Costs: thin documentation, version-volatile, and it's a demo rather than a tool.
- **D — Real PRs to a known UE open-source plugin.** The **only idea that produces collaboration evidence** — code review, someone else's conventions, a maintainer saying yes — which is the gap Dinobyte otherwise carries alone. A supporting move, not a headline.

**Ranking recorded: Idea A is genuinely competitive with the plugin** and beats it on two axes — more dead keywords converted, and zero pigeonhole risk. It loses on rarity and story, which is what earns a sponsorship conversation. **So the plugin stays the headline, and A is the named fallback if the spike week fails.** Also noted a real composition: phase 1 requires a measured latency figure, so building that measurement rig properly starts Idea A for free.

**Handoff.** Build work moves to a **dedicated repo and a separate conversation** to keep this portfolio repo clean. A self-contained handoff prompt was supplied covering background, strategic framing, constraints, the locked phase-1 scope, the spike gate, the early decision points (FFmpeg vs libsrt licensing, decode threading, GPU colour conversion, `.Build.cs` packaging, reconnect behaviour), and an instruction to ask questions and write no implementation code on turn one — the failure mode being a fresh agent generating speculative `IMediaPlayer` code before the licensing decision is made.

**Open item for this repo:** change Aura's `order` in `_projects/aura-gas.md` so it is no longer the first personal project shown. Not yet done.
