# U3 Data Operations and Support

Automate, monitor and ensure the quality of data pipeline.

## 1.0 Course Introduction

## 1.1 Introduction

## 2.0 Automate Data Processing by Using AWS Services


## 2.1 Data APIs

**Data APIs for External Data Sources**

- When processing data in AWS, you may need to **interact with external data sources** (e.g., other cloud providers or on-premise sources).
- **Data APIs** allow **secure data flow** between AWS services and external sources.

**Examples of Data APIs**:

1. **JDBC (Java Database Connector) / ODBC (Open Database Connector)**:

   - Used to connect AWS services like **Redshift**, **Athena**, and **Glue** to **relational databases**.
   - Allows direct connections to external relational data sources.

2. **Amazon AppFlow**:

   - Integrates with third-party **SaaS applications** (e.g., Salesforce, SAP, Slack) to **import data into AWS**.
   - Fully managed integration service for SaaS platforms.
   - **Allows data processing**: Ability to **filter, enrich, and validate** data before importing it into AWS.
   - Built-in integrations with platforms like **Google Analytics**, **Facebook Ads**, and **ServiceNow**.
   - **Exam**: Recommended when dealing with **SaaS data processing questions** on exams.

3. **AWS Data Exchange**:
   - A marketplace for **third-party data APIs**.
   - Allows consumers to **subscribe to and use data APIs** from data providers.
   - **Exam**: Mentioned as a high-level concept for exams, mostly appearing as a distractor.

**Key Takeaways**:

- Use **JDBC/ODBC** for connecting AWS services to **relational databases**.
- For SaaS data (Salesforce, SAP, etc.), use **Amazon AppFlow** to import and process data.
- **AWS Data Exchange** is a marketplace for **vetted data APIs**, useful for machine learning models and large data needs.


## 2.2 Intro to Amazon EMR

**Overview of Amazon EMR**

- Used for **ETL of data at petabyte** scale.

- **MapReduce process**: Splitting data, parallel processing, reassembling data.
  - **Mapping**: Distributing data for parallel processing.
  - **Reducing**: Reassembling processed data.

**Underlying Technology**

- **Apache Hadoop**: Open-source **framework for big data** analytics, leveraging tools for data preparation and analysis.
- **Apache Hive**: **Data warehousing too**l with SQL-like interface.
- **Apache Spark**: Defines **data transformations** and trains ML models.
- **Presto**: Optimized **big data query engine**.

**Amazon EMR Infrastructure**

- **Cluster Management**: Manages EC2 instances for big data operations.
- **Single Availability Zone**: For performance optimization, nodes are physically close.

- **Node Types**
  - **Primary Nodes**: Distribute data and tasks (can have standby nodes for high availability).
  - **Core Nodes**: Data Handling, Host distributed file system and run tasks.
  - **Task Nodes**: Amplify processing power without participating in the distributed file system.

**File Systems in EMR**

- **HDFS (Hadoop Distributed File System)**: Default; stores distributed data.
- **`EMRFS`**: Integrates HDFS with S3 for persistent storage.
- **Local File System**: Temporary storage for job-specific data.

**Cluster Types**

- **Ephemeral Cluster**: Temporary; spins up and tears down with job completion (cost-effective).
- **Long-standing Cluster**: Persistent; for continuous or high-performance use.

**Hive Metastore**

- Stores metadata about data (schemas, partitions, types).
- **External Hive Metastore Options**
  - **AWS Glue Data Catalog**: Integrates with AWS services; fully managed and highly available.
  - **Amazon Aurora/RDS**: For third-party open-source apps (e.g., Apache Ranger).

**EMR vs AWS Glue**

- **Commonality**: Both use Apache Spark for data transformation.
- **EMR Advantages**
  - More open-source tools.
  - Better cost-performance for large datasets or intensive processing.
- **AWS Glue Advantages**
  - More built-in features.
  - Less configuration management; better for operational efficiency.

**Additional Resource**

- **EMR Studio**: Integrated development environment for defining and developing EMR jobs (not likely on exams but useful).

**Summary**

- **EMR** is ideal for complex, large-scale data processing with open-source tools and performance optimization.
- **AWS Glue** is suited for operational efficiency and integration with other AWS services.

## 2.3 Intro to AWS Glue DataBrew


_like alteryx or tableau prep_

**Overview**

- Visual data preparation tool for non-technical data analysts.
- **Functionality**: Enables no-code or low-code transformations, data validation, and anomaly detection.

**Key Features**

- **Data Preparation**: Provides over 250 prebuilt transformations for cleaning and normalizing data.
- **Data Quality**: Validates data against defined rules before staging it in S3 buckets.
- **Data Lineage**: Allows visual mapping of data lineage.

**Workflow**

1. **Data Collection**
   - Data resides in a data lake or warehouse.
   - Subset of data migrated to an S3 bucket for further analysis.

2. **Using DataBrew**
   - **Data Rules**: Analysts define rules in DataBrew to ensure data quality.
   - **Validation**: Rules are continuously applied; non-compliant data is not transferred to the staging bucket.
   - **Alerts**: Analysts receive notifications about malformed data for remediation.

3. **Data Transformations**
   - **Common Transformations**
     - Remove or replace missing values.
     - Combine different datasets.
     - Create new columns (e.g., split timestamp into year, month, day).
     - Filter data to select subsets for analysis.
     - Label mapping (e.g., map categories to numerical values).
     - Aggregate data.

**Exam Tip**

- **Focus**: For scenarios involving automated data transformations or validation rules without coding, AWS Glue DataBrew is the relevant service.

**Summary**

- **AWS Glue DataBrew** is ideal for visual data preparation and ensuring data quality with no-code/low-code solutions.



## 2.4 Apache Offerings

_Understand how AWS services implement or act as alternatives to popular Apache applications_

**Apache Flink**

- Data **analytics for streaming** data.
- **AWS Service**: **Amazon Managed Service for Apache Flink**.

- **Use Case**
  - Stream data from sources like Amazon Kinesis for live analysis or ETL before storing in S3.
- **Capabilities**
  - Streaming ETL
  - Continuous metric generation
  - Real-time analytics
  - Interactive analysis

**Apache Airflow**

- Workflow management and orchestration.
- **AWS Service**
  - **Amazon Managed Workflows for Apache Airflow**: For migrating existing Airflow workflows.
  - **AWS Step Functions**: Preferred for robust AWS service integration and lower operational overhead.
  - **AWS Glue Workflows**: Specifically for ETL data pipelines.
  - **Amazon EventBridge**: For event processing and scheduling.

**Apache Kafka**

- Distributed **event streaming platform**.
- **AWS Service**
  - **Amazon Managed Streaming Service for Apache Kafka**: For migrating existing Kafka applications.
  - **Amazon Kinesis**: Simplified option for new projects on AWS.

**Apache Hive**

- Data **warehousing on Hadoop**, enabling SQL-like interaction with large datasets.
- **AWS Service**: Amazon **EMR**
- **Use Case**: Manage and interact with **petabytes of data**.

**Apache Spark**

- Large-scale data **processing and transformations**.
- **AWS Services**
  - **Amazon EMR**: For processing big data with Spark.
  - **AWS Glue**: Uses Spark for defining ETL jobs.
- **Example**: Crawl S3 bucket to create a Glue Data Catalog, transform data, and store in a new S3 bucket for analysis with Amazon Athena.

**AWS vs Apache Offerings**

- **AWS Preference**: For fully managed and **integrated** offerings (e.g., Step Functions, Kinesis, Glue) over Apache applications when building from scratch.
- **Managed Apache Services**: Used for **migrating existing Apache-based** applications to AWS.

**Exam Tip**

- **Focus**: AWS tends to favour their integrated services for new implementations, but Managed Apache services are suitable for migrating existing applications.


## 2.5 Intro to Amazon EventBridge

**Process and schedule asynchronous events across the AWS ecosystem**

- **Capabilities**
  - **Ingest and deliver events** to/from AWS services.
  - **Schedule automated** actions.
  - **Receive and route events** based on defined **rules**.

**Key Components**

- **Event Bus**: Central component where events are **received and routed**.
- **Event Rules**: Define conditions **to trigger automated** actions.

**Event Movements**

- **Event Ingestion**: Can handle events from AWS services or API calls.
- **Event Routing**: Route events to one or more targets (e.g., AWS Lambda, Glue workflows).
- **Event Scheduling**: Generate events on a schedule, independent of event sources.

**Use Cases**

- **Complex Event-Driven Architectures**: Ideal for handling events from multiple sources or scheduling.
- **Simple Workflows**: For simpler scenarios (e.g., S3 file upload triggering a Lambda function), consider more direct solutions.

**Best Practices**

- **Simplest Solution**: Choose the **most straightforward method** that meets your needs. For example, use S3 event notifications to trigger Lambda functions directly if possible.

**Exam Tip**

- **EventBridge**: Use it when handling **complex** event routing or scheduling. For simpler use cases, consider more direct solutions to **avoid overcomplication**.

**Summary**

- **Amazon EventBridge** is versatile for managing and scheduling events but evaluate if simpler solutions suffice for your specific scenario.


## 3.0 Analytics

## 3.1 Intro to Amazon Athena

**Athena Overview**

- **Amazon Athena** is ideal for **querying large datasets in S3 with SQL**
- It uses **optimized formats** and **compression/partitioning** to enhance performance and manage data effectively.
- Fully managed, serverless, interactive query service.
- **`Trino`** (open-source) is **underlying engine**.

**Capabilities**

- **Data Querying**: Directly query data in S3 using SQL.
- **Data Formats Supported**
  - **Common**: CSV, JSON, Apache Parquet.
  - **Other**: Apache Avro, Apache ORC.
- **Apache Hive / Spark Support**
  - create table and schema using **Hive DDL**
  - Run **ad-hoc Apache Spark Applications** (Optional for testing, but Glue or EMR are preferred for implementation).

**Best Practices / Optimization**

- **Partitioning**
- **Compression**
- **Columnar Formats**

Details of best practice

1. **Data Partitioning**
   - Essential for efficient querying of large datasets.
   - **Group related data** based on values (e.g., date, country).
   - **Benefit**: Load only relevant data for each query.
   - **Imp**: Data will **not** populate to your partitions by default. For Hive Style partitions, you will have to perform the `MSCK REPAIR TABLE` command. For non-Hive partitions, you will have to run the `ALTER TABLE ADD PARTITION` command.

   ```sql
   CREATE EXTERNAL TABLE tickets (
      user string,
      text string,
      timeStamp string,
      impression string
   )
   PARTITIONED BY (month string)
   STORED AS parquet
   LOCATION 's3://PS-EXAMPLE-BUCKET/tables/'
   ```

2. **Data Compression**
   - Use supported formats to optimize performance.
   - **Supported Formats**: gzip, Snappy.
   - **Splittable Formats**
     - You can **split the compressed data** file for **Parquet and ORC** (due to **segmentation and metadata**).
   - JSON and CSV when compressed, cannot be split / processed in parallel.

3. **Columnar File Formats**
   - Use columnar format for faster query results.
   - Prefer Parquet or ORC for better performance.
   - **Optimized Formats**: Parquet and ORC.

**Exam Tip**

- **Focus on Partitioning and Optimization**: Partitioning and using columnar formats like Parquet or ORC are key for efficient querying in Athena.


## 3.2 Creating a Glue Crawler for Athena and S3

_lab_

## 3.3 Publishing Data Using Amazon QuickSight

**QuickSight Overview**

- Create and share **visualizations** from various data sources.
- Serverless application for data visualization.
- Standalone application in AWS (has its own user and permission management)

**User Management**

- QuickSight exists as standalone application in AWS.
- **QuickSight Users & Permission** are for Administrators, data analysts, and business leaders with separate permissions. They are not same as IAM Users.
- **IAM Users/Roles** are for AWS resources, like s3 and athena. Quicksight needs IAM role to have permission to AWS resources. But QuickSight user don't, they only need access to viz/dashboard.
- Different users can be granted access to different dashboards.

**Data Sources**

- It can connect to many internal and external data sources.
- **Common Sources**: Athena-S3, redshift, aurora, RDS, OpenSearch.
- **External Sources**: Relational databases, third-party sources (e.g., GitHub, Snowflake, Jira).

**AWS Resource Access Management**

- **IAM Role Requirement**: QuickSight needs an IAM role to access AWS resources.
- **Special Note**: When integrating with Athena, ensure QuickSight has access to underlying S3 buckets.

**QuickSight vs CloudWatch**

|               | QuickSight        | CloudWatch            |
| ------------- | ----------------- | --------------------- |
| Interactive   | Highly            | Less                  |
| Use Case      | BI                | Resource Optimization |
| Viz Selection | Variety           | Limited               |
| Users         | Separate from IAM | IAM Users             |


**Exam Tip**

- **Choosing Between QuickSight and CloudWatch**: Use QuickSight for advanced data visualizations and business intelligence; use CloudWatch for monitoring and automation of AWS resources.

**Summary**

- **Amazon QuickSight** is a powerful tool for creating interactive and visually appealing dashboards for business intelligence, integrating with a wide range of data sources, and managing user permissions separately from AWS IAM.


## 3.4 Visualizing Data

You can use Athena, Glue Studio, QuickSight and Redshift Query Editor to "**visually**" prepare, transform and analyze data.

**AWS Glue Studio**

- Visual interface for **filtering and transforming** data.
- Build Glue pipelines using a visual editor.

**Amazon Athena**

- "Athena Visual Query Analysis" tool lets **analyze query performance** by showing **logical steps** and **time taken**.
- **Use Case**: Optimize Athena query performance.

**Amazon Redshift Query Editor**

- Ver 2.0 lets **create simple visualizations** (e.g., line charts, bar charts) directly from the query editor.
- **Use Case**: Ad-hoc visualizations or testing query results.

**Amazon QuickSight**

- **Advanced data analysis** and visualization tool.
- **Features**: Connects to various data sources and creates shareable visualizations.
- **Use Case**: Ideal for comprehensive organizational data sharing.

**Types of Visualizations**

- **Line Charts**: Track trends over time.
- **Bar Charts**: Compare categories.
- **Pie Charts**: Illustrate percentages or parts of a whole.
- **Scatter Plots**: Compare two dimensions.
- **Bubble Charts**: Compare three dimensions (size/color represents additional dimension).
- **Funnel Charts**: Show stages in a process (e.g., customer journey).
- **Histograms**: Display distribution of values.
- **Gauges**: Display single metrics or key performance indicators.

**Exam Tips**

- **Choosing Visualizations**: Understand when to use each type based on the data and the insights you want to convey.
- **Service Choice**: Select appropriate AWS tools based on your visualization needs, ranging from simple (Redshift Query Editor) to advanced (QuickSight).


## 4.0 Maintaining and Monitoring Data Pipelines

## 4.1 Intro to Amazon Macie

_Maintaining and Monitoring Data Pipelines with Amazon Macie_

- **Introduction to Amazon Macie**
  - Simplifies **monitoring for sensitive data** within **S3 buckets**.
  - **Continuously scans** S3 buckets for sensitive data, such as **Personally Identifiable Information** (PII) and intellectual property.

- **Key Features**
  - **Sensitive Data Detection**: Scans and identifies sensitive data within S3 buckets.
  - **Alerts and Automation**: **Sends alerts** or triggers automated actions if sensitive data is detected.

- **Multi-Account Management**:
  - Can be **activated in multiple accounts** in an organization
  - **Centrally managed** from a single account.
  - **Manages and aggregates** findings across an AWS organization.
  - **Aggregates findings** across accounts
  - **Automates actions** centrally, like sending alerts.

- **Use Cases**
  - **Complex Data Pipelines**: Ideal for monitoring data pipelines with multiple stages and buckets.
  - **Central Monitoring** of S3 bucker across all org accounts.

- **Benefits**
  - **Operational Efficiency**: Provides effective monitoring with minimal operational overhead.
  - **Centralized Management**


## 4.2 Intro to Amazon CloudWatch Logs

_Monitoring Data Pipelines with Amazon CloudWatch_

**CloudWatch Overview**

- **Monitors AWS services** and data pipelines by **collecting and analysing logs** from various sources.
- **Log Sources**: Amazon EC2, CloudTrail, custom application logs, etc.
- **Log Groups**: Logs are organized into groups, retained indefinitely by default.

**Log Collection Methods**

- **Native Support**: Enable logging in AWS services to send logs to CloudWatch.
- **CloudWatch Agent**: Install on EC2 instances or on-premises servers.
- **AWS CLI** use it send logs to cloud watch
- **Programmatic Access**: Use APIs, or SDK to send logs.

**Log Analysis**

- **Anomaly Detection**
  - **Functionality**: **Uses machine learning** to **create baselines** and **detect deviations**.
  - **Benefits**: Identifies novel errors by flagging outliers.

- **Insights**
  - **Query Capabilities**: Create and execute queries, including **natural language queries**.
  - **Execution**: Up to **50 log groups** can be queried **simultaneously**.

- **Exporting Logs**
  - **To Amazon S3**: **Manual or programmatic export** for periodic analysis.
  - **Cost Efficiency**: **S3 is cheaper** for long-term storage compared to CloudWatch.
  - **Analysis Tools**: Use Amazon **Athena** and **QuickSight** for querying and visualization.

**Real-Time Streaming**

- **Log Streaming**
  - **To Amazon Kinesis**: **Stream logs** for real-time processing.
  - **To Amazon OpenSearch Service**: Ideal for **near-real-time monitoring** and search.
- **Subscription Filters**
  - lets **Triggers events** based on specific patterns within logs in real time.
  - **Actions**: Can stream to Amazon Kinesis or trigger AWS Lambda functions for automated responses.

- Exam Tip
  - **To Amazon OpenSearch Service**: Ideal for **near-real-time monitoring** and search.

**Summary**

- **Amazon CloudWatch** provides comprehensive logging and monitoring capabilities, from basic log collection to advanced real-time analysis and anomaly detection. It integrates with various AWS services and offers multiple methods for analysing and reacting to log data, including using AWS-native tools and third-party services.

# 5.0 Conclusion

## 5.1 Summary

## 5.2 Data Operations and Support: Exam Tips


1. **Creating a Persistent, Central Data Catalog**
   - **Scenario**: Centralize metadata for an EMR Apache Hive metadata store with minimal operational overhead.
   - **Solution**: Use AWS Glue Data Catalog.
     - **AWS Glue Data Catalog**: Provides a centralized, managed catalog that integrates easily with other AWS data sources.
     - **Alternatives**: Amazon Aurora or RDS, but Glue is generally simpler and more effective.

2. **Scanning S3 Buckets for PII**
   - **Scenario**: Ensure S3 buckets across your data pipeline do not contain Personally Identifiable Information (PII).
   - **Solution**: Enable Amazon Macie.
     - **Amazon Macie**: Scans S3 buckets for sensitive data like PII and alerts or triggers actions if such data is found.
     - **Note**: Macie is a key service to understand for exam scenarios, often appearing both as a correct answer and a distractor.

3. **Enabling Non-Technical Data Analysts**
   - **Scenario**: Validate and enrich incoming data with a process that's easy to automate and suitable for non-technical data analysts.
   - **Solution**: Use AWS Glue DataBrew.
     - **AWS Glue DataBrew**: A low or no-code tool that allows data analysts to define data validations and transformations.
     - **General Tip**: For low or no-code solutions, consider Glue DataBrew.

4. **Aggregating and Monitoring Custom CloudWatch Logs**
   - **Scenario**: Aggregate data, monitor logs, and set up anomaly detection for custom CloudWatch logs in real time.
   - **Solution**: Use Amazon OpenSearch Service.
     - **Amazon OpenSearch Service**: Provides near-real-time monitoring and search capabilities for CloudWatch logs.
     - **Note**: OpenSearch is ideal for real-time log analysis and searchability.

**Summary**

- **AWS Glue Data Catalog** is best for centralizing metadata.
- **Amazon Macie** helps in scanning S3 buckets for sensitive data.
- **AWS Glue DataBrew** is suited for non-technical users needing low-code data transformations.
- **Amazon OpenSearch Service** is optimal for real-time log monitoring and analysis.

Good luck with your exam preparation and future learning journey!

