# U2 Data Store Management

## 1.0 Data Stores

[ ] bring in from ofc.

## 1.1 Introduction to Amazon S3


## 1.2 Amazon S3 Features and Capabilities


## 1.3 Amazon S3 Storage Classes

## 1.4 Amazon S3 Lifecycle Rules

## 1.5 Amazon S3 Security

## 1.6 Introduction to Amazon EC2

### EC2

- EC2 is service on AWS that allows you to **rent the virtual server (compute)** on the cloud.
- Get it **simply** via console or by commands in API.

- **Benefits** compared to physical servers
  - EC2 can **grow and shrink**
  - **Easy to launch** in minutes
  - You **pay less**, only for what you use.

- **Choosing Instance Types** based following
  - Power - how powerful machine is required for use case?
  - CPUs - the CPUs required? eg, `M5-Large` gives 2 vCPUs, while `C54-X-Large` gives 16 vCPUs
  - Memory - the Ram required?

- **General Purpose Instances**
  - **Power**: A balanced performance of compute, memory, and networking resources
  - **vCPUS**: A balanced ratio of vCPUs to memory
  - **Memory**: A balanced ratio of memory to vCPUs
  - Great for diverse workloads
  - Examples include `t3, t3a, t4`

- **Compute Optimized Instances Offer**
  - **Power**: High computational power
  - **vCPUs**: A higher number of vCPUS relative to memory
  - **Memory**: Sufficient memory to support most workloads
  - Great for applications that demand a lot of computational power
  - Examples include `c6g, c5, c5a, c5n`


- **Memory Optimized Instances**
  - **Power**: A large amount of RAM
  - **vCPUS**: Typically offer a lower number of vCPUs compared to other instance types
  - **Memory**: Highest memory capacities
  - Great for memory-intensive workloads
  - Examples include `r5, r5a, r5n`

- **Storage Optimized Instances**
  - **Power**: High-speed storage
  - **vCPUs**: Less vCPUs
  - **Memory**: Moderate to high memory
  - Great for low-latency storage for data-intensive workloads
  - Examples include `13, 13en, d2, h1`

- **EC2 doesn't offer persistent storage**
  - that is, if EC2 is **terminated** the data stored is **lost permanently**.
  - For persistence, you can use EBS or EFS to store data beyond life cycle of ec2.
  - [ ] replace ec2 with EC2. s3 with S3.

- **Elastic Block Storage EBS**
  - It is more **like attached Local Disk to a Computer**
  - Each disc is **mapped to individual EC2**
  - Data is persisted beyond ec2 life.

- **Instance Store**
  - This is a block storage attached to EC2.
  - It persists on reboot, but is lost when hibernated or terminated.
  - It is used more for caching.

- **Elastic File System EFS**
  - It is more like **network storage** or **shared file storage**.
  - It is mounted on to ec2.
  - It is offered by service like EFS for linux, FSx for windows.
  - Used cases, content sharing and distributed file storage.
  - The storage can content can be used by multiple EC2s for different purpose.

**Different types of EBS volumes:**

- General Purpose (gp2)
- Provisioned IOPS (io1)
- Throughput Optimized (st1)
- Cold HDD (sc1)
- Magnetic

**EC2 Pricing Models**

- **On Demand**
Allows you pay by the hour or the second, depending on the type of instance.

- **Reserved** - Reserves capacity for 1 or 3 years depending on the contract for up to 72% discount on the hourly charge.

- **Spot** - Allows you to purchase unused capacity at a discount of up to 90%.

- **Dedicated** - A physical EC2 server dedicated for you.

## 2.0 Data Formats ===================

## 2.1 Types of Data Formats

### Organizational Styles and Data Formats Analogy

1. **Ultra Organizer (Structured Data)**:
   - **Highly organized** and follows a **predefined schema** (tables, rows, columns).
   - Data relationships are clearly defined, making it **easily queryable**.
   - Example: **SQL databases, CSV files, spreadsheets**.
   - Like a well-organized closet, you can quickly find what you're looking for.

2. **Semi-Structured (Semi-Structured Data)**:
   - Contains **organizational elements** (tags, keys, attributes) but doesn’t follow a rigid schema.
   - Provides some sort of hierarchy
   - More flexible than structured data, but less queryable.
   - Example: **JSON, XML**.
   - Similar to a semi-organized closet—requires some effort to navigate but still manageable.

3. **Chaotic (Unstructured Data)**:
   - Lacks a specific schema, and data relationships are not clear, making it **hard to query**.
   - Requires **pre-processing** before analysis.
   - Example: **Images, audio, video, social media posts, text and docs**.
   - Like a messy closet, difficult to find what you need.

---

### Common Data Formats

1. **CSV (Comma-Separated Values)**:
   - **Structured data** in **tabular form**.
   - Use cases:
     - **Data exchange** between applications (e.g., database export/import).
     - **With Programming Languages**, like python to read and write data. Libraries in programming languages (e.g., Python's CSV module) handle CSV files.
     - **Quick data analysis** with tools like Excel or Google Sheets.
     - **Data backup and archival**, especially for tabular data.
     - **Human Readable and Editable** format.

2. **JSON (JavaScript Object Notation)**:
   - **Semi-structured data** organized in **key-value pairs**.
   - Use cases:
     - **Configuration files and settings**. Simple, readable.
     - **Data exchange** between web servers and browsers (common in APIs).
     - **High interoperability** across different programming languages.
     - Can be used for **backup and archiving**.

3. **Avro**:
   - Represents data in a way that is **easy to serialize** (convert to binary) **and deserialize** (convert back to original structure)
   - **Row-based format** with **JSON-like syntax** and an _optional_ **declarative schema**.
   - Use cases:
     - **Compact binary format** for smaller payloads.
     - Ideal for **big data processing** (e.g., Hadoop, Spark, Kafka).
     - **Easily handles schema changes** without breaking compatibility.
     - Ensures **data validation** and **strict typing** for high interoperability.

   ```json
   // avro data with schema defined
   {
      " type " : "record",
      " name " : "user",
      " fields " : [
         { "name" : " Name" , "type" : "string" },
         { "name" : "age" , "type" : "int" }
      ]
   }
   {
      "name": Vaibhav,
      "age": 32
   }
   ```

4. **Parquet**:
   - Open source, **Column-oriented format** designed for **data warehousing** and analytical queries.
   - Similar to avro, but **data and schema are combined into one**.
   - Use cases:
     - **Efficient data analysis** (e.g., aggregation queries).
     - **Optimized for Hadoop, Spark, Kafka**, and other big data tools.
     - Supports **frequent schema changes** without breaking compatibility.
     - Allows **selective column reading** for faster data access.

---

### Key Differences Between Avro and Parquet

- **Storage Type**:
  - **Avro**: Row-based storage.
  - **Parquet**: Column-oriented storage.

- **Schema Definition**:
  - **Avro**: Uses a **JSON-based schema**.
  - **Parquet**: Uses its own **schema definition language**.

- **Integration**:
  - Both Avro and Parquet are widely used in **Apache ecosystems** (Hadoop, Spark, Kafka).
  - Parquet is **optimized for Impala**, while Avro is **supported** by Impala.


## 2.2 Transforming Data Formats

### ETL and Data Transformation with AWS Glue

**AWS Glue** offers several ways to **transform** data:

- **Python shell jobs** for quick data manipulation.
- **Spark ETL jobs** for large-scale transformations.
- **PySpark or Scala jobs** for batch and streaming data processing.

1. **Python Shell ETL Jobs** in Glue:
   - Suitable for **simpler ETL tasks** (e.g., small datasets).
   - Provides **pre-built libraries** for transforming data between formats, such as **CSV to Parquet**.
   - Libraries for **aggregating data** (e.g., sums, averages) and reading/writing formats.
   - **Use case**: Reading a CSV file from an S3 bucket, converting it to Parquet using the `CSV` module and `PyArrow`.

2. **Spark ETL Jobs** in Glue:
   - Ideal for **complex transformations** and **large-scale data**.
   - Apache Spark is a **distributed computing system** that supports:
     - **Filtering data** based on specific criteria.
     - **Aggregating data** (e.g., sums, averages, counts).
     - **Joining data** from multiple datasets using common keys.
   - **Use case**: Processing **large datasets in Redshift** to identify top-selling products through aggregation.

3. **PySpark or Scala for Batch and Streaming Jobs** in Glue:
   - **Batch Processing**: Processing data in **fixed-size batches** (e.g., daily sales reports).
     - Example: A retail company collects daily sales data in CSV format. PySpark or Scala can read the CSV, transform, and aggregate the data.
   - **Streaming Processing**: Processing data in **micro-batches** at regular intervals (e.g., real-time data analysis).
     - Example: analysing real-time **clickstream data** using Amazon Kinesis and processing it with PySpark or Scala for real-time insights.

[ ] - do handson for above

## 3.0 Databases ======================

## 3.1 Introduction to Amazon DynamoDB

### AWS DynamoDB

**Overview of DynamoDB:**

- **DynamoDB** is a fully managed, **NoSQL non-relational** database service.
- It supports **key-value pairs** and **document data** (JSON, HTML, XML).
- **Flexible** table adaptation, but **lacks joins** and analytical query capabilities.
- **Access patterns** must be defined **before table creation**?
- **Unlimited storage**, with **single-digit millisecond response times**.
- Use **DynamoDB Accelerator (DAX)** for **microsecond latency**.
- It is limitless, can handle Terabytes smoothly.

**Benefits of DynamoDB**

1. **Global Tables** across Regions:
   - Replicate data across AWS regions for **fast, responsive access** worldwide.

2. **DynamoDB Streams**:
   - Captures **time-ordered modifications** to database items.
   - That is, it stores any modification to item in a table like created, updated etc.

3. **Partitioning and Availability**:
   - DynamoDB **automatically scales** by partitioning data. You need not take this step.
   - Replicates data across **three availability zones** for **fault tolerance**.

**Use Cases:**

- **Media and metadata storage** (photos, videos).
- **Retail applications** (high traffic, e.g., during holidays). It can handle millions of request per second.
- **Gaming platforms** (large-scale data handling).
- **Online transaction processing (OLTP)** (financial transactions, e-commerce).
- **Hierarchical data models** (e.g., employee directories).
- **Fluctuating workloads** (e.g., social media, flash sales).
- **Mission-critical applications** (healthcare, online banking). When downtime is not an option.

**DynamoDB compared to Relational Database**

1. **Tables**: Similar to SQL tables.
2. **Items**: Equivalent to **rows/records** in SQL.
3. **Attributes**: Equivalent to **columns/fields** in SQL.
   - A unique group of attributes forms a **single item**.
   - Max item size is **400 KB**.
4. **Primary Keys**:
   - Consist of one or two attributes.
   - Used to **retrieve data**. Selecting the right primary key is crucial for table design.
   - This is why knowing the **access pattern** is important as based on that you would define the primary key and then based on that you will retrieve the data.


**Time to Live (TTL)**

- Adds an expiry time to items.
- Items are **automatically deleted** once expired, including from **indexes**.
- **Deletion occurs within 48 hours** of expiration.
- Delete data might appear in result, you need to add filter to remove it.

- **Use Case**:
  - Use TTL for **deleting sensitive data**. Add expiry based on contract to keep PII.
  - session data, event logs. Add expiry so that they get auto deleted after time and save on storage costs.
  - for **debugging**. Add expiry to logs so that after debugging logs are auto deleted.

## [ ] 3.2 Amazon DynamoDB: Dealing with Rate Limits and Throttling

### DynamoDB Throughput & Capacity Modes - Study Notes

#### DynamoDB Capacity Modes

1. **Provisioned Capacity Mode**:
   - Throughput is calculated and provisioned using **Read Capacity Units (RCUs)** for read operations and **Write Capacity Units (WCUs)** for write operations.
   - Suitable for **predictable traffic** and consistent capacity needs.
   - Risk of **over-provisioning** (unnecessary charges) or **under-provisioning** (throttling).
   - Offers **consistent performance** with a maximum of **40,000 RCUs/WCUs per table**.
   - Auto-scaling available to manage fluctuations in traffic.

2. **On-Demand Capacity Mode**:
   - No need to provision throughput; DynamoDB charges for **Read/Write Request Units**.
   - Automatically scales based on demand.
   - **More expensive per request** but removes the risk of under/over-provisioning.
   - Best for **unpredictable traffic** or new tables with unknown workloads.
   - Throttling occurs if demand exceeds **2x the previous peak** within 30 minutes.
   - Can switch between modes **every 24 hours**.

**Scaling in Provisioned Mode:**

- **Auto-scaling**: Adjusts capacity between a defined minimum and maximum range.
- **Manual Scaling**: You define the exact capacity units without auto-scaling.
- Recommended to **switch to provisioned mode** once the app’s traffic becomes predictable.

**Burst Capacity:**

- **Burst capacity** provides **temporary additional throughput** by storing unused capacity from partitions for up to **5 minutes** (300 seconds).
- Helpful during traffic spikes, but shouldn't be relied upon as the primary solution.

**Solutions to Avoid Throttling:**

1. **Switch to On-Demand Mode**: Avoids under-provisioning issues by automatically scaling capacity.
2. **Increase RCUs/WCUs**: Increase provisioned throughput to match demand.
3. **AWS Application Auto Scaling**: Automatically adjusts provisioned throughput based on traffic.
4. **Retry Logic with Exponential Backoff**: Implement retry logic to delay retries after failures, using an increasing time delay.
5. **Optimize Queries**:
   - Use **WHERE clauses** to filter and retrieve only necessary data.
   - Use **Projection Expressions** to retrieve specific attributes, reducing capacity usage.
6. **Hot Partition Resolution**:
   - Avoid hot partitions (when one partition receives disproportionate traffic).
   - Analyze **access patterns** and **partition keys** to distribute traffic evenly across partitions.

## 3.3 Amazon DynamoDB: PartiQL

### DynamoDB PartiQL Editor - Study Notes

**PartiQL Editor:**

- **PartiQL** is a SQL-like syntax tool used to query DynamoDB tables via the **AWS Console**.
- It simplifies working with DynamoDB for developers familiar with SQL, supporting common statements like **INSERT**, **UPDATE**, **SELECT**, and **DELETE**.
- Query results can be displayed in **table view** or **JSON view**.

**Accessing PartiQL:**

- You can use PartiQL through:
  - **AWS Console**
  - **AWS CLI (Command Line Interface)**
  - **DynamoDB APIs**
  - **NoSQL Workbench** (a graphical tool you can install locally).

**Behind the Scenes of PartiQL:**

- PartiQL queries are automatically translated into **DynamoDB API operations**, but this process isn't always efficient.
- **Scans** and **queries** are the two DynamoDB operations relevant to PartiQL.

**Scans vs. Queries:**

- **Scans**:
  - Equivalent to `SELECT *` in SQL.
  - Command: `aws dynamodb scan-table name`.
  - **Expensive** because they read the entire table and apply filters after consuming capacity units, leading to high throughput consumption.
  - Can deplete throughput on large tables.

- **Queries**:
  - Target specific items using the **primary key**, making them more efficient.
  - Less expensive than scans, as they consume fewer capacity units.

**Best Practices to Avoid Inefficient PartiQL Queries:**

1. **Deny Scan Operations**:
   - Use **AWS IAM policies** to deny scan permissions for the identity running PartiQL statements.

2. **Create Secondary Indexes**:
   - Write queries that utilize these indexes to target specific data and improve performance.

3. **Monitor Query Performance**:
   - Regularly analyze query performance to detect and resolve full scans early.

## 3.4 Amazon Redshift Distribution Styles

### Redshift Distribution Styles - Study Notes

**Distribution Styles Overview:**

- Distribution styles determine how data is spread across compute nodes in an **Amazon Redshift** cluster. There are four main styles:

1. **EVEN Style**:
   - Data is distributed **evenly** across all compute nodes, regardless of any column values.
   - Best suited for **balanced workloads**.
   - Recommended for tables that **don't participate in JOIN operations** to avoid data skew.

2. **KEY Style**:
   - Data is distributed based on specific **key values**, where identical key values are placed on the same compute node.
   - Ideal for **JOIN-heavy queries** when there is a clear distribution key.

3. **ALL Style**:
   - The entire table is **replicated** across all nodes.
   - Suitable for **small, static tables** that don't undergo frequent updates.
   - Not recommended for frequently written tables, as changes must be applied to every node in the cluster.

4. **AUTO Distribution**:
   - Redshift automatically determines the best distribution style based on the table size and characteristics.
   - May initially use the **ALL style** for small tables and switch to **EVEN style** as the table grows.
   - Recommended when the **table size is unpredictable** or if you're unsure which style to choose.

**Recommendations:**

- Use **EVEN** for non-JOIN tables.
- Use **KEY** for JOIN-heavy queries with a clear distribution key.
- Use **ALL** for small, static tables that aren't frequently updated.
- Use **AUTO** if the table size is likely to change or when you're uncertain which distribution style fits best.

## 3.5 Amazon RedShift Workload Management (WLM)

### Redshift Workload Management (WLM) - Study Notes

**Purpose of WLM:**

- Redshift **Workload Management (WLM)** helps prioritize and manage queries to optimize system performance.
- It categorizes queries into **distinct queues** based on roles, query types, or importance. For example, there can be queues for:
  - **Long-running queries**
  - **Short and fast-running queries**
  - Specific roles like **data analytics** teams
- There is also a default **super user queue** for critical system operations such as administration and maintenance.

**Benefits of WLM:**

- **Prevents long-running queries** from holding up short queries.
- Ensures **high-priority queries** (e.g., system-critical tasks) are not delayed by exploratory or less important queries.

**Setting Up WLM:**

- WLM is configured through **parameter groups** in Redshift, which manage database settings.
- Up to **eight queues** can be created, each with its own **concurrency level** (number of concurrent queries).
  - For example, if the concurrency level is set to 1, only one query can run at a time in that queue; if set to 5, five queries can run simultaneously.

**WLM Modes:**

1. **Automatic Mode**:
   - Redshift manages concurrency and **resource allocation** (like memory) automatically based on query workload.
   - Useful for demanding queries (e.g., hash joins between large tables) where Redshift will lower concurrency for better performance.
   - Offers **priority settings** (critical, highest, high, normal, low, lowest) to assign importance to queries.
   - **Default mode** for Redshift's default parameter group.

2. **Manual Mode**:
   - Requires creating a **custom parameter group** and manually managing concurrency.
   - You can set a **concurrency level** of up to **50** per queue and for all queues combined.
   - Redshift automatically creates two default queues:
      - A queue with a concurrency level of **5**.
      - A **super user queue** with a concurrency level of **1**.

**Key Considerations:**

- Even in **automatic mode**, AWS recommends creating a separate **custom parameter group** for better control over configurations.
- WLM is ideal for balancing query workloads, avoiding bottlenecks, and ensuring critical tasks are prioritized effectively.

## 3.6 Amazon Redshift System Tables and Views

### Amazon Redshift System Tables and Views - Study Notes

**System Tables:**

- **Purpose:** Contain metadata and diagnostic information about the database, cluster performance, query execution, and overall health.
- **Not meant to be modified directly by users** but useful for diagnostics and troubleshooting.

**Examples of System Tables:**

1. **STL Query:**
   - Provides information about executed queries.
   - Includes query ID, start and end times, query text, and error messages.

2. **STL Query Metrics:**
   - Provides metrics on individual executed queries such as SPU usage, I/O statistics, and memory usage.
   - Valuable for performance tuning and troubleshooting.

3. **STV Query Metrics:**
   - Aggregates metrics from all queries executed on the cluster.
   - Includes total execution time, total rows processed, and total bytes processed.

4. **STL WLM Query:**
   - Stores information about queries executed or running within workload management queues.
   - Includes resource consumption data, useful for assessing query performance and workload management.

5. **STL Alert Event Log:**
   - Contains information about system alerts and events related to hardware failures, software errors, or resource constraints.

6. **STL Explain:**
   - Stores execution plans generated by the query optimizer.
   - Helps in optimizing queries by analysing execution plans.

7. **STL Scan:**
   - Contains detailed information about table scans during query execution.
   - Includes table ID, scan duration, and number of rows scanned.

**System Views:**

- **Purpose:** Use system tables to provide a consolidated summary and snapshot of the cluster’s data.
- **Types:**
  - **STL Views:** Consolidate data from STL tables for monitoring database activity.
  - **SVV Views:** Track various system aspects like configuration, user sessions, and table distribution.

**STV Tables:**

- **Concept:** STV tables revolve around nodes and slices in Redshift, analogous to a library with shelves (nodes) and books (data blocks).

**Examples of STV Tables:**

1. **STV Block List:**
   - Contains information about all blocks in the cluster storage (books in the library).

2. **STV Slices:**
   - Provides details on the mapping between slices and nodes.
   - Useful for monitoring resource distribution across nodes.

3. **STV Table Perm:**
   - Contains information about granted permissions.
   - Each row includes details like table ID and username/role with granted permissions.

## 3.7 Dense Compute versus Dense Storage clusters

### Amazon Redshift Cluster Types and Node Types - Study Notes

**Cluster Types:**

1. **Single Node Cluster:**
   - Consists of a single node that combines the functionalities of both leader and compute nodes.
   - **Leader Node:** Coordinates the overall operation of the cluster.
   - **Compute Node:** Processes data and executes queries.

2. **Multi-Node Cluster:**
   - Consists of one leader node and one or more compute nodes.

**Node Types:**

1. **Dense Compute Nodes:**
   - **Purpose:** Optimized for computational performance.
   - **Features:** High CPU and memory resources.
   - **Characteristics:** Prioritize compute over storage.
   - **Storage:** Smaller capacity; higher cost per terabyte.
   - **Use Case:**
     - High-query processing.
     - Complex analytical queries.
     - Concurrent queries or real-time analytics.
     - Memory-intensive workloads.

2. **Dense Storage Nodes:**
   - **Purpose:** Optimized for storage.
   - **Features:** Large storage capacity.
   - **Characteristics:** Lower cost per terabyte; less expensive.
   - **Use Case:**
     - Handling terabytes or petabytes of data.
     - Balancing compute and storage needs.
     - Lower cost for large storage but slower performance compared to dense compute.
   - **Note:** Not inherently slower but may show slightly lower computational performance for intensive processing.

3. **RA3 Nodes:**
   - **Purpose:** Scales compute and storage independently.
   - **Features:** Automatically offloads data to S3 when local SSD capacity is exceeded.
   - **Use Case:**
     - Recommended over dense storage nodes for better scalability.
   - **Cost Structure:**
     - Charges compute and storage separately.
     - Requires tracking costs for both compute nodes and data stored in S3.
   - **Dense Storage vs. RA3:**
     - **Dense Storage:** Charges combine compute and storage; simpler cost tracking.
     - **RA3:** Separates charges; potentially more complex cost management.

### Summary

- **Dense Compute:** Best for high performance and intensive computational tasks.
- **Dense Storage:** Best for large data volumes and lower storage cost; suitable if performance is less critical.
- **RA3:** Offers flexible scaling and is recommended for scenarios where scalability and cost tracking are key considerations.


## 3.8 Amazon RedShift Spectrum and Materialized Views

**Scaling Options:**


1. **Concurrency Scaling:**
   - Adds temporary compute power to handle spikes in concurrent read requests.
   - Supports parallel query execution.

2. **Cluster Resizing:**
   - **Horizontal Scaling:** Add or remove nodes from the cluster.
   - **Vertical Scaling:** Change node types to scale up or down.

### Redshift Spectrum

- **Query** large volumes of data stored in **S3** without loading it into Redshift.
- Direct **querying of exabytes of data** in S3.
- Managed **automatic scaling** behind the scenes.

- **Requirements:**
  - Requires a **Redshift cluster** for interface.
  - Cluster and S3 bucket must be in the **same region**.
  - **Multiple Redshift clusters can query** the same S3 data **concurrently**.

- **Data Handling:**
  - **External read-only tables** are created in Redshift to reference S3 data.
  - Supports `SELECT` and `INSERT`; **does not** support `UPDATE` or `DELETE`.
  - Uses external tables to **specify data format, location,** and **structure**.

- **Data Store Integration:**
  - To ingest data in **External Tables** you can use
    - AWS Glue Data Catalog
    - Amazon Athena
    - EMR cluster with an Apache Hive meta-store

### Federated Query

- Query **data across various databases, warehouses**, and **data lakes**.
- Combines data from Redshift with external databases like S3, RDS (PostgreSQL, MySQL), and Aurora.
- **Perform complex joins** and quick transformations **without needing an ETL** pipeline.

### Views and Materialized Views

**Regular Views:**

- **Virtual tables** created from saved queries that retrieve data from underlying tables.
- Data is fetched each time the view is queried, similar to a social media feed that updates with the latest data.

**Materialized Views:**

- Physical snapshots of query results stored in the view itself.
- Queries retrieve data from the stored snapshot rather than executing the query each time.
- **Use Case:** Suitable for predictable and recurring queries, such as end-of-quarter reports.
- **Creation Example:**

```sql
CREATE MATERIALIZED VIEW view_name AS
SELECT columns
FROM employee_table
JOIN department_table;
```

- **Refreshing Views:**
- **Auto Refresh:** Enabled to update the view when the source data changes.
- **Manual Refresh:** Use the command:

```sql
REFRESH MATERIALIZED VIEW view_name;
```


## 3.9 Migrating Data


**Migration vs. Transfer:**


1. **Migration:**
   - **Definition:** Moving an entire system or application, similar to moving houses.
   - **Process:** Typically involves planning, discovery, validation, and execution.

2. **Transfer:**
   - **Definition:** Moving individual files or objects, like moving a box or parcel.
   - **Services:**
     - **AWS DataSync:**
       - **Purpose:** Transfers files and objects between on-premises and AWS storage services (e.g., S3).
       - **Features:** Constant data synchronization for real-time data consistency and availability.
     - **AWS Transfer Family:**
       - **Purpose:** Fully managed file transfer services for protocols like SFTP, FTPS, and FTP.
       - **Advantages:** Seamless integration with existing authentication systems (e.g., Active Directory, LDAP).

**AWS Migration Services:**


1. **AWS Application Discovery Service (ADS):**
   - **Purpose:** Assists in discovering and gathering information about on-premises applications.
   - **Assessments:**
     - **Agentless Discovery:**
       - **Method:** Uses AWS Agentless Discovery Connector to scan the network and infrastructure.
       - **Use Case:** Ideal when installing additional software (agents) is not feasible.
     - **Agent-based Discovery:**
       - **Method:** Deploys lightweight software agents to collect granular and real-time data.
       - **Use Case:** Suitable for scenarios requiring more control and customization.

2. **Application Migration Service:**
   - **Purpose:** Focuses on application-level migrations (rehosting or lifting and shifting).
   - **Features:** Minimizes downtime by either migrating applications or replicating data.
   - **Migration Lifecycle:**
     - **Discovery:** Identify and analyze existing applications.
     - **Planning:** Develop a migration roadmap.
     - **Validation and Testing:** Set up a test environment to simulate and validate the migration.
     - **Final Migration:** Perform the migration after successful validation.

3. **Snow Family:**
   - **Purpose:** Specialized in migrating large volumes of data when internet transfer is impractical.
   - **Devices:**
     - **Snowball:**
       - **Capacity:** Suitable for data volumes of at least 10 terabytes.
     - **Snowball Edge:**
       - **Capacity:** For data volumes over 10 terabytes.
       - **Features:** Includes onboard compute resources for data processing (transformation, analysis).
     - **Snowmobile:**
       - **Capacity:** Designed for data volumes exceeding 10 petabytes.

## 3.10 Database Migration Service (DMS)

### AWS Database Migration Service (DMS) - Study Notes

**Overview:**

- **Purpose:** AWS DMS is a fully managed service designed to migrate databases from on-premises to AWS or between databases.
- **Analogy:** Like a smart flatbed transporting data from the source to the target database.
- **Key Features:**
  - **Discovery:** Identifies eligible source databases.
  - **Consolidation:** Merges multiple source databases into a single target database.
  - **Minimized Downtime:** Source database remains available during migration.

**Migration Methods:**

1. **One-Time Migration:**
   - **Description:** Moves data in a single operation from source to target.
   - **Use Case:** Ideal for migrating databases to a new environment (e.g., on-prem to cloud).
   - **Downtime:** May result in some downtime.

2. **Continuous Replication (CDC - Change Data Capture):**
   - **Description:** Synchronizes changes between source and target databases in near real-time.
   - **Use Case:** Suitable for syncing without a full load, especially if initial data migration is done using other tools.

3. **Full Load Plus CDC:**
   - **Description:** Combines full load for initial migration and continuous replication for ongoing changes.
   - **Use Case:** When a full load is needed initially, followed by continuous data syncing.

**CDC Streaming Options to S3:**

1. **Kinesis Data Streams:**
   - **Process:** CDC data is captured and ingested directly into S3 in Parquet format.

2. **Kinesis Data Firehose:**
   - **Process:** Data is ingested into Kinesis Data Streams, then streamed into Kinesis Data Firehose for additional transformations before storing in S3.

**Migration Types:**

1. **Homogeneous Migration:**
   - **Description:** Migration between databases with compatible engines.
   - **Example:** On-prem MySQL to RDS MySQL.

2. **Heterogeneous Migration:**
   - **Description:** Migration between databases with different engines.
   - **Process:**
     - **Schema Conversion:** Use AWS Schema Conversion Tool to convert schema.
     - **Data Migration:** Perform data migration after schema conversion.
   - **Example:** On-prem Oracle to RDS PostgreSQL.

**Schema Conversion Tool:**

- **Purpose:** Resolves compatibility issues between source and target database schemas.

**DMS Components:**

1. **Replication Instance:**
   - **Description:** EC2 instance running replication software within a VPC.
   - **Tasks:**
     - **Create:** Set up and configure the replication instance.
     - **Endpoints:** Define source and target endpoints for database connections.
     - **Replication Task:** Defines the data migration or replication process.

2. **IAM Role:**
   - **Purpose:** Provides DMS with the necessary permissions to access source and target databases.

**Table Mappings and Transformation Rules:**

1. **Table Mappings:**
   - **Description:** Specify relationships between columns in source and target tables.
   - **Example:** Mapping `email` to `contact_email`.

2. **Transformation Rules:**
   - **Purpose:** Transform data during migration.
   - **Types:**
     - **Data Type Conversion:** E.g., string to number.
     - **Calculations:** E.g., summing columns.
     - **String Alterations:** E.g., modifying or combining strings.

## 4.0 Data Cataloging System ====================

## 4.1 Components of a Data Catalog

### AWS Data Catalog - Study Notes

**Purpose of a Data Catalog:**

- A **data catalog** systematically organizes data assets, similar to how a library organizes books.
- It helps users **discover, understand**, and **categorize** data, offering insights on:
  - **Location of data**
  - **Contents of the data** (e.g., columns, tables)
  - **Users of the data** (who accesses it)
  - **Data quality** (e.g., missing values, inconsistencies)
  - **Data lineage** (relationships and transformations from source to destination)

**Components of a Data Catalog:**

1. **Metadata Repository:**
   - Centralized storage for metadata about datasets.

2. **Search and Discovery:**
   - Capability to search by database names, tables, columns, and keywords.
   - Tags and annotations provide context for searches.

3. **Data Lineage:**
   - Visualizes data flow from source to final destination.
   - Shows relationships between data elements (e.g., foreign keys).

4. **Data Asset Descriptions:**
   - Includes descriptions of tables, such as purpose, owner, and creation date.

5. **Access and Security:**
   - Implements access controls to restrict data viewing or modifications.
   - Provides security labels and permissions for data confidentiality.

**Examples of Data Catalog Systems:**

- **AWS Glue Data Catalog**
- **Hive Metastore**

**Hive Metastore Overview:**

- Stores metadata for tables (e.g., schemas, partitions, storage locations).
- **SQL-like language (HiveQL)** is used to query distributed data on systems like HDFS or Amazon S3.
- Can be integrated with EMR or replaced with AWS Glue Data Catalog.


- **Elastic MapReduce (EMR):**
  - Fully managed service for processing large-scale structured, semi-structured, or unstructured data.
  - Supports **Apache Hadoop** and **Apache Spark** for distributed and parallel data processing.
  - **EMR Cluster:** Made of EC2 compute nodes, which scale up or down based on processing requirements.

## 4.2 Let's Look at Metadata

### Metadata - Study Notes

**What is Metadata?**

- **Metadata** is "data about data," providing context and characteristics about the main data.
- It includes details like:
  - **Location** of data
  - **Schema** (data types, table structure)
  - **Data Lineage** (relationship between data elements)

**Types of Metadata:**

1. **Structural Metadata**:
   - Describes how the data is organized (e.g., table names, columns, data types).
   - Used to show **data lineage** and relationships between tables.

2. **Descriptive Metadata**:
   - Provides information about the content and purpose of the data.
   - Includes **table descriptions**, comments, and annotations to enable search and discovery.

3. **Administrative Metadata**:
   - Focuses on data management aspects like **ownership**, **access permissions**, and **versioning**.

4. **Technical Metadata**:
   - Describes technical details such as file formats (e.g., Parquet, Avro, CSV).
   - Includes serialization/deserialization processes and indexing information.

**Uses of Metadata:**


1. **Data Lineage**:
   - **Tracks data flow** from source to final destination (e.g., databases, applications).
   - Helps with **impact analysis**, showing how changes in data affect downstream processes.
   - Supports **compliance** and **auditing** by tracking data handling.
   - Aids in **troubleshooting** and identifying stages where problems occur.

2. **Data Quality Metrics**:
   - **Accuracy**: Measures how correct the data values are.
   - **Completeness**: Measures how fully the data is populated.
   - **Consistency**: Measures coherence of data across different sources or time periods.
   - **Validity**: Measures conformance to predefined rules (e.g., valid ranges).
   - **Uniqueness**: Measures uniqueness of data entries (e.g., unique IDs).

**Benefits of Data Quality Metrics**:

- **Informed Decision-Making**: Ensures data-driven decisions are based on accurate, reliable data.
- **Cost Savings**: Reduces expenses from errors, rework, and inefficiencies.
- **Compliance**: Ensures adherence to regulatory requirements, reducing risks of non-compliance.

**Collaboration Tools for Managing Metadata:**

1. **Annotations and Comments**:
   - Add **descriptions** or **tags** to provide context and explain data to other teams.
   - Supported in AWS Glue for enhanced data collaboration.

2. **Change Tracking**:
   - Use **AWS CloudTrail** to monitor who makes updates to metadata and when.

3. **Notifications**:
   - Configure **AWS CloudWatch Events** to trigger notifications (via SNS) when metadata is updated.

## 4.3 Demo: Creating a Data Catalog


### AWS Data Catalog Creation - Study Notes

**Overview:**

- A **data catalog** organizes virtual databases, tables, and metadata entries. It allows you to manage, query, and retrieve data efficiently.

**Steps to Create a Data Catalog:**


1. **Set Up a Database**:
   - Use **AWS Glue** to create a database (e.g., "Manhattan Insights").

2. **Add Tables Using AWS Glue Crawler**:
   - The **AWS Glue Crawler** automatically scans and creates tables from a data source (e.g., Amazon S3).
   - **Data Source**: Select **S3** and navigate to the appropriate folder path (e.g., source data feed folder).
   - **Classifiers**: Create a CSV classifier to define the file format (e.g., "manhattan-csv-classifier").

3. **IAM Role**:
   - Create an IAM role (e.g., "Properties Analyst") to allow Glue to access data from S3.

4. **Run the Crawler**:
   - After configuring the Crawler, review the summary and create it.
   - Run the Crawler, and it will create a table based on the data in S3.

5. **Check the Table**:
   - Verify that the table was created correctly in Glue, with the appropriate **S3 path**, **CSV classification**, and **partition key** (e.g., neighbourhood).

6. **Query Data Using Amazon Athena**:
   - Use **Amazon Athena** to query the created table.
   - Set the **S3 output location** for query results.
   - Run the query in Athena to retrieve and view the data.

**Example Setup:**

- **Data Source**: Amazon S3, partitioned by neighbourhoods (e.g., EastHarlem, Harlem).
- **Columns**: Price, bedrooms, bathrooms, square footage, status, and address.
- **Database**: Manhattan Insights.
- **Table**: source_datafeed with neighbourhood as the partition key.

**Final Steps in Athena:**

1. Set the **output path** for query results (Athena Output Results in S3).
2. Run the query to retrieve data with the correct schema and partition key.



## 4.4 AWS Glue versus Apache Hive

### AWS Glue vs Apache Hive - Study Notes

**AWS Glue Overview:**

- **Purpose**: A fully managed ETL (Extract, Transform, Load) service designed for processing and analysing big data.
- **Key Features**:
  - **Crawlers**: Infer schema and create the AWS Glue Data Catalog to organize metadata.
  - **ETL Jobs**: Automate data ingestion, transformation, and loading via the Glue console or custom Python scripts.
  - **Data Transformation**: Built-in functions or custom code to transform data before loading it into target databases.
  - **Deployment**: Fully managed, with no need for infrastructure setup or management.
  - **Processing Support**: Supports **batch** and **streaming** processing for real-time or scheduled data jobs.
  - **AWS Integration**: Seamlessly integrates with AWS services like S3, Athena, and RDS.

**Apache Hive Overview:**

- **Purpose**: A data processing framework for transforming and analysing big data using a SQL-like language.
- **Key Features**:
  - **HiveQL**: Use SQL queries (HiveQL) to perform operations like filtering, aggregation, and joins on data stored in HDFS or S3.
  - **Hive Metastore**: Centralized metadata store for organizing data in the Hive ecosystem.
  - **Processing Support**: Primarily supports **batch processing**, making it less ideal for real-time analytics.
  - **Deployment**: Runs on **Hadoop clusters**, requiring significant infrastructure setup and maintenance.
  - **Integration**: Works with the Hadoop ecosystem, including HDFS, YARN, and Hadoop MapReduce.

**Key Differences Between AWS Glue and Apache Hive:**


1. **Architecture**:
   - **AWS Glue**: A fully managed service in AWS, handling all infrastructure needs, including resource provisioning, scaling, and maintenance.
   - **Apache Hive**: Runs on **Hadoop clusters**, requiring manual infrastructure management and setup.

2. **Processing Types**:
   - **AWS Glue**: Supports both **batch** and **real-time (streaming)** processing.
   - **Apache Hive**: Primarily supports **batch processing** and does not handle real-time data efficiently.

3. **ETL Job Translation**:
   - **AWS Glue**: Translates ETL jobs for AWS data environments.
   - **Apache Hive**: Translates **HiveQL** queries into MapReduce jobs that run on Hadoop clusters.

4. **Integration**:
   - **AWS Glue**: Integrates with AWS services like S3, Athena, and RDS.
   - **Apache Hive**: Integrates with Hadoop components like HDFS, YARN, and Hadoop MapReduce.

**Use Cases**:

- **AWS Glue**: Ideal for cloud-based, fully managed ETL workflows with real-time or batch processing needs.
- **Apache Hive**: Suitable for environments already using Hadoop clusters, with a focus on batch processing of large datasets.

## 4.5 Self Discovering Schemas in AWS Glue

### Data Lake and AWS Glue - Study Notes

**Data Lake Overview:**

- A **data lake** is a centralized repository designed to store, process, and secure large volumes of data in its **raw format** (native format).
- It acts as a **single source of truth**, consolidating various data types from multiple sources into a consistent store.
- **Purpose**: Avoids data silos by integrating different forms of data into one system.

**ETL Process in a Data Lake:**

- **ETL (Extract, Transform, Load)**: A common data integration process used by data engineers.
  1. **Extract**: Data is pulled from multiple sources.
  2. **Transform**: Data is validated and transformed to meet quality rules.
  3. **Load**: Data is loaded into target systems for downstream consumption (APIs, reports).

- **Flow Example**:
  - Data extracted from sources enters the data lake (e.g., **Amazon S3**).
  - Data is transformed and validated according to business rules.
  - Processed data is loaded into a target database for business users.

**AWS Glue in the ETL Process:**

- **Storage Layer**: **Amazon S3** serves as the storage layer for the data lake.
- **AWS Glue**:
  - **Crawls** data in S3 to infer schema and creates the **AWS Glue Data Catalog**.
  - **Transforms and loads** data into the target database using **Glue ETL scripts**.

**AWS Glue Data Catalog Population:**

1. **Automatic Schema Discovery**:
   - The **Glue Crawler** automatically analyses the data and identifies metadata (column names, data types) without manual intervention.
   - **Use Case**: Ideal for scenarios where data changes frequently.

2. **Manual Schema Definition**:
   - Users explicitly define the schema (column names, data types, etc.).
   - **Use Case**: Best for stable data environments or when specific schema requirements must be enforced.

## 4.6 Optimization Techniques for Improving Query Performance

### Query Performance Optimization Techniques - Study Notes

1. **Indexing:**

   - **Purpose**: Speeds up data retrieval by avoiding full table scans.
   - **Analogy**: Similar to a book index or table of contents that helps you find specific information without scanning the whole book.
   - **Examples**:
     - **Spreadsheets**: Rows and columns are indexed to reference specific cells.
     - **SQL Databases**: Indexes are created on table columns to speed up queries.
     - **Relational Tables**: Primary keys and unique constraints act as indexes to improve retrieval performance.

2. **Partitioning:**

   - **Purpose**: Divides large datasets into smaller, more manageable subsets called **partitions** to reduce the amount of data scanned and enable parallel processing.
   - **Example Use Cases**:
     - **Time-Based Partitioning**: Sales data partitioned by month, quarter, or year. Queries targeting a specific period (e.g., Q4) can access that partition directly, skipping irrelevant data.
     - **Alphabetical Partitioning**: Customer data partitioned by the first letter of last names (e.g., A-C, D-F) for faster lookups.
   - **Benefit**: Allows parallel processing, which is faster than sequential scanning of the entire dataset.

3. **Compression:**

   - **Purpose**: Reduces the storage space required for data by encoding it in a more compact form.
   - **Trade-Off**: Compression and decompression consume CPU resources, so it's important to assess whether the storage savings justify the CPU overhead.
   - **Examples**:
     - Common compression techniques include **GZIP**, **ZIP**, **GZ**, and **RAR**.
     - **Amazon Redshift** has built-in compression algorithms like **`LZOP`**, **BZIP2**, and **GZIP** to optimize data storage in its fully managed warehouse.

**Summary of Benefits**:

- **Indexing**: Improves query speed by providing direct access to data without full scans.
- **Partitioning**: Reduces the amount of data scanned and enables faster parallel processing.
- **Compression**: Reduces storage costs but requires careful consideration of CPU trade-offs.

## 4.7 Schema Evolution and Updating Data Catalogs

### Schema Changes and Data Transformation in AWS Glue - Study Notes

**Updating Data Catalogs:**

1. **Manual Approach**:
   - Update the data catalog via the **Glue Console** or manually trigger **Glue Crawlers** to re-scan data sources and update metadata.

2. **Programmatic Approach**:
   - Use **AWS Glue APIs**, **AWS SDKs** (like Boto3 in Python), or ETL scripts (like **pandas** or **PySpark**) to update the catalog.

3. **Automated Approach**:
   - Schedule **AWS Glue Crawlers** to run periodically, ensuring the catalog stays up-to-date with schema changes.
   - **AWS CloudFormation** can automate catalog updates alongside other infrastructure components.

**Schema Evolution Methods**:

1. **Schema Updates**:
   - Directly modify schemas (e.g., add/delete columns) while preserving underlying data.

2. **Partitioning**:
   - Add or remove partitions (e.g., yearly data) by updating metadata about the partition's location, format, or compression.

3. **Table Updates**:
   - Create/delete tables, update table properties, or change table ownership (i.e., AWS account or IAM role).

4. **Index Changes**:
   - Alter indexes (used to improve query performance), which requires reflecting these changes in the data catalog.

**Impact of Schema Changes**:

1. **Deleting Columns**:
   - You won’t be able to query deleted columns, though the underlying data remains.

2. **Adding Columns**:
   - New columns can be queried. You may fill them with `null`, default values, or existing data.

3. **Changing Data Types**:
   - AWS will interpret columns according to the new data type, but this may cause **conversion errors** or inconsistencies if the data can't be cast to the new type.

**ETL Data Transformation Techniques**:

1. **Custom Transformations**:
   - User-defined functions created from scratch (Python/Scala).
   - Example: Converting data formats (JSON to Avro).

2. **Built-In Transformations**:
   - Predefined functions for common tasks:
     - **DropFields**: Remove specific columns.
     - **DropNullFields**: Remove columns with all `null` values.
     - **Filter**: Filter rows based on criteria.
     - **Join**: Combine datasets on common keys (like SQL joins).
     - **Map**: Modify each record, perform external lookups, etc.
     - **ResolveChoice**: Resolve schema inconsistencies (e.g., convert mixed data types).

**Data Structures in AWS Glue**:

1. **DataFrames**:
   - Commonly used for structured data (rows/columns).
   - Requires **manual schema updates** if there are changes.
   - Supported by **Apache Spark** APIs.

2. **DynamicFrames**:
   - Designed for semi-structured data.
   - Supports schema evolution automatically.
   - Used with **AWS Glue's built-in scripts** for transformations.

**Machine Learning Transformations in AWS Glue**:

- AWS Glue has specialized **ML transformations** for tasks like:
  - **Deduplication**: Identifying duplicate records.
  - **Record Linkage**: Linking related records from different sources.
  - **Data Quality Enhancement**: Improving overall data quality.
- Example: **FindMatches** operation for deduplication, determining the likelihood of records referring to the same entity.

## 5.0 Conclusion ====================

## 5.1 Summary

_same as above_

## 5.2 Data Store Management: Exam Tips

### Sample Exam Questions - Study Notes

**Question 1: Data Catalogs**

- **Scenario**: A data engineering team needs to create a central metadata repository for Amazon EMR and Amazon Athena queries. Some metadata is stored in Apache Hive and must be imported into the repository.
- **Ask**: Which solution minimizes development effort?

**Choices**

1. A. Deploy a Hive Metastore on an EMR cluster.
2. B. Utilize Amazon EMR and Apache Ranger.
3. C. Employ the AWS Glue Data Catalog.
4. D. Implement a custom metadata import solution with AWS Lambda and Amazon S3.

**Correct Answer**: **C. Employ the AWS Glue Data Catalog**

- **Reasoning**: AWS Glue Data Catalog is fully managed, automates metadata discovery, and integrates with EMR and Athena, reducing development overhead compared to the other options.

**Question 2: Optimizing Athena Queries**

- **Scenario**: You need to optimize Amazon Athena queries. The data is stored in uncompressed `.csv` files, and users mainly run analytical queries with filters.
- **Ask**: What approach will most effectively improve query performance?

**Choices**

1. A. Convert the data to JSON format with Snappy compression.
2. B. Apply Snappy compression to the existing `.csv` files.
3. C. Switch the data format to Apache Parquet and use Snappy compression.
4. D. Employ gzip compression on the `.csv` files.

**Correct Answer**: **C. Switch the data format to Apache Parquet and use Snappy compression**

- **Reasoning**: **Parquet** is a columnar storage format ideal for analytical queries and filtering specific categories, and **Snappy compression** improves storage and query efficiency.

**Question 3: Purpose-Built Databases**

- **Scenario**: A business uses an on-premise Microsoft SQL Server for financial data and transfers this data monthly to AWS. The company wants to reduce costs and minimize disruption during migration to Amazon RDS for SQL Server.
- **Ask**: Which AWS service should be used for cost-effective data migration?

**Choices**

1. A. AWS Direct Connect.
2. B. AWS Database Migration Service (DMS).
3. C. AWS Snowball.
4. D. AWS Transfer Family.

**Correct Answer**: **B. AWS Database Migration Service (DMS)**

- **Reasoning**: **DMS** provides a cost-effective solution for migrating data from on-premise SQL Server to Amazon RDS. It also supports near real-time replication, minimizing disruptions to applications accessing the database.

**Key Takeaways**:

- **AWS Glue Data Catalog**: Best for automating metadata discovery and integration with EMR and Athena.
- **Apache Parquet** with **Snappy Compression**: Ideal for optimizing query performance in Athena for large analytical datasets.
- **AWS DMS**: The preferred tool for cost-effective and low-disruption database migration from on-premises to AWS.

