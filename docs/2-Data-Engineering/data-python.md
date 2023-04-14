# SQL Operations in Python

## Database Connections 101

- Connection should **not** be left open, it should be open right after write and disposed once written. It can be open and closed multiple times but never left open
- Connection object should be completely **separate** from business logic.
- `with` performs the cleanup activity automatically. "Basically, if you have an object that you want to make sure it is cleaned once you are done with it or some kind of errors occur, you can define it as a **context manager** and `with` statement will call its `__enter__()` and `__exit__()` methods on entry to and exit from the with block."
- more connections [here  (SQLAlchemy)](https://docs.sqlalchemy.org/en/20/core/engines.html).

### PyODBC

Works with most databases but not well with MSSQL+Pandas

```python

import pyodbc

# MS SQL Server
connection_url = "driver={SQL Server};server=000Server.somedomain.com/abcinc;database=SAMPLE_DB;Trusted_Connection=yes"
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

fx_df = pd.read_sql(query, connection)

```

### SQLAlchemy Connection

Works as connection engine as well as ORM

  ```python

  import sqlalchemy

  connection_url = "mssql+pyodbc://server_name\schema_name/database_name?driver=SQL+Server"
  
  ## MS SQL
  connection_url = "mssql+pyodbc:///?odbc_connect="+urllib.parse.quote('driver={%s};server=%s;database=%s;Trusted_Connection=yes')
  
  ## Postgres
  connection_url = "postgresql://user:pass@server:port/database"

  engine = sqlalchemy.create_engine(connection_url, echo=False)
  connection = engine.connect()
  sql = "select top 10 * from [db].[schema].[table]"
  cursor = connection.execute(sql)
  res = cursor.fetchall()    # list of rows 
  connection.close()

  # OR -- 

  with engine.connect() as connection:
    connection.execute("UPDATE emp set flag=1")

  df.to_sql('table_name', con=engine, schema='dbo', if_exists='append', index=False)
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

### Flask SQLite SQLAlchemy

```python
import os, sqlite3

basedir = os.path.abspath(os.path.dirname(__file__))
connection_url = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')

# then same as SQLAlchemy
```

- Execution - from flask shell do `db.create_all()` - creates table with schema.

### Pandas

- needs a connector to database like sqlalchemy or pyodbc
- `df_txns = pd.read_sql(sql=sql, con=conn_dvs)`
- `df.to_sql('table_name', con=engine)` - sqlalchemy

- pd write has issues
  - pyodbc lets read but not write, `pyodbc==4.0.35`
  - sqlalchemy lets read and write but with version `SQLAlchemy==1.4.46` with `pandas==1.3.5` as on Feb-2023.

### SQLite

```python

import sqlite3
connection = sqlite3.connect('database_name')
cursor = connection.cursor()
cursor.execute(query)
rows = cursor.fetchall()
connection.commit() # for non read tasks
connection.close()

```

### mysql-connector-python

```python
import mysql.connector
connection = mysql.connector.connect(host=host_name,user=user_name,passwd=user_password)
cursor = connection.cursor()
cursor.execute(query)
connection.commit() # for non read tasks
```

## SQLAlchemy ORM

- **Why?** - When you’re working in an **object-oriented** language like Python, it’s often useful to think in terms of objects. It’s possible to map the results returned by SQL queries to objects, but doing so works against the grain of how the database works. Sticking with the scalar results provided by SQL works against the grain of how Python developers work. This problem is known as **object-relational impedance mismatch**.

- **What?**
  - The ORM provided by SQLAlchemy sits between the database and Python program and transforms the data flow between the database engine and Python objects. SQLAlchemy allows you to think in terms of objects and still retain the powerful features of a database engine.
  - It is ORM for Python, has two parts
    - CORE - can be used to manage SQL from python,
    - ORM - can be used in Object oriented way to access SQL from python.

- **ORMs** allow applications to manage a database using high-level entities such as classes, objects and methods instead of tables and SQL. The job of the ORM is to translate the high-level operations into database commands.
  - It is an ORM not for one, but for many relational databases. SQLAlchemy supports a long list of database engines, including the popular MySQL, PostgreSQL and SQLite.
  - The ORM translates Python classes to tables for relational databases and automatically converts Pythonic SQLAlchemy Expression Language to SQL statements

- **Mappings** - There are two types of mapping
  - Declarative - new - more like oops
  - Imperative - old - less like oops

Mappings

- There are two types of mapping
  - Declarative - new - more like oops
  - Imperative - old - less like oops

Mappings

- There are two types of mapping
  - Declarative - new - more like oops
  - Imperative - old - less like oops

```python
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

## Instance of Table Class, creates many to many association
author_publisher = Table(
  "author_publisher",
  Base.metadata,
  Column("author_id", Integer, ForeignKey("author.author_id")),
  Column("publisher_id", Integer, ForeignKey("publisher.publisher_id")),
)

## Inherits Base class
class Author(Base):
  __tablename__ = "author"
  author_id = Column(Integer, primary_key=True)
  first_name = Column(String)
  last_name = Column(String)
  books = relationship("Book", backref=backref("author"))
  publishers = relationship(
    "Publisher", secondary=author_publisher, back_populates="authors"
  )
```

- **Steps**
  - create the **association table model**, `author_publisher`
  - define the **class model**, `Author` for `author` database table
  - This uses SQLAlchemy ORM features, including `Table`, `ForeignKey`, `relationship`, and `backref`.

- **Links**
  - <https://realpython.com/python-sqlite-sqlalchemy/#working-with-sqlalchemy-and-python-objects>
  - Flask SQLAlchemy in Flask Notes

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
