---
date: 2023-11-29
---

# HTMX and use with Flask

HTMX lets you do AJAX stuff with few words in HTML.


## HTMX

Init:

```html
<script src="https://unpkg.com/htmx.org@1.5.0"></script>

...

<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML"
>
    Click Me!
</button>
```

**Trigger**

When to send the request to server? Use `hx-trigger="click"` to trigger request on an event like click.

**HTTP Verb** (required)

How to do the request? POST, PUT, DELETE, PATCH or GET.

**Target**

Where to use the response from server. `hx-target="#parent-div"` tells to use at DOM elem with id `parent-div`

**Swap**

What to do on the target? `hx-swap="outerHTML"` tells to replace the target with response.

**Loading**

To show user that request is being server, use:

- `hx-indicator="#indicator"` on any element, or
- `hx-indicator="#indicator"` to specify particular element to show on request and hide on response.

**Pros**

- Any element can be used, not just `a` or `form`
- Any event can be used, not just `click` or `submit`
- Any http-verb can be used, not just `get` or `post`.

**Cons**

After using for 2 days, it is good for very small asks else it is a pain, things can be done in a way and not as you want to. Or else it needs too much complexity

- updating two things from response is not easy, you can use oob-swap but it adds complexity
- restricting user clicks is not easy, you can use abort but adds complexity
- canceling form request requires a new get request to server.
- any change on client side is now no more a javascript, instead it is a server request. which is not good.

so it is not a replacement for js, but can be used along with to reduce some code, but adds on to code complexity on both client and server code base. (2 days feedback)

**Working**

- Verb is required, get post etc.

- If no trigger, it will be natural like, like click on a, submit on form, change on input/select, click on everything else.
- Trigger can be specified, like `mouseenter` or `keyup`, more on [hx-trigger attribute](https://htmx.org/docs/#triggers).

- If no target then source is replaced with response.
- Else, target can be CSS selector, more on [tagets and css ext](https://htmx.org/docs/#targets)

- Swapping can be done on in around the target, more on [swapping](https://htmx.org/docs/#swapping)

- Swap OOB from response. Rather than defining in source, you can define swap in response, it loads and replaces in source. Use `hx-swap-oob="beforeend:#contacts-table"`

- Select, you can select an element from response dom, and swap it in source. Use `hx-select="#info"`. More on [select](https://htmx.org/attributes/hx-select/)

- Sync - you can syncajax requests more on [syncing](https://htmx.org/docs/#synchronization)

- Confirm Box - you can add confirm before ajax is done, `hx-confirm="Sure?"` more on [Confirming Requests](https://htmx.org/docs/#confirming)

- CSRF with HTMX - use `hx-vals='{{ '{"csrf_token": "' + csrf_token() +'" }'|safe }}'`, more on [CSRF with HTMX](https://parlette.org/blog/2020/12/using-htmx-in-flask-without-flask-bootstrap/)

- Response header in flask with retarget and reswap `return hx_res, {"HX-Retarget": "closest a", "HX-Reswap": "innerHTML"}`

- Flask-HTMX is a python library that
  - tells flask if the request is via HTMX or normal so you can act accordingly in view-route, that return partial or full page.
  - let you prepare response with headers modified for HTMX behaviours.
  - more on [Flask Htmx Quickstart](https://flask-htmx.readthedocs.io/en/latest/quickstart.html)


## Flask Snippets

**Add flash placeholder and loading indicator**

```html
<div class="container">
  ...
  <div id="htmx-activity">
    <span id="htmx-none"><span>
  </div>
  ...
</div> <!-- container -->

<div id="overlay-wrapper" class="htmx-indicator">
    <div class="overlay-content">
        <h1>Working in background!</h1>
        <p>Please do not close the window</p>
        <span class="glyphicon glyphicon-refresh spinning"></span>
    </div>
</div>
```

`htmx-none` is used when you do not have to change anything on dom. `htmx-activity` is used to append flash messages after it.

**Add CSS**

```css

/* HTMX */
#overlay-wrapper.htmx-indicator{
    display:none;
    opacity: 100!important;
    z-index: 10;
}
.htmx-request #overlay-wrapper.htmx-indicator{
    display:inline;
}
.htmx-request#overlay-wrapper.htmx-indicator{
    display:inline;
}

/* Spinner */
.glyphicon.spinning {
    animation: spin 1s infinite linear;
    -webkit-animation: spin2 1s infinite linear;
}

@keyframes spin {
    from { transform: scale(1) rotate(0deg); }
    to { transform: scale(1) rotate(360deg); }
}

@-webkit-keyframes spin2 {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
/* HTMX ends */

/* Overlay */
.overlay-content {
    min-height: 100px;
    width: 500px;
    background: #fffffff0;
    text-align: center;
    padding: 54px 5px;
    margin: 100px auto;
}

#overlay-wrapper {
    display: none;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
}
/* Overlay ends */
```

**Add flash message build method**

```py

def hx_flash(message,category):
    category = 'info' if category == 'message' else category
    return f"""
    <div hx-swap-oob="afterbegin:#htmx-activity" >
    <div class="alert alert-{category}">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {message}
    </div>
    </div>
    """
```

See how `hx-swap-oob="afterbegin:#htmx-activity"` will add flash message to particular dom, this will be appended to another dom in response.

**Delete Button**

```html
        <td>
          <a href="#">Edit</a>
          <a
            hx-vals='{{ '{"csrf_token": "' + csrf_token() +'" }'|safe }}'
            hx-delete="{{ url_for('items.delete', id=item.id) }}"
            hx-indicator="#overlay-wrapper"
            hx-target="closest tr"
            hx-swap="outerHTML"
            hx-confirm="Are you sure?"
            >Del</a>
          <a href="#">Resonses</a>
        </td>
```

HTMX strategy here is for success that the closest `tr` which row that is having delete button will be deleted with response that will have blank `<tr></tr>`

**Delete Method**

```py
@bp.route('/item/<int:id>', methods=["DELETE"])
def delete(id):
    item = db.get_or_404(Item, id)
    error = False

    ... # check for errors

    if error == False:
        db.session.delete(item)
        db.session.commit()
        hx_res = hx_flash(f"Item {id} Deleted","success")
        hx_res = hx_res + "<tr></tr>"
        return hx_res
    else:
        # on ERROR
        hx_res = hx_flash(f"Cannot delete item {id} as either email is sent out or response is submitted.", "warning")
        hx_res = hx_res + ""

        return hx_res, {"HX-Retarget": "#htmx-none", "HX-Reswap": "innerHTML"}
```

Here, on error you see that we have changed the HTMX swap and target strategy by modifying response headers. as there is error, no change is required on dom current `tr` row, rather we will utilize `#htmx-none` and add `""` nothing there.

**Links**

- [Codecapsules - Tutorial Building A Full Stack Application With Flask And Htmx](https://codecapsules.io/tutorial/building-a-full-stack-application-with-flask-and-htmx/)
- [Testdriven - Active Search with Flask Htmx](https://testdriven.io/blog/flask-htmx-tailwind/)
