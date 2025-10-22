---
title: BTC Village
date: 2025-05-20
tech: [Vue, Django, PostgreSQL, Docker, Tailwind]
links:
  github: https://github.com/BC7/Village-Stakeholder
summary: A platform for coordinated support networks with roles, calendar, and notifications.
---

## Overview
This was my capstone project that I worked with 4 other people for B The Cause (the current startup I am working for as a Project Manager). The tech stack was half decided by the CEO and the other half was decided by me. GitHub has been private but I will post the link for the MVP once they go public.

## Architecture
- Frontend: Vue + Pinia + Tailwind
- Backend: Django + DRF + CORS
- DB: PostgreSQL
- Infra: Docker Compose and DevContainers

The frontend stack was already determined by the CTO Mark De Revere the 🐐. I had experince with React before this but I found Vue to be much more my style and now I use that as my default frontend framework. Vite (the default build tool for vue) is so good that even the React docs recommend to use it. The backend was determined by relaizing that most of my team was not familar with anything like nodejs and we all knew python to some extant. I was working with Django at that time for a small project with my AI professor so I choose that. Also Django already had an admin portal which was a major factor of why I choose it. 

Docker was chosen because I got tired of dealing with OS problems on my previous projects when it came to Mac, Linux and other similar things. This became very annoying on my previous projects so I used docker to minimize those with the dev container extension to make things easier for everyone to access. For the DB, I choose PostgreSQL for a very simple reason it's bullet proof. D. Richard Hipp stated in a podcast that it was the only database that they could not make fail when creating sqlite. So it seemed like an easy pick and I had worked with it before

## Highlights
- Role-based access
- CSRF-aware Axios wrapper
- Dev-containers for local parity
