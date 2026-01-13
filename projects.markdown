---
layout: default
title: "Projects"
---

# Projects

Here are some of my Unreal Engine works and personal experiments:

{% assign pro_projects = site.projects | where: "category", "Professional" | sort: "order" %}
{% assign personal_projects = site.projects | where: "category", "Personal" | sort: "order" %}

## Professional Work
<div class="projects-grid">
  {% for project in pro_projects %}
  <a href="{{ project.url | relative_url }}" class="project-link">
    <div class="project-card">
      <div class="project-image">
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
      </div>
      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          {% for tag in project.tags %}
          <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  </a>
  {% endfor %}
</div>

## Personal Projects
<div class="projects-grid">
  {% for project in personal_projects %}
  <a href="{{ project.url | relative_url }}" class="project-link">
    <div class="project-card">
      <div class="project-image">
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
      </div>
      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          {% for tag in project.tags %}
          <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  </a>
  {% endfor %}
</div>

_(More soon — check the devlogs for updates!)_

<div class="disclaimer">
    The Professional projects featured in this portfolio were developed during my tenure at <a href="http://www.liminal.in" target="_blank">Liminal XR Solutions</a> for various global clients. All rights, titles, and interests in the underlying intellectual property belong to the respective owners. Content is shared here for the sole purpose of demonstrating my technical contributions and professional experience in real-time development and Unreal Engine.
</div>
