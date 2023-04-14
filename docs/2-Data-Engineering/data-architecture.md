# Data Architecture

Aim is to collect and store data in a way that it is optimised for reading to enable analytics and BI.

## Concepts

- Modeling - Logical is modeling on paper/ppt. Physical is modelling on database with the data.
- Data storage can follow this journey
  - staging area where it is dump from feeds
  - then 3nf schema - where it is clean and ready for joining, it is data warehouse
  - then denormalised simple query for consumers, it is data mart
- schema is collection of database objects (tables, views and indexes).
- 3NF Schema minimizes redundancy by splitting data in multiple tables and linking them with relationships. Adding new entity is easy without effecting current applicaiton. But, this makes reading data slow as the query joins multiple tables.
- Data Warehouse can have multiple star-schema, each based on a business-process such as sales tracking or shipments. Each star-schema represents a data-mart, this can serve the BI needs. Star-schema have fraction of table compared to 3NF. 15-20 star-schema can cover all LOBs of enterprise. BI users can easily query and join multiple star-schemas as they few tables.
- Star schemas can have denormalized dimensions for easy understanding and faster data retrieval and less complex queries.
  - Most important is to consider the level of detail, grain of data.
- Both 3NF and Star-schema don't contradict but can work in layers with 3NF as foundation and star-schema as access and opttimized layer.


## Data Storage Solutions

- **Data Lake** - is dumped data with no purpose
- **Staging Area** is a dump from feeds. It simplfies cleaning and consolidation.
- **Data Warehouse** - data from different sources into central store to provide **single source of truth** on which BI and Analysts can rely.
  - **OLAP vs OLTP** - Compared to OLTP (transaction processing), warehousing is read oriented, for analytics workload OLAP.
    - read oriented, vs insert/update/delete
    - denormalized for reads, fully normalized for consistency
    - ETL batch updates, always up to date.
  - Big data warehousing handling petabytes in an distributed environment. Handle 3Vs, real time, no sql, petabytes? It is ETL but at industry level,
- **Data Mart** - usually build for single purpose, for particualr LOBs, can be physically designed or implemented logically by creating views, materialized view or summary data in warehouse (they have an overlap). It mainly focuses on a subset of data instead of complete enterprise data. They can exist as
  - Island is right from source, can be inconsistent.
  - Dependent is fed from warehouse, mostly consistent.
- **Operation Data Store** - ODS gives data warehouses a place to get access to the most current data, which has not yet been loaded into the data warehouse. Usually current day data.
- Usually - Data Lake > Data Warehouse > Data Mart
- Data Warehousing, data mart build, database modeling, dimentional modeling, data modeling,  - they all have a common goal to **improve data retrieval** (select query optimized).

  
Figure: **Architecture** of a Data Model (with optional "Staging Area" and "Data Marts")
  
  ![Data Warehouse](https://docs.oracle.com/en/database/oracle/oracle-database/21/dwhsg/img/dwhsg064.gif)

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

## Build a Data Warehouse

*This defines process to turn architecture to system deliverable*

### Logical Model

In Data Modelling, Logical Model is conceptual (pen & paper), focus on business needs and build subject-oriented `schema`

- **Data Gathering** - Identify the things of importance, `entity` (data item, like user, book) and its properties `attributes` (columns; like name, dob).
- **Entity-Relationship Modeling** - Determine how entities are related to each other, `relationships`. Determine the unique identifier for each entity record, `primary key`. It applies to OLAP, OLTP, 3NF EDW, star and snowflake.
- Determine data `granularity`, week, day, month.
- Divide data into
  - **facts** - numeric, transactional data, fast changing. Mostly tall table with numeric data, datetime and contains forign keys  of dimaension table which combined make composite key as its primary key.
    - Summary fact tables contain aggregated facts.
  - **dimensions** - descriptive, slow changing, known as lookup tables or reference tables. Mostly wide. It may contain hierarchies. Eg, product, customer, time. Data is kept at lowest level of detail, it can be rolled up higher level of hierarchy.
- Write down all dimension and facts required. Several distinct dimensions, combined with facts, enable you to answer business questions.
- **Identify the Source Data** - that will feed the data mart model, that is populate the facts and dimensions.
- Design your `schema` for data mart
  - **Star Schema**
    - it is simple, having fact in centre and dimensions around it, just like a star, where only one join establishes the relationship between the fact table and any one of the dimension tables.
- Your design should result in
  - set of entitis and attributes corresponding to fact and dimentions tables.
  - a model/pipeline to move data from sources to mart as facts and dimensions.

### Physical Model

It implemets logical model, with variations based on system parameters like memory, disk, network and software type.

