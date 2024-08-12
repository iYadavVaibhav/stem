# Data Architecture

_how to architect, where to architect, stages of storage, storage solutions_

- [ ] add GPT notes

Aim to architect database is to collect and store data in a way that it is optimised for reading to enable analytics and BI.

## Overview / Concepts

- **Database Modelling**
  - _Logical Model_ is modelling on paper/ppt
  - _Physical Model_ is modelling on database with the data.

- **Data Storage Stages** can follow this journey
  - Staging area where it is dump from feeds, can be OLTP dumps
  - Data Warehouse - where it is stored in star schema, is clean, easy to understand and update and ready to use.
  - Data Mart - then denormalised simple query for consumers, focusing on small business areas / purpose.

- **Database Schema** is collection of _database objects_ (tables, views and indexes).

- **3NF Schema** minimizes redundancy by splitting data in multiple tables and linking them with relationships. Adding new entity is easy without effecting current application. But, this makes reading data slow as the query joins multiple tables.

- Data Warehousing, data mart build, database modelling, dimensional modelling, data modelling,  - they all have a common goal to **improve data retrieval** (select query optimized).


## Data Storage Solutions

- **Data Lake** - is dumped data with no purpose
- **Staging Area** is a dump from feeds. It simplifies cleaning and consolidation.
- **Data Warehouse** - data from different sources into central store to provide **single source of truth** on which BI and Analysts can rely.
  - **OLAP vs OLTP** - Compared to OLTP (transaction processing), warehousing is read oriented, for analytics workload OLAP.
    - read oriented, vs insert/update/delete
    - denormalized for reads, fully normalized for consistency
    - ETL batch updates, always up to date.
  - Big data warehousing handling petabytes in an distributed environment. Handle 3Vs, real time, no sql, petabytes? It is ETL but at industry level,
- **Data Mart** - usually build for single purpose, for particular LOBs, can be physically designed or implemented logically by creating views, materialized view or summary data in warehouse (they have an overlap). It mainly focuses on a subset of data instead of complete enterprise data. They can exist as
  - Island is right from source, can be inconsistent.
  - Dependent is fed from warehouse, mostly consistent.
- **Operation Data Store** - ODS gives data warehouses a place to get access to the most current data, which has not yet been loaded into the data warehouse. Usually current day data.
- Usually - Data Lake > Data Warehouse > Data Mart
- Data Warehousing, data mart build, database modelling, dimensional modelling, data modelling,  - they all have a common goal to **improve data retrieval** (select query optimized).


## Data Warehousing Concepts

- **What is Data Warehouse**
  - simply it is a database.
  - designed in a way to facilitate easy reads and accommodates change in model like adding a new dimension.
  - lets slice and dice data from different dimensions and by time.
  - lets view highly-aggregated data and same time lets drill-down to lowest granularity.
  - the data is non-volatile (does not change) and lets analyze what occurred over time.
  - it includes **ETL process**, multi-dimensional modelling, backups, availability
  - Big data warehousing handling petabytes in an distributed environment. Handle 3Vs, real time, no sql, petabytes? It is ETL but at industry level.

- **Why is Data Warehouse required**
  - to combine data from different sources into **single source of truth** on which BI and Analysts can rely.
  - to enhance organization's performance by analysing data.
  - to maintain historical records to look over years.  

- **How Data Warehouse works**
  - _Read Optimized_ - they are designed to query and analyze rather than transaction processing.

- **Characteristics of a Data Warehouse**
  - simplicity of access and high-speed query performance.

- **OLAP vs OLTP** - OLTP (Online Transaction Processing), OLAP (Online Analytical Processing)
  - OLAP is optimized for quick reads and analysis, OLTP is optimized for insert/update/delete
  - OLAP is denormalized for reads, OLTP is fully normalized for consistency
  - OLAP is populated with ETL batch updates, OLTP is always up to date with transactional writes.

- **Data Mart** - similar to warehouse but is usually build for single purpose, for particular LOBs.
  - It can be physically designed or implemented logically by creating views, materialized view or summary data in warehouse (they have an overlap).
  - It mainly focuses on a subset of data instead of complete enterprise data.
  
  - They can exist as
    - _Island Data Marts_ - it is right from source (OLTP), can be inconsistent. Quick workaround if there is no data warehouse.
    - _Dependent Data Marts_ - it is fed from warehouse, mostly consistent. Lengthy as it needs data warehouse to be built.

- **Operation Data Store** - ODS gives data warehouses a place to get access to the _most current data_, which has not yet been loaded into the data warehouse. Usually _current day_ data. It **not** historic.

- **Data Warehouse Architectures**
  - Basic - Source-data to warehouse to users, no data-marts, no staging-area.
  - Staging and warehouse - from source data is landed to staging area then to warehouse.
  - Staging, warehouse and data marts - data lands from source to staging area, then to warehouse, then individual LOBs can have data-marts for more refined use cases. Also called EDW (Enterprise Data Warehousing)

> Figure: **Architecture** of a Data Model (with optional "Staging Area" and "Data Marts")
  
  ```mermaid
  flowchart LR
  ds1[(Ops Sys 1)] --> sa[(Staging\nArea)]
  ds2[(Ops Sys 2)] --> sa
  ds3[Flat Files] --> sa
  sa --> wh[(Warehouse\n\nMeta Data\nSummary Data\nRaw Data)]
  wh --> dm1[(Purchasing\nData Mart)]
  wh --> dm2[(Sales\nData Mart)]
  wh --> dm3[(Inventory\nData Mart)]
  u1(Analysis Users)
  u2(Reporting Users)
  u3(Mining Users)
  dm1 --> u1
  dm2 --> u1
  dm1 --> u2
  dm2 --> u2
  dm2 --> u3
  dm3 --> u3
  ```

As of 2022, this is traditional data warehousing. It works fine for most of the needs specially internal work. However, with the big data shift, some things have changed and this may not be an ideal solution.

Changes in modern big data landscape:

- Sources - variety of data sources has increased, eg, APIs, File
- Triggers - Batch / Event / Realtime - along with batch, now we have event based data pipeline triggers and realtime data pipeline.
- Process - ETL to ELT - Now that we have more compute and more data, it makes sense to first load the data as it is huge, and then do transformations as we have more compute.
- Structure - Now we have JSON, Blog, Images, GeoSpacial, IoT data and more, this is a shift from structured datasets.

To cater these changes you may have to include:

- Real time data pipeline using Kafka and Kinesis
- Event based pipeline using AWS Lambda
- ETL to Generic ETL where same ETL job can be used to connect to multiple data sources with some param modifications.
- Orchestration tools to better manage 100s of ETL scripts.

## Logical Design in Data Warehousing

- **What is Logical Modelling**
  - Logical Model is conceptual (pen & paper), focus on business needs and build subject-oriented `schema`. It more to understand use case, end user and the information you need.

- **How to build Logical Model**
  - Identify the things of importance, _entity_ (data item, like user, book) and its properties _attributes_ (columns; like name, dob).
  - Determine data _granularity_, week, day, month.
  - Determine how entities are related to each other, _relationships_. Also called _entity relationship modelling_.
  - Determine the _unique identifier_ for each entity record, which is `primary_key` in physical model. It applies to OLAP, OLTP, 3NF EDW, star and snowflake.
  - Next, divide data into _facts_ and _dimensions_. Write down all dimension and facts required. Several distinct dimensions, combined with facts, enable you to answer business questions.
  - _Identify the source data_ that will feed the data mart model, that is, populate the facts and dimensions.
  - _Design your schema_ for data mart, star-schema, snow-flake schema or other.
  - Lastly you need a _routine/pipeline_ to _move data_ from sources to mart as facts and dimensions. Determine the _frequency_ at which the data is refreshed.
  
- **Facts**
  - It is numeric, transactional data, fast changing. Mostly tall table with numeric data, datetime and contains foreign keys  of dimension table which combined make composite key as its primary key.
  - Fact table with aggregated facts is called _summary table_.
  - A fact table has a _composite key_ made up of the primary keys of the dimension tables of the schema.
  
  - **Adding rows to fact table**, there are three ways
    - Transaction-based: row shows a lowest grain transaction for a combination of dimension.
    - Periodic Snapshot: each row is related to a period, like daily or weekly.
    - Accumulating Snapshot: each row shows occurrence of process, that is, multiple rows for one process but each row tracks a movement.

- **Dimensions**
  - It is descriptive, slow changing, known as lookup tables or reference tables. Mostly wide. It may contain hierarchies. Eg, product, customer, time.
  - Data is kept at lowest level of detail, it can be rolled up higher level of hierarchy.

- **Star Schema**
  - It is simple, having fact in centre and dimensions around it, just like a star, where only one join establishes the relationship between the fact table and any one of the dimension tables.
  - Star-schema have fraction of table compared to 3NF. 15-20 star-schema can cover all LOBs of enterprise. BI users can **easily query** and join multiple star-schemas as they have few tables.
  - Star schemas can have **denormalized dimensions** for easy understanding and **faster data retrieval** and less complex queries.
  - Most important is to consider the level of detail, grain of data.
  - Both 3NF and Star-schema don't contradict but can work in layers with 3NF as foundation (OLTP) and star-schema as access and optimized layer.
  - Data Warehouse can have multiple star-schema, each based on a business-process such as sales / tracking / shipments. Each star-schema represents a data-mart, this can serve the BI needs.


## Physical Design in Data Warehousing

*This defines process to turn architecture to system deliverable. From - Oracle® Database - Data Warehousing Guide 21c*
It implements logical model, with variations based on system parameters like memory, disk, network and software type.


## Multi Dimensional Modelling

BI developers create cubes to support fast response times, and to provide a single data source for business reporting.

## Other Tasks in Data Warehousing

- Configuring database to be used as a warehouse.
- Performing upgrades of new release.
- Managing users, security and objects.
- Backing up and performing recoveries.
- Monitoring performance and taking preventive actions.



## Data Strategy Modelling Warehousing Mart Analysis Example

Define operational database, this can be used for data collection.

Then load all this data into staging area in a DWH, from all operational/source data.

Then define transformation to clean, modify and quality checks.

Finally load it into dim, facts table, which would be denormalized. This supports analytics queries.

data marts are data tailored to specific business areas or user groups.


### Position of Data Marts in the Data Warehouse Architecture

1. **Data Sources**:
   - Operational databases (e.g., CRM, ERP, marketing tools) provide raw data.
   - Data from these sources is extracted and loaded into the staging area.

2. **Staging Area**:
   - Temporary storage where raw data is cleaned and transformed.
   - Staging tables mirror the source tables.

3. **Data Warehouse**:
   - Centralized repository storing integrated, cleansed, and transformed data.
   - Contains dimension tables and fact tables designed for analytical querying.

4. **Data Marts**:
   - Subsets of the data warehouse optimized for specific business needs.
   - Provide focused, departmental access to data for faster and easier querying.

Next questions:

- ask gpt to build loader app in flask.
- define ODS data structure.


