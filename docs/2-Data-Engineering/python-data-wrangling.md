---
description: Data Wrangling in Python using Pandas
date: 2018-07-01
---

# Python Data Wrangling

[Pandas](https://pandas.pydata.org/) is a package in Python that can be used for data manipulation.

## What is Data Manipulation?

Data manipulations can be organized around six key verbs:

- arrange: order dataframe by index or variable or sort the data
- select: choose a specific variable or set of variables or select columns in data
- filter: subset a dataframe according to condition(s) in a variable(s) or select rows in data
- mutate: transform dataframe by adding new variables or add a calculated column
- group_by: create a grouped dataframe
- summarize: reduce variable to summary variable (e.g. mean)

Here, variable is a column in data set.

We'll cover how to perform above operations on a dataset using Pandas.

### Quickest data in pandas

```python
text = '''colA colB
Jan 239
Feb 234
'''

from io import StringIO
import pandas as pd
pd.read_csv(StringIO(text),delimiter=' ')
```

## Filter

We can filter data to get a set of rows from complete dataset. It is similar to `WHERE` clause in SQL.

## Doing same stuff using R

R is also an excellent programming language for data manipulation. `dplyr` is a package in R that can be used to perform above operations.

An excellent article by Ben, [The 5 verbs of dplyr](https://teachingr.com/content/the-5-verbs-of-dplyr/the-5-verbs-of-dplyr-article.html#the_power_of_combining_verbs), can provide you more details on this.

Another article that compares R and Python can be found [here](https://gist.github.com/conormm/fd8b1980c28dd21cfaf6975c86c74d07).

[Comparison of Pandas with SQL](https://pandas.pydata.org/pandas-docs/version/0.23/comparison_with_sql.html)

[Pandas docs]( https://pandas.pydata.org/pandas-docs/version/0.23/index.html) excellent details with examples.
