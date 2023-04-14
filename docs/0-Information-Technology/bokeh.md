---
date: 2023-03-20
---

# Bokeh

_all about bokeh visualization library_

How it is approached?

- Create building blocks of viz
- Customize these to fit your needs

How it is implemented?

- `pip install bokeh` installs py lib that defines content and functionalities of viz
- the bokeh-javascript lib, uses the py-output and renders charts.
- py-output can be html, json, components, or images.

## Basics of Bokeh

You need a blank chart, add marks on that chart using data and finally show the chart. Use `bokeh.plotting` module.

- `figure()` creates a plot
- `line()` draws line
- `show()` build complete html, css, js, json as a standalone doc and saves it.

```python
from bokeh.plotting import figure, show

# prepare some data
x = [1, 2, 3, 4, 5]
y = [6, 7, 2, 4, 5]

# create a new Figure object
p = figure()

# add a line renderer, with optional thickness
p.line(x, y, line_width=2)

# show the results
show(p)
```

## HTML File

- The file build using `show()` command has
  - js-libs in `head`
  - `div` with id to hold chart canvas
  - `js-script` tag having
    - chart-items as `json` and
      - `js-code` to build chart and render in the div.

## Plot / Figure / Chart

- figure() function accpets args to modify the figure.
- It has sub-classes and attributes that can be used to modify figure.
- you can set background

## Marks / Gylphs / Renderers

- You can add as **many marks** you want and combine different types. Eg, line, bars, circles, hex-tiles.
- Each type has a function like `line()`, `circle()`. All are under `Figure` class
- each function accepts args to **define data** (x, y) and **modify visuals** (color, size).
- Eg, `p.circle(x, y, legend_label="Objects", color="#bb5566", size=16)`

- **Existing properties** can be modified using the object’s `glyph` attribute and change its properties.

    ```python
    # change color of previously created object's glyph
    glyph = circle.glyph
    glyph.fill_color = "blue"
    ```

## Plot Legends

- Use `legend_label=` attribute of mark, to set label name. Eg, `p.line(x, y, legend_label="Temprature"`.

- This adds `Legend` object to plot. You can then use its properties to modify it. You can edit location, font, color, border, background etc. Eg, `p.legend.location = "top_left"`

- **Interactive Legends**
  - click to show/hide/fade marks.
  - `p.legend.click_policy="mute"` or hide. `click_policy` property allows to do this.
  - [Bokeh - Interaction Legends](https://docs.bokeh.org/en/latest/docs/user_guide/interaction/legends.html#ug-interaction-legends)

## Plot Titles

- Adding `title=` to `figure()` adds `Title` class.
- Its properties can modify the title. `p.title.align = "right"`

## Plot Labels & Annotations

- what - they are visual elements that help chart to read. Eg: like bands, lines, labels to marks, boxes, arrows etc.
- add `BoxAnnotation` objects to figure using `add_layout()`.
- you can add as many boxes, lines as you want.

```python
# Labels
from bokeh.models import LabelSet, BoxAnnotation

source = ColumnDataSource(data=dict(
    height=[66, 71, 72, 68, 58, 62],
    weight=[165, 189, 220, 141, 260, 174],
    names=['Mark', 'Amir', 'Matt', 'Greg', 'Owen', 'Juan']
))

p = figure()
p.scatter(x='weight', y='height', size=8, source=source)

labels = LabelSet(x='weight', y='height', text='names',
                  x_offset=5, y_offset=5, source=source)

mid_box = BoxAnnotation(bottom=60, top=70, fill_alpha=0.2, fill_color="#009E73")

p.add_layout(labels)
p.add_layout(mid_box)
```

- more [Bokeh - Basic Annotations](https://docs.bokeh.org/en/latest/docs/user_guide/basic/annotations.html)


## Plot Tooltips

- they appear on mouse-hover or tap on marks
- use `HoverTool` class
- Include `HoverTool()` in the list passed to the `tools=[]` argument when calling the `figure()` function
- other than `x`, `y` there are **many more properties** available that can be shown.
- **images** can be added too.



```python
from bokeh.models import HoverTool

p = figure(
    ...
    tools=[HoverTool()],
    tooltips="Data point @x has the value @y",
)
```


## Plot Theme

- what - they are set of predefined parameters for color, font, line styles.
- You can use pre-defined themes or add yours by defining properties in yaml file.
- more [Bokeh - Styling Themes](https://docs.bokeh.org/en/latest/docs/user_guide/styling/themes.html)

## Plot Axis

- You can modify axis-label, axis-numbers its format, axis-colors, ticks, width, orientation, range, log-scales etc.


```python
from bokeh.models import NumeralTickFormatter, DatetimeTickFormatter

# change some things about the y-axis
p.y_range=(0, 25)
p.yaxis.major_label_orientation = "vertical"

# change things on all axes
p.axis.minor_tick_in = -3

# format axes ticks
p.yaxis[0].formatter = NumeralTickFormatter(format="$0.00")
p.xaxis[0].formatter = DatetimeTickFormatter(months="%b %Y")
```

## Plot Grids / Banding

- what - grids are lines on graph that connect to axis for easier reads.
- `Plot` object has methods `xgrid()`, `ygrid()`, and `grid()`

```python
# change things only on the y-grid
p.ygrid.grid_line_alpha = 0.8
p.ygrid.grid_line_dash = [6, 4]

# add bands to the y-grid
p.ygrid.band_fill_color = "olive"
p.ygrid.band_fill_alpha = 0.1
# define vertical bonds
p.xgrid.bounds = (2, 4)
```

## Plot Toolbar

- Toolbar can be hidden, show few options, change location etc.
- You can set attributes of figure class, or
- Use `Figure.Toolbar` class properties to modify things.


- `p = figure(toolbar_location="below")` shows below
- `p.toolbar_location = None` hide
- `p.toolbar.autohide = True` auto hide

## Plot Sizes & Multi-plots

- You can define size in pixels the attributes `width=` and `height=` when calling the `figure()` function. Eg: `figure(width=350,height=250)` or `p.height = 150`

- **Responsive**
  - plot can be made using attribute `sizing_mode="stretch_width"`.
  - you can strech or scale in height/width/both

- **Multi-Plots**
  - Use `bokeh.layouts` package
  
    ```python
    from bokeh.layouts import row

    # show in one row horizontally
    show(row(p1, p2, p3))

    # put the results in a row that automatically adjusts
    # to the browser window's width
    show(row(children=[s1, s2, s3], sizing_mode="scale_width"))
    ```

## DOM Widgets

- what - You can add DOM elements like `DatePicker`, `Select`, `RangeSlider`, `Div` etc.
- structure - They are available as class in `bokeh.models` package, each class has attributes to define them.
- create - you can create **object** of class and define it.
- linking - you can use `js_link()` function of the object to link value of widget with renderer's glyph propertly, eg, link `RangeSlider` `value` to `size` of `circle`.
- rendering - create layout of all widgets and plots using `layout()` function of `bokeh.layouts` package.



```python
from bokeh.layouts import layout
from bokeh.models import Div, Spinner

# prepare some data
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
y = [4, 5, 5, 7, 2, 6, 4, 9, 1, 3]

# create plot with circle glyphs
p = figure(x_range=(1, 9) )
points = p.circle(x=x, y=y, size=30)

# set up textarea (div)
div = Div(text="<p>Usage...</p>", width=200, height=30)

# set up spinner
spinner = Spinner(
    title="Circle size", low=0, high=60, step=5, width=200,
    value=points.glyph.size, # default value
)
spinner.js_link("value", points.glyph, "size")

# create layout
layout = layout(
    [
        [div, spinner],
        [p],
    ]
)

# show result
show(layout)
```


- Use [Panel](https://panel.holoviz.org/index.html), a wrapper on Bokeh, that allows advanced dashboarding.

## Data Sources

- data can be list, numpy array, pandas dataframe.
- they are all translated to `ColumnDataSource` (CDS)
- you can create your own CDS for more options
- You can pass Pandas `DataFrame` to `ColumnDataSource`

```python
from bokeh.models import ColumnDataSource

# create dict as basis for ColumnDataSource
data_dict = {'x_values': [1, 2, 3, 4, 5],
        'y_values': [6, 7, 2, 3, 6]}

# create ColumnDataSource based on dict
source = ColumnDataSource(data=data_dict)

# create a plot and renderer with ColumnDataSource data
p = figure()
p.circle(x='x_values', y='y_values', source=source)

# Using Pandas
source = ColumnDataSource(df)
```

## Data Transformation

- **Vectorizing** - Create dynamically calculated colors and sizes based on data. You can generate sequence color and size based on data (instead of categorical).
- `fill_color=[]` attribute of mark like `p.circle()` can take in one color or list of colors. List can be built with anylogic, for eg, generate color list based on y-data. Same can be given to `radius=[]` attribute.
- Or you can use `palettes` and `transform` from bokeh module. To make this more systematic. Use the `linear_cmap()` function to build color map. The required attributes for this function are:
  - `field_name=`: the data sequence to map colors to
  - `palette=`: the palette to use
  - `low=`: the lowest value to map a color to
  - `high=`: the highest value to map a color to

```python
# generate radii and colors based on data
radii = y / 100 * 2
colors = [f"#{255:02x}{int((value * 255) / 100):02x}{255:02x}" for value in y]

p.circle(x, y, radius=radii, fill_color=colors)

# Use Palette and Transformations
from bokeh.transform import linear_cmap
from bokeh.palettes import Turbo256

# build list of color from palette based on y data
mapper = linear_cmap(field_name="y", palette=Turbo256, low=min(y), high=max(y))
```


## Data Streaming

- [Data Streaming - AjaxDataSource](https://docs.bokeh.org/en/latest/docs/user_guide/basic/data.html#ajaxdatasource)

## Bokeh Server

- Bokeh server lets you connect events and tools to real-time Python callbacks that run on the server

## Render / Serve / Output

- **Standalone Documents** have HTML, CSS, and JavaScript but don't require Bokeh Server.

- **HTML** - You can generate complete HTML

- **JSON** - You can get plot as JSON, that can be loaded via AJAX

- **Components** - Get HTML, JS separately.

- **PNG / SVG** export - requires selenium and web drivers.

- **HTML save** - use `save()` to save built HTML complete file.

```python
# 1. Build the figure
from bokeh.plotting import figure
p=figure()
p.circle(x=[1,2], y=[3,4])


# 2a: Get HTML complete
from bokeh.embed import file_html
from bokeh.resources import CDN
script_tags_str = CDN.render()
# script tags that have link to bokeh-js files, can be included in header

html = file_html(plot, CDN, "my plot")
# Complete HTML file with head, body, script, json-date, div. All built.
# You can save this file and open in browser

# 2b: Get JSON dumps. AJAX this, other JS code goes in template
import json
from bokeh.embed import json_item
items_json_py_obj = json_item(p) 
# get JSON items as python dictionary

items_std_json_str = json.dumps(json_item(p)) 
# get JSON-standard string that can be sent / used in JavaScript


# 2c: Get html, JS-code separately
from bokeh.embed import components
script, div = components(p)
# script has JSON-items and JS-code
# div - has HTML code. JS fills div when executed
```

## Links

- [Bokeh - Showcase](https://discourse.bokeh.org/c/showcase) - Users add their work.
- [Bokeh First Steps](https://docs.bokeh.org/en/latest/docs/first_steps.html) - Basics to get started.
- [Bokeh User Guide](https://docs.bokeh.org/en/latest/docs/user_guide.html) - Detailed user guide
- [Bokeh - Web Page Embed](https://docs.bokeh.org/en/latest/docs/user_guide/output/embed.html)
- [Bokeh - Sunburst Chart Example](https://docs.bokeh.org/en/0.8.2/docs/user_guide/examples.html#id3)
- [Medium - Streaming Data Animation With Bokeh](https://medium.com/@yogeshkd/streaming-data-animation-with-bokeh-f3e4189f3e61.html)
- [Flourish - Animated Charts, scrolly, story, race](https://flourish.studio/blog/animated-charts/)

