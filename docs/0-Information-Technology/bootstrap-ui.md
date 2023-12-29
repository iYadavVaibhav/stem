---
date: 2023-10-09
---

# Bootstrap UI

_twitter boortrap UI library_

## Responsive breakpoints


Lets you display same content differently on different devices. [more](https://getbootstrap.com/docs/4.0/layout/overview/)

Use, `{-sm|-md|-lg|-xl}`.

```css
// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
```

## Navbar

Responsive behaviour - `navbar-expand-lg` will make the navbar expanded on devices 992 and beyond. On devices <991 the navbar comes as hambureger icon. 

## Table

Responsive table are good on small device, they make only table scroll horizontally but body width remains of device width. However, on larger device, this makes table not 100%. So user `table-responsive-sm` so that table is responsive only on sm and lower device, else it stays 100%, change `-sm` according to width of table.

## Layouts

Show divs of different width on different devices

```html
<div class="col-md-6 col-xl-4">
    Shows 2-col on medium and beyond, 3-col on x-large and beyond
</div>
```

### Flex

- More on [Bootstrap Docs Flex](https://getbootstrap.com/docs/5.2/utilities/flex/)
- And on <https://css-tricks.com/snippets/css/a-guide-to-flexbox/>
- and <https://css-tricks.com/almanac/properties/a/align-items/>

## CSS Variables

BS uses CSS variables that are defined once and used in whole CSS document. Eg,

```css
/* declare */
:root {
  --bs-blue: #0d6efd;
}

/* Usage */
a {
  color: var(--bs-blue);
}
  ```



## Snippets

**Hiding Elements**

Hide only on Small Devices `.d-none .d-sm-block`, [more](https://getbootstrap.com/docs/4.0/utilities/display/#hiding-elements).

**View More**

```html
<div>
    <a data-toggle="collapse" href="#emp_details" role="button" 
    aria-expanded="false" aria-controls="emp_details" title="click to toggle">Extra Details ></a>
</div>

<br/>

<div class="collapse multi-collapse" id="emp_details">
    <div class="card card-body">
        {% for attr, value in emp.__dict__.items() %}
        <div class="d-flex justify-content-between">
            <div>{{ attr }}</div>
            <div>{{ value }}</div>
        </div>
        {% endfor %}
    </div>
</div>
```

## Links

- [CM - BS5 Starter Template](https://github.com/CodeoMascot/frontends/blob/main/bs5-1.html)
