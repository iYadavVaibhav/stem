---
description: Web and App Development
categories: notes web
date: 2021-08-24
---

# Web Development

Web development may need:

- **OS and Infra** - linux mostly, hosting/gcp/aws - machine connected to internet
- **Web Server** - Apache/NginX - connects domain to DIR/Process.
- **Web Cache** - optional - Squid
- **Database** - to store, mysql/sqlite/mongo/postgres
- **Backend** - lang & framework - this will take requests and return response and can connect to DB.
- **Frontend** - is on the client side, JS, can have framework.

![LAMP Stack](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/LAMPP_Architecture.png/798px-LAMPP_Architecture.png "LAMP Stack Wiki")


**Web Servers / Proxy Servers**

- Is a server application that acts as an intermediary between a client requesting a resource and the server providing that resource.
- Can help configure DIR in case of static site and process in case of python/perl/php and use `WSGI` or CGI. Uses:
  - Monitoring and filtering
  - Filtering of encrypted data
  - Bypassing filters and censorship - Geo restriction, firewall etc
  - Logging
  - Improving performance

- **Gunicorn**, is a Web Server Gateway Interface (WSGI) server implementation that is commonly used to run Python web applications.

- **Apache**

- **NginX**


- [more on web server](https://iyadavvaibhav.github.io/web-server-notes/#:~:text=outages%20or%20restarts.-,Add%20sites%20to%20Apache%20Server,-Now%20we%20need)


**Databases**:

- mongo - no sql - JSON like document based
- mysql / PostgreSQL - sql
- neo4j - graph

**Web App Architectures**

A Web application system design **architecture** can vary based on various requirements. Some of the ways are

- Static Sites - optional backend in serverless lambda - Jekyll site.
- Containers - using docker images, or Heroku.
- VMs - fully available OS.
- 3-tier web app, monolithic app, modular app, or a group of web services.

## Backend

It is the server side part of the app. It provides services which clients can request or consume.

Frameworks and languages

- Flask - Python
- Laravel - PHP
- Elastic.js - JS

Auth is required for all request, so decouple and make a service of it. The gateway can take req and the authenticate it or reject it. Once authenticated it can send it to the correct service.

**APIs** or **Headless** or **RESTful** backend can be build when we need to completely separate client from server.

- request payload is JSON data sent with req. In GET req we don't have to send payload we just send URL params.
- avoid actions in payload. like func name in payload, instead keep action in route
- avoid doing everything in one route, eg, if not exist then create else add, instead make the actions atomic to routes.
- for huge responses, like get_orders() returning all orders with all details, add pagination or fragmentation (in microservices)

**Load Balancing** or Consistent Hashing

- when requests to a server increases we need to add new servers, then redirect requests to different servers. This can be done using hashing. Hash gives a random number to a request, then that number can be used to direct a request to a particular server, eg, hash_number mod servers is the server ID, 14%4=2, so req hashed as 14 goes to server 2, if we have 4 servers.
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


## Python Web Development Stack

Python has extensive libraries and choices when it comes to do a specific part of web developemnt. Below, it helps understand the library and list reason when to use it and when not to

- Flask to handle requests
- SQLAlchemy to handle DB requests
- Pandas to do data-analysis including reads, grouping, bulk-downloads. It is bad for insert/update/delete.
- Bokeh/Plotly/Dash for visualization. TBC.


## User Journey, REST Resources and Routes

_architecture patterns, models, routes, rest end points, crud, philosophy_

**User Journey** should be well thought of before doing any hands on. It will define the tables of your app, the models, relationships and finally routes. This is _most important_ part of SaaS development.

Step by Step - Think of user journey for immediate goal, future goal. Good to have and best possible. Translate user journey into action map for now and for future enhancements.

**Routes**

They are endpoints and should have a pattern, like:

- TIA - `x.com/<Type>/<Identifier?>/<Action?>`, eg, `x.com/posts/1/edit`
- Nested TIA - `/<Type>/<Identifier?>/<Type>/<Identifier?>/<Action?>`. Eg, `/posts/1/comments/create`

**API URLs** should have versioning and api prefix like `http://hostname/todo/api/v1.0/tasks`


HTTP Method | URI | Action
---|---|---
GET | <http://hostname/todo/api/v1.0/tasks> | Retrieve list of tasks
GET | <http://hostname/todo/api/v1.0/tasks/new> | HTML Form to add new resource
GET | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Retrieve a task
GET | <http://hostname/todo/api/v1.0/tasks/[task_id]/edit> | HTML form to edit resource
POST |  <http://hostname/todo/api/v1.0/tasks> | Create a new task
PUT | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Update an existing task
DELETE |  <http://hostname/todo/api/v1.0/tasks/[task_id]> | Delete a task

**Flask Web** Routes Methods and Template naming

HTTP Method | URI | Method | Template |Action
--- | --- | --- | --- | ---
GET | tasks/ | all() | all.html | View all tasks
GET | tasks/new | new() | new.html or form.html |  HTML Form to add new task
`POST` |  tasks/ | new() |  |  **Create** / Insert a new task
GET | tasks/[task_id] | one() | one.html |  **Read** View one task
GET | tasks/[task_id]/edit | edit() | edit.html or form.html |  HTML form to edit a task
`POST` | tasks/[task_id]/edit | edit() |  |  **Update** an existing task
`POST` |  tasks/[task_id]/delete | delete() |  |  **Delete** a task

In above, `new.html` and `edit.html` can be combined together to be `form.html` as fields are same. Also, same form, `TaskForm` can be used for add and edit. The names are kept generic so that it is easy to replicate across resources (or you can name one:task and all:tasks).

In `tasks` `all()` method, which shows all resources, you need to implement filters, pagination, sorting and searches. These are usually URL query parameters. Eg:

- `<tasks/?tag=shop&sort=asc&done=true&page=2>` this will provide you param to filter the result returned and you need to do
  - `tag` - `where tag='shop'`
  - sort - order by
  - done - where done=true
  - page - use limit or offset

To show all resource, there are few options:

1. As Table: List all items as table. If you have to show under 500 records, you can use client side data-tables, this deals with search, sort and pagination. Template, `all_table.html` on view opens `one.html` which uses `_task.html` which shows detailed view.

2. As List of Card: List all items as card snippet. A summary view of item is shown as small card with most relevant details. You need to implement pagination, search and sort. This gives more freedom and control but requires more work. URL params are usually used to control the content on page. Template is `all.html` and uses `_task_snippet.html`, on view it opens `one.html` which uses `_task.html` which shows detailed view.


**Flask HTMX** or AJAX Routes Methods and Template naming

HTML verbs - new, edit, delete, one, all

AJAX verbs - add, create, modify, update, remove, item, all

HTML Components:

- `_item.html` : Row Details with Edit and Delete buttons
- `_modify_form.html` : Row Details in form with Save and Cancel buttons
- `_add_form.html`: Blank form with Create and Cancel buttons

HTTP Method | URI | Method | Template | Action | Retu
--- | --- | --- | --- | --- | ---
GET | tasks/ | all() | all.html | View all tasks | table with `_item.html` loop
GET | tasks/[task_id] | item() | _item.html |  **Read** One task HTML | `_item.html` htmcomponent
GET | tasks/add | add_form() | _add_form.html |  HTML Form to add task | `_add_form.html` htmcomponent
`POST` |  tasks/ | create() |  |  **Create** / Insert a add task | `_item.htm
GET | tasks/[task_id]/modify_form | modify_form() | _modify_form.html |  HTML form to edit task | html form `_modify_form.html`
`PUT` | tasks/[task_id] | update() |  |  **Update** an existing task | `_item.html` with updatedetails
`DELETE` |  tasks/[task_id] | remove() |  |  **Delete** a task | `NULL`, to be add

Issues is that not always new item is same, it may have different hx attributes depending on when it is added to DOM.


**Links**

- <https://medium.com/@goldhand/routing-design-patterns-fed766ad35fa>
- [Codecapsules - Tutorial Building A Full Stack Application With Flask And Htmx](https://codecapsules.io/tutorial/building-a-full-stack-application-with-flask-and-htmx/)

## Architecture & Design of Flask Webapp

Handling data at different levels in your application involves a mix of responsibilities. Here's a breakdown of where you can handle specific logic related to data in a Flask application:

**1 Database**

- Responsibility: Defining the **structure** of your data, **relationships** between tables, and ensuring data **integrity**.
- Tasks:
  - Define tables and relationships using a database schema.
  - Ensure proper indexing and constraints for performance and data integrity.

**2 SQLAlchemy Models**

- Responsibility: Representing the database entities in your application, defining how data is retrieved and manipulated.
- Tasks:
  - Define SQLAlchemy models corresponding to your database tables.
  - Implement methods in models for **data retrieval, manipulation**, and **business logic**.
  - Handle complex queries or **data transformations** in the model layer.

**3 Flask Routes**

- Responsibility: Handling HTTP requests, interacting with the database through models, and **preparing data for presentation**.
- Tasks:
  - Retrieve data from the database using SQLAlchemy models.
  - Perform any necessary **data manipulation** or **business logic**.
  - Pass the processed data to the template for rendering.

**4 Jinja Templates**

- Responsibility: Rendering HTML and presenting data to the user.
- Tasks:
  - Display data received from Flask routes.
  - Implement **conditional logic** in templates for **role-based rendering**.
  - Keep templates focused on presentation, **avoiding complex business logic**.

### Recommendations

**Separation of Concerns:**

- Keep business logic and data manipulation in the SQLAlchemy models and Flask routes.
- Ensure that templates are responsible for presentation and rendering, not for complex data processing.

**Template Context**

- Pass only the necessary data to templates. Flask routes should prepare the data and send it to - templates in a ready-to-use format.

**Avoid Complex Logic in Templates**

- Minimize the use of complex logic in templates. If you find yourself needing significant logic in - templates, consider moving that logic to the Flask routes or models.

**Reusability**

- Encapsulate reusable logic (e.g., role-based rendering) in functions or macros within your templates.
- By following these recommendations, you can maintain a clean and maintainable separation of concerns in your Flask application, making it easier to understand, extend, and maintain over time.

### Business Logic Recommendations

**Lean Toward Models for Data-Related Logic**: Business logic directly related to the structure and integrity of your data is often better placed in models.

**Lean Toward Routes for Presentation Logic**: Logic that specifically deals with handling requests, preparing data for presentation, or coordinating different parts of your application might be more suitable for routes.

**Keep Routes Thin**: Aim for thin routes that primarily handle HTTP concerns, delegate to models for data manipulation, and delegate to templates for presentation.

**Consider a Service Layer**: For more complex applications, you might introduce a service layer between routes and models to encapsulate business logic, providing a clean and modular design.

Links

- [Stack - business logic](https://softwareengineering.stackexchange.com/questions/234251/what-really-is-the-business-logic)
- [Large prod flask app](https://levelup.gitconnected.com/structuring-a-large-production-flask-application-7a0066a65447)

## Three-Tier Architecture

The three-tier architecture consists of a single presentation tier, logic tier, and data tier. It is similar to MVC. Logic layer, business layer or application layer are all similar.

- [ ] learn architecture patterns and design patterns, like DDD, OOD, EDD.

## Backend Three-Layer Architecture

At backend, when the things get complex, then it is better to have 3 layer architecture

- API Layer - validates, formats, exposes end points
- Service Layer - processing logic, business logic, data compute
- Data Layer - data access and persistance

This helps in having separation of concern but increases complexity and overhead to maintain.

Link

- [From Request to Database: Understanding the Three-Layer Architecture in API Development](https://konstantinmb.medium.com/from-request-to-database-understanding-the-three-layer-architecture-in-api-development-1c44c973c7af)
- [Full stack flask app](https://amlanscloud.com/apparchitecture/)
- [TDD - Python](https://www.cosmicpython.com/book/preface.html)

## OAuth

Oauth is used to provide login via third party providers like google, facebook etc.

To setup google Oauth:

- Crate a google app in <https://console.cloud.google.com/apis/credentials>


## Designing RESTful APIs -  Build & Architecture

API is base for modern web development. Building a good API requires lot of thought process and methodologies to make it usable, upgradable and reliable.

Some of the things to consider are:

- API can be built by REST framework using HTTP methods.
- Write down the model. If it is not written, it doesn't count.
- Tools don't matter, everthing should be in one place, be it conf, notepad, or notebook.
- Keep team involved.

Successful API is Easy to use and Solves the purpose.

### API Modeling Process - 5 Step Design Model

Following steps can be followed to model and API

- Step 1: Identify Participants
- Step 2: Identify Activities
- Step 3: Break into Steps
- Step 4: Create API Definitions
- Step 5: Validate API

Let's dive deeper into them

**Step 1: Identify Participants**

Participants are end users, humans or IoTs (entity). Know them, what they do, this defines the system that need to be built.

**Step 2: Identify Activities**

Outline the business

- what are the events. Eg: search, add to cart, add / remove items, payment, fulfil, ship, review.
- who is doint what
- who passes event to whom
- flow of events and queue
- start and end of process with all events in it
- boundaries, what is included and what is not.

**Step 3: Break into Steps**

Make a flowchart of events and business logic to complete a business process.

**Step 4: Create API Definitions**

API Resources - anything user interacts with, they are nouns. Items, you update or add them. Cart - you add or remove item from it. Order - you create and fulful it. Map these actions on resources to HTTP verbs, GET POST PUT DELETE. That defines your API endpoints.

you do following, which is CRUD as:

- View items
- Edit items
- Create items
- List items
- Search items
- Create Cart
- Update Cart
- Checkout -> Create Order

**Step 5: Validate API**


Now that you have _API Definitions_, **do not code** it. Instead validate in real scenarios. Document as if it already exists. Running on white board is okay too.

### HTTP Protocol wrt API

Headers come with request, Payload goes with response. Example:

```sh
curl -I https://api.github.com      # shows headers

HTTP/1.1 200 Connection established

HTTP/1.1 200 OK
Server: GitHub.com
Date: Wed, 15 May 2024 13:49:00 GMT
Content-Type: application/json; charset=utf-8
# and much more
```

**HTTP Status Codes**: 2xx 3xx 4xx all have different meaning, and based on this code, rest of the actions are taken. Like show data or error/info etc.

**Content-Type** another important information, this tells what the payload is, for normal webpage it is `text/html` but for APIs, it is `application/json`.

### API Constraints

- should be designed for client-server architecture
- stateless - every request should execute on its own and self-contained.
- cachable
- layered system - no not directly hook to db, have cahce in between, have auth, have logging, have audit trail, DNS lookup, load balancers in between.

**Code on demand** - API can return code, so that browser can execute it. This lets you change the api and send changed code. ???

**Uniform interface** - Each end point is unique and exists only once. You can have named api endpoints too.

```sh
curl https://api.github.com
# get list of endoints
```

### API Authentication and Authorization

- by API Keys
  - pros - add to header, language agnostic
  - cons - can be shared, not secret
- OAuth
  - authorization protocol, map url with user
- OAuth 2.0
  - standard, common solutions, not easy to use.

### API Versioning

Versioning in url or header.

URL is better.

### API Media-Type

Json and its structire, `_linka` and `items` are common structure.

Links:

- [Designing RESTful APIs - Linkedin Learning](linkedin.com/learning/designing-restful-apis/next-steps-toward-designing-a-restful-api)


## Email Server

You can use Google or SendGrid as email sever for you app.

**Send Grid**

- Create an account.
- Click 'Integrate using our Web API or SMTP Relay'. Use, `MAIL_SERVER=smtp.sendgrid.net` for server.
- Add 'API Name' and get the Key. This will be `MAIL_USERNAME` in env file.
