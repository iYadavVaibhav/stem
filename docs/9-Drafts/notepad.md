---
description: Notepad Public
---

# Notepad

*Staging area - Start with H1, later move to `term-notes.md`*

## Android Notes

ADB is utility to interact with android phone. It can install/uninstall apks. change connections etc.
 All commands here, [adb shell](https://adbshell.com/).

Enable Developer Options > USB Debugging

adb must be installed on your mac/pc.

Uninstall blotwares

- `adb devices` see your device
- `adb shell` enter phone shell
- `pm uninstall -k --user 0 com.mipay.wallet.in` to use pm is pkg mgr, and uninstall an app.

References:

- <https://forum.xda-developers.com/t/uninstall-system-apps-without-root-vivo-bloatware.3817230/>
- <https://technastic.com/vivo-bloatware-preinstalled-apps-list/>



## Easy Soft Sys

Color Pallet:

- Blue - #00a1e7, rgb(0,161,231) <https://www.colorhexa.com/00a1e7>
- Grey - #3f3f3f, rgb()
- Orange - #e74600, rgb(231,70,0)

Font: Gill Sans Nova Extra Condensed Bold

## Bookdown

Quick [getting started](http://seankross.com/2016/11/17/How-to-Start-a-Bookdown-Book.html).

Steps:

- `mkdir bookdown`
- `cd bookdown/`
- `git clone https://github.com/seankross/bookdown-start`
- `cd bookdown-start/`
- `r`
- `bookdown::render_book("index.Rmd")`

- all `# heading 1` are chapters.
- Add `Part I` before a chapter to make it part in a book, `# (PART) Data Science {-}`
- `> options(bookdown.render.file_scope = FALSE);` to use parts in diff directories.

To support GitHub flavoured MarkDowm, you need to add the following line to `_output.yml` file:

`md_extensions: +lists_without_preceding_blankline+pipe_tables+raw_html+emoji`

**Working on a book:**

- All mds are in `./data_science` folder.
- All images are in `./images` folder.
- Add new md file to `./_bookdown.yml` file. It also has index order.
- To build and run:
  - `r`
  - `bookdown::render_book("index.Rmd")`
  - new site availabe at `./docs/index.html`
  - `quit()` to exit R shell


References:

- Bookdown [cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/rmarkdown-anatomy.html)
- [Bookdown](https://bookdown.org/yihui/bookdown/html.html)
- Rafalab [dsbook](https://rafalab.github.io/dsbook/introduction-to-productivity-tools.html)
- Rafalab book [source github](https://github.com/rafalab/dsbook/blob/master/_bookdown.yml).
- Bookdown data science notes [book](https://bookdown.org/mpfoley1973/data-sci/)
- Python Visualizations in [bookdown](https://bookdown.org/jamie/python_visualisation/)
- Using [Python Environments](https://bookdown.org/yihui/rmarkdown/language-engines.html)
- Show plotly html js in Rmarkdown [stackoverflow](https://stackoverflow.com/questions/50191208/display-python-plotly-graph-in-rmarkdown-html-document)
- code options [cheat sheet](https://rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf)
- publishing on [github](https://bookdown.org/yihui/bookdown/github.html)
- pandoc markdown [formats](https://pandoc.org/MANUAL.html).


## Digital Marketing Notes

Instagram page earning:

- original images
- regular posting

Instagram Bot:

- Scrapper - <https://towardsdatascience.com/increase-your-instagram-followers-with-a-simple-python-bot-fde048dce20d#:~:text=Open%20a%20browser%20and%20login,users%20you%20followed%20using%20the>
- Post - <https://www.youtube.com/watch?v=vnfhv1E1dU4>


## Tableau



### Writeback in Tableau

```py
## Mega String

"( '"
+[CC interaction_ID]
+"', '"
+[CC Status]
+"', '"+[CC Note]+"', '"+USERNAME()+"' )"

## HideInsert

[CC W InsertRun] = 0

## HideReset

[CC W InsertRun] = 4

## IncrementAdd

[CC W Incrementer]+1

## zero

0

## One

1

## Blank

""

## sheet reset

Saved successfully!
Go To Flow View ⮞

## Seet Sumbit

Submit ⮟

## CC Submitted

Writeback proc source

## Actions on form

select - reset - go to - next

select - reset - set - insertrun to 0

select - submit - set - cc mega string

select - submit - set - increment to +1

select - submit - set - insetRun 1

## actions on table sheet

select - table - set - insertRun 1

select - table - set - string blank

select - table - set - id to row selected

```



## Plotly D3 Vizs

- poltly built on top of D3
- python api uses plotly.js


Plotly Library:

- data - result of go.chartType(x=, y=, others=....)
- layout - title, axis, annotations
  - has param `updatemenus`
  - There are four possible update methods:
    - "restyle": modify data or data attributes
    - "relayout": modify layout attributes
    - "update": modify data and layout attributes
    - "animate": start or pause an animation
- frames: used for animations
  - we can add different frames to a chart
  - this can be used to produce the animations
  - Example can be found [here](https://plotly.com/python/animations/#frames).
- figure - final object combining data and layout.

Dash is putting and linking many plotly charts together.

**Other plotly products**

Dash:

- Dash is Python framework for building *analytical web applications*.
- It is built on Flask, Plotly.js and React.js
- Just like flask, we define `app = dash.Dash()` and then at end `app.run_server()`
- We can create complete site with links.
- It has intractable story.

Chart Studio

- is like Tableau web edit and public.
- Can create and host data, charts and dashboards.
- can explore other people's work.
- charts are interactable and linked together.
- can be reverse engineered.
- can host notebooks as well.

ObservableHQ:

- Live, web edit, d3 notebooks.
- markdown and JS blocks
- lots of d3 features. like counts, action buttons etc
- can make dasboard as well.


References:

- [How and why I used Plotly (instead of D3)](https://www.freecodecamp.org/news/how-and-why-i-used-plotly-instead-of-d3-to-visualize-my-lollapalooza-data-d48345e2ca68/)
- [4 interactive Sankey diagrams made in Python](https://medium.com/plotly/4-interactive-sankey-diagram-made-in-python-3057b9ee8616)

## D3

Add D3 library. Then specific module.

- it is collection of module that work together
- data is bounded to the selections, it join-by-index
- By default, the data join happens by index: the first element is bound to the first datum, and so on. Thus, either the enter or exit selection will be empty, or both. If there are more data than elements, the extra data are in the enter selection. And if there are fewer data than elements, the extra elements are in the exit selection.
- selectAll() data() enter() append() - to add elements, SDEA.
<https://observablehq.com/@d3/d3-hierarchy?collection=@d3/d3-hierarchy>



## YouTube Channel Notes

Start creating a web of terms , make understand each thing, chamkao cheezo ko.
makeit understnad to 6yr old guy
start from docs, make reading a habit, start taking notes.
math teacher lessongs, i see, i do, i ...
small age learn, big understand, then decision.

Follow:

- miguel grinberg - <https://twitter.com/miguelgrinberg>
- Claudio Bernasconi - <https://twitter.com/CHBernasconiC>

## DWBI

- DW is creating a dimentional model of data that lets users easily ask questions.
- Data is identified as DIm and Facts then stored as star schema
- Facts are aggregatabe, or can be factless

- Dimensions have primary-key, natural-key, surrogate-key. PK is simple numerical increment.  
  - The degenerate dimension is a dimension key without a corresponding dimension table. So a order-number in fact table is a dimension key without a dimention table.
  - Natural Key has a meaning, like Emp-ID, while surrogate keys are numneric that start from 1 and increment by 1. These meaning less surrogate keys should be used for join between facts and dimensions.


- Four Steps to do dimentional modelling
  
  - 1 - Identify the business process
    - what do you want to understand
    - Eg:
      - as a retail owner, i want to customer purchases at POS, so that I can analyze products selling, stores and promotions.
  
  - 2 - Identify the grain
    - lowest atomic grain is best because it its highly dimensional hence gives more information
    - Eg:
      - Retail - individual product on POS transaction
  
  - 3 - Identify the dimensions
    - they are determined automatically once we have the grain identified, if dimension breaks the grain futher then discard it or revisit grain statement.
  
  - 4 - Identify the facts, anything not in same grain goes to another fact table.


- Date Dimension
  - it has date attributes like `Date Key (PK)`, `Date`, `Day of Week`, `Holiday Indicator`, `Weekday Indicator`, `Day in Month`, `Day in Year`, `Last Day in Month Indicator`, `Week Ending Date`, `Week in Year`, `Month Name`, `Month in Year`, `Year-Month (YYYY-MM)`, `Quarter`, `Year-Quarter`, `Year`
  - date is stored separately as dimension because it can help keep date-calculations in advance. Eg, a date can have, different formats, is-weekday?, is-holiday?, week-number, day-in-year?, day-of-week and many more. it helps to keep calendar-logic in dimension rather tahn application. Can have holiday indicator. Roughtly 20years of date can be listed in 7,300 rows.
  - time-of-day - it should be date-time fact in fact table to avoid explosion of date dimention, if required to keep it as dimension, it can be separate dimension as time-of-day.

- Product Dimension
  - it can have attributes relate to procust like `Product Key (PK)`, `SKU Number (NK)`, `Product`, `Brand`, `Subcategory`, `Category`, `Department Number`, `Department`, `Package Type`, `Package Size`, `Fat Content`.
  - it has merchandise hierarchy flattened out. Typically, individual SKUs roll up to brands, brands roll up to categories, and categories roll up to departments.
  - List-Price is numeric but can be in dim as it is not additive and doesn't change on event, or is not event driven. It can be added once we know qunitity or weight at event. Or for some case it can be stored both in fact and dimension.
  - a typical product dimension can have 50+ attributes and 300,000+ SKUs.
  - Master File - In large grocery business, there can be a product master file where you can manage all products for all stores and then individual stores can pull a subset from it.

- Store Dimension
  - It can store attributes like `Store Key (PK)`, `Number (NK)`, `Name`, `Street Address`, `City`, `County`, `City-State`, `State`, `Zip Code`, `Manager`, `District`, `Region`. You can see there is a hierarchy here.

- Promotion Dimension
