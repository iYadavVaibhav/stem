---
title: Jekyll Syntax Highlight
description: How to add syntax highlighting to Jekyll Sites
date: 2019-06-14
categories:
  - how-to
  - jekyll
---

# How to add syntax highlighting to Jekyll Sites

Jekyll supports syntax highlighting by default using gem `rouge`. It can highlight 100 different language.

You need to add one line in `config.yml`

```yml
highlighter: rouge
```

and need to ensure that `rouge` gem is installed. If you have forked any Jekyll site then you can skip this step, else run:

```bash
gem install rouge
```

**Themes**: There are many themes available for syntax highlighting. They can be [previewed here](http://richleland.github.io/pygments-css/). They can be downloaded from [here](https://github.com/richleland/pygments-css).

I personally prefer Github flavoured theme which I downloaded from [here](https://raw.githubusercontent.com/PhilipTrauner/pygments-github-css/master/github.css).

Once you have decided the theme then you can replace the file `_syntax-highlighting.scss` file located in `_scss` directory. Every Jekyll site must have this file by default.

Please see below some of the use cases.

Ruby:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

Python:

```python
import numpy as np
import pandas as pd

df = pd.read_csv('employee.csv')

df.head()
```

HTML

```html
<head>
  <body>
    Hello..!
  </body>
</html>
```

