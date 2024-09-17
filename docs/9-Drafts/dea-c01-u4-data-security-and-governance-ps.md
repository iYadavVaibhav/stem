# U4 Data Security and Governance

## 1.0 Introduction

## 1.1 Introduction



## 2.0 Limiting Access to Data


## 2.1 IAM Foundations

### Study Notes: Data Security and Governance for AWS Data Engineer Associate Certification

**Overview**

- **Course Focus**: Data security and governance in AWS.
- **Example**: RDS (Relational Database Service), but principles apply to all AWS data services.

**Key Concepts**


1. **Access to Data**
   - **Principals**: Entities requesting access to data (e.g., AWS services, applications, human users).
   - **Access Control**: Limiting access based on user roles and needs.

2. **Identity and Access Management (IAM)**
   - **Definition**: Core service for managing access to AWS resources.
   - **Principals**: Resources, applications, or users accessing AWS services.
   - **Permissions**: Granted through IAM policies.
   - **Policy Types**:
     - **Identity-Based Policy**: Attached to the principal (e.g., IAM user or role).
     - **Resource-Based Policy**: Attached to the resource.
   - **Access Evaluation**:
     1. Check for deny rules in any policy.
     2. If no deny rule, check for allow rules.
     3. Access granted if at least one policy allows it.

3. **IAM Policies**
   - **Format**: JSON
   - **Example**: Policy allowing actions like putting, getting objects, or retrieving object versions from a bucket.

4. **IAM Users and Groups**
   - **IAM Users**: Directly map permissions to individual users.
   - **IAM Groups**: Assign permissions to groups of users for easier management.

5. **Programmatic Access Risks**
   - **Static Access Keys**: Risk of keys being leaked or compromised.
   - **Solution**: Use IAM Identity Center to avoid long-lasting access keys.

6. **IAM Identity Center**
   - **Function**: Maps permission sets to IAM Roles.
   - **Single Sign-On**: Provides temporary access keys for the duration of a session.
   - **Benefits**: Simplifies management and reduces security risks.

7. **IAM Roles**
   - **Usage**: For temporary access to AWS resources by AWS services, applications, or users through IAM Identity Center.

**Summary**

- **IAM Policies** are crucial for managing access.
- **IAM Users and Groups** help manage permissions efficiently.
- **IAM Identity Center** offers a more secure alternative to static access keys.
- **IAM Roles** facilitate temporary access for AWS services and users.

---

**Next Steps**: Continue exploring data security and governance in AWS in the upcoming lessons.


## 2.2 Accessing Private Data Stores

### Study Notes: Networking Scenarios for AWS Data Engineer Associate Certification

**Overview**

- **Focus**: Networking scenarios for granting access to private resources in AWS.

**Key Concepts**


1. **Network Connectivity for Private Resources**
   - **Private Database (e.g., RDS)**: Hosted in private subnets.
   - **Private Compute Services (e.g., EC2)**: Also in private subnets.
   - **AWS Lambda**: Need to grant access to private resources.

2. **Connecting EC2 Instances to Private RDS**
   - **Private Resources**: No public route through an internet gateway.
   - **Security Groups**: Applied at the instance level. Stateful, with only allow rules.
   - **Network Access Control Lists (NACLs)**: Applied at the subnet level. Stateless, with allow and deny rules.

   **Differences between Security Groups and NACLs**:
   - **Security Groups**:
     - Applied to instances.
     - Stateful (response traffic allowed if initiated).
     - Rules are all allowed (implicit deny).
   - **NACLs**:
     - Applied to subnets.
     - Stateless (return traffic needs explicit allowance).
     - Rules evaluated in order (numbered).

3. **Troubleshooting Connectivity Issues**
   - **Check Routes**: Ensure proper routing from EC2 to RDS.
   - **NACL Rules**: Verify if NACL is blocking traffic.
   - **Security Group Rules**: Ensure inbound and outbound rules are correct for the instance and database.

4. **Accessing S3 from a Private Subnet**
   - **Gateway Endpoints**: Private endpoints for S3 or DynamoDB, keeping traffic within AWS and avoiding public internet.
   - **Benefits**: Secure and cost-effective.

5. **Lambda Functions and Private Resources**
   - **Default Configuration**: Lambda functions do not access private VPCs by default.
   - **Configuration**: Provision Lambda functions with VPC access.
   - **Elastic Network Interface**: Allows Lambda functions to route requests to private resources.

6. **Lambda Functions Accessing S3 Buckets**
   - **IAM Permissions**: Ensure Lambda functions have appropriate IAM permissions (identity-based or resource-based policy) to access S3 buckets.

**Summary**

- **EC2 to RDS**: Ensure proper security group and NACL configurations.
- **Private Subnet to S3**: Use gateway endpoints for secure and cost-effective access.
- **Lambda Functions**:
  - **Access to Private Resources**: Configure VPC access.
  - **Access to S3**: Ensure IAM permissions are correctly set.

**Next Steps**: Proceed to the next lesson for further topics in data security and networking.

## 2.3 Understanding IAM and Basic Network Security in the Cloud

lab

## 2.4 Intro to Secrets Manager and Parameter Store

### Study Notes: Authentication for AWS Data Engineer Associate Certification

**Overview**

- **Focus**: Authentication methods for accessing AWS databases, specifically RDS.

**Key Concepts**


1. **Authentication Methods for RDS**
   - **IAM Authentication**: Available for MariaDB, MySQL, and PostgreSQL.
     - **Limitations**: May not handle very high connection rates efficiently; could affect read/write performance.
   - **Password Authentication**: Uses master username and password set during RDS database creation.

2. **Secure Credential Management**
   - **Storing Credentials**: Avoid hardcoding credentials in Lambda code or environment variables due to security risks.

3. **AWS Services for Secrets Management**
   - **Parameter Store**:
     - **Features**: Allows optional encryption of key-value parameters.
     - **Management**: Requires manual updates to parameters.
     - **Cost**: 10,000 parameters for free.
   - **Secrets Manager**:
     - **Features**: Always encrypted, with automatic secret rotation.
     - **Cost**: $0.40 per secret per month.
     - **Use Case**: Best for sensitive data requiring high security and rotation.

4. **Choosing Between Parameter Store and Secrets Manager**
   - **Parameter Store**: Suitable for centralized configuration and less sensitive information.
   - **Secrets Manager**: Ideal for high-security secrets and automatic rotation.

5. **Integration with RDS**
   - **Secrets Manager**: Direct integration with RDS for automatic credential rotation.

6. **Accessing Secrets Programmatically**
   - **Example**: Lambda function with IAM permissions to access Secrets Manager.
     - **Process**:
       1. Define secret's name and region.
       2. Initialize session and client.
       3. Retrieve secrets using `get_secret_value` function.

**Summary**

- **Authentication**: Choose IAM or password authentication based on database and connection needs.
- **Secrets Management**:
  - **Parameter Store**: For general configurations and optional encryption.
  - **Secrets Manager**: For high-security credentials and automatic rotation.
- **Integration**: Secrets Manager integrates with RDS for secure, managed credential handling.

**Next Steps**: Continue with the next lesson for further topics in data security and authentication.

## 2.5 Using AWS Secrets Manager for Storing and Rotating Database Credentials

lab


## 2.6 Securing Data Using Lake Formation

### Study Notes: Securing Data with AWS Lake Formation

**Overview**

- **Focus**: Using AWS Lake Formation for managing permissions and access in data lakes.

**Key Concepts**


1. **Data Lakes vs. Data Stores**
   - **Data Stores**: Direct access to individual resources (e.g., RDS).
   - **Data Lakes**: Aggregated data from multiple sources, requiring more complex permissions management.

2. **AWS Lake Formation**
   - **Purpose**: Simplifies the management of IAM permissions, granular permissions, and monitoring for data lakes.
   - **Features**:
     - Centralizes access to all components of the data lake.
     - Applies permissions across services within the data lake, not just per service.

3. **Permissions Management**
   - **IAM Permissions**: Define actions principals can take.
   - **Lake Formation Permissions**: Determine what data these actions apply to, using fine-grained permissions.

4. **Fine-Grained Permissions**
   - **RDBMS Syntax**: Used for restricting access at the database, table, or column level.
   - **Example**:
     - **Data Analyst**: Grants access to specific tables (e.g., Food Item Sales) using IAM and Lake Formation permissions.
     - **Data Lake Administrator**: Has broader access to manage and grant permissions to other users.

5. **Cross-Account Access**
   - **Functionality**: Allows granting permissions to principals in different AWS accounts.
   - **Use Case**: Centralized data lake accessed by multiple accounts within an organization.

6. **Event Logging**
   - **CloudTrail Integration**: Tracks API actions within the data lake.
   - **Lake Formation**: Simplifies monitoring and auditing of data actions and permission changes.

**Summary**

- **Lake Formation** provides a centralized approach to managing data access and permissions within a data lake.
- **IAM** defines what actions can be taken, while **Lake Formation** specifies which data those actions can access.
- **Fine-Grained Permissions** are managed using RDBMS syntax.
- **Cross-Account Access** and **Event Logging** enhance flexibility and security.

**Next Steps**: Continue with the next lesson for further insights into data security and management.

## 2.7 Using Lake Formation Granular Permissions

### Study Notes: Fine-Grained Permissions with AWS Lake Formation

**Overview**

- **Focus**: Achieving super fine-grained permissions using Lake Formation.

**Key Concepts**


1. **Data Catalog**
   - **Purpose**: Centralizes data from multiple sources.
   - **Components**: Organized into databases and tables accessible by analytic services and transformations.

2. **Fine-Grained Access Control**
   - **Objective**: Provide tailored access to specific tables and data within the catalog.

3. **Types of Filters**
   - **Column Masking Filter**:
     - **Function**: Hides specific columns from certain users.
     - **Example**: Mask the `shipping address` column in an item orders table.
   - **Row Filter Expression**:
     - **Function**: Restricts access to rows based on criteria.
     - **Example**: Allow an analyst to access only orders from the U.S. by filtering rows where the `country` column equals "U.S."
   - **Cell Level Security**:
     - **Function**: Apply filters to individual cells within a table to achieve more granular control.

4. **Application of Filters**
   - **Level**: Applied at the table level.
   - **Usage**: Filters can be combined and applied when granting access to users or groups.
   - **Examples**:
     - **U.S. Sales Filter**: Grants access to an analyst focusing on U.S. sales data.
     - **Canada Filter**: Grants access to an analyst focusing on Canadian orders.

5. **Granting Permissions**
   - **Users**: Permissions can be granted to individual users or groups with specific filters applied.

**Summary**

- **Lake Formation** allows for detailed permissions management using data catalogs and filters.
- **Filters** provide granular access control at the table level, including column masking, row filtering, and cell level security.
- **Permission Granting**: Filters can be customized and combined to fit specific user needs.

**Next Steps**: Review additional topics on data lake management and permissions.

## 3.0 Ensuring Data Encryption and Masking


## 3.1 Protecting PII and Masking Columns

### Study Notes: Data Encryption and Masking

**Overview**

- **Instructor**: David Blocker
- **Focus**: Protecting Personally Identifiable Information (PII) and masking data in AWS services, specifically S3 and Redshift.

**Key Concepts**


1. **Amazon S3 and PII Protection**
   - **Scope**: Protecting PII across multiple S3 buckets and accounts.
   - **Amazon Macie**:
     - **Purpose**: Scans S3 buckets for PII and provides alerts or automated actions.
     - **Configuration**: Can be set up at the organizational level to cover all S3 buckets in the organization.

2. **Amazon Redshift and Data Masking**
   - **Purpose**: Protecting PII in data warehouses from exposure to analysts and data engineers.

   - **Column-Level Masking**:
     - **Method**: Mask columns by adjusting grants for `SELECT` and `UPDATE` privileges.
     - **Granularity**: Masking can be applied to individual columns within tables.

   - **Row-Level Security (RLS) Policies**:
     - **Purpose**: Limits access to specific rows based on user or role.
     - **Application**: Create and apply RLS policies to control row access.
     - **Example**: A policy to restrict access to rows based on user roles.

   - **Dynamic Data Masking**:
     - **Purpose**: Masks part or all of a column's data at query time.
     - **Benefit**: Does not consume extra space or impact queries that do not involve masked data.
     - **Example**: Masking a credit card number to show only the last four digits.

**Summary**

- **S3**: Use Amazon Macie for scanning and protecting PII across S3 buckets and accounts.
- **Redshift**:
  - **Column-Level Masking**: Apply masking through access control grants.
  - **Row-Level Security**: Use RLS policies to restrict access to specific rows.
  - **Dynamic Data Masking**: Configure to mask data dynamically at query time based on user roles and permissions.

**Next Steps**: Review additional concepts related to data encryption and explore more advanced use cases for data masking in AWS.

## 3.2 Data Encryption Options

### Study Notes: Data Encryption and Masking

**Overview**

- **Instructor**: David Blocker
- **Focus**: Encryption methods for protecting data at rest and in transit in AWS.

**Key Concepts**


1. **Types of Encryption**
   - **Data at Rest**: Data stored in S3 buckets, EBS drives in EC2, or local storage on a device.
   - **Data in Transit**: Data being transferred over networks, encrypted using TLS (Transport Layer Security), used in HTTPS.

2. **Encryption Methods**
   - **Client-Side Encryption**:
     - **Process**: Data is encrypted by the application before sending it to S3.
     - **Responsibility**: The application manages the encryption key.
     - **Benefit**: Data never leaves the application in an unencrypted state.

   - **Server-Side Encryption**:
     - **Process**: Data is sent to S3 in an unencrypted form and encrypted once it reaches S3.
     - **Benefit**: Lower operational overhead as AWS manages encryption.

3. **Server-Side Encryption Options in S3**
   - **S3-Managed Keys (SSE-S3)**:
     - **Default**: Enabled by default for S3 buckets.
     - **Encryption**: Uses 256-bit Advanced Encryption Standard (AES-256).
     - **Implementation**: Each object is encrypted with a unique key.

   - **AWS Key Management Service (KMS) Keys (SSE-KMS)**:
     - **Control**: Provides more granular access control over key permissions.
     - **Integration**: Key policies can be managed and tracked via CloudTrail.
     - **Implementation**: Requires specifying KMS as the encryption type and providing the key ID.

   - **Customer-Provided Keys (SSE-C)**:
     - **Control**: Full control over encryption keys, which can be managed on-premises or in other clouds.
     - **Implementation**: Requires sending the encryption algorithm and Base64-encoded key with each request.
     - **Risk**: Keys are compromised if sent over an unsecured network.

4. **Encrypting Data in Amazon Redshift**
   - **KMS Encryption**:
     - **Options**: Use AWS-managed or customer-managed KMS keys.
     - **Performance Impact**: Encryption affects database performance. Must be enabled upon launch or through migration.
     - **Migration**: Possible downtime during migration to an encrypted cluster.

5. **Encrypting Data in AWS Glue**
   - **Data in Transit**: Ensure data is encrypted using TLS when transferred.
   - **Data at Rest**:
     - **Options**: Use KMS or S3-managed keys for encryption of data catalog and stored data.

6. **Access Permissions for Encrypted Data**
   - **Requirements**: Users must have permissions not only to access the data but also to encrypt and decrypt it.

**Summary**

- **S3 Encryption**: Choose between S3-managed keys, KMS keys, or customer-provided keys based on security needs.
- **Redshift Encryption**: Use KMS for encryption; consider performance implications and manage encryption at database launch or migration.
- **AWS Glue Encryption**: Secure data in transit with TLS and data at rest with KMS or S3-managed keys. Ensure users have appropriate encryption permissions.

**Next Steps**: Review encryption policies, consider performance impacts of encryption, and explore more detailed encryption scenarios in AWS.

## 4.0 Data Privacy and Governance


## 4.1 Preparing Logs for Audit: Tracking API Calls via CloudTrail

### Study Notes: Data Privacy and Governance

**Overview**

- **Instructor**: David Blocker
- **Focus**: Data privacy and governance, specifically tracking and auditing access with CloudTrail.

**Key Concepts**


1. **CloudTrail Overview**
   - **Function**: Records API calls made within your AWS account.
   - **Purpose**: Provides a trail of all actions taken, useful for auditing activities.

2. **Storing CloudTrail Logs**
   - **Options**:
     - **S3 Bucket**: Store logs in an S3 bucket and use tools like Amazon Athena to query and analyze logs.
     - **CloudTrail Lake**: A managed solution for storing, querying, and filtering CloudTrail logs by event types.

3. **Centralized Log Management**
   - **Best Practice**: Use a centralized account to aggregate CloudTrail logs from multiple accounts.
   - **Advantages**:
     - Easier management of permissions and security.
     - Simplifies access control and prevents accidental deletion or tampering.
     - Enables cross-account log analysis.

4. **Access Control for Centralized Logs**
   - **Storage**: Logs are centrally stored in a dedicated account.
   - **Security**: Restrict access to logs and ensure they are secure and tamper-proof.
   - **Analytics**: Grant access to analytics services like Amazon Athena for querying centralized logs.

**Summary**

- **CloudTrail**: Essential for tracking API activity and auditing in AWS.
- **Log Storage**: Use S3 for flexibility or CloudTrail Lake for a managed solution.
- **Centralized Logging**: Recommended for managing logs from multiple accounts and simplifying access and security.

**Next Steps**: Understand best practices for log management and explore tools for analysing and securing CloudTrail logs.



## 4.2 Using AWS Config and CloudTrail

Lab

## 4.3 CloudWatch Alarms and Logs

### Study Notes: Monitoring and analysing Activity with CloudWatch

**Overview**

- **Instructor**: David Blocker
- **Focus**: Using CloudWatch for monitoring resource performance and application logs.

**Key Concepts**


1. **CloudWatch Overview**
   - **Function**: Monitors resource performance and application logs.
   - **Complementary to CloudTrail**: While CloudTrail tracks API activity, CloudWatch focuses on performance metrics and logs.

2. **Log Collection and Management**
   - **Log Groups**: Collect CloudWatch logs into log groups.
   - **Subscriptions**: Subscribe services to log events from specific log groups or across an entire account.
   - **Streaming and Filtering**: Stream entire log groups or filter to capture specific event types.

3. **Metrics and Alarms**
   - **Metric Filters**: Attach to log groups to define alarms based on metrics.
   - **Alarms**: Triggered when metrics exceed defined thresholds for a certain period.
   - **Notifications**: Use SNS notifications or automated actions in response to alarms (e.g., email alerts for DDL commands in Redshift).

4. **Real-Time Analysis**
   - **Amazon OpenSearch**: Use for near real-time analysis of CloudWatch logs.

5. **CloudWatch vs. CloudTrail**
   - **CloudTrail**: Records all API activity for auditing.
   - **CloudWatch**: Monitors resource performance and captures application logs.
   - **Use Cases**:
     - **CloudTrail**: Tracking and auditing actions.
     - **CloudWatch**: Resource monitoring and performance metrics.

6. **Log Storage and Cost Management**
   - **Cost Considerations**: CloudWatch logs can become expensive over time.
   - **Archiving**: Backup CloudWatch logs to Amazon S3 for cost savings.
   - **Analysis**: Analyze archived logs with Amazon Athena.

7. **Log Retention**
   - **Default Setting**: CloudWatch logs are stored indefinitely by default.
   - **Recommendation**: Adjust log retention settings to avoid unnecessary storage costs.

**Summary**

- **CloudWatch**: Essential for monitoring and managing resource performance and logs.
- **Cost Management**: Backup logs to S3 to manage costs effectively.
- **Retention Settings**: Adjust default log retention to control expenses.

**Next Steps**: Understand how to set up and manage CloudWatch logs, metrics, and alarms, and learn cost-saving techniques for log storage.

## 4.4 Sharing Data Across Redshift Clusters

### Study Notes: Sharing Data Across Redshift Clusters

**Overview**

- **Instructor**: David Blocker
- **Focus**: Sharing data across Redshift clusters using datashares.

**Key Concepts**


1. **Redshift Datashare**
   - **Definition**: A datashare allows you to share Redshift data objects across clusters.
   - **Components**: Can include databases, tables, user-defined functions, materialized views, or schemas.

2. **Sharing Data**
   - **Creation**: Define and create a datashare in the Redshift console.
   - **Inclusion**: Add objects like schemas and tables to the datashare.
   - **Granting Access**: Grant usage of the datashare to specific Redshift clusters.
   - **Access Types**: Shared clusters will have read-only access to the datashare objects.

3. **Sharing Capabilities**
   - **Cluster Types**: Share across different types of Redshift clusters.
   - **Availability Zones/Regions**: Share across different availability zones and AWS regions.
   - **Accounts**: Share datashares across different AWS accounts.

4. **Automatic Updates**
   - **Live Data**: Datashares provide real-time access to live data from the source cluster. No need for manual refreshes to update data.

**Example Commands**

- **Creating a Datashare**:
  - Define and name the datashare.
  - Add schemas and tables to the datashare.
  - Grant usage of the datashare to the target Redshift cluster.

**Summary**

- **Datashare Functionality**: Facilitates data sharing across clusters, regions, and accounts.
- **Access Control**: Grants read-only access to shared data.
- **Real-Time Data**: Ensures up-to-date data access without manual refreshes.

**Next Steps**: Learn the detailed commands and procedures for setting up and managing datashares in Redshift.

## 5.0 Conclusion


## 5.1 Summary

## 5.2 Data Security and Governance: Exam Tips

### Study Notes: Data Engineer Associate Exam Review

**Key Scenarios and Solutions**


1. **Connecting EC2 to Private RDS Instance**
   - **Issue**: Unable to connect an EC2 instance to a private RDS instance.
   - **Troubleshooting Steps**:
     - Verify routing and IAM permissions.
     - Check security group settings:
       - **RDS Security Group**: Should allow inbound traffic from the EC2 security group.
       - **EC2 Security Group**: Should allow outbound traffic to the RDS security group.
     - Also verify Network ACL (NACL) settings to ensure they allow database traffic.

2. **Accessing Sensitive Data in Redshift**
   - **Scenario**: Redshift database contains Personally Identifiable Information (PII) that should not be exposed.
   - **Solutions**:
     - **Column Masking**: Mask sensitive columns when granting access.
     - **Row-Level Security (RLS) Policies**: Use RLS to restrict access to specific rows.
     - **Dynamic Data Masking**: Optionally use dynamic data masking to show portions or transformed versions of the data.

3. **Encrypting Data at Rest in S3**
   - **Requirement**: Control over encryption keys and their policies.
   - **Options**:
     - **S3 Managed Keys**: Default but do not allow control over key policies.
     - **KMS Keys**: Provides access to key policies and is easier to manage than customer-provided keys.
     - **Customer-Provided Keys**: Offers full control but requires more management effort.

4. **Sharing Materialized Views Across AWS Accounts**
   - **Scenario**: Share a materialized view from a Redshift cluster with data engineers in another AWS account.
   - **Solution**: Use **Datashares**.
     - Create a datashare and include the materialized view.
     - Grant read-only access to the datashare for the other Redshift cluster, which can be in a different account, region, or cluster type.

**Conclusion**

- **Exam Preparation**: Review these scenarios and solutions to gauge readiness for the Data Engineer Associate exam.
- **Final Advice**: Ensure familiarity with troubleshooting connections, managing sensitive data access, encryption options, and data sharing techniques.


