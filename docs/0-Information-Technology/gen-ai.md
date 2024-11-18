---
date: 2024-11-11
---

# Generative Artificial Intelligence

_Gen AI_

GenAI models are like engines of car. They are very complex engines built by FANG. They are private or public. Eg, ChatGPT, Llama, MidJourney, StabilityAI-StableDiffusion etc.

Usages

- Business Leader - Propose to build a super car. Use GenAI model in their product. Either purchase license or use public offering.
- Engineer - Builds car by using per-built engine. Use the model in code to generate content. But do not build the model. They can train the model?
- User - Uses car. No tech knowledge needed, eg, user of chatGPT.

So, the entities are:

- Model - algo trained on dataset.
- Notebook - tool to write code and play.
- App - Creative use case of gen AI
- Outcome - Generated content.

Engineering Usage:

- You can use model via their app or directly pick from github and use in notebook.
- When using in notebook, you can tweak model to be more creative.

Text to Image models:

- MidJourney - artistic like Mac
- DALL-E - common like windows
- Stable Diffusion - open like linux

GANs or Generative Adversarial Networks:

- It has generator and discriminator. Generator creates content, discriminator will tell if it is good or not, and this continues until generator creates good content.
- Same model can be used for variety of things.

Variational Auto-encoders (VAE)

- They help in anomaly detection

Effect of GenAI

- Jobs shift, some will go, new will come.
- Everyone will be creative, no more repetitive or boring job (dull dirty dangerous difficult will be gone, 4D).
- To make the most, improve your, **interpersonal emotional and creative skills**.
- So, stop focusing on solving difficult things, focus on being creative, leadership.

Models:

- X Grok
- Meta Llama
- Google Gemini
- Nvidia Megatron Turing

API lets you give prompt to model and it returns model response. This way you can use any model in your app.

## LLMs Large Language Models

- it uses transformers, theory researched by Google in 2017. GPT-3 is first model released in 2020 May (175B param trained)
- Different models use different techniques to train model
  - some increase the dataset
  - some increase the tokens
  - some change the logic
- all have different effect on different scenario, it is not true that if you keep increasing the dataset size or tokens you will have better model.
- finally in 2022, Google PaLM is best model. (540B params, 780b tokens) possible as it uses logic that can train model in parallel that is it can make better use of hardware.

- Open models
  - OPT from Meta and BLOOM are open models. You can see the weights and dataset it is trained on.

## Embeddings Using OpenAI for Vector Search on Text

- Embedding is conversion of text in to vector space.
- To convert, you can use OpenAI Embedding via API, using API Key, using Credit Card.
- Once done, you can send a string to OpenAI and it will return you a vector (array of numbers) this will be 1536 in length.
- You can imagine this as a vector space having 1536 dimensions, and your text is somewhere in that space.

## OpenAI Model Selection and Integration

- you can use any model offered by OpenAI. You need to pay for token sent and received.
- in chat, all old prompt and response from assistant is sent in each request. because rest-api is stateless and it does not know anything about your last conversation.
- you can use python library or postman to use models.
