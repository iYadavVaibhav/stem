# ETL Pipelines

_all about ETL pipeplines scheduling_


## Parallel Data Processing

- Python multiprocessing Pool - low level native python code, expilictly implement prallel processing
- Python dask - library having multiprocessing out of box
- Hive - framework that lets extract data using SQL. Behind it converts to MapReduce job.
- Spark - Apache Spark is InMemory to avoid diskwrites slowness  of mapreduce
- Map Reduce - technique/algorithm
- Hadoop - framework
- [ ] move to bigData Notes

## ETL Pipeline

- Simple - Using Pandas to read data, transform it and load is a pipeline. Doing this in distributed environment is big data pipeline.
- Distributed - Using PySpark read data from DB is extraction. Do transformation like groupBy or mean, join.

- Code organization - say in `etl_somejob.py`
  - define extract functions. Eg: `def extract_table1_to_df():` that retrus df.
  - define transform funcitons. Eg: `def transform_avg_score(df1,df2):` returns df.
  - define load function. Eg: `def load_df_to_db(df):`
  - finally to execute them

    ```python
    if __name__ == "__main__":
      df_table1 = extract_table1_to_df()
      df_score = transform_avg_score(df_table1)
      load_df_to_db(df_score)
    ```

- Now you can use this file to run or schedule.

## Automation Scheduling Orchestrate

- DAG - Directed Acyclic Graph is used to represent collection of tasks in organized way to show dependecies and relationships. It has _no cyclic link_.

  ```mermaid
  graph LR;
  A-->B;
  B-->D;
  B-->C;
  C-->E;
  ```

- Cron - Linux in build to schedule a job. Can't manage depndencies.


- **Apache Airflow**
  - Create DAGs in Python
  - Define tasks of DAGs using Operators. Operators can operate various things like bash code, python code, StartCluster or SparkJob.
  - Set up dependency of tasks - using `set_downstream()`. This will create relationships in jobs.

  - configuration
    - make `mkdir airflow` dir
    - export its location to variable `AIRFLOW_HOME`
  - installation - `pip install airflow`
  - initiation
    - `airflow db init` to generate airflow db, config and webserver files.
    - make an admin user, code from docs.
  - implementation
    - define ETL tasks functions in `./airflow/dags/etl_tasks.py`

    - define `./airflow/dags/dags.py`, here
      - it will have airflow module implementation to schedule and execute tasks via DAG.
      - import ETL tasks file as module.
      - define execution function to run ETL tasks
      - define DAG using DAG class.
      - add config, like when to run, retries to try, gap in retries, email to send on faliure, and many other configrations as dictionary object and pas that to `default_args` param of `DAG` class.
      - define ETL Task using `operator`. this executes the execution function.

  - schedule - `airflow scheduler` to add dag to server
  - monitor
    - `airflow webserver` this starts flask webserver where you can look the jobs.
    - view dags, srart/stop/pause jobs

### Code Example Airflow DAG

Following code shows snippet of basic DAG implementation

```python title='dags.py'
# ``
import airflow
from airflow.models import DAG # DAG class
from airflow.operators.python_operator import PythonOperator # as we use Py
from etl_tasks import *

def etl():
df_table1 = extract_table1_to_df()
df_score = transform_avg_score(df_table1)
load_df_to_db(df_score)

# define DAG with configs
dag = DAG(dag_id="etl_ipeline", 
        default_args=default_args, 
        schedule_interval="0 0 * * *")

# define ETL Task
etl_tasks = PythonOperator(task_id="etl_task", python_callable=etl, dag=dag)

etl()

```

## Links

- [LinkedIn Learning - Data Engineering Foundations](https://www.linkedin.com/learning/data-engineering-foundations/)
