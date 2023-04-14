---
description: Web and App Development
categories: notes web
date: 2021-08-24
---

# Web Development

Web development may need:

- **OS and Infa** - linux mostly, hosting/gcp/aws - machine connected to internet
- **Web Server** - Apache/NginX - connects domain to DIR/Process.
- **Web Cache** - optional - Squid
- **Database** - to store, mysql/sqlite/mongo/postgres
- **Backend** - lang & framework - this will take requests and return response and can connect to DB.
- **Frontend** - is on the client side, JS, can have framework.

![LAMP Stack](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/LAMPP_Architecture.png/798px-LAMPP_Architecture.png "LAMP Stack Wiki")


**Web Servers / Proxy Servers**

- Is a server application that acts as an intermediary between a client requesting a resource and the server providing that resource.
- Can help configrue DIR in case of static site and process in case of python/perl/php and use WSGI or CGI. Uses:
  - Monitoring and filtering
  - Filtering of encrypted data
  - Bypassing filters and censorship - Geo restriction, firewall etc
  - Logging
  - Improving performance

- **Gunicorn**, is a Web Server Gateway Interface (WSGI) server implementation that is commonly used to run Python web applications.

- **Apache**

- **NginX**


- [more on webserver](https://iyadavvaibhav.github.io/web-server-notes/#:~:text=outages%20or%20restarts.-,Add%20sites%20to%20Apache%20Server,-Now%20we%20need)


**Databases**:

- mongo - nosql - JSON like document based
- mysql / PostgreSQL - sql
- neo4j - graph

## Backend

It is the server side part of the app. It provides services which clients can request or consume.

Frameworks and languages

- Flask - Python
- Laravel - PHP
- Elastic.js - JS

Auth is required for all request, so decouple and make a service of it. The gateway can take req and the authenticate it or reject it. Once autheticated it can send it to the correct service.

**APIs** or **Headless** or **RESTful** backend can be build when we need to completely separate client from server.

- request payload is JSON data sent with req. In GET req we don't have to send payload we just send URL params.
- avoid actions in payload. like func name in payload, instead keep action in route
- avoid doing everything in one route, eg, if not exist then create else add, instead make the actions atomic to routes.
- for huge responses, like get_orders() returning all orders with all details, add pagination or fragmentation (in microservices)

**Load Balancing** or Consistent Hashing

- when requests to a server increases we need to add new servers, then redirect requests to different servers. This can be done using hashing. Hash gives a random number to a request, then that number can be used to direct a request to a particular server, eg, hash_number mod servers is the server ID, 14%4=2, so req hased as 14 goes to server 2, if we have 4 servers.
- now when we add new server, say 5, then the mod operation changes, every req gets mod of 5, this makes huge operational difference, as in there is a shift in all requests, so all cache that we built becomes useless, to avoid this, we use consistent hashing.
- more - <https://www.youtube.com/watch?v=K0Ta65OqQkY>



DjangoREST vs FastAPI, ???

**WebSockets vs HTTP** - Unlike req-res architecture of HTTP, in web sockets server can also send updates to client, updates are sent immediately when they are available. WebSockets keeps a single, persistent connection open while eliminating latency problems that arise with HTTP request/response-based methods. Can be used in messaging and notifications. Protocol is:

- XMPP on TCP

**Microservices** - ???

**Gateway** - ???



## Frontend

It makes the UI or client for an app. It can talk to API and do CRUD. It need to send authorization and access key/token to API.

Must have features:

- Modular Layout - cards, templates
- Search
- Sort
- Filter
- Pagination
- Favourites
- Enhancements:
  - Event Bubling / Capturing
  - Debouncing

Frameworks

- React
- Angular
- Vue


![Stack Flow](https://yalantis.com/uploads/ckeditor/pictures/3172/content_A_typical_app_tech_stack.jpeg "Stack Flow Image")


**Object-Relational Mapping (ORM)**is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. It abstracts Object oriented code from database and hence we can switch DBs. eg, Eloquent in Laravel, SQLAlchemy is an open-source SQL toolkit and object-relational mapper for the Python programming language


**Headless** is backend app with no frontend, it only has API endpoints.

**12-Factor Application** - The Twelve-Factor App methodology is a methodology for building software-as-a-service applications. These best practices are designed to enable applications to be built with portability and resilience when deployed to the web. More - <https://12factor.net/>

**PWA - Progressive Web Apps**

**Stacks**:

- LAMP - Linux Apache MySql PHP
- MEAN - mongo express angular node
- MERN - mongo express react node

What is a docker??

---

FastAPI

Flask Mega Tutorial

**Saleor** - Python eCom open-source framework:

- headless ecom SDK
- can create category hierarchy
- can have attributes for products like size cost etc

References:

- <https://www.fullstackpython.com/>
- <https://yalantis.com/blog/tech-stack-for-web-app-development/>
- <https://testdriven.io/blog/fastapi-mongo/>

## Mobile App Development

Data is sourced from RESTAPI or can be local storage.

Apps can be:

- WebApp/HTML5 App - it is nothing but a webpage, optmized for mobile experience. Frameworks: Bootstrap, jQuery Mobile, Onesen UI.
  - HTML5 - Same as website but with Local Storage, Video Streaming, Drag and Drop.
  - Progressive Web App - Website with Push Notifications, Offline Work, Splash Screen and Installable with icon.
- Hybrid - Native container, installable, running webapp in webview in native container app. PhoneGap/Cordova can build container that can run webApp.
- Native Cross Platform - One code base, multi platform, native like most experience. React Native, Flutter, Xamarin.
- Native - Pure iOS and Android app. Different codebase. Full functionality.

More:

- <https://www.mobiloud.com/blog/native-web-or-hybrid-apps>
