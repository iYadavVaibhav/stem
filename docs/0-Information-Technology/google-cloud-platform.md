---
description: Google Cloud Platform (GCP) and its Services
date: 2020-07-14
---

# Google Cloud Platform

Google Cloud Platform is cloud service from Google just like AWS and Azure. It provides SaaS, PaaS and IaaS.

## GCP Services

- GCP Firebase as datastoage engine.
- GCP App Engine is PaaS for deploying web apps on cloud:
  - App Engine also helps us deploy dockers and containers
  - [hands on colab](https://codelabs.developers.google.com/codelabs/cloud-vision-app-engine/index.html).
- GCP Compute Engine provides VMs, which is like IaaS.
- GCP Cloud Machine Learning:
  - Offers pretrained models with biggest library.
  - Cloud Vision API, Video Intelligence
  - Identify ojects, landmarks, celebrities, colors, million other entities
  - NLP API, Translations,  Text2Speech, Seech2Text API
  - Auto ML trains on your data using expertise from already trained neurals
  - Provides interface to train, evaluate and proof onjects on your own data.
  - SaaS with latest TensorFlow, PyTorch and SKLearn on VMs with TPU and GPU support

## GCP Compute Engine

Google Compute Engine is a cloud service from GCP which offers Infrastructure as a Service. You can get a machine with configurations as required and it can be easily scaled.

Example, start a Micro Machine `f1-micro`, with Ubuntu Server installed on  20gb HDD, in region 'us-central', and can allow traffic 'http and https'. This is also free for lifetime.

### Free Ubuntu Server on GCE

Get an instance on GCE as per requirement or as in example above. We will configure it and add swap memory, then we will make it web server by installing Apache. We will also install MySQL database and PHP/Python as backend languages to serve web apps.

#### Install gcloud on mac

- Follow [this](https://cloud.google.com/sdk/docs/quickstart-macos) guide.
- Install `gcloud` on workstation machine, mac, `wget > tar -xf > install.sh > gcloud init`
- Connect to the VM machine using ssh gcloud command, get it from the SSH dropdown on GCP console near VM.
- Command: `gcloud beta compute ssh --zone "us-central1-a" "vm_name" --project "project_name"` this adds to known hosts.
- This allows you to ssh to GCE host machine from your terminal on workstation.

Congratualations, you have your own linux machine on cloud, free for lifetime and is scalable. It is time to get your hand dirty.

#### Transferring files

- You can transfer files using various options mentioned in [this](https://cloud.google.com/compute/docs/instances/transfer-files#transfergcloud) guide.
- we are using `gcloud` cli to transfer files between workstation and gce instance.
- Upload `gcloud compute scp local-file-path instance-name:dir-on-instance`
  - `instance-name` is name given during creation of instance
  - `dir-on-instance` is address where you need to copy, eg, `~`
- Download `gcloud compute scp --recurse instance-name:remote-dir local-dir`
- to login to server using command `gcloud beta compute ssh --zone "us-central1-a" "instance-name" --project "project-name"`.


## GCP Firebase

Firebase is cloud based, app-backend service that is scalable and it helps in authentication, database, file storage, hosting, crashlytics, messeging, adMob, analytics, campaigns etc.

It has following components:

- ML Kit
  - Has in build ML models for text analytics, image recongnition etc.
  - Works on device or on cloud
  - Can add Tensor flow functions/models to firebase functions and it will be hosted and serverd.

- Firebase Authentication
  - Google, fb, twitter etc
  - Account based
  - Gives back user information, unique_id, name, photo,
  - manages sessions

- Cloud functions
  - responses to event, like welcome email on sign in
  - triggers on database events
  - modify files uploaded
  - send cloud messaging messages to other users.
  - build API from database
  - All written in JS using node and then deployed using CLI

- Firebase Hosting
  - Static files hosting
  - on SSD, serves SSL,
  - can host PWA

- Firebase Storage
  - Store files, secure them, reliable.

- Firebase Realtime Database
  - Store and sync data in realtime, even offline
  - It is NoSql database.


### Firestore Notes

It is NoSQL database storage engine in firebase

- Works online and offline
- Stores data in collections

Initialization:

- create database
- create table, called collection, users
- create rows, called document, doc_id

More on [Flutter](../flutter-notes/) notes.

## App Script

Create app script <https://developers.google.com/apps-script/add-ons/translate-addon-sample>
