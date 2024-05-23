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

- **Apache Beam** - unified programming model to define and execute data processing pipelines, including ETL, batch and _stream-processing_.

## Apache Spark

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


## Apache Kafka

- distributed event store and _stream-processing_ platform
- stream processing compared to batch processing
- architecture it supports is scalable and makes data distributed, replicated and fault-tolerant, hence, allowing stream processing in real-time.
- it is based on pub-sub (publishing and subscribing) messaging system.
- kafka sends data in real-time to `topics`. data may be infinite and incomplete at time of query.
- consumers who process data can read topics.
- works on 3-nodes cluster.
  - use IP of three servers in configuration.

- **how it works**
  - kafka uses logs to store data and calls it topics. it is saved to disk as log file. they are horizontally scaled and partitioned.
  - producer can write to partitions as fire-and-forget, or synchronous, or asynchronous
  - consumers can read and be part of a consumer group, so that they consume from different partitions at fast rate.

- **configuration**
  - configuration connects zookeeper and kafka together, it is where you define the server and port to connect and data and log directories.
  - `zookeeper.properties` file has info on configs for zookeeper `dataDir`, `servers`, `clientPort`
  - kafka configs are in `server.properties` file, like, `log.dirs=`, `zookeeper.connect=`.

- **hello test**
  - create a topic, a producer, some messages, a consumer to read them.

  - create topic called 'dataengineering'
    - `bin/kafka-topics.sh --create --zookeeper localhost:2181,localhost:2182,localhost:2183 --replicationfactor 2 --partitions 1 --topic dataengineering`

  - list all topics
    - `bin/kafka-topics.sh –list --zookeeper localhost:2181,localhost:2182,localhost:2183`

  - write messages to topic
    - you can use console to add messages to a topic
    - `bin/kafka-console-producer.sh --broker-list localhost:9092,localhost:9093,localhost:9094 -topic dataengineering`

  - read messages from topic
    - you can read from beginning or define an offset if already read.
    - `bin/kafka-console-consumer.sh --zookeeper localhost:2181,localhost:2182,localhost:2183 --topic dataengineering –from-beginning`

  - whatever you write in producer appears on consumer after a lag. this shows the connectivity between two no you can use Python, Airflow/NiFi to build a pipeline.

- **Kafka data pipeline using NiFi**
  - use NiFi to build processors that act as producer and consumer.
  - Consumer can have multiple consumers in consumer-group.
  - later you can add it to prod pipeline as normal that is, read kafka -> staging, transformation, validation, loading, etc.

- **Batch vs Streaming**
  - if streaming data is unbounded (infinite), then you need to rethink of validating it for completeness, recalculate min, max and avg.
  - you can use `time-window` to make unbounded data bounded, that is, if 2022 records are fetched then avg for that year is calculated and will not change, however, new data for 2023 can still be unbounded and keep coming.
    - `fixed` - like 1 min, no overlapping
    - `sliding` - of 1 min, slides 10s, has overlapping
    - `session` - no time bound but event based, like log in to log out activity.
    - also the time can be `event-time`, `ingest-time` or `processing-time`

- **Producing and consuming with Python**
  - use library
  - import producer and consumer
  - add servers and topics, collect recept as callback.
  - `from confluent_kafka import Producer`

    ```python
    from confluent_kafka import Producer
    def receipt(err,msg):
        ...

    p=Producer(..)
    p.produce('users',m.encode('utf-8'),callback=receipt)

    from confluent_kafka import Consumer
    c=Consumer({... : ...})
    c.list_topics().topics
    t.topics['users'].partitions
    c.subscribe(['users'])
    while True:
      msg=c.poll(1.0)
      ...

    c.close()

    ```




## Apache Airflow

- _workflow management platform_ for data engineering pipelines
- workflow manage, can be distributed. used DAGs.
- create your data flows using pure Python.
- The default database for Airflow is SQLite. This is acceptable for testing and running on a single machine, but to run in production and in clusters, you will need to change the database to something else, such as PostgreSQL.


## Apache NiFi

- a framework for building data pipelines, used DAGs.
- looks like informatica on the web.
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


## Apache Spark Streaming

distributed _stream-processing_. Extension of core framework.


## Links

- [Medium - Stream Processing Framworks and differences](https://medium.com/@chandanbaranwal/spark-streaming-vs-flink-vs-storm-vs-kafka-streams-vs-samza-choose-your-stream-processing-91ea3f04675b)
