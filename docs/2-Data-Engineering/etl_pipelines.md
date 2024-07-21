# ETL Pipelines

_all about ETL pipelines scheduling_

- [ETL Pipelines](#etl-pipelines)
  - [Data Pipeline Design Patterns](#data-pipeline-design-patterns)
    - [Pipeline Terms](#pipeline-terms)
    - [Extraction Patterns](#extraction-patterns)
    - [Fail Recovery Patterns](#fail-recovery-patterns)
  - [Coding Data Pipeline Patters](#coding-data-pipeline-patters)
    - [Functional Design](#functional-design)
    - [Factory Pattern](#factory-pattern)
    - [Strategy Pattern](#strategy-pattern)
    - [Singleton, \& Object pool patterns](#singleton--object-pool-patterns)
    - [Python Helpers](#python-helpers)
    - [Python Best Practice](#python-best-practice)
  - [ETL Pipeline](#etl-pipeline)
  - [Links](#links)


## Data Pipeline Design Patterns

_all about design patterns and implementation_

### Pipeline Terms

**Idempotent**

- One can run a data pipeline multiple times with the same input, and the output will not change

**Backfilling**

- add/modifying data to already existing dataset. Eg, apply change in logic to processed dataset, adding a new column from source to processed dataset. Most orchestration tools support backfilling.

**Source Replayability**

- ability of source to provide historical data. This is a requirement for backfilling. You can make non-replayable source replayable by dumping the incoming data into raw/loading zone at a certain frequency, say, daily. Then data is replayable to daily degree and not hourly.
- **Replayable sources**: Event stream, web server logs, a dump of database WAL (write ahead log) showing all the create/update/delete statements (CDC - Change Data Capture), etc
- **Nonreplayable sources**: Application tables that are constantly modified, APIs, etc., that only provide the current state of the data.

**Source Ordering**

- Is the data coming from source in order? Eg, event of checkout happens after click, log-out happens after log-in.

**Sink Overwritability**

- ability to modify based on unique key or run ID. Overwritability is crucial to prevent duplicates or partial records when a pipeline fails.
- Kafka queue is non overwritable, table entries without key.

**Multi-hop pipeline**

- After each transformation the data state is saved, this lets easy debug and lets start the pipeline from failed state, and hence only failed transformations are reprocessed.

### Extraction Patterns

**Time Ranged**

Extract the data from source based on time frame. Eg, pull all data from yesterday.

**Full Snapshot**

- Entire data is fetched.
- Add run_id to build historic snapshot using which you can go back in time.
- Replace full data if history is not required.

**Lookback**

- This pull is used to build aggregated metric. Eg, active users in a month. This is used when source data is constantly updated and end user only care about current state. Usually required for dashboards needs.

**Streaming**

- Each record flows through pipeline.

### Fail Recovery Patterns

**Idempotent**

Ability of a code to produce same result despite being executed multiple times. Eg, if ETL job is run multiple times, it should not load duplicate data. Eg, Pull daily data and dump into a dated folder. If you re-run this pipe, the folder content will get overwritten and hence the output remains same.

Re-run should not produce duplicates or incorrect values.

Eg, you need to re-run the ETL as you have to apply new transformation to filter out the records with, say, customers not having DOB. Now you will rerun the pipeline (also called Backfill) and this will re populate the table by overwriting the customer having dbo. However, you may have still have stale records having no dob from previous run. In this case you should do **Delete-Write** and can add delete all data from loading area before reloading after new transformation. Most libraries and frameworks offer an overwrite option (e.g. Spark overwrite , Snowflake overwrite ) which is safer than deleting and writing.

Link: [SDE - How to make data pipelines idempotent](startdataengineering.com/post/why-how-idempotent-data-pipeline)

**Self Healing**

The pipeline will re-catchup the data on failure. Eg, if the data is inserted based on ID difference between source and sink. Then the re-run will fetch the IDs that were failed to load in previous run.

## Coding Data Pipeline Patters

_how to code in different patters_

Coding in pattern can make pipeline robust, easy to test and maintain. Different patterns are required to cater different use cases and needs.

### Functional Design

This is simple, where you define three functions `extract()`, `transform()` and `load()` and then define a `run()` function which calls all three.

This is good for simple use cases, however, at least try that they follow following standards:

- Atomicity - one function does only one work. eg, `load()` should not create `db_conn`
- Idempotency - rerun should not produce duplicates or incorrect data. Eg, `load()` should `delete` then `write`.
- No Side Effects - one function should not affect another function. eg, `load()` should not close `db_conn` as it is passed to it and is created in another function.

### Factory Pattern

If you have **similar** ETL jobs, eg pulling data from Twitter/Reddit/Quora using APIs then you can code using factory pattern. If you have non-similar ETL jobs then this may not be good implementation.

In factory pattern:

- You define abstract class - this is structure with no logic
- You define concrete classes - these use abstract class and implement them with logic and ensure that the pattern is same as defined in abstract class
- You define the factory - which is nothing but a function, that takes in a param which tells which concrete class to return.

Eg:

```py
import os
from abc import ABC, abstractmethod # python module to define abstract interfaces

# Abstract class with abstract methods
class SocialETL(ABC):
    @abstractmethod
    def extract(self, id, num_records, client):
        pass

    @abstractmethod
    def transform(self, social_data):
        pass

    @abstractmethod
    def load(self, social_data, db_conn):
        pass

    @abstractmethod
    def run(self, db_conn, client, id, num_records):
        pass

# Concrete implementation of the abstract Class
class RedditETL(SocialETL):
    def extract(self, id, num_records, client):
        # code to extract reddit data

    def transform(self, social_data):
        # code to transform reddit data

    def load(self, social_data, db_conn):
        # code to load reddit data into the final table

    def run(self, db_conn, client, id, num_records):
        # code to run extract, transform and load

# Concrete implementation of the abstract Class
class TwitterETL(SocialETL):
    def extract(self, id, num_records, client):
        # code to extract reddit data

    def transform(self, social_data):
        # code to transform reddit data

    def load(self, social_data, db_conn):
        # code to load reddit data into the final table

    def run(self, db_conn, client, id, num_records):
        # code to run extract, transform and load

# This "factory" will acccept an input and give you the appropriate object that you can use to perform ETL
def etl_factory(source):
    factory = {
        'Reddit': (
            praw.Reddit(
                client_id=os.environ['REDDIT_CLIENT_ID'],
                client_secret=os.environ['REDDIT_CLIENT_SECRET'],
                user_agent=os.environ['REDDIT_USER_AGENT'],
            ),
            RedditETL(),
        ),
        'Twitter': (
            tweepy.Client(bearer_token=os.environ['BEARER_TOKEN']),
            TwitterETL(),
        ),
    }
    if source in factory:
        return factory[source]
    else:
        raise ValueError(
            f"source {source} is not supported. Please pass a valid source."
        )

# calling code
client, social_etl = etl_factory(source)
social_etl.run(db_conn, client, ...)

# code credit goes to link below
```

Now in the `main()` you can call `etl_factory()`.

**Note**:

- Please use **factory pattern only** when you **data pipelines have similar structure**.
- Ensure proper **`logging`** to know which function is executed.


Link: [SDE - Factory Patter - Coding Pattern](https://www.startdataengineering.com/post/code-patterns/#2-factory-pattern)


### Strategy Pattern

In simple terms, it takes out the actual transformation logic into separate function instead of being in the transformation() function itself.

This ensure separation of concerns (definition, creation & use) and hence enables easier code maintenance and testability.

Eg:

- `clean_name()`, `format_date()`, `calc_std_dev()` can be some of the transformations, now these are separate functions.
- There can be a factory to return these functions as and when required. Factory is nothing but a function having a dictionary which has key as "some name to function" and value as the function itself. It return the value of dict based on key passed.
- Depending on what you want to do in transformation, you can pass pass that transformation string to factory and it will return that transformation function.

**Note**: The **signature** of transformation functions (input and output) **is same**, hence it is possible to make them switchable using factory pattern.

### Singleton, & Object pool patterns

**Singleton** - Only one object can be created and used. Eg, `db_conn` object. There can be only one database connection object and can be used across app.

**Object Pool** - There is a pool of object from which an object can be taken to do the work and can then returned back to pool once done. Object should be returned in its original form. Eg, A pool of database connection from which objects can be taken when required, enabling parallel processing.

### Python Helpers

**Python Type Validation**

- It helps define param/return type so that run time issues are avoided.
- `typing` package has classes that can be used to define complex types.
- Eg usage:

```py
from typing import Callable, List

def transformation_factory(value: str) -> Callable[[List[SocialMediaData]], List[SocialMediaData]]:
    pass
```

Here, `Callable` defines that return type of function is a callable function. First param to Callable is input to callable function, Second param to Callable is return type of callable function.

**`MyPy`**

It is a python lib that helps **validate python type checks**. It is additional code check to coding standard like `flake8` is for formatting.

```py
python -m mypy --no-implicit-reexport --ignore-missing-imports --no-namespace-packages ./
```

**`Dataclass`**

It helps store data as **object** of Dataclass. Instead of dictionary you can use class-object notation for handling data.

```py
from dataclasses import dataclass

@dataclass
class PostData:
    title: str
    body: int
    author: str
  ```

This will make this usable in class-object notation.

**Context Managers**

When there is a network call, like reading file or database connection, we should close the connection once done to avoid memory leaks and free up resources.

Context manager makes a function context managed. A context managed functions can be called using `with` keyword. Eg, `with open(file):`.

Upon call, a context managed function will provide an object, which is provided by using `yield`.

Upon end of with block, the execution is returned back to the context managed function which can handle closing of connection in `finally` block.

```py
from contextlib import contextmanager

class DatabaseConnection:

    @contextmanager
    def managed_cursor(self):
        _conn = sqlite3.connect(self._db_file)
        cur = _conn.cursor()
        try:
            yield cur         # is provided to `with` block
        finally:
            _conn.commit()    # executed after `with` block
            cur.close()
            _conn.close()


db = DatabaseConnection()

with db.managed_cursor() as cur: # cursor and connection are open
    cur.execute("YOUR SQL QUERY")
# cursor and connection are close
```

**Testing with `pytest`**

Ensure code is correct and lets modify code with confidence.

- Fixtures - lets provide mock API data
- Schema Setup - Let define db-schema for tests, basically `setup` and `teardown` at different level.
- Mocking functions - lets run a function to be tested by modifying its behaviour.

**Decorators**

Decorators add functionality to other functions.

### Python Best Practice

**Makefile**

You do make aliases, like one work for long commands. This can be for command to run pytest, lint-test, type-test, formatting-test, run ETL, docker up or docker down, etc.

**Githooks**

You do run pytest, lint-test, type-test, formatting-test etc while approving a PR, but can make this mandatory and make it run before commit by adding a pre-commit hook. this will run all these checks automatically to force them before commit.


## ETL Pipeline

- **Simple** - Using Pandas to read data, transform it and load is a pipeline. Doing this in distributed environment is big data pipeline.

- **Distributed** - Using PySpark read data from DB is extraction. Do transformation like groupBy or mean, join.

- Code organization - say in `etl_somejob.py`
  - define extract functions. Eg: `def extract_table1_to_df():` that returns df.
  - define transform functions. Eg: `def transform_avg_score(df1,df2):` returns df.
  - define load function. Eg: `def load_df_to_db(df):`
  - finally to execute them

    ```python
    if __name__ == "__main__":
      df_table1 = extract_table1_to_df()
      df_score = transform_avg_score(df_table1)
      load_df_to_db(df_score)
    ```

- Now you can use this file to run or schedule.

## Links

- [AIrflow - Automation Scheduling Orchestrate](./apache-airflow.md#automation-scheduling-orchestrate)
