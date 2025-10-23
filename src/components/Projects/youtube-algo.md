---
title: YouTube-Like Algorithm Model
date: 2023-12-10
tech: [PyTorch, PostgreSQL, Vectors, Encoding]
links:
  github: https://github.com/Hamdi-korreshi/CS482_proj/tree/main
summary: A project showing off how similarity algorithms work with videos and transcriptions.
---

## Overview
This project was for my Data Mining Class where I learned in-depth about AI/ML. This project uses a extension to turn PostgreSQL into a vector database which is uses KNN to do the similarity search. I created this project by using pytubefix to download the videos and transcripts, then I used a encoding model from hugging face to encode each image along with the transcripts. After loading them into the database then you can query it with some python code and set the threshold for similarity.

## Highlights
- Demo of Searching and finding similar videos
- There types of AI/ML models used