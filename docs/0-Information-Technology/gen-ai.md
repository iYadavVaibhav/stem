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

- **LLM** stands for Large Language Model. It is model trained on vast amounts of text data to understand and generate _human-like language_.
- eg, GPT-4, Claude, or Llama are general purpose models.
- it uses transformers, theory researched by Google in 2017. GPT-3 is first model released in 2020 May (175B param trained)
- Different models use different techniques to train model
  - some increase the dataset
  - some increase the tokens
  - some change the logic
- all have different effect on different scenario, it is not true that if you keep increasing the dataset size or tokens you will have better model.
- finally in 2022, Google PaLM is best model. (540B params, 780b tokens) possible as it uses logic that can train model in parallel that is it can make better use of hardware.

- Open models
  - OPT from Meta and BLOOM are open models. You can see the weights and dataset it is trained on.







## LangChain

- **LangChain** is framework designed to **enhance LLMs** by integrating them with **data sources, APIs, and tools**, enabling them to **retrieve information, automate workflows, and perform reasoning-based tasks.**
- LangChain itself doesn’t have its own model—it acts as a _framework_ that connects various LLMs. It uses general purpose models (gpt-4, claude, llama) but fine tuned for specific usage.

So, **LangChain** essentially **makes LLMs smarter and more focused** by connecting them to **specific datasets** and enabling **contextual actions**.

### LangChain vs ChatGPT/Gemini

- LLMs (like GPT-4) are **stateless** — they don’t remember previous interactions and can't access external knowledge **on their own**. LangChain helps **extend their capabilities** by connecting them with structured data.

LangChain **isn't a general-purpose LLM** like ChatGPT or Gemini (which can handle a wide range of tasks and conversations on their own). Instead, **LangChain adds context awareness** by **integrating LLMs with external data sources, APIs, and tools**. This allows users to use LLMs on **specific, structured data** (like databases, documents, or APIs), making them **more efficient and contextually aware** for specific tasks, like querying databases or automating workflows.

In summary:  
- **ChatGPT/Gemini** → General-purpose AI for open-ended conversations and tasks.
- **GPT-4/LLaMA** → Powerful language models for various uses, but still need extra context or integration.
- **LangChain** → A framework that **enhances** LLMs by giving them **specific data access** and **structured workflows**.

### Usage of LangChain

- Query **databases** (SQL, NoSQL)  
- Retrieve **documents** (PDFs, websites, APIs)  
- Store **memory** for conversations  
- Use **agents** to take **chained actions** to execute workflows (like booking a meeting, generating code, or searching the web)  
- Combine data sources with multiple **LLMs, embeddings, and vector databases**  
- Works with **retrieval-augmented generation (RAG)** for knowledge-aware AI.  


**Example Usage:**  
- **SQL**: Querying databases (`"Get the total sales for 2023" → Generates SQL query → Runs on DB`)  
- **Vector**: Document retrieval (`"Summarize policies from this PDF" → Uses embeddings → Retrieves data`)  
- **API**: AI-powered automation (`"Schedule a meeting" → Calls a calendar API → Books a slot`)  


### Components in LangChain

- **LLM Wrappers**
  - **easy integrations** for various models like open-ai gpt-4

- **Prompt Engineering**
  - allows you to **fine-tune how prompts** are structured for better responses. Eg, can include variables in prompt to make it user specific, eg, "How can I help you _Vaibhav_?"

- **Chains (Combining LLMs & Data Sources)**
  - Predefined **step-by-step workflows** combining LLM and external tools.
  - Chains let you **combine multiple components**—e.g., an LLM with a **database** or **API**.

- **Retrieval-Augmented Generation (RAG)**
  - Using external data to **enhance** LLM responses in real-time.
  - RAG allows LLMs to retrieve **relevant knowledge** from external sources (like db, PDFs, vector databases, or APIs) before generating a response. Eg, Searching a PDF for answers.

- **Agents (AI That Can Act & Make Decisions)**
  - **Autonomous decision-makers** that decide what action to take next.
  - Agents allow LLMs to **autonomously interact with APIs, search engines, and tools**.
  - Allows AI to **call APIs, search the web, execute SQL queries, and take actions** dynamically.

- **Memory (Persistent Context for Conversations)**  
  - **Stores context** from past interactions for personalized, ongoing conversations.
  - Stores past interactions so AI can remember **previous chats, user preferences, or session history**.  
  - Example: AI **customer support chatbots** that remember user preferences across sessions.

### Overlap of Components in LangChain

- Agents in LangChain can use Chains as part of their decision-making process.
- The Agent decides what action to take based on the input, and it may choose to invoke a Chain as one of those actions.
- Agents are more dynamic because they choose when and how to use them based on context, whereas Chains are more static, providing a structured sequence of tasks.

- Decision Making of Agent in picking which Chain to use:
  - **agents** use **rule-based decision-making** for simpler cases, or as a **first step** in determining which action to take.
  - **Agents** may use **LLMs** like GPT-4 to make decisions, especially for **complex queries** or when reasoning over context is needed.
  - Often, the decision-making process in **agents** combines both approaches, with **rules** for fast, deterministic tasks, and **LLMs** for reasoning in more **dynamic scenarios**.


## GitHub Copilot

GitHub Copilot, powered by **OpenAI’s Codex model**, is an AI tool that assists software developers by providing code suggestions and completions directly within integrated development environments (IDEs) like Visual Studio Code.

GitHub Copilot shares some similarities with agents and chains (in that it uses context to generate intelligent code completions), it doesn’t fully implement agents or chains in the LangChain sense. Copilot is more focused on providing real-time code suggestions based on immediate context, rather than making autonomous decisions or managing multi-step workflows.

Copilot can be thought of as using a _RAG-like approach_ where your codebase (or the current code you're writing) is the contextual data that gets retrieved and augmented by the model to generate more accurate and context-aware code suggestions.


## Embeddings Using OpenAI for Vector Search on Text

- Embedding is conversion of text in to vector space.
- To convert, you can use OpenAI Embedding via API, using API Key, using Credit Card.
- Once done, you can send a string to OpenAI and it will return you a vector (array of numbers) this will be 1536 in length.
- You can imagine this as a vector space having 1536 dimensions, and your text is somewhere in that space.

## OpenAI Model Selection and Integration

- you can use any model offered by OpenAI. You need to pay for token sent and received.
- in chat, all old prompt and response from assistant is sent in each request. because rest-api is stateless and it does not know anything about your last conversation.
- you can use python library or postman to use models.

