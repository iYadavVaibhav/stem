# Pandas

- `df.T` - Transposes dataframe

## Read CSV

```py

# Data Types
dtype_ = {
    'Quantity' : 'int64',
    'Amount' : 'float64',
}

# Date Parser
my_date_parser = lambda x: pd.to_datetime(x, format="%d/%m/%Y", errors='coerce')

# CSV with proper data and currency read
df = pd.read_csv(file, low_memory=False, dtype=dtype_, thousands=',',
                 parse_dates=['load_date', 'transaction_date'], date_parser=my_date_parser)

# find date range in huge CSV
df = pd.read_csv(filepath, usecols=['Date'], parse_dates=['Date'], date_parser=my_date_parser)
df.Date.max(), df.Date.min()

```

## Select data

- [Indexing and Slicing Data - pandas.pydata.org](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html)

- You can select data by _index_ or _label_. Not only select by also **assign**, that is **write** data.
- `loc` take real labels, that is column-names, and row-names. Does not take index.
- `iloc` takes indexes, and also in different sq brackets can take labels.
- `at` and `iat` are for accessing `only single value` in dataframe.
- no function just slicing, `df[2:4]` works only on row indexes.

```py
df.iloc[1:3,2:4] # pass row,column, takes index in same way as list.
df.iloc[1:3][2:4] # same as above
df.iloc[:,[2,4,6,22]] # all rows and specific index cols
df.iloc[1:3]['product','category'] # works

df.loc[1:3,'category']
df.loc[1:3,'product':'value'] # shows all columns between product and value
df.loc[1:3,['product','value']] # shows only prod and value, not in betweens.
df.loc[1,'product'] # returns cell, as the format of column, str, int.

df[2:20:2] - # row 3 to 20 with freq2, that is every alt row
```

## Filter Conditions - Where clause

```py
df = df[df.column_name != value]
df[df.column_name.isin(values_list)]
df[~df.column_name.isin(values_list)] # reverse of condition
df = df[(df.height != 11) & (df.age != 31)] # multiple conditions
```

## Delete Data

- Ops1: You can use where-clause, then index slicing and copy result to df_new variable
- Ops2: Use `df.drop` and pass indexes to drop. To find indexes to drop, use `query` or df-slicing.

```py
# Ops1: find True-False list, slice dataframe, store results
df_new = df[df.col_name != value]

# Ops2: where value is 0, slice dataframe, get index, pass to drop as row indexes to drop, do in place.
df.drop( df[df['value']==0].index, inplace=True)
```

## Modify Data - Updates / Inserts

- the way you select cell/column, there you can assign value to make updates or inserts

```py
df.loc[4,'emp_name'] = 'John' # updates cell at row_index 4 and column "emp_name" with value 'John'

```

To **Insert** new row in dataframe, you can

- `concat` the new row as dataframe to the existing dataframe
- `df.loc[-1]` can be used to insert at start.

**Insert DataFrame using Concat**

```py
# df is existing dataframe

targets = [
    {
        "year": 2023,
        "brand": "Target",
        "score": 52
    },
    {
        "year": 2024,
        "brand": "Target",
        "score": 68
    }
]
df_targets = pd.DataFrame(targets)

df = pd.concat([df, df_targets ]).reset_index(drop=True)
```

Here, new dataframe can have one or more dict as list. More on [insert to pd -stackOverFlow](https://stackoverflow.com/questions/24284342/insert-a-row-to-pandas-dataframe)

**Insert List at Index of Row**, like start, end, middle etc

```py
 df.loc[-1] = [2, 3, 4]  # adding a row
 df.index = df.index + 1  # shifting index
 df = df.sort_index()  # sorting by index
```

## Change Data Type

```py
# this will change datatype but will keep decimal, 11.0 to '11.0'
df['emp_id'] = df['emp_id'].astype(str)

# this will convert 1.04 to 1
df.customer_identifier = df.customer_identifier.apply(lambda x : str(int(x)) )

# to check
df.dtypes
```

More on [Stackoverflow](https://stackoverflow.com/a/75505969/1055028)

## Summarize / Aggregate / Group Data

- `df.product.nunique()` - unique products in dataframe. [pandas.Series.nunique](https://pandas.pydata.org/docs/reference/api/pandas.Series.nunique.html)
- `df.product.value_counts()` - unique products and count of records for each. [pandas.Series.value_counts](https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html)

**Group Data**

- aggregation functions - mean, sum, count, size, max, min, first, last. alos, `agg`
- sorting - `.sort_values(by='count',ascending=False).head(20)`

```py
# Groupby multiple columns & multiple aggregations
result = df.groupby('Courses').aggregate(
    {
        'Duration':'count',
        'Fee':['min','max'],
        'user_id': 'nunique'        # count distinct
    }
)

# Aggregate and rename, x y z are new col names
df.agg(x=('A', 'max'), y=('B', 'min'), z=('C', 'mean'))

# agg and aggregate are same.

# Example
df_array2.groupby(['region']).aggregate(
    p25 = ('score',lambda x: x.quantile(0.25) ),
    min_salary = ('salary', 'min'),
    p75 = ('score',lambda x: x.quantile(0.75) )
)

#Create a groupby object
df_group = df.groupby("Product_Category")
#Select only required columns
df_columns = df_group[["UnitPrice(USD)","Quantity"]]
#Apply aggregate function
df_columns.mean()

```

- More on [Pandas Pydata Aggregate](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.aggregate.html)

## Create New Columns or Calculated Fields

```py
# applying col wise, so x is a row and function will apply column wise on each row

def build_some(x):
    fname = x['first_name'].strip().title()

    if pd.notnull(x['surname']) and len(x['surname']) > 0:
        name = fname + ' ' + x['surname']

    return (name, fname)

df[ ['name', 'fname'] ] = df.apply(lambda x : build_some(x) , axis = 1, result_type='expand')

# Example using function
df['item_type'] = df.apply(lambda x : get_item_type(x), axis=1)
def get_item_type(x):
    y = ""
    if x['order_type'] == "Valid" and len(x['inbound_reason']) > 1:
        y = "Inbound"
    elif x['order_type'] == "Need more info to respond":
        y = "Need Info"
    elif x['order_type'] == "Error in Data":
        y = "Error in Reporting"
    else:
        y = "Awaiting Category"
    return y

# Exmple single line
df['has_responded'] = df.apply(lambda x : 'Awaiting' if x['responded_by'] is None else 'Responded', axis=1)
```

## ID col

```py
sql_max_id = """
select max(id) as max_id from [dbo].[employee]
"""

connection = sqlalchemy.create_engine(connection_string, echo=False)
df_max_id = pd.read_sql(sql=sql_max_id, con=connection)

# hold max id in table
max_id = df_max_id.iat[0,0] or 0

# adds id from max to new lenght
df_users_dvs['id'] = range(max_id+1, max_id+1+len(df_users_dvs))

# Ideally use, auto-increment / Identity
```



## Date Operations

```py
df_wm['date_wm'].dt.year # year from datetime
```

## Renaming Column Names

```py

def readable_column_names(df):
    """Makes column name sentance readable

    re.sub(pattern, repl, string)
    find a pattern and replaces in a string

    Args:
        df (DataFrame): data frame to clean

    Returns:
        DataFrame: cleaned readable column names
    """
    col_list = []  # holds names to check duplicates
    renamer = dict()  # holds col name and its number of duplicates

    for col in df.columns:

        new_col_name = col

        # camel case to space
        new_col_name = re.sub('([a-z0-9])([A-Z])', r'\1 \2', new_col_name).lower()

        new_col_name = new_col_name.replace("_", " ").replace("-", " ").title()

        if new_col_name in col_list:
            # rename
            index = int(renamer.get(new_col_name, 0))
            renamer[new_col_name] = index + 1
            new_col_name += "_" + str(index + 1)
            pass
        else:
            col_list.append(new_col_name)
        # print(f'col: {col}, new: {new_col_name}')
        df.rename(columns={col: new_col_name}, inplace=True)

    return df

def system_column_names(df):
    col_list = []     # holds names to check duplicates
    renamer = dict()  # holds col name and its number of duplicates
    for col in df.columns:

        new_col_name = col

        # Camel case to space
        new_col_name = re.sub('([a-z0-9])([A-Z])', r'\1_\2', new_col_name).lower()

        new_col_name = new_col_name.lower().replace(' ','_').replace('-','_')

        if new_col_name in col_list:
            #rename
            index = int(renamer.get(new_col_name,0) )
            renamer[new_col_name] = index + 1
            new_col_name += '_'+ str(index + 1)
            pass
        else:
            col_list.append(new_col_name)
        # print(f'col: {col}, new: {new_col_name}')
        df.rename(columns = {col: new_col_name}, inplace=True)
    return df
```

## Plot in Pandas

- Params
  - `kind`:str - The kind of plot to produce:
    - 'line' : line plot (default)
    - 'bar' : vertical bar plot
    - 'barh' : horizontal bar plot
    - 'hist' : histogram
    - 'box' : boxplot
    - 'kde' : Kernel Density Estimation plot
    - 'density' : same as 'kde'
    - 'area' : area plot
    - 'pie' : pie plot
    - 'scatter' : scatter plot (DataFrame only)
    - 'hexbin' : hexbin plot (DataFrame only)

```py
import pandas as pd
import matplotlib.pyplot as plt
# ...
df.plot(kind = 'scatter', x = 'Duration', y = 'Calories')
plt.show()
```

## pandas.DataFrame.query

- [pandas.DataFrame.query](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.query.html)
- pass where condition

```py
df_new = df.query('sales != 0')
```

## pandas.DataFrame.drop

- [pandas.DataFrame.drop](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop.html)
- is used for dropping whole columns or rows
- Params
  - `labels` - list of index or column label, that is, index of row or column name.
  - `axis` - 0 for row, 1 for columns. default=0 or row.
- Returns
  - DataFrame

```python
df.drop(labels=['Employee_Name2'], axis=1) # deletes column
df.drop([0, 1]) # deletes row at index 0 and 1, that is, first and second row.
```

## pandas.to_datetime

```python
df['date'] = pd.to_datetime(df['date_'], format='%d %b %Y')
df['load_datetime'] = pd.to_datetime(arg='now', utc=True)

```

- Links:
  - <https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf>
  - [Towardsdatascience - 15 Ways To Create A Pandas Dataframe](https://towardsdatascience.com/15-ways-to-create-a-pandas-dataframe)
  
