---
title: COOL Compiler
date: 2025-05-20
tech: [Ocaml, Bash]
links:
  github: https://github.com/you/btc-village
summary: A Java-like compiler with functional programming
---

## Overview
I took this as an independent study with Professor Kellogg, who specializes in type theory and Software Engineering at NJIT. The compiler skipped the first parts of the compilation such as the lexicon and parsing because both me and my partner had already done that before. Thus our main focus was on the type system, code generation a and a little bit of code optimization. As shown by this image a compiler and a interpreter are more like a sedan vs SUV. They do the same thing but with different results. The image below shows this very well the similarities and differences: ![Flowchart of compiler stages](/images/Compiler_vs_Interpreter.svg)

The overall advantage of compiled code is that you can preform optimizations on that generated code, allowing for time savings. This project taught me many things about the operating system including different versions such as when PIE (Position Independent Executable) was forced to be implemented and in which version of Linux and how to handle the stack and heap in raw x86. It allowed me to brush up on my skills in testing with Bash scripts extensively. All statements I will be making in this document will be from my notes on the independent study and may be paraphrased for time's sake. If any of these topics strike your interests please see more of Dr. Kellogg's slides [here](https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp25/) when he taught this class.

## Classroom Object Oriented Language
The COOL (Classroom Object Oriented Language) compiler is a Java-like and functional programming language. Java-like as the language allows for class inheritance such as classes and their children. Functional programming (FPs) have expressions only (even loops are expressions) and immutable with maybe some work arounds for mutable types such as the OCaml ref. Much like that COOL is mostly immutable with some work arounds for mutable types. All of the definitions for COOL are specified in the [COOL CRM](https://kelloggm.github.io/martinjkellogg.com/teaching/cs485-sp25/crm/onepage/crm-onepage.html). Everything in there is explained in PL terms, thus the job that I had to do was to implement every rule into the type system and make it produce x86-64. 

Some of these were much easier than the others, for example binary arithmetic:
```
expr <op> expr2
```
has a very easy type rule to implement requiring only 10 lines of code while the Dynamic Dispatch rule has about 200 lines of code.

## Highlights
- 40+ test cases made
- Uses the GCC assembler to produce x86-64