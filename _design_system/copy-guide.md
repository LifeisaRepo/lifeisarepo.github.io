# Portfolio Copywriting Guide — life is a repo

**Owner:** Sanjyot Dahale  
**Purpose:** Living reference for tone, voice, and copy decisions across the portfolio. Updated whenever a new section's copy is approved. Anyone writing copy for this site — including Claude — should read this first.

---

## Core brief

This is a job-hunting portfolio targeting **AA game studios**, with indie studios as a secondary audience. Its job is to make a hiring manager want to reach out. It is not a personal blog. It is not a hall of fame.

---

## Tone of voice

**Target:** Confident and competent, but humble. Matter-of-fact. Straight-to-the-point.

**Not:** Performative. Self-congratulatory. Try-hard. Cocky.

In practice this means:
- State facts. Let the work speak. Don't editorialize your own achievements.
- Short sentences carry more weight than long ones. Use them.
- If a claim needs the word "I" three times in one sentence to land, rewrite it.
- Dry wit is welcome but earned — one moment of personality is better than a running personality act.

**Patterns to avoid:**
- The "figured it out" refrain — *"I learn the stack," "outside my lane," "wired and shipped it anyway"* — currently appears 3+ times in the old copy. Once is a trait. Four times is a pitch.
- Lists of achievements framed as "I did X, I led Y, I owned Z" — this is résumé language, not portfolio language.
- Adjectives that you would have to prove — "innovative," "cutting-edge," "industry-leading."
- Em dashes. Sanjyot naturally avoids them; they also read as AI-generated to most readers. Use a period, a comma, or restructure the sentence instead.

---

## Career framing

Sanjyot's 6-year career is a mix of VR games, XR applications, live broadcast production, virtual production, and GenAI — not a traditional "games programmer" résumé. The copy should handle this as follows:

- **Don't apologise for it.** The non-games work was real, shipped, and technically demanding.
- **Don't oversell it as versatility.** That reads as defensiveness.
- **Frame it as range that comes with the job** — not as a deliberate brand. The tone is: "this is just what the last six years looked like."
- **Make the game passion legible without stating it.** The personal projects (Bow & Arrow, Aura GAS, UE_Gemma) and the VR game (Riddler's Ransom) do this work — copy should let them.
- The ideal signal to a hiring manager: *this person is grounded in game systems, has seen production pressure up close, and brings genuine range without making a big deal of it.*

---

### Standing curation rule (2026-10-13)

**Lead with the target, keep the range, cut only by quality.**
- **The top of every surface** (hero, first projects, skills headings) leads with the target
  roles.
- **Work from other fields stays,** lower and smaller.
- **A piece is removed only if it's weak or doesn't show what Sanjyot did.** Being from a
  different field is never the reason.

Source of truth: `_career/master-resume.md` §0.

---

## Devlog `description:` front matter — policy, locked 2026-09-25

**Descriptions are hooks, not summaries.** The rule: **name the problem, withhold
the resolution.** The title already gives the subject; the description's job is to
make that subject feel worth seven minutes. The failure mode is not "says what it
is about", it is "answers the question" — a snippet that resolves the tension
removes the reason to click through. Sanjyot's framing: like a news headline, a
not-so-obvious hook. *"We want people to visit the website, not just read the
description and leave."*

**Three fields, three jobs:** **title** carries the search term, **description**
carries the hook, **subtitle** carries the voice (human, mildly humorous — see the
2026-09-15 decision).

**Keep the problem concrete.** Google replaces meta descriptions it judges
irrelevant to the query with text lifted from the page, so a pure tease with no
anchors is likely to be discarded. Error codes and real symptoms (`GetLastError=126`,
"blocks the game thread") do both jobs at once: they match what was searched *and*
they are the part that creates curiosity. Hooks and keywords only conflict when the
*answer* is what gets included.

**Scope:** this applies to **narrative / problem-solving posts** (the IPStreamMedia
series). **Reference and tutorial posts state plainly what they teach** — someone
searching "unreal custom log category" wants confirmation they are in the right
place, and teasing them loses the click rather than winning it. `Log it Right` and
`Essentials #1` were deliberately left as plain statements.

**Length:** ~155 characters max. Google truncates past roughly that.

**The failure that produced this rule:** Devlog #5's first description read
*"Why FFmpeg DLLs fail to load in Unreal Engine with GetLastError=126: BtbN's builds
ship GNU-format import libraries that MSVC's /DELAYLOAD silently ignores."* — the
entire root cause, given away in the snippet. Rewritten to state only the symptom.
A second draft for #4 leaked the measured timings, which are that post's payoff
section. **Both failures were the same mistake: including the answer.**

---

## Approved copy — section by section

### Hero line (`.hero-line`)

**Approved:**
> Unreal Engine developer — six years across games, XR, and real-time production pipelines. The constraint is always the same. The domain keeps changing.

**Why this works:**
- Opens with the professional identity (already stated in the role line above, but this version adds the time dimension and the domain breadth in one breath)
- "The constraint is always the same" implicitly positions all his work — games, VR, broadcast — as the same fundamental real-time skill, without having to list or explain each domain
- "The domain keeps changing" is honest about the mixed career without being defensive; it reframes range as a natural outcome rather than a deliberate personal brand
- Short, complete sentences. No "I" anywhere. No achievement-claiming.
- Reads like an elevator pitch from someone who doesn't need to sell himself hard

**What was rejected and why:**
- V2 (listing specific shipped work): good for credibility, but too long for the hero — belongs in a project card or the about section
- V3 (dry wit, "came with the territory"): slightly too casual for a first impression; also contained a factual error (attributed ReFrame 360 shader work to going on air, which didn't happen)

---

---

### Skills subtitle (`.s-sub` under `#skills`)

**Approved:**
> Most of the range here came through production work — a brief landed in a new domain, and the skills followed. That's just how the years stacked up.

**Why this works:**
- Doesn't list any of the individual skills — that's the visual grid's job. A subtitle that lists everything ("XR, virtual production, broadcast, GenAI...") lets readers skim past the cards; this one creates a reason to actually look at them.
- "A brief landed in a new domain, and the skills followed" is honest about how the range was acquired without being defensive or martyrish — it's just what happened.
- "That's just how the years stacked up" was removed by Sanjyot — felt forced as a closer. The sentence ends cleanly at "the skills followed."
- Em dash is structural here (setting off an explanatory clause) — accepted same as the personal section exception.

**What was rejected:** "Engine and gameplay is the core" as an opener — redundant with the visually highlighted Engine & Gameplay card in the grid below. V1 (listing XR/broadcast/GenAI in the subtitle) was rejected because it pre-summarizes what the cards should show.

---

### Client work subtitle (`.s-sub` under `#client`)

**Approved:**
> Client work spanning six years and a lot of different domains. I led the technical teams on all of these projects and built the systems end to end, from architecture to delivery.

**Why this works:**
- Removes "Liminal" by name — the experience section above already names the company; the client work subtitle should be about the work, not the employer, and should stay valid regardless of how many companies Sanjyot has worked at
- Introduces a key fact not visible elsewhere on the page: he was technical lead, not just an implementer. He led teams AND personally built systems — both matter.
- Longer, more flowing prose — short punchy sentences work for the hero (scan context) but feel like bullet points deeper in the page. Sections 03+ warrant more connected prose.
- "A lot of different domains" is casual, honest, and avoids the defensive framing of "outside the standard games path"
- "Built the systems end to end, from architecture to delivery" signals seniority without listing achievements

**Key learning for deeper sections:** Don't write everything like an elevator pitch. The hero earns short punchy sentences because it's a scan moment. Further down the page, readers are leaning in — give them something that flows.

**What was rejected:**
- Short fragment endings ("Technical lead on all of them.", "All of it shipped.") — accurate but felt like bullet points
- Mentioning "Liminal" in the subtitle — redundant with the experience section and limits the line's longevity

---

### Personal & R&D subtitle (`.s-sub` under `#personal`)

**Approved:**
> The scope here is mine to define and goes as far as the problem needs. These exist because something — a mechanic, a system, an architecture question — felt worth following all the way to a working implementation.

**Why this works:**
- Opens from the nature of the work itself — not from what it lacks ("no brief, no deadline"). That framing was tried and rejected because it made the subtitle feel like V1/V2 (descriptive, transactional) rather than introspective.
- "The scope here is mine to define" states ownership without "I own every decision" — which read as assertive and slightly defensive in the original.
- "Goes as far as the problem needs" is matter-of-fact and implies depth without claiming it.
- "Felt worth following all the way to a working implementation" — the distinction between *understanding* something and actually *building* it signals real commitment to craft without editorializing.
- The em dashes around the parenthetical list are intentional and approved — exception to the general em dash rule. They work here because the dashes are structural (setting off a mid-sentence list) rather than stylistic, and Sanjyot signed off on keeping them.
- Ends on the work, not on what it reveals about his identity. An earlier draft ended with "the most honest window into what kind of game developer I'm trying to be" — rejected for reading as "pick me" in a portfolio context. Stopping at "working implementation" is cleaner; the section title "Built for myself." already frames the personal nature.

**Key learning:** When a closing line tries to editorialize what the work *means* about the person, it almost always reads as self-conscious. Better to end on what the work *is*.

---

### About section body (`.about-body`, 3 paragraphs)

**Approved (applied to `_layouts/home.html`):**
> I'm an Unreal Engine developer and technical lead with six years of experience across AR/VR, virtual production, and real-time applications. I started out as a Unity developer building AR and VR applications, then moved to Unreal Engine and into a Virtual Production Supervisor role. There I helped clients integrate VP workflows into their production pipelines and worked on-set across several live productions.
>
> I now lead a cross-functional team shipping Unreal Engine applications and games across multiple platforms, while also leading R&D for GenAI-based applications. Some of the work I'm most proud of came from projects like the MR Cricket Analysis and the 360 VR Broadcast, which pushed me well outside my domain and meant picking up entirely new skills along the way.
>
> Through all of it, game development has stayed the constant. Alongside the games I've shipped professionally, I keep building prototypes in my own time to explore new systems and mechanics — and it's the kind of work I'd like to be doing more of.

**Why this works:**
- **Tuned from Sanjyot's own draft (`aboutme.txt`), not rewritten.** The whole About was worked paragraph-by-paragraph in chat, line by line, to keep his voice and "soul." This is the one section where his original phrasing leads and the copy edits serve it — not the other way around.
- **Chronological, identity-first opener.** P1 opens with the role and time dimension, then traces Unity → Unreal → VP Supervisor. The career arc is laid out as plain fact, no editorializing.
- **"I now lead" bridges P1 → P2** by implying natural progression (the VP Supervisor work grew into the tech-lead role at the same place) without spelling it out.
- **MR Cricket Analysis and 360 VR Broadcast are named here on purpose** — they are landmark R&D projects that evidence out-of-domain capability. "Projects like" signals they're examples of a larger category, not the only two. They support the "pushed me outside my domain" point rather than being highlighted as trophies.
- **P3 lands the game-dev throughline.** "Game development has stayed the constant" makes the passion legible after a mixed career; the personal prototypes back it up honestly (he hasn't shipped a personal *game* yet, so the copy says "prototypes... to explore new systems and mechanics" — accurate, not inflated).
- **The closing hint is deliberately soft.** "It's the kind of work I'd like to be doing more of" gestures at intent (wanting a game studio) without an explicit job ask. Direct closers ("The next step is a game studio.") were tried and rejected as too blunt / cringe.
- **The em dash in P3 is kept** — it's Sanjyot's own, in his approved final draft. Treated as an authorial exception, same class as the personal-section and skills-subtitle dashes.

**What was rejected and why:**
- The original live About body ("a brief lands in unfamiliar territory, and I go learn the stack, wire the systems, and ship it" + "the figure-it-out") — the exact "figured it out" refrain we'd killed everywhere else. Replaced wholesale.
- A hiring-manager-optimized rewrite that led with a punchy identity line and ended every paragraph with a clipped one-liner ("Both shipped.", "The next step is a game studio.") — Sanjyot found it try-hard and cringe. Confirmed: staccato paragraph-closers read as performative in this section.
- Origin story (age 14) — explicitly rejected earlier as emotionally overloaded.
- "professional journey", "think outside the box", "as per client spec", "staying up-to-date with the game dev scene" — all LinkedIn/cliché filler, removed.

**Key learning:** For the About specifically, work it *with* Sanjyot line-by-line from his own draft rather than presenting full variants. He edits in his own voice between turns; the job is targeted word-replacement and structural unsticking, not wholesale rewrites. Polished-but-forgettable is the failure mode — but "fixing" that with punchy closers overcorrects into cocky. The honest, slightly-trailing ending is the right register.

---

### Contact section (`.contact` — eyebrow, h2, body)

**Approved (applied to `_layouts/home.html`):**
> open to work
>
> Let's build **something together.**
>
> I'm looking for a full-time role in game development, and I'm always open to a good collaboration. If you're working on something and think I'd fit, I'd love to hear from you.

(The bolded fragment is the blue `.hl` highlight inside the h2.)

**Why this works:**
- **Register shift, on purpose.** This is the one section where Sanjyot wanted to drop the dry-technical tone in favour of something plainly warm and human. Reference points he gave: "Let's Connect / I'm actively seeking opportunities..." and "Hey you! / I'm open to joining a team or jumping into a collab." The goal was simple, humble, friendly — an open door, not a pitch.
- **Names game development explicitly.** Earlier "team or collab" drafts were too vague; the section is a hiring CTA, so it has to say what kind of role he's after.
- **States full-time intent.** "Looking for a full-time role in game development" is the clearest signal to a recruiter that he's job-hunting, while "always open to a good collaboration" keeps the side-project door open without diluting the main ask.
- **The closer is soft and low-stakes.** "If you're working on something and think I'd fit, I'd love to hear from you" puts the judgment on the reader, not on a self-claim. No "owning systems," no cleverness.
- **Kills the "figures it out" refrain for good.** The old heading was literally "Need a games programmer who *figures it out?*" — the exact pattern banned everywhere except the one About line. Gone.

**What was rejected and why:**
- Dry-wit variants ("Got real-time systems that need owning?", "Let's build something that ships.") — accurate to the rest of the page's tone, but Sanjyot wanted the contact moment to feel more human and less performative.
- **F+** ("Building a game?" / "Drop me a line — the inbox is the fastest way to reach me.") — kept as the backup. Warmer and punchier, but (a) the heading is *very* casual and (b) the body uses an em dash, which we avoid site-wide. Held in reserve, not applied.
- "team or collab" with no role named — too vague for a hiring CTA.

**Key learning:** The contact CTA is allowed to break the dry-technical register the rest of the site holds. Plain warmth reads as confident here, not soft — the work above has already done the proving, so the ask can just be an honest open door.

---

### Title, hero badge and link preview (2026-10-13)

**One title everywhere: "Unreal Engine Programmer."** This follows the anchor rule in
`_career/master-resume.md` §0: the site describes the kind of work and carries one title.
- **"game developer"** was replaced in the navigation subtitle, footer, hero role line and
  home page title.
- **"Unreal Engine Developer"** was replaced in the social title, the JSON-LD `jobTitle`, the
  devlog author line and the 404 title.
- **The official job title,** "Lead Unreal Engine Developer & Tech Lead", stays wherever it
  appears as a job title (the experience timeline and project role fields).

**Hero badge, now static:** `open to unreal programming roles · remote`.
- The five-role rotation was removed. A blank-slate review (2026-09-25) found that cycling
  through five roles reads to a hiring manager as "will take anything".
- The new line names the kind of role and the work arrangement, not a specialism.
- Rejected:
  - "open to work · remote or relocation": names no role.
  - "open to engine and tools programming roles": names a specialism, while the site
    describes work, not roles.

**Hero line, kept:** Sanjyot preferred it to three new variants. Only "developer" became
"programmer", to match the title.

**Link-preview text (`site.description`):** "Portfolio and devlog of Sanjyot Dahale, an Unreal
Engine programmer: shipped projects, the calls behind them, and engine-plugin deep dives."
- Its job is to say what's behind the link. The previous version named virtual production and
  GenAI, the two fields being left.
- A first replacement mirrored the resume summary almost word for word and was swapped out
  the same day (see "One job per surface" below).

### One job per surface (2026-10-13)

Sanjyot noticed "Unreal Engine programmer with six years…" opening everything. The rule
that came out of it:

- **Consistent facts and title** across surfaces are intended.
- **The same opening sentence** on every surface, or the same phrase several times on one
  screen, reads as copy-pasted.

| Surface | Its job |
|---|---|
| LinkedIn headline | The searchable title. The title lives here. |
| LinkedIn About | The one-startup story, in Sanjyot's voice. It doesn't restate the headline above it. |
| Site hero | The title appears once (nav subtitle and hero line). The role line names the tools: `> c++ · blueprint · plugins`. |
| Link preview | What's behind the link. |
| Resume summary | The dense scan line. "Where the engine meets something else" lives only here. |
| Site About | The longer story, tuned from Sanjyot's draft. |

**The trap:** swapping in one title made an existing problem obvious. The hero showed the
title four times on one screen (nav, role line, hero line, badge). Before writing anything
new, check what else is on the same screen and in the same reader's path
(LinkedIn → site → resume).

---

### About section, revised (2026-10-13)

**Final text (applied by Sanjyot to `_includes/about-content.html`):**
> I'm an Unreal Engine programmer and technical lead who started out as a Unity developer at an XR studio, building AR and VR applications, before moving to Unreal Engine and into a Virtual Production Supervisor role. There I helped clients integrate VP workflows into their production pipelines and worked on-set across several live productions.
>
> I was the studio's first Unreal hire and built its Unreal team from there; today I lead a cross-functional team shipping Unreal Engine applications and games across multiple platforms, alongside its R&D into GenAI-based applications. Some of the work I'm most proud of came from projects like the MR Cricket Analysis and the 360 VR Broadcast, which pushed me well outside my domain and meant picking up entirely new skills along the way.
>
> Games came later in my career than the rest, but they're what I keep coming back to. Alongside the games I've shipped professionally, I build prototypes in my own time to explore new systems and mechanics — and it's the kind of work I'd like to be doing more of.

**Labels under the photo:** Focus "Systems, Tools & Gameplay" (Sanjyot's own wording; was "Integration" until 2026-10-28); Based in "Mumbai, India · remote or relocation".

**What changed from the 2026-06-27 version, and why:**
- **"developer" became "programmer":** one title everywhere.
- **Removed "with six years of experience across AR/VR, virtual production, and real-time applications":** the hero already says it.
- **First sentence merged into the career story.** A bare "I'm an Unreal Engine programmer and technical lead." read as forced and incomplete.
- **Team-building added:** first Unreal hire, built the team. It's the strongest leadership fact that wasn't on the site.
- **The GenAI clause was shortened, not cut:** standing rule, keep the range smaller.
- **"Game development has stayed the constant" replaced.** Every dated game project is from 2024 or later, so it was the one line a careful reader could disprove. The new line is honest about the timeline.
- **"I keep building" became "I build":** avoids two "keep"s in a row.

**Rejected:** a clause about having spent the whole career at "one XR startup that changed direction every year or so". Sanjyot felt a sense of intentionality in it. The experience timeline already shows one company, and the Skills intro already explains the range, so saying it a third time turns a fact into an argument. It does a job on LinkedIn (no timeline above it), not here.

**Still applies:** the soft ending, Sanjyot's em dash, and MR Cricket and 360 VR Broadcast as the only named projects.

**After 2026-10-31:** "today I lead" needs to become past tense.

---

### Client work intro, revised (2026-10-13)

**Approved (home `#client` and the /projects/ page):**
> Client work from games to live broadcast. My role ranged from writing the core systems to leading the team that did, and every write-up is specific about which.

**Why it replaced "…I led the technical teams on all of these projects and built the systems end to end, from architecture to delivery":**
- **An accuracy fix, not a matter of taste.** Sanjyot wrote no code on Riddler's Ransom. On Swadeshi, Sanjyot handled the GenAI side while the web developer built the app.
- **"Six years" was repeating** the hero and the stats.
- **The new line states the real spread,** from hands-on systems work to leading, and points to the write-ups, which are the source of truth.

Chosen from eight options; Sanjyot picked this one ("option 5").

### Small preview texts (2026-10-13)

- **/about/ (`about.html` description):** "Unreal Engine programmer and technical lead: from Unity and virtual production to building a studio's Unreal team and shipping games."
- **IPStreamMedia #6:** "Unreal's own WMF player claims it can play rtsp:// links. It can't, and it gets asked first. So how do you make the engine pick your player instead?" A hook in line with the devlog policy above.
- **Aura card:** "A top-down RPG built over five months to learn Unreal's Gameplay Ability System, course-guided." The card now matches the resume's disclosure.

---

### Skills grid: capabilities, not industries (2026-10-13)

**Structure:** five capability cards:
- Engine & C++ (core)
- Integration & Plugins
- Multiplayer & Networking
- Performance & Platforms
- Tools & Pipeline

**Why:**
- The old cards were named after industries (XR, Virtual Production, Real-Time Broadcast, GenAI), which read as six identities.
- Capability names map the past work onto what a game studio hires for.
- XR became platforms you've shipped on.

**Where the range lives, per the standing rule:**
- **The subtitle names the fields:** "Most of the range here came through production work across games, XR, virtual production and live broadcast — a brief landed in a new domain, and the skills followed."
- **VP keywords sit under Integration & Plugins:** nDisplay, ICVFX and Composure, next to Live Link, camera tracking and MoCap. In Unreal, VP mostly means getting the engine to work with stage hardware.
- **Broadcast keywords were dropped by Sanjyot's choice.** The broadcast projects stay in client work.
- **Rejected:** a separate "also shipped in" line under the grid. It read as a last-minute add-on.

**Removed for quality, not field:**
- AI tool and chatbot names: tool names aren't skills.
- "SMPTE": a paper, not a skill.
- RTMP: evaluated, not shipped.

**Card descriptions are deliberately empty.** Sanjyot rejected all three description sets (plain, dry, evidence-led) and chose chips only for now. Don't add descriptions back without asking.

---

*All home-page sections now have approved copy.*

*"Shipped under fire." (h2.s-title under #client) — reviewed and kept intentionally. The rest of the page is restrained enough that one punchy title earns its place. Alternatives were tried (options: "It shipped.", "On deadline, every time.", "All of it shipped.", "The client work.") — all felt too mellow. Original stands.*
