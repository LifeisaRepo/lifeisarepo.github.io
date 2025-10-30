---
layout: default
title: "Home"
---

# Latest Devlogs

{% for post in site.posts %}

- [{{ post.title }}]({{ post.url }}) <small>({{ post.date | date: "%b %d, %Y" }})</small>
  {% endfor %}
