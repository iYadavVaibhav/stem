---
description: Github Pages and Jekyll Sites - Complete Setup
date: 2018-06-16
comments: true
---

# Jekyll on Github

Github Pages are static sites that can be hosted on GitHub for free. Github Pages use Jekyll (a Ruby Gem) to build static site from markdown files.

- Do not remove this line (it will not be displayed)
{:toc}

## Get Started - Quick

Use 'Jekyll Now', it is flat 30 seconds blog setup. Follow the steps below:

- You can setup Jekyll on GitHub by forking [Jekyll Now](https://github.com/barryclark/jekyll-now) repository.
- The readme.md in above repository is a very good tutorial that you can follow and setup Jekyll on your GitHub account.
- Modify config files and github settings as stated in above readme.
- your blog is live

With this you can use your time on writing post rather than other geeky stuff, but if you need to setup everything or if it is required your can follow setting Jekyll locally below.

Now that blog is working, we need to write posts.

## Add Posts to the Site

Posts can be published in 3 ways:

1. Directly write on GitHub.com:
This is fastest way and requires no setup. You can go to `_posts` folder on this repository and create new .md file.

2. Local MD files
You can use Sublime, atom or any other text editor on your local machine and the upload it to GitHub or use Git locally then commit and push to GitHub.

3. Local Jekyll setup
You can install Jekyll locally on your machine. This will require you to install Ruby as well. Then on localhost you can render your entire website (blog) and see changes. Then you can push it to GitHub.

## Jekyll local setup

- You need to have ruby, gem, gcc and g++ installed. else do `brew install gem` and all.
- Then you need to install `gem install bundler jekyll`
- Next, `gem install github-pages` installs all gems required by github pages, all of the dependancies you’ll need, like: kramdown, jemoji, and jekyll-sitemap
- `jekyll new my_blog` creates scaffold for a new site. This is all you need to do.
- `jekyll build` builds
- `jekyll serve` serves the site to localhost:4000.
- Detailed article on installing jekyll, [here](https://jekyllrb.com/docs/installation/).
- Tutorial with all steps, [KBRoman](https://kbroman.org/simple_site/pages/local_test.html).
- Advanced features: If you need to extend the functionality of Jekyll posts then advanced tutorial can be found at [here](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/).

Issues:

- If you see permission issue on Mac, run using `sudo`. This may occur as gem and ruby are already installed on mac but in Library folder which is not writable.
- If you want to run locally already **existing site**, then create a new temp blog then copy 'Gemfile' and 'Gemfile.lock'. The site root should have these files. They are required to provide all gems that Jekyll requires for proper functionality.

## Deploy to Github

Github can further be used to host your projects site. This is kind of a sub-site/sub-domain of main site.

My site:
`myname.github.io/`

Project Site:
`myname.github.io/abc_project/`

All projects repository come under **gh-pages** branch and not master.

Creating a sub site is same as creating a main site.

## Jekyll Notes

Jekyll is a Ruby library to make blog and pages site.

**_config.yml** has all configuration variables.

**Posts** are markdown files store under \_posts folder

**Pages** are markdown files in root location.

**_layouts** have different .html files that define the layout for example: default, pages or posts. These can include other templates from **_includes** folder. They have \{\{ content \}\} which gets populated by file that uses this layout.

For eg. 'default.html' can include 'meta.html'.

'post.html' can use 'default.html' as layout. So all code in 'post.html' will populate \{\{ content \}\} in default.html

**some_post.md** can use `post.html` as layout. So all markdown from this file will be populated to \{\{ content \}\} of 'post.html'.

**To list all categories in site**

Category returns two array items, first is category name and second is another array of posts.

Categories in site:

```ruby
{\% for category in site.categories \%}
- {{ category[0] }}
{\% endfor \%}
```

