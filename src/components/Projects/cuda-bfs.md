---
title: Cuda-BiBFS
date: 2025-05-20
tech: [CUDA, C/C++, Linux]
links:
  github: https://github.com/Tomaszbrauntsch/Bidirectional-BFS
summary: A showcase of how a GPU node using MPI + CUDA would work with a bi directional BFS algorithm.
---

## Overview
This project was a comboniation of efforts between Tomasz and me. This was desgined for our final project for the class which included a report, diagrams and a presentation. The report was just a general idea of how things went down small, maybe a page or two. Diagrams where made by Tom using the python scripts to show how to travel amgonst the nodes and showing the path. The actaully code to run it was hard to make but I'll go more in depth on that in the thinking process. The project was successful but overall class was hard.

## Thinking 
The reason creating this code was hard is due to the way thinking about parallel code is written. You have to think about multiple threads, processes or threads going on and the way that interacts. However, that's just with a single machine, suddenly when you have two machines the versions of code that you make are much harder to improve. V1 -> V2 -> V3 -> V4 was the general process, and V1 - V3 was quite easy in comparsion to V4. The reason being with each and every version you had the same thinking but different ways to inact them. With V4 which included MPI + GPU, you have to factor in the multiple machines, which means handling the problem of MPI being too slow or the CUDA threads reaching out of the array. We did finish the full project but results were disappointing.

## Poor Results. Why?
The if you run the scripts and compare them the versions you will realize that the V4 version has a worse performance then ever other result. Why? Think of ecnomony of scales. Simple put trying to use the V4 version on the small dataset we generated is like using a 500 foot crane to build a sandcastle at the beach. The overhead from MPI and the checks involved for both MPI and CUDA cause too much time to be wasted. The time when it would be worth it for something like this is maybe a graph of over 10 million nodes. At that point my V4 version would finally beat out the other versions.