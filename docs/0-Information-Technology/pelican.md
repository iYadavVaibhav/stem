---
description: Pelican - Static Site Generator in Python - Basic Guide
date: 2020-08-01
---

# Pelican

Pelican is a static site generator in Python.

## Quickstart

- make a dir
- create virtual env `python3 -m venv venv`
- upgrade pip `./venv/bin/pip install --upgrade pip`
- activate env `source venv/bin/activate`
- install pelican `pip install pelican`
- create basic files and dir `pelican-quickstart`
- start server `make devserver` go to `http://localhost:8000/`
- It builds the `output` dir

## Structure

- `content` holds all contents,
  - articles can be created as `.md .html or .rst`
  - `content/pages` dir can have pages
  - `content/downloads` can serve static content for pages
  - `{static}/downloads/logo.jpg` copies file to output and links to path
  - Samples can be found on [docs](https://docs.getpelican.com/en/stable/content.html) and [eg site](https://github.com/buddycloud/buddycloud.com/blob/master/content/pages/about.html)

- `output` has all the static pages built using content and theme.

## Adding Theme

- Make a themes dir anywhere
- add this dir to `pelicanconf.py` as `THEME = 'themes_dir/my_theme`
- `my_theme` should have two folders
  - `static` all your css, js and images can go here, copied as-is to output
  - `templates` templates for various mandatory pages
    - `base.html` starting point, links `href="{{ SITEURL }}/theme/css/my.css">`
    - `page.html` imports base and adds content for pages
    - `index.html` lists all blog articles
    - other pages are mandatory like article, author, tag etc can be copied from [here](https://github.com/getpelican/pelican/tree/master/pelican/themes/simple/templates).

## Dev Sprints

- Go to folder
- activate env `source venv/bin/activate`
- start server `make devserver` go to `http://localhost:8000/`
- this will launch the site and will autoupdate site on page modifications.

## Production Push

- Delete the output dir
- run `make devserver` go to `http://localhost:8000/` verify all changes
- then make an archive of `output` folder and upload to your host.
- for GCP please follow steps [here](https://iyadavvaibhav.github.io/google-cloud-platform-notes/#transferring-files-to-and-from-gce-instance).

## Tips and Tricks

- to replace blog index page, add following metas to any new `homepage.html`

```html
  <meta name="save_as" content="index.html" />
  <meta name="url" content="index.html" />
```

- sorting menu items
  - in `pelicanconf.py` add `PAGE_ORDER_BY = 'reversed-date'`
  - then in pages meta add `<meta name="date" content="2020-07-26 07:00" />`
  - you can then change time to sort pages in menu bar.

Minimum html required for pages:

```html
<html>
    <head>
        <title>My super title</title>
    </head>
    <body>
        This is the content of my super blog post.
    </body>
</html>
```

To do:

- exclude some pages from menu
- add articles
