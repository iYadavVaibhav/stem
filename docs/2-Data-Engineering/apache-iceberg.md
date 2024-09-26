---
date: 2024-09-16
---

# Apache Iceberg Notes

## Iceberg Overview

- Apache Iceberg is a **open-source lake formation solution** for storing data for huge analytic tables.

- It is a **open-source table format** that **uses Parquet open-data format** to store the data in file. [More](./big-data.md#open-source-table-formats-data-lake-table-formats).

- Enables use of **SQL Queries** as well as let use **big data engines** like `Spark`, `Flink`, `Hive` and others to safely work with the same tables, at the same time.


**Key Features:**

- **SQL-based table format:** Iceberg uses a SQL-based table format, making it easier to manage and query large datasets.
- **Transactionality:** Iceberg supports transactional operations with **ACID** properties, ensuring data consistency and integrity.
- **Schema evolution:** Iceberg allows for schema evolution, making it **easier to add or remove columns **from a table without affecting existing data.
- **Partition evolution:** Iceberg supports partition evolution, making it **easier to change the partitioning** scheme of a table without affecting existing data.
- **Time travel:** Iceberg supports time travel, allowing you to **query historical versions** of a table.
- **Hidden partitioning:** Iceberg supports hidden partitioning, which **simplifies query optimization and performance tuning**.
- **Multiple data processing engines:** Iceberg is compatible with multiple data processing engines, including `Spark`, `Trino`, `Flink`, `Presto`, `Hive`, `Impala`, `StarRocks`, `Doris`, and `Pig`.

**Benefits:**

- **Improved data management:** Iceberg provides a more efficient and reliable way to manage large datasets.
- **Simplified query processing:** Iceberg simplifies query processing by providing a SQL-based interface and optimizing query execution.
- **Enhanced performance:** Iceberg can improve query performance by using techniques such as hidden partitioning and columnar storage.
- **Increased flexibility:** Iceberg provides more flexibility for data engineering teams by allowing them to easily evolve their data models.
- **Lower Costs** - compared to use of other stacks like Glue, S3; Iceberg can **reduce costs up to 4 times**.

## Competitors of Apache Iceberg

1. **Delta Lake:** Developed by **Databricks**, Delta Lake is another **popular open-source format** for structured data. It offers similar features to Iceberg, including transactionality, schema evolution, and time travel. However, Delta Lake is more tightly integrated with the Databricks platform, which can be a pro or a con depending on your specific use case.

2. **Apache Hudi:** Originally **developed by Uber**, Hudi is another **open-source format for streaming data**. It offers features like upserts, deletes, and real-time updates, making it a **good choice for streaming** data pipelines. Hudi is particularly well-suited for data warehousing and analytics use cases.

### Comparison of Features

| Feature                     | Iceberg   | Delta Lake | Apache Hudi |
|-----------------------------|-----------|------------|-------------|
| Transactionality            | Yes       | Yes        | Yes         |
| Schema evolution            | Yes       | Yes        | Yes         |
| Time travel                 | Yes       | Yes        | Yes         |
| Upserts                     | Yes       | Yes        | Yes         |
| Deletes                     | Yes       | Yes        | Yes         |
| Streaming updates           | Yes       | Yes        | Yes         |
| Integration with Databricks | Good      | Excellent  | Good        |
| Performance                 | Excellent | Excellent  | Good        |

**Note:** The best choice for your **specific use case** will depend on factors such as your data volume, processing requirements, and preferred technology stack. It's often a good idea to **evaluate multiple options and benchmark** their performance in your environment before making a final decision.

## Iceberg Architecture

- Iceberg user parquet as open-data format, but along with this it stores metadata, catalog, and forms **its own table-format** that makes it different from other lake-house. This logic of storing table-format is open source.
- Eg, **for interoperability** Iceberg can use data stored in parquet format by Hive or DeltaLake, by not changing the data, yet building other things around data that enables its features like SQL querying, snapshots, time-travel, upserts etc.

---


## AWS Iceberg Integration

- AWS offers Apache Iceberg as a service with some modification on top of open source that makes it better than the open source version.


### Using **Iceberg Ordered** data format instead of _Hive Parquet_

- **Cost and Time reduction**
  - Using **Iceberg Ordered** data format instead of _Hive Parquet_ can reduce cost and time.
  - Reduces Athena cost by 34%. This is because athena cost depends on data scanned which is reduced when using Iceberg.
  - Athena query time remains the same.
  - Number of S3 get object API requests are reduced by 45%.
  - S3 list object API requests are not needed, hence reduced by 100%.


**Apache Iceberg runs and integrates with various AWS services, including:**

- **Amazon S3:** Iceberg uses S3 as the underlying **storage for tables**.
- **Amazon EMR:** EMR clusters can be used to **run Iceberg jobs**, providing a managed Hadoop environment for data processing.
- **AWS Glue:** Glue can be used to **create, manage, and query Iceberg tables**, as well as to extract, transform, and load (**ETL**) data into Iceberg.
- **Amazon Athena:** Athena can be used to **query Iceberg tables** using standard SQL, providing a serverless, interactive query service.
- **AWS Firehose** You can use Firehose to **load data into Iceberg tables in real-time**
- **AWS Redshift Spectrum** (serverless query) You can **query Iceberg tables** stored in S3 directly (serverless)
- **AWS Lambda:** Lambda can be used to create **custom functions** that can interact with Iceberg tables, such as for data processing or **ETL tasks**.



**In addition to AWS services, Iceberg also integrates with other popular data processing frameworks:**

- **Apache Spark:** Spark can be used to **read, write, and query Iceberg tables**, providing a powerful and scalable data processing engine.
- **Trino:** Trino is a distributed SQL query engine that can be used to **query Iceberg tables**
- **Presto:** Presto is another distributed SQL query engine that can be used to query Iceberg tables.





## MoJ (Ministry of Justice) Case Study

- Data lands in S3 as bronze layer having Hive Table Format.
- Then to transform it and load as Silver layer, there are two approaches compared
  1. Use **AWS Glue** then load into Iceberg Tables on S3 as Silver Layer
  2. Use **AWS Athena** to load into Iceberg Tables on S3 as Silver Layer
- Using approach 2, athena instead of glue, has following benefits:
  - Athena cost reduction in bulk insert and merge (CDC)
  - Reduced query time (faster results)
  - Thus Athena is cheaper and faster compared to Glue.
  - They reduced cost by 99%.
  - It became 55% faster.


## Cloudinary Case Study

- 10-20 TB per day
- Old Data pipeline
  - s3 -> emr spark -> s3(iceberg) -> snowflake -> reports/ML
  - snowflake does everything as gold layer
- New Pipeline, transition to Iceberg
  - Instead of using snowflake, athena is used directly on Iceberg tables for analytics and ML.
  - This resulted in:
    - reduces costs
    - better query response time

- migration challenges
  - compaction
    - iceberg provides it out of box
    - bin-pack, sort key
    - on getting right sort-key, the time and cost to run the query is less.
  - maintenance
    - remove orphan
    - expire snapshots - each txn makes snapshot, this can be deleted in some time.
    - it reduced data by 112TB, that is, $2700 per month.
  - monitoring
    - iceberg exposes lot of metadata, this can be helpful to look at using dashboard.

- [blog link](https://aws.amazon.com/blogs/big-data/how-cloudinary-transformed-their-petabyte-scale-streaming-data-lake-with-apache-iceberg-and-aws-analytics/)
- [presentation link PDF](https://trino.io/assets/blog/trino-fest-2024/cloudinary.pdf)

- **What is trino?**
  - Trino is an open-source SQL query engine that enables users to perform fast analytic queries on large data sets. It's designed for interactive data analytics and can scale to meet the needs of the world's largest organizations.

---

- [ ] _to be finalized_

## Technical Deep dive in Apache Iceberg

- Apache Iceberg Overview
  - benefits
    - acid transactions on data lake, commit ot object, do inset and update on object,
    - fast and quick using metadata
    - expressive sql, use sql on data lake. or you can use flink, spark as well. Query with redshift needs redshift spectrum, then you can query iceberg table.
    - partition - less table scan, flexible schema
    - agnostic processing engine - no lock-in, works with any vendor.
      - create table with athena, query with spark, use with glue, you can do time-travel, go back with snapshots, do incremental querying.
- AWS Native Support
  - 11:25

- Iceberg **Table** anatomy
  - not just one parquet file
  - It has **catalog**, **metadata file and manifest file**, and **data file**, so 3 different files.
  - Here catalog is on Glue, then other files are no S3.

- Catalog
  - points to latest metadata?

- Metadata
  - three parts
    - metadata
    - manifest list
    - manifest file
  - Metadata file
    - table level, schema, partition info, snapshot info.
    - it can point to multiple snapshots, you are not re writing all data on modification but create new snapshot
  - Manifest
    - they are indexes in iceberg table
    - it has high level query stat for query optimization
    - has pointer for actual data file.
    - it has data stats per column, value and ranges. for improving query performance.

- [ ] half an hour miss

- Table Maintaining
  - binpack
    - it merges or separates files to a set size
  - sort
    - it sorts and shuffles
- Managed Compasion
  - easy to do using Glue

- Migration Strategies
  - in place migration
    - do not rewrite whole data file
    - iceberg can use hive data file
    - iceberg builds its metadata and catalog.
  - Fill data migration
    - new table in new location
    - it can be expensive and time consuming if data is huge

## Streaming with Iceberg

- data has short self life, do analytics in real time.
- iceberg benefits are snapshots, time-travel, schema-evolution

- CDC with Debezium
  - Kafka Source Connector
  - Flink cna also run Debezium

- kafka Connect
  - kafka is streaming source
  - KC is additional part, lets connect and send data to ext sources.
    - KC lets connect to sink and sources, then in between is Kafka.
- Deb Kaf Connect - 12:20
- Amazon MSK - managed akfka


- Append vs Upsert - Trade Off
  - append keeps history, upsert looses history

- Low code streaming ingestion
  - firehose and kafka connect.
  - KC uses apache iceberg sink connector

- **Streaming Ingestions to Iceberg tables with Streaming Frameworks**
  - using spark/flink you can read iceberg table in real time.
  - Flink
    - lets use data stream api of iceberg
    - use connector of ice berg
    - you can read write to iceberg in real time
    - Issues
      - enable checkpoint is required
      - flink commits when checkpoint is enables
      - no support for watermark, schema evolution, hidden partitioning
    - Spark
      - structured stream
      - read write
      - micro batches in use
      - writes commits in smaller intervals
    - For iceberg, spark is most feature rich compared to flink. 12:42.

  - Iceberg streaming problem
    - duplicates, due to double updates problem.
    - on upsert, you have to do de-duplicates.
    - firehose does this automatically
    - small files are problem due to high rate of commits, merge on read updates.
    - maintenance is a solution to this.

- [ ] what is compaction, how does it effect maintenance

## What is new in Iceberg on AWS?

- iceberg iterates perfectly with AWS.
- AWS managed iceberg cluster is 4x faster compared to OpenSource Iceberg.
- AWS EXpress One Zone S3 Buckets lets do up to 4x faster reads. 13:01

- fine grained access control with lake formation
- may features are AWS restricted and are not on open source, which make it fast and integrated with AWS.

- [Blog AWS Iceberg Tutorial](https://aws.amazon.com/blogs/big-data/understanding-apache-iceberg-on-aws-with-the-new-technical-guide/)

- [Hands on Lab - Apache Iceberg Roadshow - London](https://catalog.us-east-1.prod.workshops.aws/join?access-code=affe-0a759f-48)





























