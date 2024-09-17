# U3 Data Operations and Support

Click on the modules to see further details.

## 1.0 Course Introduction ================

## 1.1 Introduction


## 2.0 Automate Data Processing by Using AWS Services ================

## 2.1 Data APIs

### Automating Data Processing with AWS - Study Notes

**Data APIs for External Data Sources:**

- When processing data in AWS, you may need to interact with **external data sources** (e.g., other cloud providers or on-premise sources).
- **Data APIs** allow secure data flow between AWS services and external sources.

**Examples of Data APIs**:

1. **JDBC (Java Database Connector) / ODBC (Open Database Connector)**:
   - Used to connect AWS services like **Redshift**, **Athena**, and **Glue** to **relational databases**.
   - Allows direct connections to external relational data sources.

2. **Amazon AppFlow**:
   - **Purpose**: Integrates with third-party **SaaS applications** (e.g., Salesforce, SAP, Slack) to import data into AWS.
   - **Features**:
     - Fully managed integration service for SaaS platforms.
     - Ability to **filter, enrich, and validate** data before importing it into AWS.
     - Built-in integrations with platforms like **Google Analytics**, **Facebook Ads**, and **ServiceNow**.
   - **Use Case**: Recommended when dealing with **SaaS data** processing questions on exams.

3. **AWS Data Exchange**:
   - **Purpose**: A marketplace for **third-party data APIs**.
   - **Use**: Allows consumers to subscribe to and use data APIs from data providers.
   - **Relevance**: Mentioned as a high-level concept for exams, mostly appearing as a distractor.

**Key Takeaways**:

- Use **JDBC/ODBC** for connecting AWS services to **relational databases**.
- For SaaS data (Salesforce, SAP, etc.), use **Amazon AppFlow** to import and process data.
- **AWS Data Exchange** is a marketplace for vetted data APIs, useful for machine learning models and large data needs.

## 2.2 Intro to Amazon EMR

### Study Notes: Amazon EMR

**Overview of Amazon EMR:**

- **Purpose:** Extract, transform, and load (ETL) petabytes of data.
- **Name Origin:** Elastic Map Reduce (MapReduce process: splitting data, parallel processing, reassembling data).
- **Components:**
  - **Mapping:** Distributing data for parallel processing.
  - **Reducing:** Reassembling processed data.

**Underlying Technology:**

- **Apache Hadoop:** Open-source framework for big data analytics, leveraging tools for data preparation and analysis.
  - **Apache Hive:** Data warehousing tool with SQL-like interface.
  - **Apache Spark:** Defines data transformations and trains ML models.
  - **Presto:** Optimized big data query engine.

**Amazon EMR Infrastructure:**

- **Cluster Management:** Manages EC2 instances for big data operations.
- **Single Availability Zone:** For performance optimization, nodes are physically close.
- **Node Types:**
  - **Primary Nodes:** Distribute data and tasks (can have standby nodes for high availability).
  - **Core Nodes:** Host distributed file system and run tasks.
  - **Task Nodes:** Amplify processing power without participating in the distributed file system.

**File Systems in EMR:**

- **HDFS (Hadoop Distributed File System):** Default; stores distributed data.
- **`EMRFS`:** Integrates HDFS with S3 for persistent storage.
- **Local File System:** Temporary storage for job-specific data.

**Cluster Types:**

- **Ephemeral Cluster:** Temporary; spins up and tears down with job completion (cost-effective).
- **Long-standing Cluster:** Persistent; for continuous or high-performance use.

**Hive Metastore:**

- **Purpose:** Stores metadata about data (schemas, partitions, types).
- **External Hive Metastore Options:**
  - **AWS Glue Data Catalog:** Integrates with AWS services; fully managed and highly available.
  - **Amazon Aurora/RDS:** For third-party open-source apps (e.g., Apache Ranger).

**Comparison with AWS Glue:**

- **Commonality:** Both use Apache Spark for data transformation.
- **EMR Advantages:**
  - More open-source tools.
  - Better cost-performance for large datasets or intensive processing.
- **AWS Glue Advantages:**
  - More built-in features.
  - Less configuration management; better for operational efficiency.

**Additional Resource:**

- **EMR Studio:** Integrated development environment for defining and developing EMR jobs (not likely on exams but useful).

**Summary:**

- **EMR** is ideal for complex, large-scale data processing with open-source tools and performance optimization.
- **AWS Glue** is suited for operational efficiency and integration with other AWS services.

## 2.3 Intro to AWS Glue DataBrew

### Study Notes: AWS Glue DataBrew

**Overview:**

- **Purpose:** Visual data preparation tool for non-technical data analysts.
- **Functionality:** Enables no-code or low-code transformations, data validation, and anomaly detection.

**Key Features:**

- **Data Preparation:** Provides over 250 prebuilt transformations for cleaning and normalizing data.
- **Data Quality:** Validates data against defined rules before staging it in S3 buckets.
- **Data Lineage:** Allows visual mapping of data lineage.

**Workflow:**

1. **Data Collection:**
   - Data resides in a data lake or warehouse.
   - Subset of data migrated to an S3 bucket for further analysis.

2. **Using DataBrew:**
   - **Data Rules:** Analysts define rules in DataBrew to ensure data quality.
   - **Validation:** Rules are continuously applied; non-compliant data is not transferred to the staging bucket.
   - **Alerts:** Analysts receive notifications about malformed data for remediation.

3. **Data Transformations:**
   - **Common Transformations:**
     - Remove or replace missing values.
     - Combine different datasets.
     - Create new columns (e.g., split timestamp into year, month, day).
     - Filter data to select subsets for analysis.
     - Label mapping (e.g., map categories to numerical values).
     - Aggregate data.

**Exam Tip:**

- **Focus:** For scenarios involving automated data transformations or validation rules without coding, AWS Glue DataBrew is the relevant service.

**Summary:**

- **AWS Glue DataBrew** is ideal for visual data preparation and ensuring data quality with no-code/low-code solutions.



## 2.4 Apache Offerings

### Study Notes: AWS Integration with Apache Applications

**Overview:**

- **Objective:** Understand how AWS services implement or act as alternatives to popular Apache applications.

1. **Apache Flink:**

   - **Purpose:** Data analytics for streaming data.
   - **AWS Service:** Amazon Managed Service for Apache Flink.
   - **Use Case:** Stream data from sources like Amazon Kinesis for live analysis or ETL before storing in S3.
   - **Capabilities:**
     - Streaming ETL
     - Continuous metric generation
     - Real-time analytics
     - Interactive analysis

2. **Apache Airflow:**

   - **Purpose:** Workflow management and orchestration.
   - **AWS Service:**
     - **Amazon Managed Workflows for Apache Airflow:** For migrating existing Airflow workflows.
     - **AWS Step Functions:** Preferred for robust AWS service integration and lower operational overhead.
     - **AWS Glue Workflows:** Specifically for ETL data pipelines.
     - **Amazon EventBridge:** For event processing and scheduling.

3. **Apache Kafka:**

   - **Purpose:** Distributed event streaming platform.
   - **AWS Service:**
     - **Amazon Managed Streaming Service for Apache Kafka:** For migrating existing Kafka applications.
     - **Amazon Kinesis:** Simplified option for new projects on AWS.

4. **Apache Hive:**

   - **Purpose:** Data warehousing on Hadoop, enabling SQL-like interaction with large datasets.
   - **AWS Service:** Amazon EMR
     - **Use Case:** Manage and interact with petabytes of data.

5. **Apache Spark:**

   - **Purpose:** Large-scale data processing and transformations.
   - **AWS Services:**
     - **Amazon EMR:** For processing big data with Spark.
     - **AWS Glue:** Uses Spark for defining ETL jobs.
       - **Example:** Crawl S3 bucket to create a Glue Data Catalog, transform data, and store in a new S3 bucket for analysis with Amazon Athena.

6. **Integration Notes:**

- **AWS Preference:** For fully managed and integrated offerings (e.g., Step Functions, Kinesis, Glue) over Apache applications when building from scratch.
- **Managed Apache Services:** Used for migrating existing Apache-based applications to AWS.

**Exam Tip:**

- **Focus:** AWS tends to favour their integrated services for new implementations, but Managed Apache services are suitable for migrating existing applications.


## 2.5 Intro to Amazon EventBridge

### Study Notes: Amazon EventBridge

**Overview:**

- **Purpose:** Process and schedule asynchronous events across the AWS ecosystem.
- **Capabilities:**
  - Ingest and deliver events to/from AWS services.
  - Schedule automated actions.
  - Receive and route events based on defined rules.

**Key Components:**

- **Event Bus:** Central component where events are received and routed.
- **Event Rules:** Define conditions to trigger automated actions.

**Functionality:**

- **Event Ingestion:** Can handle events from AWS services or API calls.
- **Event Routing:** Route events to one or more targets (e.g., AWS Lambda, Glue workflows).
- **Event Scheduling:** Generate events on a schedule, independent of event sources.

**Use Cases:**

- **Complex Event-Driven Architectures:** Ideal for handling events from multiple sources or scheduling.
- **Simple Workflows:** For simpler scenarios (e.g., S3 file upload triggering a Lambda function), consider more direct solutions.

**Best Practices:**

- **Simplest Solution:** Choose the most straightforward method that meets your needs. For example, use S3 event notifications to trigger Lambda functions directly if possible.

**Exam Tip:**

- **EventBridge:** Use it when handling complex event routing or scheduling. For simpler use cases, consider more direct solutions to avoid overcomplication.

**Summary:**

- **Amazon EventBridge** is versatile for managing and scheduling events but evaluate if simpler solutions suffice for your specific scenario.


## 3.0 Analytics ================

## 3.1 Intro to Amazon Athena

### Study Notes: Amazon Athena

**Overview:**

- **Purpose:** Query data stored in S3 buckets using SQL.
- **Type:** Fully managed, serverless, interactive query service.
- **Underlying Engine:** `Trino` (open-source).

**Capabilities:**

- **Data Querying:** Directly query data in S3 using SQL.
- **Data Formats Supported:**
  - **Common:** CSV, JSON, Apache Parquet.
  - **Other:** Apache Avro, Apache ORC.
- **Ad-hoc Spark Applications:** Optional for testing, but Glue or EMR are preferred for implementation.

**Query Optimization:**

1. **Data Partitioning:**
   - **Purpose:** Group related data based on values (e.g., date, country).
   - **Benefit:** Load only relevant data for each query.
   - **Commands:**
     - **Hive-Style Partitions:** Use `MSCK REPAIR TABLE`.
     - **Non-Hive/Custom Partitions:** Use `ALTER TABLE ADD PARTITION`.
2. **Data Compression:**
   - **Supported Formats:** gzip, Snappy.
   - **Splittable Formats:** Compressed Parquet and ORC (due to segmentation and metadata).
   - **Non-Splittable Formats:** JSON and CSV (cannot be processed in parallel).
3. **Columnar File Formats:**
   - **Optimized Formats:** Parquet and ORC.
   - **Benefit:** Improve query performance.

**Best Practices:**

- **Partitioning:** Essential for efficient querying of large datasets.
- **Compression:** Use supported formats to optimize performance.
- **Columnar Formats:** Prefer Parquet or ORC for better performance.

**Exam Tip:**

- **Focus on Partitioning and Optimization:** Partitioning and using columnar formats like Parquet or ORC are key for efficient querying in Athena.

**Summary:**

- **Amazon Athena** is ideal for querying large datasets in S3 with SQL, using optimized formats and techniques to enhance performance and manage data effectively.

## 3.2 Creating a Glue Crawler for Athena and S3

_lab_

## 3.3 Publishing Data Using Amazon QuickSight


### Study Notes: Amazon QuickSight

**Overview:**

- **Purpose:** Create and share visualizations from various data sources.
- **Type:** Serverless application for data visualization.

**Key Features:**

- **User Management:**
  - **IAM Users/Roles:** For AWS resources.
  - **QuickSight Users:** Administrators, data analysts, and business leaders with separate permissions.
- **Dashboards:**
  - **Definition:** Collections of visualizations.
  - **Permissions:** Different users can be granted access to different dashboards.

**Data Sources:**

- **Common Sources:** Athena, S3.
- **Additional Sources:** Relational databases, third-party sources (e.g., GitHub, Snowflake, Jira).

**Access Management:**

- **IAM Role Requirement:** QuickSight needs an IAM role to access AWS resources.
- **Special Note:** When integrating with Athena, ensure QuickSight has access to underlying S3 buckets.

**Comparison with Amazon CloudWatch:**

- **QuickSight:**
  - **Use Case:** Business intelligence, interactive charts, and visually appealing dashboards.
  - **Visualizations:** Extensive variety.
  - **User Management:** Separate from AWS IAM users.
- **CloudWatch:**
  - **Use Case:** Cloud resource monitoring and automation.
  - **Visualizations:** Limited selection.
  - **User Management:** Managed through AWS IAM.

**Exam Tip:**

- **Choosing Between QuickSight and CloudWatch:** Use QuickSight for advanced data visualizations and business intelligence; use CloudWatch for monitoring and automation of AWS resources.

**Summary:**

- **Amazon QuickSight** is a powerful tool for creating interactive and visually appealing dashboards for business intelligence, integrating with a wide range of data sources, and managing user permissions separately from AWS IAM.


## 3.4 Visualizing Data

### Study Notes: AWS Data Visualization Services

1. **Data Visualization Spectrum:**
   - **Range:** From data preparation to data analysis.
   - **Services:** Include data collection, processing, storage, and analysis.

2. **AWS Glue Studio:**
   - **Purpose:** Visual interface for filtering and transforming data.
   - **Features:** Define Glue pipelines using a visual editor.

3. **Amazon Athena:**
   - **Tool:** Athena Visual Query Analysis.
   - **Function:** Analyze query performance by showing logical steps and time taken.
   - **Use Case:** Optimize Athena query performance.

4. **Amazon Redshift Query Editor:**
   - **Version:** 2.0.
   - **Function:** Create simple visualizations (e.g., line charts, bar charts) directly from the query editor.
   - **Use Case:** Ad-hoc visualizations or testing query results.

5. **Amazon QuickSight:**
   - **Purpose:** Advanced data analysis and visualization tool.
   - **Features:** Connects to various data sources and creates shareable visualizations.
   - **Use Case:** Ideal for comprehensive organizational data sharing.

6. **Types of Visualizations:**
   - **Line Charts:** Track trends over time.
   - **Bar Charts:** Compare categories.
   - **Pie Charts:** Illustrate percentages or parts of a whole.
   - **Scatter Plots:** Compare two dimensions.
   - **Bubble Charts:** Compare three dimensions (size/color represents additional dimension).
   - **Funnel Charts:** Show stages in a process (e.g., customer journey).
   - **Histograms:** Display distribution of values.
   - **Gauges:** Display single metrics or key performance indicators.

7. **Exam Tips:**
   - **Choosing Visualizations:** Understand when to use each type based on the data and the insights you want to convey.
   - **Service Choice:** Select appropriate AWS tools based on your visualization needs, ranging from simple (Redshift Query Editor) to advanced (QuickSight).

**Summary:**
AWS offers a variety of tools for visualizing data, each with specific features and use cases. AWS Glue Studio and Athena are useful for data preparation and performance analysis, while Redshift Query Editor and QuickSight are ideal for creating and sharing visualizations. Understanding the types of visualizations and their applications will help in selecting the right tool and visualization for your needs.

## 4.0 Maintaining and Monitoring Data Pipelines ================

## 4.1 Intro to Amazon Macie

### Study Notes: Maintaining and Monitoring Data Pipelines with Amazon Macie

1. **Introduction to Amazon Macie:**
   - **Purpose:** Simplifies monitoring for sensitive data within S3 buckets.
   - **Functionality:** Continuously scans S3 buckets for sensitive data, such as Personally Identifiable Information (PII) and intellectual property.

2. **Key Features:**
   - **Sensitive Data Detection:** Scans and identifies sensitive data within S3 buckets.
   - **Alerts and Automation:** Sends alerts or triggers automated actions if sensitive data is detected.
   - **Multi-Account Management:** Can be activated in multiple accounts and centrally managed from a single account.

3. **Use Cases:**
   - **Complex Data Pipelines:** Ideal for monitoring data pipelines with multiple stages and buckets.
   - **Multi-Account Environments:** Manages and aggregates findings across an AWS organization.

4. **Benefits:**
   - **Operational Efficiency:** Provides effective monitoring with minimal operational overhead.
   - **Centralized Management:** Aggregates findings and automates actions centrally, even across multiple accounts.

5. **Summary:**
   Amazon Macie is a valuable tool for maintaining and monitoring data pipelines by ensuring sensitive data within S3 buckets is detected and managed efficiently. It offers centralized management and automation capabilities, making it suitable for complex and multi-account environments.

## 4.2 Intro to Amazon CloudWatch logs

### Study Notes: Monitoring Data Pipelines with Amazon CloudWatch

1. **Introduction to Amazon CloudWatch:**
   - **Purpose:** Monitors AWS services and data pipelines by collecting and analysing logs from various sources.
   - **Data Sources:** Amazon EC2, CloudTrail, custom application logs, etc.

2. **Log Management:**
   - **Log Groups:** Logs are organized into groups, retained indefinitely by default.
   - **Log Collection Methods:**
     - **Native Support:** Enable logging in AWS services to send logs to CloudWatch.
     - **CloudWatch Agent:** Install on EC2 instances or on-premises servers.
     - **Programmatic Access:** Use AWS CLI, APIs, or SDK to send logs.

3. **Log Analysis:**
   - **Anomaly Detection:**
     - **Functionality:** Uses machine learning to create baselines and detect deviations.
     - **Benefits:** Identifies novel errors by flagging outliers.
   - **CloudWatch Logs Insights:**
     - **Query Capabilities:** Create and execute queries, including natural language queries.
     - **Execution:** Up to 50 log groups can be queried simultaneously.
   - **Exporting Logs:**
     - **To Amazon S3:** Manual or programmatic export for periodic analysis.
     - **Cost Efficiency:** S3 is cheaper for long-term storage compared to CloudWatch.
     - **Analysis Tools:** Use Amazon Athena and QuickSight for querying and visualization.

4. **Real-Time Monitoring and Reactions:**
   - **Log Streaming:**
     - **To Amazon Kinesis:** Stream logs for real-time processing.
     - **To Amazon OpenSearch Service:** Ideal for near-real-time monitoring and search.
   - **Subscription Filters:**
     - **Functionality:** Triggers events based on specific patterns within logs.
     - **Actions:** Can stream to Amazon Kinesis or trigger AWS Lambda functions for automated responses.

5. **Summary:**
   - **Amazon CloudWatch** provides comprehensive logging and monitoring capabilities, from basic log collection to advanced real-time analysis and anomaly detection. It integrates with various AWS services and offers multiple methods for analysing and reacting to log data, including using AWS-native tools and third-party services.

## 5.0 Conclusion ================

## 5.1 Summary

## 5.2 Data Operations and Support: Exam Tips

### Study Notes: Exam Preparation Scenarios

1. **Creating a Persistent, Central Data Catalog:**
   - **Scenario:** Centralize metadata for an EMR Apache Hive metadata store with minimal operational overhead.
   - **Solution:** Use AWS Glue Data Catalog.
     - **AWS Glue Data Catalog:** Provides a centralized, managed catalog that integrates easily with other AWS data sources.
     - **Alternatives:** Amazon Aurora or RDS, but Glue is generally simpler and more effective.

2. **Scanning S3 Buckets for PII:**
   - **Scenario:** Ensure S3 buckets across your data pipeline do not contain Personally Identifiable Information (PII).
   - **Solution:** Enable Amazon Macie.
     - **Amazon Macie:** Scans S3 buckets for sensitive data like PII and alerts or triggers actions if such data is found.
     - **Note:** Macie is a key service to understand for exam scenarios, often appearing both as a correct answer and a distractor.

3. **Enabling Non-Technical Data Analysts:**
   - **Scenario:** Validate and enrich incoming data with a process that's easy to automate and suitable for non-technical data analysts.
   - **Solution:** Use AWS Glue DataBrew.
     - **AWS Glue DataBrew:** A low or no-code tool that allows data analysts to define data validations and transformations.
     - **General Tip:** For low or no-code solutions, consider Glue DataBrew.

4. **Aggregating and Monitoring Custom CloudWatch Logs:**
   - **Scenario:** Aggregate data, monitor logs, and set up anomaly detection for custom CloudWatch logs in real time.
   - **Solution:** Use Amazon OpenSearch Service.
     - **Amazon OpenSearch Service:** Provides near-real-time monitoring and search capabilities for CloudWatch logs.
     - **Note:** OpenSearch is ideal for real-time log analysis and searchability.

**Summary:**

- **AWS Glue Data Catalog** is best for centralizing metadata.
- **Amazon Macie** helps in scanning S3 buckets for sensitive data.
- **AWS Glue DataBrew** is suited for non-technical users needing low-code data transformations.
- **Amazon OpenSearch Service** is optimal for real-time log monitoring and analysis.

Good luck with your exam preparation and future learning journey!

