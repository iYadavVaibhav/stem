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


| HTTP Method | URI | Action |
| ---|---|--- |
| GET | <http://hostname/todo/api/v1.0/tasks> | Retrieve list of tasks |
| GET | <http://hostname/todo/api/v1.0/tasks/new> | HTML Form to add new resource |
| GET | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Retrieve a task |
| GET | <http://hostname/todo/api/v1.0/tasks/[task_id]/edit> | HTML form to edit resource |
| POST |  <http://hostname/todo/api/v1.0/tasks> | Create a new task |
| PUT | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Update an existing task |
| DELETE |  <http://hostname/todo/api/v1.0/tasks/[task_id]> | Delete a task |

**Flask Web** Routes Methods and Template naming

| HTTP Method | URI | Method | Template |Action |
| --- | --- | --- | --- | --- |
| GET | tasks/ | all() | all.html | View all tasks |
| GET | tasks/new | new() | new.html or form.html |  HTML Form to add new task |
| `POST` |  tasks/ | new() |  |  **Create** / Insert a new task |
| GET | tasks/[task_id] | one() | one.html |  **Read** View one task |
| GET | tasks/[task_id]/edit | edit() | edit.html or form.html |  HTML form to edit a task |
| `POST` | tasks/[task_id]/edit | edit() |  |  **Update** an existing task |
| `POST` |  tasks/[task_id]/delete | delete() |  |  **Delete** a task |

In above, `new.html` and `edit.html` can be combined together to be `form.html` as fields are same. Also, same form, `TaskForm` can be used for add and edit. The names are kept generic so that it is easy to replicate across resources (or you can name one:task and all:tasks).

In `tasks` `all()` method, which shows all resources, you need to implement filters, pagination, sorting and searches. These are usually URL query parameters. Eg:

- `<tasks/?tag=shop&sort=asc&done=true&page=2>` this will provide you param to filter the result returned and you need to do
  - `tag` - `where tag='shop'`
  - sort - order by
  - done - where done=true
  - page - use limit or offset



**Flask HTMX** or AJAX Routes Methods and Template naming

HTML verbs - new, edit, delete, one, all

AJAX verbs - add, create, modify, update, remove, item, all

HTML Components:

- `_item.html` : Row Details with Edit and Delete buttons
- `_modify_form.html` : Row Details in form with Save and Cancel buttons
- `_add_form.html`: Blank form with Create and Cancel buttons

| HTTP Method | URI | Method | Template | Action | Return
| --- | --- | --- | --- | --- | --- |
| GET | tasks/ | all() | all.html | View all tasks | table with `_item.html` looped
| GET | tasks/[task_id] | item() | _item.html |  **Read** One task HTML | `_item.html` html component
| GET | tasks/add | add_form() | _add_form.html |  HTML Form to add task | `_add_form.html` html component
| `POST` |  tasks/ | create() |  |  **Create** / Insert a add task | `_item.html`
| GET | tasks/[task_id]/modify_form | modify_form() | _modify_form.html |  HTML form to edit a task | html form `_modify_form.html`
| `PUT` | tasks/[task_id] | update() |  |  **Update** an existing task | `_item.html` with updated details
| `DELETE` |  tasks/[task_id] | remove() |  |  **Delete** a task | `NULL`, to be added

Issues is that not always new item is same, it may have different hx attributes depending on when it is added to DOM.


**Links**

- <https://medium.com/@goldhand/routing-design-patterns-fed766ad35fa>
- [Codecapsules - Tutorial Building A Full Stack Application With Flask And Htmx](https://codecapsules.io/tutorial/building-a-full-stack-application-with-flask-and-htmx/)

## Architecture & Design

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

### Three-Tier Architecture

The three-tier architecture consists of a single presentation tier, logic tier, and data tier. It is similar to MVC. Logic layer, business layer or application layer are all similar.

- [ ] learn architecture patterns and design patterns, like DDD, OOD, EDD.
