# SQL Operations in Python

## Database Connections 101

- Connection should **not** be left open, it should be open right after write and disposed once written. It can be open and closed multiple times but never left open
- Connection object should be completely **separate** from business logic.
- `with` performs the cleanup activity automatically. "Basically, if you have an object that you want to make sure it is cleaned once you are done with it or some kind of errors occur, you can define it as a **context manager** and `with` statement will call its `__enter__()` and `__exit__()` methods on entry to and exit from the with block."
- more connections [here  (SQLAlchemy)](https://docs.sqlalchemy.org/en/20/core/engines.html).

### PyODBC

Works with most databases but **not** well with MSSQL+Pandas. For MSSQL+Pandas use sqlalchemy MSSQL engine.

It **requires ODBC driver** to be installed on system on which the app is running. In the connection string, you need either **driver** or **DSN**.

```python

import pyodbc

# MS SQL Server
connection_url = "driver={SQL Server};server=000Server.somedomain.com/abcinc;database=SAMPLE_DB;Trusted_Connection=yes"

# MYSQL 
connection_url = "DRIVER={MySQL ODBC 3.51 Driver};SERVER=localhost;DATABASE=test;USER=venu;PASSWORD=venu;OPTION=3;"

# DSN
connection_url = "dsn=" + "Your DSN Name"

## Teradata
connection_url = "DRIVER={DRIVERNAME};DBCNAME={hostname};;UID={uid};PWD={pwd}"

connection = pyodbc.connect(connection_url)

sql = "select top 10 * from [db].[schema].[table]"

cursor = connection.cursor().execute(sql)

# list of column names
columns = [column[0] for column in cursor.description]

for row in cursor.fetchall():
    print(row) # row is object of class row
    results.append(dict(zip(columns, row))) # builds list of dictionary

connection.close()

# Using connection in pandas
fx_df = pd.read_sql(query, connection)

```

### SQLAlchemy Connection

Works as connection engine as well as ORM.

For DB-API, it needs on of below:

- "ODBC driver and pyodbc", or
- python-driver package like psycopg2 for postgres, pymssql for MsSql.

**Connection Strings**

```python

import sqlalchemy

## Microsoft SQL Server, using ODBC Driver and Server Name
connection_url = "mssql+pyodbc://server_name\schema_name/database_name?driver=SQL+Server"

## Microsoft SQL with ODBC and Server Name
connection_url = "mssql+pyodbc:///?odbc_connect="+urllib.parse.quote('driver={%s};server=%s;database=%s;Trusted_Connection=yes')

## Postgres with Server Name, psycopg2 should be installed
connection_url = "postgresql+psycopg2://user:pass@server:port/database"
connection_url = "postgresql+psycopg2://scott:tiger@localhost/mydatabase"
```

Most connection strings can be found here: <https://docs.sqlalchemy.org/en/20/core/engines.html>

**Create Engine and Connection**

```py
engine = sqlalchemy.create_engine(connection_url, echo=False)
connection = engine.connect()
```

Here, `echo=True` will log statements to default log handler. More engine configs can be found here: <https://docs.sqlalchemy.org/en/20/core/engines.html#engine-creation-api>


**Querying and Reading**

```py
sql = "select top 10 * from [db].[schema].[table]"
cursor = connection.execute(sql)
res = cursor.fetchall()    # list of rows 
connection.close()

# OR, using with you do not need to close connection
with engine.connect() as connection:
    connection.execute("UPDATE emp set flag=1")

# With Pandas
df.to_sql('table_name', con=engine, schema='dbo', if_exists='append', index=False)
```

**Transactions in v1.45**

```py
engine = sqlalchemy.create_engine(con_mssql)
connection = engine.connect()
trans = connection.begin()

try:
    connection.execute(sql_mark_unpivoted)
    df.to_sql(name='dv_flows_big', con=connection, if_exists='append', index=False)
    # connection.execute('err') # <-- triggers error
    trans.commit()
    logger.info(f"Transaction of update and load completed successfully.")
    logger.info(f"Data loaded to dv_bigflows, shape: {df.shape}")
except Exception as e:
    logger.error(f"Update and load failed! Rolling back. Error: {e}")
    trans.rollback()
    logger.error(f"Rolled back!")
finally:
    trans.close()
```


### Flask_sqlalchemy

Flask wrapper for sqlalchemy

  ```python
  from flask_sqlalchemy import SQLAlchemy

  connection_url = "mssql+pyodbc://server_name\schema_name/database_name?driver=SQL+Server"

  app.config['SQLALCHEMY_DATABASE_URI'] = connection_url
  
  db = SQLAlchemy(app)
  db.session.execute(sql).all() # list of rows

  ```

### SQLite SQLAlchemy Pandas

```python
import sqlalchemy

# SQLite path - If same directory as code
import os
basedir = os.path.abspath(os.path.dirname(__file__))
connection_url = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3')

# SQLite path - Absolute path
connection_url = 'sqlite:///' + r'C:\code\db.sqlite3'

# SQLite Connection
engine = sqlalchemy.create_engine(connection_url, echo=False)
connection = engine.connect()

# Pandas Read and Write
import pandas as pd
df = pd.read_csv('my.csv')
df.to_sql(name='my_table', con=connection, if_exists='append', index=False)
```

- Execution - from flask shell do `db.create_all()` - creates table with schema.

### Pandas

- needs a connector to database like sqlalchemy or pyodbc
- `df_txns = pd.read_sql(sql=sql, con=conn_dsn)`
- `df.to_sql('table_name', con=engine)` - sqlalchemy

- pd write has issues
  - pyodbc lets read but not write, `pyodbc==4.0.35`
  - sqlalchemy lets read and write but with version `SQLAlchemy==1.4.46` with `pandas==1.3.5` as on Feb-2023.

### SQLite and Pandas

```python
import sqlite3

# Data Load
conn = sqlite3.connect(app_path + '\db.sqlite')
df.to_sql(name='table_name', con=conn, if_exists='append', index=False)
conn.close()

```

### SQLite

```python

import sqlite3
connection = sqlite3.connect('database_name')
cursor = connection.cursor()
cursor.execute(query)
rows = cursor.fetchall()
connection.commit() # for non read tasks
connection.close()


"""
    Transactions in SQLite
    Works file for sql statements, 
    but not for Pandas df.to_sql() as it commits as another transaction.
"""
connection = sqlite3.connect(sqlite_path)
connection.isolation_level = None
try:
    c = connection.cursor()
    c.execute("begin")
    c.execute("some update")
    c.execute("some insert")
    #c.execute("fnord") # <-- trigger error, above update and insert will rollback
    df.to_sql(name='orders', con=connection, if_exists='append', index=False)
    #c.execute("fnord") # <-- trigger error, now, it raises exception, but pandas did the commit.
    connection.commit()
    logger.info(f"Transaction of update and load completed successfully.")
except connection.Error as e:
    logger.error(f"Update and load failed! Rolling back. Error: {e}")
    connection.rollback()
finally:
    connection.close()

```

### MS SQL Connector

```sh
brew install freetds
pip install pymssql --no-binary=pymssql
```

```py
# Connections
conn = pymssql.connect(server='', database='', user='', password='')

# one line pandas
pd.read_sql(sql=q, con=conn)

# Querying
cursor = conn.cursor(as_dict=True)
cursor.execute("select top 10 from employee")
for row in cursor:
    print("ID=%d, Name=%s" % (row['id'], row['name']))
conn.close()
```

Here, `as_dict=True` makes each row as dictionary, otherwise it is Tuple of values (you have no information of column name, but is less is size).

The dictionary has proper data-types as in database. So, name as str, age as int, value as float, created as datetime etc.

You can then use `json.dumps()` to convert dict to str.

```sh
<class 'tuple'>
(1, 'John', 22, 230.54, datetime.datetime(2023, 8, 2, 16, 38, 43, 47000))

<class 'dict'>
{'id': 1, 'name': 'John', 'age': 22, 'value': 230.54, 'load_datetime': datetime.datetime(2023, 8, 2, 16, 38, 43, 47000)}

>>> json.dumps(obj=row, indent=4, sort_keys=True, default=str)
{
    "age": 22,
    "id": 1,
    "load_datetime": "2023-08-02 16:38:43.047000",
    "name": "John",
    "value": 230.54
}
```

With SQLAlchemy

```py
connection_url = "mssql+pymssql://host/database?charset=utf8"
engine = sqlalchemy.create_engine(url=connection_url)
conn = engine.connect()

cursor = conn.execute(q)
for row in cursor:
    print("ID=%d, Name=%s" % (row['id'], row['banker_name']))
conn.close()

# or one line pandas
pd.read_sql(sql=q, con=conn)
```

Now you can use conn in pandas, or sql-alchemy orm, or create a cursor and execute queries.

Link: [Examples](https://pymssql.readthedocs.io/en/stable/pymssql_examples.html)

### MySql-connector-python

```python
import mysql.connector
connection = mysql.connector.connect(host=host_name,user=user_name,passwd=user_password)
cursor = connection.cursor()
cursor.execute(query)
connection.commit() # for non read tasks
```

### TeradataSQL

Teradata SQL Driver for Python. This package enables Python applications to connect to the Teradata Database. There is no need for ODBC driver to be installed on the system for this to work.

```py
conn = teradatasql.connect(
    host='dwh.brand.com',
    user='',
    password=''
)
```

You may enable logging, pass http-proxy or set other config params. More on <https://pypi.org/project/teradatasql/>.

## SQLAlchemy Core

This package has following uses:

- Use **pythonic way** to build sql statements. You can define metadata and build INSERT, UPDATE, DELETE statements using methods. This does not use object, but uses python methods to do sql operations.
- Lets you **change the db-engine**, without modifying the code. It will automatically build query using dialect for new engine.

## SQLAlchemy ORM

This package lets you do DB operations in **Object Oriented way**. It is high level abastraction.

**What?** - The ORM provided by SQLAlchemy sits between the database and Python program and transforms the data flow between the database engine and Python objects. SQLAlchemy allows you to think in terms of objects and still retain the powerful features of a database engine. It is ORM for Python, has two parts

- CORE - can be used to manage SQL from python,
- ORM - can be used in Object oriented way to access SQL from python.

**Why use SQLAlchemy?** - When you’re working in an **object-oriented** language like Python, it’s often useful to think in terms of objects. It’s possible to map the results returned by SQL queries to objects, but doing so works against the grain of how the database works. Sticking with the scalar results provided by SQL works against the grain of how Python developers work. This problem is known as **object-relational impedance mismatch**.

**ORMs** allow applications to manage a database using high-level entities such as classes, objects and methods instead of tables and SQL. The job of the ORM is to translate the high-level operations into database commands.

- It is an ORM not for one, but for many relational databases. SQLAlchemy supports a long list of database engines, including the popular MySQL, PostgreSQL and SQLite.
- The ORM translates Python classes to tables for relational databases and automatically converts Pythonic SQLAlchemy Expression Language to SQL statements

**Mappings** - There are two types of mapping

- Declarative - new - more like oops
- Imperative - old - less like oops

**Flask SQLAlchemy**

It lets easy use of SQLAlchemy in Flask. For eg, to connect to db, you can just define the config param `SQLALCHEMY_DATABASE_URI` in flask-config object, and then when you instantiate the db object, `db.init_app(app)`, it makes use of this config param to establish the connection.

More config details can be found on: <https://flask-sqlalchemy.palletsprojects.com/en/latest/config/>

Link: [Flask Notes - SQLAlchemy](../0-Information-Technology/flask.md#databases-in-flask)

**Links**

- <https://realpython.com/python-sqlite-sqlalchemy/#working-with-sqlalchemy-and-python-objects>

## PyODBC Manual ORM

```python
# Class of table
class Book:
    
    def __init__(self, row):
        # row is db record
        self.id = row.id
        self.title = getattr(row, 'title', None)
        self.author = getattr(row, 'author', None)
        self.year = getattr(row, 'year', 1880) # default value

    # calculated column, instance method
    def age(self):
        # return age of book
        return (2022 - self.year)

    @classmethod
    def get_book_by_id(cls, id):
        sql = f'select * from table_name where id = {str(id)}'
        cursor = conn.cursor().execute(sql)

        objs = []
        for row in cursor.fetchall():
            objs.append(Book(row))
        
        if len(objs) > 0:
            return objs[0] # as sending 1
        
        return None

    @classmethod
    def get_books(cls):
        sql = select_flows_sql + f' where email = "?"'        # optional where clause
        cursor = conn.cursor().execute(sql, session['email']) # where clause placeholder
        
        objs = []
        for row in cursor.fetchall():
            objs.append(Book(row))      # instantiate obj
        
        if len(objs) > 0:
            return objs                 # list of objects
        
        return None

book_obj = Book.get_book_by_id(21) # class method
book_obj.age() # instance method

book_objects = Book.get_books() # static method, no auto arg passed

# class of table simple code to auto set to dictionary items
class Post:

    def __init__(self, row):
        for k, v in dictionary.items():
            setattr(self, k, v)



```

## SQLite ETL

- when **reading CSV** you can read data in correct data-type by specifying `dtype` and `thousands` and `parse_dates`.
- when **adding** a column use proper data-type to new column has required format. eg, use `pd.to_datetime()` to add date column.
- when **saving to SQL**, pandas creates tabes with data-type similar to pandas columns type.
- when **reading a SQL**, pandas _might not_ read in proper date format. Again use `parse_dates` to fix it.

```py
# Data Types
dtype_ = {
    'Quantity' : 'int64',
    'Amount' : 'float64',
}
dv_date_parser = lambda x: pd.to_datetime(x, format="%d/%m/%Y", errors='coerce')

df = pd.read_csv(file, low_memory=False, dtype=dtype_, thousands=',',
                 parse_dates=['Date'], date_parser=dv_date_parser)

# Add datetime type column
df['load_datetime'] = pd.to_datetime(arg='now', utc=True)

# To SQL
df.to_sql(name='orders_staging', con=conn_target, if_exists='append', index=False)

# Read SQL
df = pd.read_sql(sql=sql_read, con=conn_target, parse_dates=['Sale Date', 'load_datetime'])
```

## PyODBC ETL

```python

import pandas as pd
import sqlite3

# sources
conn_source = pyodbc.connect('dsn=' + "Your_DSN")
conn_target = sqlite3.connect('../app_v2/data-dev.sqlite')

# Incremental Load: Find IDs already in target
df_target_ids = pd.read_sql(sql='select id from target_table', con=conn_target)
ids_before = df_target_ids["id"].values
records_before = len(df_target_ids)
print(f"Records present: "+str(records_before))

# Build where clause tuple, eg, 'not in (a,..)'
if len(ids_before) == 0:
    ids_before_tuple = '(-1)'
elif len(ids_before_tuple) == 1:
    ids_before_tuple = "("+ str(df_target_ids["id"].values[0]) + ")"
else:
    ids_before_tuple = tuple(df_target_ids["id"].values)


# Extract new IDs from source
sql = f'SELECT distinct id, email FROM source_table where id not in {ids_before_tuple}'
df_new_data = pd.read_sql(sql=sql, con=conn_source)
print(f"Records to be added: "+str(len(df_new_data)))

# Load new Data to target
df_new_data.to_sql(name='target_table', con=conn_target, if_exists='append', index=False)

final_responses = pd.read_sql(sql='select count(id) from target_table', con=conn_target).iloc[0,0]
print(f"Records added: "+str(final_responses-records_before))

#assert len(df_new_data) == final_responses-records_before

```

## Fail proof data read

```python
import pyodbc
import logging
import urllib
import pandas as pd
import time
from config import config # has all variables defined

def get_connection_string(service):
    """
    Returns connection string for a service. All variables are picked from environment config file
    :param service: [teradata, mssql]
    :return: connection string
    """

    if service == 'teradata':
        return f"DRIVER=Teradata;DBCNAME={config['database_host']};;UID={config['database_user']};PWD={urllib.parse.quote(config['database_password'])}"
    elif service == 'mssql':
        return f"driver={config['driver']};server={config['server']};database={config['database']};Trusted_Connection=yes"
    else:
        raise Exception('DB: No such connection available')


def sql_select_df(query, service):
    """
    Runs query and returns results as a Pandas DataFrame
    :param query: SQL Query
    :param service: [teradata, mssql]
    :return: DataFrame
    """

    df = None

    try:
        connection = pyodbc.connect(get_connection_string(service))
        try:
            start_time = time.time()
            df = pd.read_sql(query, connection)
            time_taken = time.time() - start_time
            logger.info(f'sql_select_df - Records fetched: {len(df):,} ;  Time taken: {time_taken:,.5f} seconds.')
        except Exception as e:
            logger.error(f'sql_select_df - Query failed!. Error "{str(e)}".')
        finally:
            connection.close()
    except Exception as e:
        logger.error(f'sql_select_df - No connection to "{service}". Message: "{str(e)}"')

    return df


def sql_run_file(file, service):
    """
    Runs SQL Script stored in a file and returns the number of rows processed
    :param file: file path
    :param service: [teradata, mssql]
    :return: number of rows processed
    """

    n_rows = 0

    try:
        with open(file, 'r') as f:
            query = f.read()

        n_rows = sql_execute(query, service)
    except Exception as e:
        logger.error(f'sql_run_file - Cannot read file at "{file}". Error: "{str(e)}"')

    return n_rows


def sql_execute(query, service, log_info=False, fail=True):
    """
    Runs SQL Script and returns the number of rows processed
    :param service: teradata or mssql
    :param query: sql query
    :param log_info: log successful execution?
    :param fail: exit execution?
    :return: number of rows processed
    """

    n_rows = 0

    try:
        connection = pyodbc.connect(get_connection_string(service))
        cursor = connection.cursor()

        try:
            start_time = time.time()
            cursor.execute(query)
            n_rows = cursor.rowcount
            time_taken = time.time() - start_time
            if log_info:
                logger.info(f'sql_execute - Query executed in {time_taken:,.5f} seconds. Records processed: {n_rows:,}')
            cursor.commit()
            cursor.close()
        except Exception as e:
            cursor.rollback()
            logger.error(f'sql_execute - Query failed!. Error "{str(e)}".')
            if fail:
                sys.exit(1)
        finally:
            connection.close()
    except pyodbc.OperationalError as e:
        logger.error(f'sql_execute - No connection to "{service}". Message: "{str(e)}"')
        print(f'sql_execute - Please check if server is running. No connection to "{service}".')
        if fail:
            sys.exit(1)
    except Exception as e:
        logger.error(f'sql_execute - No connection to "{service}". Message: "{str(e)}"')

    return n_rows


```
