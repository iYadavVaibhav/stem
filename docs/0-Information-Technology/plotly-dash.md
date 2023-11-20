---
date: 2023-10-06
---

# Plotly and Dash

## Dash and Flask

**Integration Philosophy** - Things should be as decoupled as possible, that is, database models should work standalone without flask or dash, that means as python module. Flask should enter only when route has to render template. Dash should only enter when a route has to show dashboard. So, every thing is Python, then all pages are flask, then all dashboards are Dash.

AnnMarieW does eveything dash. even login pages, which is adding complexity.

Dash as main app prevents using flask capability.

So, build Flask app and withing that have Dash dashboard.

Best example is of [okomarov](https://github.com/okomarov/dash_on_flask/tree/master).

Basically, MT and KN have made the good layout for integration of Dash and Flask using BPs.

Next Steps:

- Add Outflows layout to portal.

## Dash

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


## Links

- <https://hackersandslackers.com/plotly-dash-with-flask/>

- <https://github.com/AnnMarieW/dash-multi-page-app-demos> - moves everything to dash including core service features like login.
