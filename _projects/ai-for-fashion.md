---
layout: project
title: "Swadeshi — Local to Global"
description: "A GenAI kiosk that reimagines western apparel in traditional Indian textiles, built for Vodafone Idea's India Mobile Congress 2025 booth."
category: "Professional"
order: 8
domain: "GenAI Workflow & Prompt Engineering"
role: "GenAI & Prompt Engineer"
status: "rnd"
filter_tags: "ai"
image: "/assets/images/projects/ai-for-fashion/ai-for-fashion-hero.jpg"
youtube_id: "AReWxYd4QTk"
gallery_images: "/assets/images/projects/ai-for-fashion/ai-for-fashion-1.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-2.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-3.png"
gallery_captions: "A Harrington jacket reimagined with Lucknowi Chikankari::A Skirt made from Paithani textile::A clutch design inspired by the Chikankari pattern"
tags: ["Google Gemini", "Nano Banana", "Node-RED", "Prompt Engineering"]
---

<div class="doc-numbered" markdown="1">

## Overview

Swadeshi was a generative-AI kiosk built for Vodafone Idea's booth at the India Mobile Congress 2025. A visitor chose a western garment or accessory (a kaftan, an evening gown, a bomber jacket, a clutch) and paired it with a traditional Indian textile or art style such as Lucknowi chikankari, Warli, or Patola. The kiosk then produced an editorial-style image of a model wearing that garment reimagined in the chosen textile, which the visitor could download to their phone by scanning a QR code.

I worked on the generative-AI side of a three-person team. I researched which image-generation models could meet the quality and speed a live exhibition demanded, built a working prototype of the whole generation workflow, and designed the prompts that turned each visitor's two choices into a finished image. The web application itself was built by our web developer; the prototype I handed over was the logic he took to production.

### Project Details

- **Platform**: Web (exhibition kiosk)
- **Client**: Vodafone Idea
- **Team Size**: 3
- **Duration**: 10-day development sprint (Sept–Oct 2025)
- **Shipped**: Vi booth, India Mobile Congress 2025

## What I Built

I had used generative-AI tools in my day-to-day work for a while, for drafting, for reading unfamiliar code, for generating images. This was the first client project where I had to design a generative-AI workflow that a customer would use directly, and make it dependable enough for a live exhibition floor.

#### Choosing the models

The first job was research: reading the image-generation APIs, understanding their JSON schemas, judging the quality each model could reach, and working out the per-image cost, which was the hardest figure to pin down. I settled on two hosted Google models with different jobs. Gemini Flash handled the text step, chosen for its response speed. Nano Banana generated the final image, chosen for being the state-of-the-art image model at the time. It was the more expensive option, and we accepted that deliberately: IMC draws high-net-worth and VVIP visitors, and Vi did not want to risk visible image-quality problems on the stand.

#### Prototyping the workflow in Node-RED

I looked for a fast, free way to build and test the workflow before any production code existed. That led me to Node-RED, an open-source, node-based flow tool. Coming from Blueprint in Unreal, the node graph was immediately familiar, and I could assemble the generation flow step by step and watch each stage run. Once the workflow produced the results we wanted, I handed the working implementation to our web developer, who reimplemented the logic in JavaScript for the production application.

#### From two choices to a finished image

The generation ran in two stages. Each visitor's selections filled the variables in a structured information block: the garment they picked and the textile or art style they wanted it rendered in. That block went to Gemini with instructions to turn it into a detailed, high-quality prompt written specifically for Nano Banana. Gemini returned the prompt, which was sent on to Nano Banana to render the final editorial-style image. The prompts were parameterised rather than hand-written per case, so the same design produced a coherent result across every garment-and-textile combination a visitor might choose.

</div>
