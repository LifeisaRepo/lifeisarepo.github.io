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

*All home-page sections now have approved copy.*

*"Shipped under fire." (h2.s-title under #client) — reviewed and kept intentionally. The rest of the page is restrained enough that one punchy title earns its place. Alternatives were tried (options: "It shipped.", "On deadline, every time.", "All of it shipped.", "The client work.") — all felt too mellow. Original stands.*
