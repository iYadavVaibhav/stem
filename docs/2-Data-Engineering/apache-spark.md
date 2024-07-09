---
date: 09-07-2024
---

# Apache Spark


- **Apache Spark**
  - allows distributed parallel execution.
  - external data -> loaded to -> data frame -> which is -> RDD -> runs on -> different nodes within the cluster.
  - large-scale data processing as pandas.
  - InMemory to avoid diskwrites slowness  of mapreduce
  - Data Structure is RDDs
  - Interactive analytics are faster, just like we do in Jupyter where next step is based on prev.
  - Transformations - `filter()` map groupByKey union - give RDD
  - Actions - count first collect reduce - give single result
  - PySpark - Python API for spark, RDD as DataFrame so makes similar to Pandas.


## LL - Apache Spark Essential Training: Big Data Engineering

Link: [Apache Spark Essential Training: Big Data Engineering](linkedin.com/learning/apache-spark-essential-training-big-data-engineering-14259237)

Spark jobs are java classes with function doing specific work.


Spark splits data into RDDs based on key, they do single operation in one executor, multirecord-operation by swapping the data in between executors.

Spark can read and write to muptiple databases like rdbms, file, kafka etc.

Spark comesup with execution plan by analysing the whole code.

Spark lets maintain the state of job by IDs.

You can build hybrid of real-time and batch job using spark.

The code is java jobs, docker containers for source and sinks.