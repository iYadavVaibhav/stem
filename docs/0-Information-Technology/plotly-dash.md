---
date: 2023-10-06
---

# Plotly and Dash

_plotly js python dash and flask_

## Plotly Express

High level api for common charts

**Pie** - [Plotly - Python Pie Charts](https://plotly.com/python/pie-charts/#pie-chart-with-plotly-express)

```py
fig = px.pie(df, values='id', names='response_type', title='Response Type',
                 hole=0.3, template=my_template)
```

**Bar**

```py
fig = px.bar(df_graph, x='response_type', y = 'count', title = period, color='response_type',
                 template='none', width=1000, height=500)
```

## Plotly

- poltly built on top of D3
- plotly python api uses plotly.js

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

## Plotly and Flask

- Flask `dash()` route has a html form to show filters
- JS on form change, `POST`s to a `callback` url with form data and csrf.
- `callback()` sends form data, filters-json to `get_graph` and returns figure-json.
- `get_graph()` reads data, filters, builds figure, returns json.

```py
@bp.route('/dash', methods=["GET", "POST"])
def dash():
    header = "Global Temperature"
    subheader = "Global Temperature changes over the last few centuries"
    description = """The graph shows the increase in temperature year on year.
    The data spans the years 1881 to 2022 and includes temperature anomalies for periods of each year as indicated.
    """
    menu_label = "Select a period"
    params = {
        'title': header,
        'subtitle': subheader,
        'content' : description,
        'menu_label': menu_label,
        'options' : [{'code':'50', 'desc':'Latest Week'},
                     {'code':'48','desc':'Week 48'},
                     {'code':'49','desc':'Week 49'},
                     {'code':'50','desc':'Week 50'},
                     {'code':'0','desc':'All'}],
        'graph'   : get_graph()
    }
    return render_template('viz/dash.html', params=params)

@bp.route('/callback', methods=['POST'])
def callback():
    """Ajax Request Handler for Charts
    Reads filter json
    Calls get_graph with filters

    Returns:
        json: figure json
    """
    if request.is_json:

        data = request.get_json()
        # print(f"{list(data.keys())}")

        # do something with the incoming data and return the appropiate data
        return get_graph(filter=data['dropdown'])

    else:
        return jsonify({"error": "Invalid JSON data"}), 400

def get_graph(filter = '50'):
    import pandas as pd
    import plotly.express as px

    df = pd.read_csv(...)

    df_filtered = df[ df['dim1'] == filter ]

    fig = px.bar(df_filtered, x='dim2', y='measure1')

    graphJSON = fig.to_json()

    return json.dumps(graphJSON)
```

HTML Template

```html
<form>...</form>
<div id="graph"></div>

{% block scripts %}
{{ super() }}
<script src="https://cdnjs.cloudflare.com/ajax/libs/plotly.js/2.27.1/plotly.min.js"></script>
<script>
  function getFormValues(f) {
      const form = document.forms.namedItem(f);
      const formData = new FormData(form);
      const value = Object.fromEntries(formData.entries());
      postJSON(value);
  }

  async function postJSON(data) {
      var csrf_token = "{{ csrf_token() }}";
      try {
          const response = await fetch("{{ url_for('viz.callback') }}", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrf_token
              },
              body: JSON.stringify(data),
          });

          const result = await response.json();
          console.log("Success:");//, result);

          drawGraph(result);
      }
      catch (error) {
          console.error("Error:", error);
      }
  }

  function drawGraph(graph) {
      var figure = JSON.parse(graph);
      // console.log(figure);
      Plotly.newPlot(id='graph', figure, {});
  }

  getFormValues('form1');

</script>
{% endblock %}
```

### Sub Plots

You can add graphs to one figure using `subplots`.

More on [Plotly - Python Api Reference Plotly](https://plotly.com/python-api-reference/plotly.subplots.html#subplots)

### Multi Plots

Often the requirement is to plot more than one graphs. Use below logic for same:

- Build each fig in `get_graph()`.
- Create a list, `graphsJSON` and append `fig.to_json()` for each figure.
- Now you can return this list of json of figures to the callback. In JS you can iterate over this list and build graphs.
- In JS,
  - Iterate over list
  - Create `div`s for each figure and draw plot.
- Json handling remains the same

```py
def get_graph(period = '50'):
    ...

    fig1 = px.bar(...)
    fig2 = px.pie(...)
    fig3 = px.pie(...)

    figures = [fig1, fig2, fig3]

    graphsJSON = []

    for fig in figures:
        graphsJSON.append(fig.to_json())

    return graphsJSON
```

```js
function drawGraph(graphsJSON) {
    const container = document.querySelector('#dash');
    for (let i = 0; i < graphsJSON.length; i++) {
        graphJSON=graphsJSON[i];
        let element = document.createElement('div');
        element.id='graph'+i;
        container.appendChild(element);
        var figure = JSON.parse(graphJSON);
        Plotly.newPlot(id='graph'+i, figure, {});
    }
}
```

### Theme and Templates

- More on [Plotly - Python Templates](https://plotly.com/python/templates/#examining-builtin-themes)
- and on [Geeksforgeeks - Python Plotly How To Set Up A Color Palette](https://www.geeksforgeeks.org/python-plotly-how-to-set-up-a-color-palette/)

## Dash and Flask

**Integration Philosophy** - Things should be as decoupled as possible, that is, database models should work standalone without flask or dash, that means as python module. Flask should enter only when route has to render template. Dash should only enter when a route has to show dashboard. So, every thing is Python, then all pages are flask, then all dashboards are Dash.

AnnMarieW does eveything dash. even login pages, which is adding complexity.

Dash as main app prevents using flask capability.

So, build Flask app and withing that have Dash dashboard.

Best example is of [okomarov](https://github.com/okomarov/dash_on_flask/tree/master).


## Dash

Dash is putting and linking many plotly charts together.

- Dash is Python framework for building *analytical web applications*.
- It is built on Flask, Plotly.js and React.js
- Just like flask, we define `app = dash.Dash()` and then at end `app.run_server()`
- We can create complete site with links.
- It has intractable story.

Adding controls

```py
# Add controls to build the interaction
@callback(
    Output(component_id='controls-and-graph', component_property='figure'),
    Input(component_id='controls-and-radio-item', component_property='value')
) # decorator ends here and below is its function
def update_graph(col_chosen):
    fig = px.histogram(df, x='continent', y=col_chosen, histfunc='avg')
    return fig
```

Here, `component_property` of the `Input` is `col_chosen` arg to `update_graph()` function. So whenever the `value` is changed in radio-button, `update_graph()` is triggered, it builds the histogram with updated value and returns the figure.


## Chart Studio

- is like Tableau web edit and public.
- Can create and host data, charts and dashboards.
- can explore other people's work.
- charts are interactable and linked together.
- can be reverse engineered.
- can host notebooks as well.


## Links

- [How and why I used Plotly (instead of D3)](https://www.freecodecamp.org/news/how-and-why-i-used-plotly-instead-of-d3-to-visualize-my-lollapalooza-data-d48345e2ca68/)
- [4 interactive Sankey diagrams made in Python](https://medium.com/plotly/4-interactive-sankey-diagram-made-in-python-3057b9ee8616)
- <https://hackersandslackers.com/plotly-dash-with-flask/>
- <https://github.com/AnnMarieW/dash-multi-page-app-demos> - moves everything to dash including core service features like login.
