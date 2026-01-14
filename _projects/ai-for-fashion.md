---
layout: project
title: "Swadeshi: Local to Global"
description: "A GenAI based application to blend Indian traditional art with modern western fashion"
category: "Professional"
order: 8
image: "/assets/images/projects/ai-for-fashion/ai-for-fashion-hero.jpg"
youtube_id: "AReWxYd4QTk"
tags: ["Gemini Nano Banana", "Node-RED", "Python"]
---
A Generative AI web application designed to reimagine luxury western apparel using traditional Indian textiles and art forms, blending cultural heritage with modern fashion.

### Project Details
- **Role**: AI Integration and Prompt Engineering
- **Platform**: Web Application
- **Client**: Vodafone Idea

Developed for a high-profile exhibition, Swadeshi allowed users to interactively "redesign" fashion. Users selected their favorite western garments and paired them with traditional Indian textiles (like Ikat or Banarasi). The system then used a custom-tuned AI model to generate a unique, high-fidelity image of the reimagined apparel, which users could download and share via social media.

Following are some results from the application,
{% include carousel.html 
    images="/assets/images/projects/ai-for-fashion/ai-for-fashion-1.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-2.png,/assets/images/projects/ai-for-fashion/ai-for-fashion-3.png" 
    captions="A Harrington jacket reimagined with Lucknowi Chikankari::A Skirt made from Paithani textile ::A clutch design inspired by the Chikankari pattern"
%}

#### Technical Contributions

- Developed a custom-defined prompt architecture fine-tuned for the Google Nano Banana model. This included defining complex JSON objects for user-defined inputs to ensure the AI interpreted fashion textures and garment shapes accurately.
- Engineered the beta version of the entire backend workflow using **Node-RED**. This allowed for a fast, visual validation of the logic before handing it over to the web development team for final production implementation.
- Conducted deep research into various Generative AI APIs to determine the most efficient model for real-time image generation within a high-traffic exhibition environment.
- Successfully learned, prototyped, and implemented the GenAI APIs and backend logic within an intensive **10-day development sprint**.

### Personal Notes
_This project was an exciting departure from my usual game engine work, pushing me to learn the nuances of Generative AI and Prompt Engineering in a short timeframe. It taught me that regardless of the medium—whether it's Games or AI, the core challenge is always the same: how to take a powerful, complex technology and make it feel like magic for the end user._