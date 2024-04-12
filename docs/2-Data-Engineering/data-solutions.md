---
description: Data Solutions
date: 2022-09-05
---

# Data Solutions

_Here are all the "conceptual" notes related to data soulutions, archirecture and engineering. It can have links to practical notes._

**Data engineering** is the development, operation, and maintenance of data infrastructure, either on-premises or in the cloud (or hybrid or multi-cloud), comprising databases and pipelines to extract, transform, and load data.

**Data engineers** need to be knowledgeable in many areas – programming, operations, data modeling, databases, and operating systems. The **breadth** of the field is part of what makes it fun, exciting, and challenging.

## Data Strategy

To meet medium or long term business objectives, many aspect of organisation need to work in harmony - all in same direction. **Data Strategy** underpins business strategy and sets agenda for IT delivery **roadmap**. Basically, it defines where and how data supports orgs critical business process. It includes **data challenges** and **unlocks opportunities** by using right strategy and solution in place, thus achieve the business objectives. Eg, if all tables have key to trace back?; all row have identifier; data is being captured; data can be tied up at all hierarchies and dimensions.

**Steps to build a Data Strategy**

- understand the **business objectives**. Eg, how often are email responded. why the money is going?
- assess how data is stored and consumed in org.
- understand current **data challenges**. Eg, not being captured. isolated availability with no link up or down. non traceble data. stale data. not connected to pipeline or lake.
  - how can you collect data, apply data
- work with business to define optimum target state to meet business objectives, incorporating
  - data architecture and engineering
  - data management and operating model
  - data analytics, reporting and visualization - or business intelligence
- **build a road map** for data journey, define actionable **data strategy**.

```mermaids
flowchart LR
A[(Current\n Data State)] --> C{Find Data\n Challenges}
B(Business Objectives) --> C
C --> D{Data Strategy}
D -->|Roadmap| E[(Target\nData State)] --> F(Data-driven\ndecision making)
```

## Data Lifecycle

- Generation
- Collection
- Storage
- Processing - integration, cleaning, reduction, transformation
- Management
- Analysis - Clustering, Regression, Forecasting, Prediction
- Visualization - Interpretation
- Decision Making
- Destruction

```mermaids
graph LR;

a[data collection \n or generation] --> b[data storage] --> c[data processing] --> d1[data analysis \n or visualization] --> e[decision making]

subgraph governance
b
c
end
```

## Data Architecture

_Now that you have a strategy with known challenges and a roadmap to target state, it is time to build the architecture and do the engineering work aligned to roadmap to rach the target state._

Data Architecture defines the **blueprint** for managing data from **collection** to **storage** and **transformation** to **consumption**. It is base foundation to support business objectives. It is essential to determine the sharp and quick tools that solve the purpose.

```mermaids
flowchart LR
a[Storage / Warehousing] --> b[Movement / ETL] --> c[Analytics / Reporting]
```

**What to Architect**

- determine cloud architecture or on premise.
- if required how can data be scalable, avilable and fault tolerant
- big data architecture

**Parts of Data Architecture** - Aim is to achieve below safely

- E - extract / connect - have automated connectors and access permissions, to sharepoint, salesforce, sharedrive, etc. Int and ext.
- L - load / store - all in one place, MSSQL, DVS, Hive, so you can build mart and combine.
- T - transform / transport - integrate, transform, clean, aggregate, filter. Determine the best tool to do the job. Python, SQL, Prep, Alteryx?
- P - present - right viz tool, dash, tableau. Keeping the end user in mind.
- Analogy - Load:HTML :: Transform:JavaScript :: Present:CSS

## Data Transformation

### ETL & Data Pipeline

**ETL - Data Pipeline** - Help move data from source to target with transformations in between. Challenge and skill is to build an efficient, reliable and automate pipeline that can help connect sources to lake/warehouse/mart. Big Data pipelines. Batch and Event Driven or real-time.

- Big part of design of warehouse.
- usually a weekly or nightly batch job that updates data warehouse.

### Data Virtualization

- It is used to connect and query different data sources, transform it. It **does not store** or move the data. Query goes down to source systems.
- Eg, Tibco Data Virtualization.
- Link - [Difference in ETL & Virtualization](https://community.denodo.com/kb/en/view/document/Data%20Virtualization%20and%20ETL)

## Data Analytics, Reporting & Visualization

Flat data, denormalized is best to query for visualization.

**Steps to follow**

- understand
  - requirement gathering,
  - data dicovery
- design and develop
  - tool selection - correct tool for need, right tool for viz/reporting, tableau, Plotly, D3, OBIEE, self-serve;
  - data modelling - reporting view prep, what needs to be shown should be a row of data, add hierarchy to roll up and down.
  - story telling - art of making data easy to understand, animations, live?
  - test - numbers help make decision
  - distribution - mobile, pdf, interactive, embed (portal),
  - actionable insight - (optional) let user do actions right from report. (write-back)
  - usage analytics - (optional) but really useful in determining ROI




## Data Engineering Roadmap

_how big data engineering projects work_

- 'Terraform' to build infra on AWS and tear it down.
- Github Actions for CI CD to build, test and deploy changes.
- ECR to host docker images.
- Lambda to host code.
- EventBridge to trigger something on event.
- S3 to store data dumps.
- Docker to run in container, infra independent.
- IAM roles to give permission to resources to talk to each other.
- DBT is used to do ETL.
- [ ] how to read from api using lambda, load to s3?
- [ ] what is `Makefile`? is shell command file, it is used to put all infra build and docker compose commands in a file.

**Links**

- Read all blogs to get overview: <https://www.startdataengineering.com/>
- DE Projects on Youtube and medium article <https://medium.com/@yusuf.ganiyu/7-end-to-end-data-engineering-projects-that-sets-you-apart-from-the-rest-bd809fe5aa95>


- [Project 1 - The Ultimate Data Engineering Project To Land Your Dream Job In 2024 62815432c682](https://medium.datadriveninvestor.com/the-ultimate-data-engineering-project-to-land-your-dream-job-in-2024-62815432c682)
- [Project 2 - Data Engineering Ops Project With Ci Cd And Iac Af3ec23548d4](https://medium.datadriveninvestor.com/data-engineering-ops-project-with-ci-cd-and-iac-af3ec23548d4)
- [project 3 - Annpastushko Create Serverless Data Pipeline Using Aws Cdk Python 5cg2](https://dev.to/annpastushko/create-serverless-data-pipeline-using-aws-cdk-python-5cg2)
- [Multi Project - Overview](https://medium.datadriveninvestor.com/freelance-data-engineering-roadmap-project-ideas-eb6f96fa57fa)
- [All DE Projects from Community](https://dataengineering.wiki/Community/Projects)
- [Best Books - Awesome Data Engineering](https://awesomedataengineering.com/data_engineering_best_books)


- [Dataengineering - Community Projects](https://dataengineering.wiki/Community/Projects)
- [Startdataengineering - Post Data Engineering Project To Impress Hiring Managers](https://www.startdataengineering.com/post/data-engineering-project-to-impress-hiring-managers/)


## Project 1 - Lambda ECR Terraform Docker Github Actions

_not big data but more ETL and devops_

**Overview**: Python code is written to build a _AWS lambda_ function that will pull API data and load to _AWS S3_. _AWS EventBridge_ is used to trigger lambda funciton daily.

**Requirement**: Ability to modify the code and trigger CI/CD pipeline.

**Steps**

- Push the code to trigger github action (CI/CD).
- Github action runs code to
  - build the docker image
  - build the infra using Terraform (IaC)
- Terraform builds IAM roles, ECR
- Docker image is pushed to ECR built by terraform
- Lambda triggered daily, fetched from API and loads to S3

Link: [Medium Datadriveninvestor - Data Engineering Ops Project With Ci Cd And Iac](https://medium.datadriveninvestor.com/data-engineering-ops-project-with-ci-cd-and-iac-af3ec23548d4)

**Questions**

- Q1: Why is lambda code deployed in docker image.
  - A1: lambda code is Py code, it has to be tested before deployment, to test it has to install all python packages and run tests. this can be done on a venv on a VM or, better way to do in a container. So a py code tested on container, hence docker.

**To-Do**

- [ ] add the policy to save the logs to Cloudwatch event (AWSLambdaBasicExecutionRole)

**Detailed Workflow**

There are following jobs in github action

- job 1 called `ci_job` to start container, run tests and stop container.
- job 2 called `deploy_terraform` to initalize infra and apply infra. Job 2 needs job 1 completed to run, a dependency.
- job 3 called `push_docker_image` to build and push image to ECR repo. It also logs in to ECR using other AWS actions (jobs). And it depends on job 1 and 2.


This way, whenever you push a code to repo, it will trigger action, which will do the jobs one by one on different ubuntu machines. So start ubuntu machine, clone the code, run the tests, kill the machine. Then in job 2, again start ubuntu machine, clone repo, init terraform and build infra on AWS. Then in job 3, start ubuntu server, clone the code, build image, authenticate to AWS, push image to AWS ECR and turn off machine.

**Missing Link** there is one step that is not automated and has to be run ONLY ONCE, then modifications to code will work by CI CD. The missing link is, linking AWS resources. Terraform creates ECR repo, IAM role, EvenBridge Rule but it does not link them to each other and with Lambda function. Now, open AWS frontend and

- create lambda function using container from image in ECR.
- add IAM role so it can access S3 and ECR.
- add Eventbridge rule to trigger section of lambda. (IaC created rule that just says run daily but has no link to what lambda)
- run the tests of lambda.

**Note:** The job2 IaC, which builds infra is only required once, for subsequent runs it is not required. Ideally it should not be part of Github Actions.

For subsequent runs, you one need 2 jobs, one to test lambda code in container, another to build and push docker image to ecr and aws lambda code to modify the lambda function.

To overcome the missing link, Terraform is a docker container defined in docker-compose of project. Makefile specifies shell commands for docker-compose like run up down etc. So in makefile, docker compose will do infra init and build, this way terraform is out from github actions.

## AWS ECR - Elastic Container Registry

- Amazon Elastic Container Registry lets you to store, share, and deploy container images.
- It is a fully managed Docker container registry like docker hub.

## AWS EventBridge

- Event driven applications can be build using this serverless service from AWS.

## Terraform - IaC

- You **need not** do things on AWS **manually**, like creating an IAM role.
- You can _create IAM Role_ on AWS.
- You can _create Rule_ on AWS EventBridge, like trigger lambda function daily.
- You can _create AWS ECR repository_, where you can push the docker image.
- You can _create policy_ to save the logs to Cloudwatch event.
- basically it is code the lets you create **resources** on AWS.
- It is **Infrastructure as Code** IaC.

Terraform is container form image, where it runs code on a machine.

Alternatives: AWS CDK (Cloud Development Kit)

## Github Actions - CI/CD

Action has jobs. A job has steps. Steps are commands.

Action is _set of commands_ called _jobs_ (a command is called _step_ and set of jobs is _action_). It runs the commands on a machine (eg, ubuntu server). The jobs can be dependent on each other. The action (set of jobs) is triggered `on` something (eg, on repo push do build and deploy job).

## Makefile

It specifies shell commands for docker-compose like run up down etc. [Example](https://github.com/Dorianteffo/ci_cd_lambda/blob/master/Makefile)

Commands to use it:

```sh
# compose up
make up

# run build format test etc
make ci

# compose down
make down
```

## AWS CDK (Cloud Development Kit)

It is AWS service for IaC, Infra as code.

## Links

- [Oracle - Data Warehousing Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/21/dwhsg/introduction-data-warehouse-concepts.html#GUID-452FBA23-6976-4590-AA41-1369647AD14D)
- [Data Company - Dufrain](https://www.dufrain.co.uk/)
- [Ralph Kimball - Data Warehousing and BI Author](https://en.wikipedia.org/wiki/Ralph_Kimball)

## ToDo

- [ ] - link this with project management notes to have a road map to follow when starting a new data solutions project.
- [ ] - align <https://careers.dufrain.co.uk/jobs/2225356-senior-data-engineer>
- [ ] - Experience working with one or more of - Spark, Hadoop, Kafka, Snowflake, airflows
- [ ] - Experience building Data Modelling, ETL / ELT pipelines, Data Lakes, Data Warehousing, Master Data
- [ ] - A solid understanding of key processes in the engineering delivery cycle including Agile and DevOps, Git, APIs, and Data Pipelines.

