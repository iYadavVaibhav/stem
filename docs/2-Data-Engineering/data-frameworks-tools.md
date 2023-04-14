# Data Tools & Frameworks

_data processing tools, libraries and frameworks_

- **Apache Spark** - large-scale data processing as pandas.
  - InMemory to avoid diskwrites slowness  of mapreduce
  - Data Structure is RDDs
  - Interactive analytics are faster, just like we do in Jupyter where next step is based on prev.
  - Transformations - `filter()` map groupByKey union - give RDD
  - Actions - count first collect reduce - give single result
  - PySpark - Python API for spark, RDD as DataFrame so makes similar to Pandas.

- **Apache Beam** - unified programming model to define and execute data processing pipelines, including ETL, batch and _stream-processing_.

- **Apache Kafka** - distributed event store and _stream-processing_ platform

- **Apache Flink** - _stream-processing_ and batch-processing framework

- **Apache Storm** - distributed _stream-processing_

- **Apache Spark Streaming** - distributed _stream-processing_. Extension of core framework.

- **Apache Airflow** - workflow management platform for data engineering pipelines

- Links
  - [Medium - Stream Processing Framworks and differences](https://medium.com/@chandanbaranwal/spark-streaming-vs-flink-vs-storm-vs-kafka-streams-vs-samza-choose-your-stream-processing-91ea3f04675b)














