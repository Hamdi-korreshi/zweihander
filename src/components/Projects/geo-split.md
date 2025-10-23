---
title: Geo-Splitting Model
date: 2024-05-20
tech: [PyTorch, Flask]
links:
  github: https://github.com/saumyad03/segment-anything-project
summary: A project showing off the capabilities of the Segment anything model from facebook and applying it to roads.
---

## Overview
This project was a collaboration with a classmate of mine named Saumya for our Intro to AI class. This uses a fully trained model using different sources of paths and how they are highlighted. This project was different from the others due to the Segment Anything Model (SAM) that was required for us to use. This was both a blessing and a curse, since there was already some pre-trained models from Meta that cut down the time it took to train. It was a curse because it also required some different methods for loading the dataset which was different from what I had done before.

## Limitations
The biggest problem with the SAM model was the size and hardware requirements that were needed. We had many examples of how to train and use the model but when trying to train it on my tiny 8GB RTX 2070, the model could not get past the first epoch. So I spent about 20 bucks and 18 hours to refine and train the full model, while my partner was building out the demo: https://www.youtube.com/watch?v=5CxQkTQXkWs.

## Highlights
- Used a for recognizing highways
- Small demo for usability and repeatability