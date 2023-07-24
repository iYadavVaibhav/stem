---
description: Notes on Material Theme for MkDocs
date: 2018-07-25
revision_date: 2024-08-12
---

# Material for MkDocs

*all about MkDocs and Material theme*

## MkDocs

MkDocs is static site generator, more like `Pelican`. From markdown files, it can build static site.

Static site can be deployed on Github Pages and builds can be automated using Github Actions.

So one repo has your source markdown files and another repo has static site which is build and deployed using github actions.

### Basics

- `mkdocks.yml`
  - `site_name` and `site_url` are bare minimum to specify.
  - new docs are auto picked and added to navs. If you specify pages in nav, you will have to do for all the pages you add, any new ones too..

- `mkdocs serve` live preview server on dev+
- `mkdocs build` to create `site` folder

### Deployment

- `mkdocs gh-deploy` to deploy to github
  - creates `gh-pages` branch on local and adds site to it.
  - pushes this branch to remote as default.

- Issues
  - pushes static site, needs build. Can be resolved with GitHub actions.


### Github Actions

- GitHub Actions is yet another free option from GitHub, which is basically a build server in the cloud
- have a build server automatically pick up changes in Markdown source files and build the static website directly on the build server.
- More on git page

- Links
  - <https://blog.elmah.io/deploying-a-mkdocs-documentation-site-with-github-actions/>

## Material Theme

- Requirements
  - `pip install mkdocs-material`
  - `pip install mkdocs-git-revision-date-localized-plugin`

- add following to config file
  
  ```yaml
  theme:
    name: material
  ```

- For Good Looks
  - Keep `title: Two-Three words`
  - Can have H1-H5 as proper english sentences, keep small to a few words.


## MarkDown Extensions

[Markdown](https://daringfireball.net/projects/markdown/) is rendered in MkDocs using [Python-Markdown](https://python-markdown.github.io/). This supports basic markdown with some strict formats. It can be extended using [Python Markdown Extensions](https://python-markdown.github.io/extensions/) and [PyMdown Extensions](https://facelessuser.github.io/pymdown-extensions/).

Extensions might need to be installed and added to configuration file.

### List Intent

Default is to keep 4 spaces for list intent. Extension `mdx_truly_sane_lists` allows to use 2 spaces.

### Admonitions

??? Collapsible

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

???+ "Collapsible Open"

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

More: <https://squidfunk.github.io/mkdocs-material/reference/admonitions/#collapsible-blocks>

### Code Blocks

Inline `code` and block.

```py title="Code Title: bubble_sort.py"  linenums="1"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

More: <https://squidfunk.github.io/mkdocs-material/reference/code-blocks/>

### Content Tabs

=== "C"

    ``` c
    #include <stdio.h>

    int main(void) {
      printf("Hello world!\n");
      return 0;
    }
    ```

=== "C++"

    ``` c++
    #include <iostream>

    int main(void) {
      std::cout << "Hello world!" << std::endl;
      return 0;
    }
    ```

More: <https://squidfunk.github.io/mkdocs-material/reference/content-tabs/>

### Diagrams Mermaid

``` mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```

- Links
  - [Mermaid JS - Flowchart 101](https://mermaid.js.org/syntax/flowchart.html)
  - [MKDocs Diagrams](https://squidfunk.github.io/mkdocs-material/reference/diagrams/)

### MathJax

Inline $\alpha$ math.

$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$

More: <https://squidfunk.github.io/mkdocs-material/reference/mathjax/>

### Lists as Tasks

- [x] Lorem ipsum dolor sit amet, consectetur adipiscing elit
- [ ] Vestibulum convallis sit amet nisi a tincidunt
  - [x] In hac habitasse platea dictumst
  - [x] In scelerisque nibh non dolor mollis congue sed et metus
  - [ ] Praesent sed risus massa
- [ ] Aenean pretium efficitur erat, donec pharetra, ligula non scelerisque

More: <https://squidfunk.github.io/mkdocs-material/reference/lists/>

## Third Party Tweaks

Modify theme and interact with core Python Plugins

### Last 10 updated pages

Link <https://timvink.github.io/mkdocs-git-revision-date-localized-plugin/howto/override-a-theme/#example-list-last-updated-pages>

## iYV Wiki Specifics

Decisions

- Don't need tabs
- need sidebar sections
- need blog

Example repo wiki - <https://github.com/barnumbirr/wiki>

view all page items

```py

# all page items
{% for key,value in page.__dict__.items() %}
    {{ key,value }}
{% endfor %}


{% for key,value in page.meta.items() %}
    {{ key,value }}
{% endfor %}
```

## Markdown 101 - Rules

Based on a year of work, following structure has emerged and has worked in arranging notes all around, for work logs, meetings and knowledge base. make a `~/notes` folder, which should be a GIT repo and can have following files:

- Project Specific - markdown file `project_name.md` - H1s
  - `# Understanding` - add notes as you gain understanding of process etc. Can have all sort of h2, h3 etc.
  - `# Work Log` - add dated work that you do, or steps you follow, kind of rough log. `## 22-11 - tu - adding exception handling`
  - `# Meeting Log` - add dated meeting rough notes. `## 23-04 - mo - Show and tell with James`
- Meetings markdown - `meetings.md` -  a file to have all meeting that you do - H1s
  - `# People Log` - this can have `## John Doe` which can have log of conversation, facts, or actions with a person.
    - `## Others` - log of people you interact less.
  - `Meeting Log` - logs of meeting, can have actions [ ] with date to be completed on. `## 12-03 - tu - Sales Pitch Overview`
- Daily Logs markdown - `daily_log.md` - H1s
  - `# ToDo - Backlog - Minddump` has any thing that comes to ming, todos, actions to be taken, read later etc.
  - `# Daily Log - 2022` - followed by week numbers - latest at top
    - `## Week 48` -  followed by daily log of work.
      - `28-11 - mo` probably add hourly burns
      - `week review` - reflect how your week went, goods and bads, what can be improved, what gave you appreciation. Are you aligning to a wider goal?
- Notepad - `notepad.md` the huge notepad where you build your knowledge base, H1s
  - `# Team DNA - Business & Vision` - knowlege base specific to your team, unit. Add business understanding, projects, team hierarchy, team's vision.
  - `# ABC Inc - Business & Vision` - build knowledge base aroung your company, what it does, entities, relations, public info, customers, products, business processes.
  - `# Tools/Links/Processes` - this has info of all tools, portals, how tos, third parties, databases. All specific to your company.
  - Notes in general - add H1s to have generic notes that are around a technology, but not specific to company. These can later go to your personal knowlege base e.g.
    - `# Python` - all things you learn in python
    - `# Git` - all knowlege you gain in git

- Writing Rules and basics
  - Add date where possible.
  - [ ] to have todo actions. can be searched.
  - [x] to have action done. - resolution.
    - or resolution in next line, tabbed like this.
  - avoid adding h3, h4 to rough notes.

- How to arrange notes for easy add on and updates and follow ups
  - Notes should have **section of action** 'what you want to do'. Eg, create, install, read, write etc.
  - So when you learn something new about an action, **you know** the section to add to. Similarly, when you have to do an action, you know what to refer to.
  - Keep knowledge at one place, like sqlite to be on its page and other pages can refer to it. **Do not repeat** on separate pages.

## Links

- [Sphinx - Furo - theme](https://github.com/pradyunsg/furo)
- [Sphinx - Pydata-sphinx-theme](https://github.com/pydata/pydata-sphinx-theme)
- [Github - Using YAML + Markdown format in documentation comments #878](https://github.com/dotnet/csharplang/discussions/878)
