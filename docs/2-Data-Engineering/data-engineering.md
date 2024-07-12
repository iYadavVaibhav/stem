---
date: 2024-02-12
---

# Data Engineering Roadmap

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

