# Data Tools & Frameworks

_data processing tools, libraries and frameworks_

- **Processing Engines** - lets do the transformations. Eg, Spark
- **Workflow Managers** - Airflow and Nifi
- **Administrative Tools** - `pgAdmin` for PostgreSQL and `Kibana` for Elasticsearch.
- **Cluster** is a group of server, where each server is called node.

- **Connection pooling** is a technique of creating and managing a `pool of connections` that are ready for use by any thread that needs them. It is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. Connection pools are used to enhance the performance of executing commands on a database. Pool means a particular thing collected together for shared use by several people. `JDBC` does this. **JDBC** (Java Database Connectivity) is a standard interface that enables communication between database management systems and applications written in Oracle Java. Most database build this as driver eg, `postgresql-42.2.10.jar`

- **Data Pipelines**
  - Combine database, a programming language, a processing engine and a data warehouse to build a pipeline. Here, database can be source, programming language can be used to control the processing engine to transform the data and load into data warehouse.
  - pipeline can be scheduled using crontab, a better workflow manager is `Apache Airflow` or NiFi.
  - for dev you can install all above tools on same machine, but in prod they are network of machines.

  - **In Prod**
    - production data pipeline – idempotence and atomicity
    - you need to stage the data as file or in database
    - you need to validate the data, use `great-expectations`
    - idempotence - if you accidentally click run on your pipeline three times in a row by mistake, there are not duplicate records – even if you accidentally click run multiple times in a row. use ID for this or date.
    - Atomicity means that if a single operation in a transaction fails, then all of the operations fail. If you are inserting 1,000 records into the database, as you did in Chapter 3, Reading and Writing Files, if one record fails, then all 1,000 fail.
    - version controlling
    - logging and monitoring

## Apache Beam

It is unified programming model to define and execute data processing pipelines, including ETL, batch and _stream-processing_.

## Apache Spark

It is a framework for distributed parallel execution. More on [Apache Spark Notes](./apache-spark.md)

## Apache Spark Streaming

distributed _stream-processing_. Extension of core framework.

## Apache Kafka

It is distributed event store and _stream-processing_ platform. More on [Apache Kafka Notes](./apache-kafka.md)

## Apache Airflow

It is _workflow management platform_ for data engineering pipelines. It lets you create your data flows using pure Python. More on [Apache Airflow Notes](./apache-airflow.md)

## Apache NiFi

- a framework for building data pipelines, used DAGs.
- looks like Informatica on the web.
- NiFi allows you to build data pipelines using prebuilt `processors` that you can configure.

- processors are -
  - `GenerateFlowFile` - generates file
  - `PutFile` - saves file
  - `ExecuteSQL` - executes sql connecting to JDBC.
  - you can configure properties of processor
  - create a connection
  - specify a relationship

- clustering and the remote execution of pipelines?


## Apache Zookeeper

- manages information about the clusters of kafka.
- elects leaders
- zookeeper is also installed in clusters.


## Apache Flink

_stream-processing_ and batch-processing framework


## Apache Storm

distributed _stream-processing_

## DBT - Data Build Tool

It helps manage 100s of scripts and procedures. It is applicable after staging area, when you are working within a warehouse and have hundreds of transformation script to be managed, tested and deployed.

## Links

- [Medium - Stream Processing Frameworks and differences](https://medium.com/@chandanbaranwal/spark-streaming-vs-flink-vs-storm-vs-kafka-streams-vs-samza-choose-your-stream-processing-91ea3f04675b)
