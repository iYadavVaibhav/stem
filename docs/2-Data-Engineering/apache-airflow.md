# Apache Airflow



## Airflow Installation and Quick Start

**1. Build and activate venv**

```sh
. /Users/username/code/repo/tutorials/airflow/venv/bin/activate
export AIRFLOW_HOME=~/code/airflow_home

 ```

**0. Setup**

```sh
export AIRFLOW_HOME=~/code/airflow_home
AIRFLOW_VERSION=2.9.2

# Extract the version of Python you have installed. If you're currently using a Python version that is not supported by Airflow, you may want to set this manually.
# See above for supported versions.
PYTHON_VERSION="$(python -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')"

CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
# For example this would install 2.9.2 with python 3.8: https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.8.txt

pip install "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}"

# builds and starts airflow
airflow standalone

# Outputs
...
webserver  | [2024-06-12 11:51:03 +0100] [7815] [INFO] Starting gunicorn 22.0.0
webserver  | [2024-06-12 11:51:03 +0100] [7815] [INFO] Listening at: http://0.0.0.0:8080 (7815)
webserver  | [2024-06-12 11:51:03 +0100] [7815] [INFO] Using worker: sync
webserver  | [2024-06-12 11:51:03 +0100] [7867] [INFO] Booting worker with pid: 7867
webserver  | [2024-06-12 11:51:03 +0100] [7868] [INFO] Booting worker with pid: 7868
standalone | Airflow is ready
standalone | Login with username: admin  password: m7EF2S5pB6M9Hrqt
...
```

Open UI <http://localhost:8080>

You will see DAGs (54), these are examples/tutorial DAGs per built.

**Run and test example task**

```sh
# run your first task instance
airflow tasks test example_bash_operator runme_0 2015-01-01
# run a backfill over 2 days
airflow dags backfill example_bash_operator \
    --start-date 2015-01-01 \
    --end-date 2015-01-02
```

## Tutorial 1 - Fundamental Concepts

Here you will

- Use bash commands like `date` and `sleep 5`, to create two tasks t1 and t2. date prints date time, sleep, sleeps for n seconds.
- the tasks can be created using, `BashOperator()`. It is used to execute some bash commands.
- Now that you have tasks created, you need to associate them with a DAG by creating a `DAG()` obj called `dag` and add tasks to it.
- Simple? operator in dag.

- This script is actually kept simple. It has just the DAG configuration. It does not have any logic for data processing.
- Script: `./examples/tutorial1.py`
- Link: <https://airflow.apache.org/docs/apache-airflow/stable/tutorial/fundamentals.html>

## DAG

```py
with DAG(
    "tutorial1",

    # These are passed to all opertators, you can override them in operator
    default_args={
        "depends_on_past": False,
        "email": ["airflow@example.com"],
        "email_on_failure": False,
        "email_on_retry": False,
        "retries": 1,
        "retry_delay": timedelta(minutes=5),
    },

    description="A simple tutorial DAG",
    schedule=timedelta(days=1),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    tags=["example"],

) as dag:
    ...
```

**Adding Documentation**

You can add doc to DAG. It can be seen on web when you open a DAG. It can be added using following syntax:

```py
dag.doc_md = """
    This is a documentation placed anywhere
    """
```

## Operators

It defines unit work for Airflow to complete. All operators inherit `BaseOperator` and grow from there. Most common are `PythonOperator` and `BashOperator`. Airflow completes the work based on arguments passed to the operators.

The precedence rules for a task are as follows:

- Explicitly passed arguments
- Values that exist in the default_args dictionary
- The operator’s default value, if one exists

**Imp** A task must include or inherit the arguments `task_id`.

```py
t1 = BashOperator(
    task_id="print_date",
    bash_command="date",
)

t2 = BashOperator(
    task_id="sleep",
    depends_on_past=False,
    bash_command="sleep 5",
    retries=3,                   # default args overridden
)
```

## Templating using Jinja

Airflow lets do templating using Jinja. This is third command in example. If you run this it will execute the Jinja template.

```py
templated_command = textwrap.dedent(
    """
{% for i in range(5) %}
    echo "{{ ds }}"
    echo "{{ macros.ds_add(ds, 7)}}"
{% endfor %}
"""
)

t3 = BashOperator(
    task_id="templated",
    depends_on_past=False,
    bash_command=templated_command,
)
```

This will loop 5 times and print the `ds` date which is logical date supplied after command.

## Task Dependencies

You can make the task dependents by defining the dependencies.

```py
# they are all same, t2 depends on t1
t1.set_downstream(t2)
t2.set_upstream(t1)
t1 >> t2
t2 << t1
t1 >> t2 >> t3

# below are same
t1.set_downstream([t2, t3])
t1 >> [t2, t3]
[t2, t3] << t1
```

Dependecy **cannot be cyclic**.

## Running the Script / Testing

You will see "tutorial1" in list.


```sh
# initialize the database tables
airflow db migrate

# print the list of active DAGs
airflow dags list
# You will see "tutorial1" in list.

# prints the list of tasks in the "tutorial" DAG
airflow tasks list tutorial1
# print_date
# sleep
# templated


# prints the hierarchy of tasks in the "tutorial" DAG
airflow tasks list tutorial --tree
# <Task(BashOperator): print_date>
#     <Task(BashOperator): sleep>
#     <Task(BashOperator): templated>

# command layout: command subcommand [dag_id] [task_id] [(optional) date]

```

When using `test`, no update is made in database, only local run with output on stdout is shown. This is for **testing** only.

```sh

# testing print_date
airflow tasks test tutorial1 print_date 2015-06-01

# testing sleep
airflow tasks test tutorial1 sleep 2015-06-01

# testing templated
airflow tasks test tutorial1 templated 2015-06-01
```

Here we pass an optional date, is called the _logical date_ (also called **execution date** for historical reasons). It is just for simulation, actual run is now. DAG runs **for** a specific date, not **at**, eg, DAG runs task for today, but the task may be scheduled to run at midnight (or when condition is met). So there is a logical data and a physical date (actual run date).


## Backfill

It will start the tasks (not test but actual run) on a specified logical start date and an optional end date. It populates the logs and db with running status. Eg

```sh
# start your backfill on a date range
airflow dags backfill tutorial1 \
    --start-date 2015-06-01 \
    --end-date 2015-06-07
```

## Conclusion Overall

You have built, tested and backfilled the Airflow pipeline. You have added your code to the repo, that has a scheduler running. It will pick the schedule and trigger jobs as needed.


## Tutorial 2 - Working with TaskFlow

Link: <https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html>

TaskFlow API is introduced in Airflow 2.0. This lets define DAG as a function with wrapper. The tasks in DAG are sub-functions with another wrapper. Eg, outline only

```py
...

@dag(
    schedule=None,
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
)
def tutorial_taskflow_api():

    @task()
    def extract():
        pass

    @task(multiple_outputs=True)
    def transform(order_data_dict: dict):
        pass

    @task()
    def load(total_order_value: float):
        pass

    order_data = extract()
    order_summary = transform(order_data)
    load(order_summary["total_order_value"])

tutorial_taskflow_api()
```

You can see, using decorators, how simply we have defined the dag and tasks. It separates the code.

In behind, it still uses XCom and dependecy is automatically created when calling functions.

The decorated tasks and dag can be reused in another functions, or can imported from another file and reused.
