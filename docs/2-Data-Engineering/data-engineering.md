---
date: 2024-02-12
---

# Data Engineering Roadmap

_how big data engineering projects work_

- 'Terraform' to build infra on AWS and tear it down.
- Github Actions for CI CD to build, test and deploy changes.
- AWS ECR to host docker images.
- AWS Lambda to host code.
- AWS EventBridge to trigger something on event.
- AWS S3 to store data dumps.
- Docker to run in container, infra independent.
- AWS IAM roles to give permission to resources to talk to each other.
- DBT is used to do ETL.
- [ ] how to read from api using lambda, load to S3?
- [ ] what is `Makefile`? is shell command file, it is used to put all infra build and docker compose commands in a file.

**Links**

- Read all blogs to get overview: <https://www.startdataengineering.com/>
- DE Projects on Youtube and medium article <https://medium.com/@yusuf.ganiyu/7-end-to-end-data-engineering-projects-that-sets-you-apart-from-the-rest-bd809fe5aa95>


- [Project 1 - The Ultimate Data Engineering Project To Land Your Dream Job In 2024 62815432c682](https://medium.datadriveninvestor.com/the-ultimate-data-engineering-project-to-land-your-dream-job-in-2024-62815432c682)
- [Project 2 - Data Engineering Ops Project With Ci Cd And Iac Af3ec23548d4](https://medium.datadriveninvestor.com/data-engineering-ops-project-with-ci-cd-and-iac-af3ec23548d4)
- [project 3 - Create Serverless Data Pipeline Using Aws Cdk Python 5cg2](https://dev.to/annpastushko/create-serverless-data-pipeline-using-aws-cdk-python-5cg2)
- [Multi Project - Overview](https://medium.datadriveninvestor.com/freelance-data-engineering-roadmap-project-ideas-eb6f96fa57fa)
- [All DE Projects from Community](https://dataengineering.wiki/Community/Projects)
- [Best Books - Awesome Data Engineering](https://awesomedataengineering.com/data_engineering_best_books)


- [Dataengineering - Community Projects](https://dataengineering.wiki/Community/Projects)
- [Startdataengineering - Post Data Engineering Project To Impress Hiring Managers](https://www.startdataengineering.com/post/data-engineering-project-to-impress-hiring-managers/)



## Terraform - IaC

It is a generic IaaC tool that can let you build infra using JSON on AWS/Azure and other platforms. Eg

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



