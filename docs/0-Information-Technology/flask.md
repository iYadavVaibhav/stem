---
date: 2019-05-03
---

# Flask

Flask is a microframework in Python. It is used to create a webapp. It can start a python web server. It can handle HTTP requests. It can also be used to make a webapp API.

## Flask Hello World

- Create a python file `main.py`:

  ```python
  #!venv_app/bin/python3
  from flask import Flask
  app = Flask(__name__)

  @app.route('/')
  def index():
      return "Hello from Flask App!"

  if __name__ == '__main__':
      app.run(debug=True)
  ```

- run using `python main.py`

- access at `http://localhost:5000` in browser.

## Run a Flask App - Ways

- python
  - `python main.py`

- executable
  - `chmod a+x main.py` to make app executable.
  - `./main.py` runs app.

- Flask CLI
  - `flask --app main.py run`
    or
  - `export FLASK_APP=main.py` will make an variable that tells python which app to run.
  - `flask run` executes the app or if flask is not in path then do `python -m flask run`



## Flask native modules

_flask basics, request-response handling, contexts_

- **Application Instance**
  - `Flask()` - is a class.
  - All Flask applications must create an **application instance** (object of class `Flask`). The web server passes all requests it receives from clients to this object for handling, using a protocol called Web Server Gateway Interface (WSGI).
  - `app = Flask(__name__)` name is passed to `Flask` class constructor so it knows the location of app and hence can locate static and template.

- **Requests**
  - Request from client has lot of information in it, like header, user-agent, data etc. This information is available in `request object` and is made available to a `view-route function` to handle it. This object is not passed as an argument to function, rather it is made available using `contexts`.
  - `request` Object has methods and attributes having info on method, form, args, cookies, files, remote_addr, get_data().

- **Contexts**
  - Code needs data to be processed, that data can be configurations, input data or data from file/database. Context is used to keep track of this data.
  - It let certain objects to be globally accessible, but are not global variable. They are globally accessible to only one thread. There can be multiple threads serving multiple requests from multiple client.
  - Context is simply data that is specific to something. Eg
    - **App-context** is specific to app, like its mail server, its database location, or other configurations. Keeps track of application-level data. Objects: `current_app`, `g`.
    - **Request-context** is specific to request, like its browser, its client, its form data, its headers, all that is request-level. Objects: `request`, `session`.
  - this data is stored in object, in attribute such as `config`
  - this data is used by extensions in flask, hence they do not run if context is not available.
  - context is automatically made available once app is initialized.
  - context can be made explicitly available by calling `with app.app_context():`
  
- **Request Handling**
  - when there is request, web server activates a thread that initializes app and this app context is pushed with data that is available globally, similarly request context is also pushed.

    ```mermaid
    graph LR;
    Web_Browser --> request --> web_server --> Flask_app_instance --> route --> function_to_execute
    ```

- **Flask variables for Request Handling**
  - `current_app` variable in Application context, has info of active application.
  - `g` variable in Application context, it is object that is unique for each request, temp access **during** handling of a request. It resets once request is served. Holds app info hence app context. Can be used to load user on each request. show logged in user on templates.
  - `request`, in request context, obj having client req data.
  - `session`, in request context, stores data across requests, i.e., a dictionary to store values that can be accessed in different requests from same session.
  - Flask, in backend, makes these available to thread before dispatching a request and removes after request is handled. Explicitly, `current_app` can be made available by invoking `app.app_context()`
  - [ ] How does flask differentiate requests and clients?

- **Request Hooks**
  - They are deocrators that register functions that can execute code before or after each request is processed. They are implemented as decorators  (functions that execute on event). These are the four hooks supported by Flask:
  - `before_request` - like authenticate
  - `before_first_request` - only before the first request is handled. Eg, to add server initialization tasks.
  - `after_request` - after each request, but only if no unhandled exceptions occurred.
  - `teardown_request` - after each request, even if unhandled exceptions occurred.
  - `g` context global storage can be used to share data between hook and view functions.

- **Routes or View Functions**
  - They handle application URLs.
  - URL-maps can be seen using `app.url_map`
  - redirect to url
    - `redirect` - takes URL to redirect to.
    - `redirect(url_for("profile"))`
    - `url_for()` utility builds URL for view-function giving route from app-url-map. takes function name as str and gives its URL. Eg:
      - `url_for('user', name='john', page=2, version=1)` would return `/user/john?page=2&version=1`, they are good to build dynamic URLs that can be used in templates.
      - `url_for('user', name='john', _external=True)` would return `http://localhost:5000/user/john`.
      - `url_for('static', filename='css/styles.css', _external=True)` would return `http://localhost:5000/static/css/styles.css`.
      - `/static/<filename>` is special route added by Flask to serve static files.

- **Response Object**
  - Response is returned by view-function as a string (usually HTML) along with **status code** but can also contain **headers**. So rather than sending comma separated tuple values, flask lets create response object using `make_response()`.

    ```python
    from flask import make_response

    @app.route('/')
    def index():
        response = make_response('<h1>Some response with a cookie!</h1>')
        response.set_cookie('message', '51')
    return response
    ```

  - `return redirect('http://www.example.com')` is a response with URL and status code 302, however Flask lets it do easily using `redirect()` method. Another such is `abort(404)` which is treated as exception.


  - **session** - can be used to store values, specific to current session, it is server side. Helps to pass values from one function to another.
    - `session["username"] = username`
    - permanent sessions store session data for a time period

  - **flash** - lets send extra messages to frontend
    - `flash("The message", "info")` message and level.
    - `get_flashed_messages()` to get messages
    - it lets record a message at the end of a request and access it next request and only next request.

        ```html
        {% for message in get_flashed_messages() %}
            <div class="flash">{{ message }}</div>
        {% endfor %}
        ```

## Templates in Flask

Templates can be used to build responses.

- **render_template()**
  - it makes use of template
  - `return render_template('user.html', name=name)`

- **Jinja Templates**
  - Templates are HTML file having additional Python like code in **placeholders**.
  - Placeholders can have **variables** and **expressions**.
  - They get replaced with value when template is rendered by **JinJa2**, the template engine.
  - This lets build dynamic content on execution.
  - It lets **inherit**, **extend** and **import** templates.
  - More documentation on [template design](https://jinja.palletsprojects.com/en/latest/templates/) and [tips and tricks](https://jinja.palletsprojects.com/en/latest/tricks/)
  - Example template is below.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>My Webpage</title>
    </head>
    <body>
        <ul id="navigation">
        {% for item in navigation %}
            <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
        {% endfor %}
        </ul>

        {% if kenny.sick %}
          Kenny is sick.
        {% elif kenny.dead %}
          You killed Kenny!  You bastard!!!
        {% else %}
          Kenny looks okay --- so far
        {% endif %}

        <h1>My Webpage</h1>
        {{ a_variable }}

        {# a comment #}
    </body>
    </html>
    ```

  - **Filters**
    - pass value over pipe to filter functions like upper, lower, title, trim, safe.
    - eg, `Hello, {{ name|capitalize }}`
    - Full list of filters [here](https://jinja.palletsprojects.com/en/latest/templates/#list-of-builtin-filters)
  
  - **Delimiters**
    - {% ... %} for Statements
    - {{ ... }} for Expressions to print
    - {# ... #} for Comments, not included in the template output.

  - **Assignments**
    - lets set a value to var and use it for logic building. We have to use namespace.

      ```html
      {% set ns = namespace(index=0) %}
      {% for nav_item in nav %} 
        {% if ns.index !=0 %}
          --- some stuff ---
        {% endif %}
        {% set ns.index = ns.index + 1 %}
      {% endfor %}
      ```

  - {{ super() }}, includes code from parent block, if overriding a block.


- **Error Handlers**
  - `@app.errorhandler` is decorator that lets return a view from template for error responses like 404 and 500.

    ```python
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404

    @app.errorhandler(500)
    def internal_server_error(e):
        return render_template('500.html'), 500
    ```


## Flask Extensions

Most extensions use app context to initialize themselves, eg:

```python
from flask_bootstrap import Bootstrap
app = Flask(__name__)
bootstrap = Bootstrap(app)
```

### Bootstrap in Flask

- **Bootstrap** - provides templates and blocks that can be used in Jinja2 Templates
  - installation `pip install flask-bootstrap`
  - eg, `{% extends "bootstrap/base.html" %}` - base.html does not exist but is available via extension. Others are `navbar`, `content`, `script`

  ```html
  {% block scripts %}
  {{ super() }} <!--includes base scripts too, else overrides-->
  <script type="text/javascript" src="my-script.js"></script>
  {% endblock %}
  ```

### Moment JS in Flask

- **Moment.js Flask-Moment** - Localization of Dates and Times
  - server should send UTC, client should present in local time and formatted to region using JavaScript.
  - `Moment.js` is perfect for this and is available as flask extension. It can be used in Jinja2 template.
  - `pip install flask-moment`
  - include the script, `jQuery` is already attached as part of bootstrap

    ```html
    {% block scripts %}
      {{ super() }}
      {{ moment.include_moment() }}
    {% endblock %}
    ```

    ```python
    from flask_moment import Moment

    moment = Moment(app)
    
    return moment(datetime.utcnow()).format('LLL') # local time
    return moment(datetime.utcnow()).fromNow(refresh=True) # a few seconds ago..
    ```

## Forms in Flask

- **WTForms** - **Object Oriented** Form building, rendering and validations.
  - supports forms validation, CSRF protection, internationalization (I18N), rendering form and more for any Python framework, its generic. [WTForms](http://wtforms.simplecodes.com/).
  - Cons - It lets you build form in python and help validate it. It adds a extra learning curve than using HTML for the same. It same as ORM that you define things as class variables.
  - You have to build a template but can use `Form.field`
  - It lets you extend forms.
  - lets you show error easily without using `flash`.
  
  - **Model Building**
  
    ```python
    from wtforms import Form, BooleanField, StringField, validators

    class RegistrationForm(Form):
      username     = StringField('Username', [validators.Length(min=4, max=25)])
      email        = StringField('Email Address', [validators.Length(min=6, max=35)])
      accept_rules = BooleanField('I accept the site rules', [validators.InputRequired()])
    ```

    - Form Class - in main `app.py` or in module `forms.py` make class with fields and validate functions.

- **Flask-WTF** integration of Flask and WTForms
  - Includes CSRF, file upload, and reCAPTCHA. You mostly have to use formats of WTForms but write less as few things are done automatically that are related to Flask patter.
  - Form fields are Class variables with different field type
  - validator functions can help validate, like `Email()`.
  - Link to [Flask-WTF](http://pythonhosted.org/Flask-WTF/)
  
  - **Validation & Prefill** controller

    ```python
    from flask import Flask, render_template, session, redirect, url_for

    @app.route('/', methods=['GET', 'POST'])
    def index():
      form = NameForm() # defined as OOP model
      if form.validate_on_submit(): # cheks POST and validates
        session['name'] = form.name.data
        return redirect(url_for('index')) # POST -> back to this function as GET
      return render_template('index.html', form=form, name=session.get('name')) # When GET
    ```

    - Route - define new route, import form class and use. On submit, create object of model class to save/query data.

  - **Rendering** view

    ```html
    <form method="POST">
    {{ form.hidden_tag() }}
    {{ form.name.label }} {{ form.name() }}
    {{ form.submit() }}
    </form>
    ```

    - HTML template - in `templates` folder, rendered from route with form passed as data. Display form elements, errors and hidden_tag.

    - You can use **bootstrap** and flask-wtf combine to avoid writing template code and just use

      ```html
      {% import "bootstrap/wtf.html" as wtf %}
      {{ wtf.quick_form(form) }}
      ```

## Databases in Flask

DB_package or ORM - Python has packages for most database engines like MySQL, Postgres, SQLite, MongoDb etc. If not, you can use ORM that lets you use Python objects to do SQL operations, SQLAlchemy or MongoEngine are such packages.

- [Flask-SQLAlchemy](http://pythonhosted.org/Flask-SQLAlchemy/) is wrapper on [SQLAlchemy](http://www.sqlalchemy.org/). You have to use SQLAlchemy pattern but it helps by making things tied to Flask way like session of SQLAlchemy is tied to web-request of flask.
  - It is an design for Flask that adds support for SQLAlchemy to your application.
  - You can define table as a class, called model, with member variables as column names.

  - **Installation** `pip install flask-sqlalchemy`
  
  - **Initiation**
    - create `SQLAlchemy()` class object and pass `app` for context.

    ```python
    from flask_sqlalchemy import SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app) # Object for all ops

    class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique=True)
    admin = db.Column(db.Boolean)
    created_on = db.Column(db.DateTime(), default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.now)


    db.session.add(obj)     # insert new record to database
    db.session.delete(obj)  # delete a record from database
    db.session.commit()     # updates modifications in object if any

    # where clause
    user = User.query.filter_by(username=data['username']).first() # or .all()

    # select * from users
    users = User.query.all()

    ```

  - **DB Model**
    - It is a Class which represents application entities, like, User, Task, Author, Book etc.
    - We can define, table, its columns, data types, keys and relationships.
    - `__tablename__ = 'users'`
    - It has attributes that represent column name. `name = db.Column(db.String(64), unique=True)`

    - **Relationships** To create ER in OOPs way `users = db.relationship('User', backref='role')`
      - `backref` adds a back-reference to other models
      - `lazy` does not execute until you add executor.
        - add `lazy='dynamic'` to prevent query execution.

    - **Create**
      - Once you have created a db model in flask app, you can create db and tables using following steps:
        - `python`
        - `from main import db` main is filename of flask app
        - `db.create_all()` creates all tables from model class, if they don't exist

      - Now you can check SQL for tables created. You can do:

        - `sqlite3 filename.db`
        - `.tables`

  - **Insert** a new row
    - Create an Object of Class to build a new row. `user_john = User(username='john', role=admin_role)`
    - add - `db.session.add(user_john)`
    - `id` is added to object after `db.session.commit()commit()`
  - **Update** - `db.session.add()` also edits.
  - **Delete** - `db.session.delete(obj_name)`
  - **Read** - `query` object is available to all model class. It has filter-options and executors that build a SQL Query statement.
    - Filter-Options - `filter()`, `filter_by()`, `limit()`, `offset()`, `order_by()`, `group_by()`
    - Executors - `all()`, `first()`, `first_or_404()`, `get()`, `get_or_404()`, `count()`, `paginate()`
    - Examples
      - `User.query.all()` reads all records
      - `User.query.filter_by(role=user_role).all()`
    - `str(User.query.filter_by(role=user_role))` returns SQL query

  - **RAW SQL** - give your SQL statements
    - `db.session.execute(SQL)` returns cursor
    - `db.session.execute(SQL).all()` - returns List result set

  - **Shell Operations** - CRUD from Flask Shell
    - `flask --app hello.py shell` start shell with *app_context*, python shell will not have that.
    - `db.cratte_all()` creates SQLite file.

- **Py ORM Model from SQL**
  - Generate SQLAlchemy class model from database table - `sqlacodegen mssql+pyodbc://<servername>\<schema>/<database>/<table_name>?driver=SQL+Server --outfile db.py`

- **Migrations** DB changes version controlled

  - **Why?** - When DB is handled using ORM, all changes to DB is done via ORM. If you have to add a column it is added by ORM so it will delete the table and create new but to prevent data loss in table it will create a migration script to create and populate again.
  
  - **What?** - `Flask-Migrate` is wrapper on `Alembic` a SQLAlchemy migration framework. It generates Py script to keep the database schema updated with the models defined. It help upgrade and roll back the schemas.
  
  - **Installation** - `pip install flask-migrate`
  
  - **Initiation**
    - `from flask_migrate import Migrate`
    - `migrate = Migrate(app, db)`
    - `flask --app hello.py db init` migration directory, script is generated
  
  - **Execution**
    - `upgrade()` has data changes to be done in this migration
    - `downgrade()` rolls back to previous state
    - Example: Steps to make a migration
      - Make changes to model classes
      - `flask --app hello.py db migrate -m "initial migration"` to generate script
      - review for accurate changes. add to source control
      - `flask--app hello.py db upgrade` to do migration in database
  
  - **Reference**
    - [How To Make a Web Application Using Flask in Python 3](https://www.digitalocean.com/community/tutorials/how-to-make-a-web-application-using-flask-in-python-3)
    - [SQLite explorer](https://sqlitebrowser.org/)


## Emails in Flask

- **Why** password reset, confirmations

- **How?**
  - Emails can be sent using `smtplib` package from Python standard library.
  - Email is sent by **connecting** to **SMTP Server** which takes request to send email to recipient.
  - **Localhost** on **port 25** is local server that can send email.
  - **External** SMTP server like `mail.googlemail.com` on `587` port can be used to send emails through **Google Gmail** account.

- **Flask-Mail** is a extension that wraps `smtplib`
  - **Installation** `pip install flask-mail`
  - **import** `from flask_mail import Mail, Message`
  - **instantiate** and initialize `mail = Mail(app)`
  - **build** obj `msg_obj = Message('sub','sender','to')`
  - **add body** and html to obj, may use template for it `msg.body = render_template(template + '.txt', **kwargs)`
  - **send** `mail.send(msg_obj)`
  
- **Sending Asynchronous Email**
  - Message() object can be build in mail python file but Mail() object, which sends the email using msg_obj, should run in separate thread to avoid lags.
  - use python Thread() class from **threading** package to make new thread that runs the send_async_email(app,msg) functions. this functions has
    - app object of FLask() for context
    - msg object of Message() for content
    - uses mail object of Mail() to send.
  - `from threading import Thread`
  - The function which build Message(), add line
    - `thr = Thread(target=send_async_email, args=[app, msg])` - build thread obj
    - `thr.start()` execute thread separately
    - `return thr` [ ] why this is added

- **Local Email Server**
  - `(venv) $ python -m smtpd -n -c DebuggingServer localhost:8025` this command starts emulated email server.


- **Variables** that we might need to **export**:

  ```bash
  export MAIL_SERVER=smtp.googlemail.com
  export MAIL_PORT=587
  export MAIL_USE_TLS=1
  export MAIL_USERNAME=email_id@domain.com
  export MAIL_PASSWORD="password"
  ```

- **Sending errors via Email**
  - Errors can be sent via email using Logs.

  - Links
    - [Flask docs - Email errors to admin](https://flask.palletsprojects.com/en/2.2.x/logging/#email-errors-to-admins)
    - [MG's microblog - email errors](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-vii-unit-testing-legacy#:~:text=of%20the%20application.-,Sending%20errors%20via%20email,-To%20address%20our)


## Blueprint - Large App Structure in Flask

_needs improvements after hands-on_

- simply, module is file, package is folder. Blueprint can be implemented in both.

- **single module** - [link](https://github.com/mjhea0/flask-tracking/tree/part-0)
  - here, one file has everything defined
  
    ```sh
    /prj
        my-app.py # imports, app, db, orm_class, form_class, route_view_functions, run
        /static
        /templates
    ```

- [ ] no package, Blueprints as modules?

- **single package**, Blueprints as modules - [link](https://github.com/mjhea0/flask-tracking/tree/part-1)
  - here all ORM & FORM classes are in one module
  - more complex, app-factory, no ORM, installable example with same structure, [here](https://github.com/pallets/flask/tree/main/examples/tutorial)

    ```sh
    /prj
        run.py          # import app, db. then run. What parts to run?
        config.py       # module. config vars. With which configurations?
        
        /my-app         # package
            __init__.py # app, register BP
            forms.py    # module. has form classes
            models.py   # module. DB setup. has ORM classes.

            auth.py     # module BP. import db, form, model. route-view-functions. login, register, logout. @login_required.
            blog.py     # module BP. import db, form, model. route-view-functions. CRUD.

            /template
            /static
    ```

- **multi-packages**, Blueprints as sub-packages - [link](https://github.com/mjhea0/flask-tracking/tree/part-2)
  - here ORM & FORM classes are in separate module for each Blueprint.
  - DB is top-level as it is shared by all sub-packages
  - auth is top-level to avoid circular dependencies.

    ```sh
    /prj
        run.py              # same. import app, db. then run
        config.py           # same. module. config vars
        /my-app             # package
            __init__.py     # app, register BP
            auth.py         # login init. login_manager
            data.py         # db setup, init, open, close. crud helpers

            /users
                __init__.py # blank
                forms.py    # module. has form classes. LoginForm, RegisterForm
                models.py   # module. has ORM classes. User.
                views.py    # BP Module. imports form, model. defines route-view-functions

            /blog
                __init__.py # blank
                forms.py    # module. has form classes. CreateBlogForm, EditBlogForm
                models.py   # module. has ORM classes. Post, Follower.
                views.py    # BP Module. imports form, model. defines route-view-functions
                geodata.py  # module. helper functions.

            /template
            /static
    ```

- Example - [Miguel Grinbers's Flasky](https://github.com/miguelgrinberg/flasky)
  - app-factory using `create_app()` in init.
  - models are all in one module, not in blueprint package. [ ] why? probably all BP use models
  - blueprint as sub-package's `__init__.py`, not views. [ ] why?
  - api package has multiple modules, all have route-view-functions.

    ```sh
    prj/
        run.py      # imports create_app, db, ORM-models. app init. flasky.py
        config.py   # module. config class with vars. EnvDict
        /app
            __init__.py # import config, extensions. add extensions. def create_app.
            models.py   # import db, login_manager. def all ORM and Mixin classes

            /auth
                __init.py # define BP. import views
                forms.py  # import ORM. Form classes
                views.py  # import db, Forms, ORMs. def route-view-functions login, logout, register, reset
            /main
                __init.py # define BP. import routes
                forms.py  # import ORM. Form classes
                views.py  # import db, Forms, ORMs. def route-view-functions
            /api
                __init.py         # define BP. import each routes
                authentication.py # import ORM, api. def route-view-functions tokens
                comments.py       # import db, ORM, api. def route-view-functions tokens
                posts.py          # import db, ORM, api. def route-view-functions tokens
                users.py          # import ORMs, api. def route-view-functions users, follower
            /static
            /templates
    ```

- Example - [Miguel Grinbers's microblog](https://github.com/miguelgrinberg/microblog)
  - same as above, flasky
  - in sub-packages, views.py is routes.py

    ```sh
    prj/
        run.py      # imports create_app, db, ORM-models. app init.
        config.py   # module. config class with vars
        /app
            __init__.py # import config. add extensions. def create_app. import models.
            models.py   # all ORM and Mixin classes

            /auth
                __init.py # define BP. import routes
                forms.py  # import ORM. Form classes
                routes.py # import db, bp, Forms, ORMs. def route-view-functions login, logout, register, reset
            /main
                __init.py # define BP. import routes
                forms.py  # import ORM. Form classes
                routes.py # import db, bp, Forms, ORMs. def route-view-functions
            /api
                __init.py # define BP. import routes
                tokens.py # import db, bp. def route-view-functions tokens
                users.py  # import db, bp, ORMs. def route-view-functions users, follower
            /static
            /templates
    ```

- Example - [Miguel Grinbers's microblog-api](https://github.com/miguelgrinberg/microblog-api)
  - app-factory using create_app in app.py
  - Blueprints as modules
  - single package

    ```sh
    /prj
        run.py
        config.py
        api/
            __init__.py # imports create_app, db
            app.py      # create_app, db init, registers BP
            auth.py     # import db, model. login functions
            models.py   # import db. ORM classes

            posts.py    # BP. imports db, ORM. route-view-functions posts, feed
            tokens.py   # BP. imports db, ORM. route-view-functions tokens, reset_token
            users.py    # BP. imports db, ORM. route-view-functions users, me, followers
            templates/  # only email reset html
    ```

- Example - [Miguel Grinbers's microblog-2012](https://github.com/miguelgrinberg/microblog-2012)
  - separate module for model, form, email and view.
  - no blueprint, no app-factory, no sub-package

- what looks good - why?
  - app-factory - gives flexibility
  - config - for env separation
    - use config class for defaults and different envs
    - use YAML file to read secrets and keep it out of git
    - [more on config best practice](https://flask.palletsprojects.com/en/2.2.x/config/#configuration-best-practices)
  - blueprints as modules.
  - links
    - [Another good tutorial](https://hackersandslackers.com/configure-flask-applications/)

- **Why?** - App needs to be structured into modules as it starts growing. It also helps reuse modules.

- **Without Blueprint**

  - **Single py file** app structure
    - **import** flask modules and extensions
    - **instantiate** flask app `app = Flask(__name__)`
    - **configure** app with all configs, eg, `app.config['MAIL_PORT'] = 587`
    - **initialize** extensions, eg, `mail = Mail(app)`. Not all extensions are initialized, eg, FlaskForm
    - DB **ORM** Classes
    - **Email** functions - may use templates
    - **Form** Classes
    - **error** handlers functions - may use templates
    - **routes**, they may use use
      - above extensions, eg - checks Form, sends email, writes to db, or returns an error
      - native - session, flash, g
      - **templates**.

  - **templates** and **static** files structure
    - base template is HTML, it has blocks. Block-content can be replaced or appended
    - base-template is used to build different pages which put dynamic content in blocks.
    - static files can be used from static folder.
    - example flow
      - `base.html` has blocks, title, nav, page_content
      - index or profile have `{% extends "base.html" %}`, it tells Jinja to use base.
      - block-content can be replaced or appended using `{{ super() }}`
      - files from `static` folder using `{{ url_for('static', 'favicon.ico') }}`
      - external packages can be imported as py_var to build content as py_var and use in content. eg - wtf template can be imported from bootstrap to build content from form_object using `{{ wtf.quick_form(form) }}`.

- **Blueprint** lets us divide app into mini apps. It is a collection of views, templates, static files that can be applied to an application. Blueprints are a great way to organize your application.

- **Application Factory** is way of initializing app
  - to serve a request, when single file app in invoked, app gets initialized with configs to serve the request. You do not have flexibility to make changes to config dynamically
  - app initialization can be delayed (or controlled) by making a function to do it, called `factory function`. This can be explicitly controlled.



- **How?**

  - choice - you can simply keep templates and static in one folder or can split them too and keep in blueprint sub-folders.


- **single file** split
  - in single file, you can move view-routes-functions.
  - in `second.py`

    ```python
    from flask import Blueprint

    second = Blueprint("second", __name__)

    @second.route("/home")
    def home():
        return ("from second")
    ```

  - and in `app.py`

    ```python
    from flask import Flask
    from second import second

    app = Flask(__name__)

    app.register_blueprint(second, url_prefix="")

    @app.route("/")
    def home():
        return "Hi"

    if __name__ == "__main__":
        app.run(debug=True)
    ```


- **multiple files** split
  - make a sub-folder and add
    - constructor
    - error-route functions
    - form classes
    - views-route functions
  - db models and other functions still remain in main file.
  
    ```python
    |-app_name      # 0 top level dir - any name
      |-app/          # 2 package having flask application
        |-templates/
        |-static/
        |-__init__.py   # 2.1 app pkg constructor, factory
        |-models.py     # 2.2 db models
        |-email.py      # 2.3 email 
        |-main/         # 5 BP sub pkg
          |-__init__.py   # 5.1 pkg const defines BP
          |-errors.py     # 5.2 err handlers
          |-forms.py      # 5.3 form classes
          |-views.py      # 5.4 routes functions
      |-config.py     # 3 configuration variables as OOPs
      |-flasky.py     # 4 factory is invoked
    ```

  - 3 - `config.py` config as OOPs
    - the config variables like secret-key and mail-server, are now attributes of `Config` class.
    - `Config` class has `@staticmethod` as `init_app(app)` which can be used to do things once app is available, i.e. initialize app and more.
    - This Config base class has common vars but can be extended to build different environment classes like dev, test, prod. that can have env specific vars like dev db-location.
    - add a dictionary `conf_env` to pick the correct env class.
  - 2 - `app/` App Package
    - dir having code, template and static files.
    - 2.1 - `app/__init__.py` App Pkg Constructor
      - this is where we build the `factory function` to initialize app explicitly and controlled.
      - import Flask modules (only Flask)
      - import Flask-Extensions (only those that need app init)
      - instantiate extensions without `app`
      - factory function `def create_app(conf_env):` function to have
        - arg `conf_env` is dictionary key name (str) to pick required Env_Config_Class from `config.py` so that we have correct config vars.
        - instantiate app
        - add configs from object `app.config.from_object()`
        - add configs to extensions using `ext_obj.init_app(app)`
        - return app
      - while this makes config available in controlled way, however, it missing `@app.routes()` and other decorators associated to `@app` like error handles. This is handled using `Blueprint`.
      - import BP file and register it with app using `register_blueprint()` method. When a blueprint is registered, any view functions, templates, static files, error handlers, etc. are **connected** to the application.

        ```python
        from flask import Flask
        from flask_bootstrap import Bootstrap
        from flask_sqlalchemy import SQLAlchemy
        from config import config

        bootstrap = Bootstrap()
        db = SQLAlchemy()

        def create_app(config_name):
            app = Flask(__name__)
            app.config.from_object(config[config_name])
            config[config_name].init_app(app)

            bootstrap.init_app(app)
            db.init_app(app)

            # Routes or blueprints
            from .main import main as main_blueprint
            app.register_blueprint(main_blueprint)

            return app
        ```

  - 5 Blueprint - sub pkg
    - Blueprint is like app having routes but in dormant state until registered with an application which gives it a context.
    - Blueprint can be a single file, or structured as a sub-package having multiple modules and the package constructor creates blueprint.
    - 5.1 `app/main/__init__.py` main bp creation
      - Blueprint is native flask module
      - create object of `Blueprint()` class and pass it a name and location.
      - import associated modules

        ```python
        from flask import Blueprint
        main = Blueprint('main', __name__)

        from . import views, errors 
        # last line to avoid circular dependency
        ```

    - 5.4 `app/main/views.py` view routes
      - route function name now has namespace with BP name as prefix, so `url_for('main.index')` should be used so that 'index' of any other BP is not picked.
    - 5.2 `app/main/errors.py` error handlers  
      - they respond to only BP route error, for app wide use `app_errorhandler` decorator instead of `errorhandler`.
    - 5.3 `app/main/forms.py` has form objects.

  - 4 `flasky.py` module where app instance is denied
    - `create_app()` function is called.


- **Link** - <http://exploreflask.com/en/latest/blueprints.html>



## Testing in Flask

- **Why**
  - function code only runs when it is called.
  - if else code is only called when condition is met.
  - ensure code for all branch and function is run by changing scenarios.
  - 100% coverage is when you run all functions and code in all if else try catch is tested.
  - do test as you develop.
  - `pytest` to test
  - `coverage` to measure

- **PyTest**
  - modules and functions both start with `test_`
  - Fixtures are setup functions, that setup how app should behave
    - You can build different fixtures to have different app instances or to test different interactions like client requests or CLI commands.
    - fixtures call app-factory with test configs to make app separate from dev config.
    - `conftest.py` - sample below.
      - here fixure creates app, which is then passed to other fixture for specific testing.
      - `app.test_client()` lets make request to app without server. Available in `client` fixture.
      - `app.test_cli_runner()` lets test CLI commands registered with app. Available in `runner` fixture.
      - these fixture names (client or runner) are passed in test_functions to use them.
    - You can keep building fixture on top of other fixture to add predefined functionalities. Eg, on top of client add another class that can help login and logout.

      ```python
      @pytest.fixture
      def app():
          app = create_app(...)
          with app.app_context():
              init_db()
          yield app
      
      @pytest.fixture
      def client(app):
          return app.test_client()

      @pytest.fixture
      def runner(app):
          return app.test_cli_runner()
      ```


  - Test Cases
    - start with `test_` in both module and function name.
    - use `assert`

      ```python
      from app import create_app

      def test_hello(client):
          response = client.get('/hello')   # sends this URL request
          assert response.data == b'Hello, World!'
      ```

  - `pytest.mark.parametrize` lets run the test with different params
  - to test context variables like `session` or `g` use `with client:` Otherwise it raises an error.
  - `setup.cfg` can have extra configs (not mandatory).
  
  - **Run - Pytest**
    - `pytest` runs test
    - `pytest -v` runs and shows all files
  
- **Report - Coverage**
  - `coverage run -m pytest` runs tests and measures coverage
  - `coverage run -m unittest` runs tests using unittest and measures coverage
  - `coverage report` shows coverage report on CLI
  - `coverage html` builds dir for detailed report
    - `htmlcov/index.html` has detailed report.
    - shows code covered and not covered.
  - To exempt a code block from coverage, add `# pragma: no cover` after code block. Make this a tough decision to skip code from testing.


  - more [here](https://flask.palletsprojects.com/en/2.2.x/tutorial/tests/)

- **Manual Testing**
  - Basic testing can be done using flask shell and executing functions `flask --app flasky.py shell`
  - do things similar to as you do in wrinting code, like import module, create objects, call functions etc.
  - use `current_app` to use `app_context`, or
  - `with app.app_context():` when using factory
  - What you test in shell should be automated by making test cases.

- **UnitTest** - test small units
  - use py native `import unittest`
  - in `tests/test_basics.py`
    - import modules you need for test, `create_app`, `db`
    - import modules you want to test, `User`, `current_app`
    - define class `class BasicsTestCase(unittest.TestCase):`
      - build functions
        - `setUp()` runs before each test, builds env for testing
        - `tearDown()` runs after each test, removes things from env
        - `test_somecase()` these functions run as test.
          - `assertTrue` Ok if True
          - `assertFalse` Ok if False
          - `with self.assertRaises(AttributeError):` statement that raise error.
  - tests can be written in separate py files (modules) and the folder `tests` can have `__init__.py` as blank to make it a pkg
  - in `flasky.py` you can add code to run tests automatically by adding a cli command.
  - do `flask --app flasky.py test` to run all test cases

      ```python
      @app.cli.command()
      def test():
        """Run the unit tests.""" # help msg on cli
        import unittest
        tests = unittest.TestLoader().discover('tests')
        unittest.TextTestRunner(verbosity=2).run(tests)
      ```

  - `python -m unittest` discovers and runs all tests.

- **Unittest vs PyTest**
  - Unittest is universally accepted and is built in Python standard library
  - PyTest has lot of features and we need to write less
  - Unitest needs classes & methods. Pytest only needs methods.
  - Pytest runner has **full support** for test cases written in UnitTest clasees.
  - **Use both**, OOPs of Unittest and better assert of Pytest with and its better error reporting.


- **Unittest and PyTest**
  - You can use Unittest and Pytest togehter to make use of best of both.

  - **Test Parametrization**
    - when you have same test-code but have to run with different input parameters.
    - Pytest uses non OOPs params, to make Unittest OOPs model work with PyTest add `pip install parameterized`.
    - then use its decorator and pass params as list of tuples to argument.
    - list is input scenarios
    - tuple is variables in each scenario. One value tuple is `('name1',)`
    - Eg, `[('name1',32), ('name2',24)]`, `@parameterized.expand([(n,) for n in range(9)])`, `@parameterized.expand(itertools.product([True, False], range(9)))`

      ```python
      class TestLife(unittest.TestCase):
          # ...

          @parameterized.expand([('name1',32), ('name2',24)])
          def test_load(self, name, age): # this method runs the number of items in list.
              u = User(name, age)
              assert u.name = name
      ```

  - **Test Exceptions**
    - `pytest.raises()` can be used to test if a certain error is raised on run time.

      ```python
      with pytest.raises(RuntimeError):
          data.load('corrupt_data.txt')
      ```

  - **Mocking**
    - When you have to change return value of a pre defined function. You can mock a function to return a specific value irrespective of what is passed to it without modifying its code.
    - More here on [MG's Unit Testing - Mocking](https://blog.miguelgrinberg.com/post/how-to-write-unit-tests-in-python-part-2-game-of-life#:~:text=72%20different%20tests!-,Mocking,-We%20are%20now)


- **Test Code Structure**
  - create a test module (file) of same name as test subject with test_ prefixed. Eg, `test_foo.py`
  - import `unittest` and other required packages
  - create classes and methods for testing.
  - in test_method
    - call code from your app, set varibles or directly put code in assert
    - `assert some-code` some-code can be anything that evaluates to True.

    ```python
    import unittest
    from app import User, Engine

    class TestUserAdd(unittest.TestCase):
        def test_works(self):
            u = User()
            assert u.exists() # anything that evalueates to True

    class TestEngineWork(unittest.TestCase):
        pass
    ```

  - For a **Flask App**
    - `setUp` and `tearDown` methods are special that automatically invoked before and after each test case. This makes every test case run on clean slate. You can have different one in each class, or make a base class and import it in other classes.
    - request functions
      - `response = app.client.get('/', follow_redirects=True)` - use response same as you do in flask app
      - `response = self.client.post('/auth/register', data={some_json}, follow_redirects=True)` - submit a form this way

    - response methods
      - `html = response.get_data(as_text=True)`
      - `assert response.status_code == 200`
      - `assert response.request.path == '/auth/login' # redirected to login`
      - `response.json['token']`

    ```python
    # tests/test_base.py
    import unittest
    from flask import current_app
    from app import create_app, db

    class TestWebApp(unittest.TestCase):
        def setUp(self):
            self.app = create_app()
            self.appctx = self.app.app_context()
            self.appctx.push()
            db.do_something() # you can call any method as well here
            self.do_something() # method in this class that has code to be executed before each test, like register
            self.client = self.app.test_client()

        def tearDown(self):
            db.drop_something() # again execute anything at end of test case
            self.appctx.pop()
            self.app = None
            self.appctx = None
            self.client = None

        def test_app(self):
            assert self.app is not None
            assert current_app == self.app

        def test_home_page_redirect(self):
            response = self.client.get('/', follow_redirects=True)
            slef.do_login() # funciton in this class that logs in to the app can be reused
            assert response.status_code == 200
            assert response.request.path == '/auth/login'
    ```

- **Do s**
  - If a piece of code is difficult to test with test case, consider refactoring it. Eg, some code that is not in funciton and just prints as part of execution can't be called from test case, so make a function for it. Alos, you can wrap any global code in a function and call it. This also makes code **only direct** executable when file is ran, **import doesn't** execute it.

    ```python
    def main():
        all_your_global_code()

    if __name__ == '__main__':
        main()
    ```

- Links
  - [MG' Flask Web App Testing](https://blog.miguelgrinberg.com/post/how-to-write-unit-tests-in-python-part-3-web-applications)
  - [MS's Testing code for Life Game](https://github.com/miguelgrinberg/python-testing/blob/main/life/test_life.py)
  - [Stackoverflow why to use PyTest](https://stackoverflow.com/questions/27954702/unittest-vs-pytest)
  - [Flask Docs - Pure Pytest](https://flask.palletsprojects.com/en/2.2.x/tutorial/tests/)
  - [RealPython - Flask testing](https://realpython.com/python-web-applications-with-flask-part-iii/) has a different package, so differs

## Error Handling

- We can have templates for exceptions and errors so they don't go out to end users.
- Link [RealPython Flask App Part III](https://realpython.com/python-web-applications-with-flask-part-iii/#error-handling)



## Log in Flask

- A standard Python logging component `logger` is available on the Flask object at `app.logger`.
- 404 is autologged by server, so skip.
- request logs are autologged by proxy server, so skip.
- Exceptions, 400 and 500 can be logged to look back in time.

- Setup
  - configure logger as early as possible
  - add path and log configs in `config.py` even before app is created. You can add logging config to any env config class. They are all called before app is created.

```python
import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.logger.info('some log')

# prj/config.py
import logging

class Config:
    logging.basicConfig(level=logging.DEBUG, format='[%(asctime)s] - %(name)s - %(levelname)s - %(module)s -: %(message)s')

# prj/app/models.py
from flask import current_app
current_app.logger.debug('Some message')
```

- Explore [here](https://memgraph.com/blog/graph-web-application#:~:text=Docker%20fanboy%20alert-,1.%20Create%20a%20Flask%20server,-I%20included%20comments)

  ```py
  log = logging.getLogger(__name__)
 
  def init_log():
      logging.basicConfig(level=logging.DEBUG)
      log.info("Logging enabled")
      # Set the log level for werkzeug to WARNING because it will print out too much info otherwise
      logging.getLogger("werkzeug").setLevel(logging.WARNING)
  ```

- Links
  - [FlaskDocs - Config Logger](https://flask.palletsprojects.com/en/2.2.x/logging/#basic-configuration)
  - [MG - Logging to a File Legacy](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-vii-unit-testing-legacy#:~:text=the%20console%20window.-,Logging%20to%20a%20file,-Receiving%20errors%20via)
  - [RealPython - Flask Part III - Logging](https://realpython.com/python-web-applications-with-flask-part-iii/#logging). Eg, shows to Log Errors, keep 7 days history.




## Make the Project Installable

- Makes the project distributable like a library, so people can do `pip install` and use it.
- Deploying is same as installing any other library. like you deploy `mkdocs` by installing it.
- `setup.py` outside `app` is where we can define this.

  ```python
  from setuptools import find_packages, setup

  setup(
      name='your-project-name',
      version='1.0.0',
      packages=find_packages(),
      include_package_data=True,
      install_requires=[
          'flask',
      ],
  )
  ```

- also add `MAINFEST.in` to tell what other files to include in package. Eg, `some.sql` `static` or any other.
- more [here](https://flask.palletsprojects.com/en/2.2.x/tutorial/install/#describe-the-project)
- [RealPython Flask App part III](https://realpython.com/python-web-applications-with-flask-part-iii/#logging)

## Deployment Fundamentals

- WSGI or "Web Server Gateway Interface"
  - is a protocol (calling convention) to forward requests from a web server (Apache or NGINX) to a backend Python web application or framework. Python then builds response which is passed back to the webserver which shares it to the requestor.
  - it sits between Web Server and Python App. `Client -> Webserver -> WSGI -> Python`
  - WSGI containers are Gunicorn, uWSGI. They invoke python callable object, such as a route in flask.
  - WSGI container is **required** to be **installed** in the **project** so that a web server can communicate to a WSGI container which further **communicates** to the **Python** application and provides the response back accordingly.

- Development Web Server
  - most frameworks come with development web server which serves requests. but this needs to be replaced on PROD.


- Links
  - [What is WSGI](https://www.liquidweb.com/kb/what-is-wsgi/)

## Deployment - Windows IIS Server

- `HTTP -> IIS -> ISAPI -> FastCGI -> WSGI -> (Python Flask Application)`

- IIS site will trigger a `wfastcgi.py` script and will use `web.config` file which calls module that has flask app (or creates using app factory).
- WFastCGI is a Py package, and `wfastcgi.py` provides a bridge between IIS and Python using WSGI and FastCGI. It is same as mod_python is for Apache.
- you can impersonate as a user in appPoolIdentity
- you can disable anonymous auth and can keep only windows authenticated access to get remote user in request.

- Links
  - [Detailed deployment process on Medium](https://medium.com/@dpralay07/deploy-a-python-flask-application-in-iis-server-and-run-on-machine-ip-address-ddb81df8edf3)

## Deployment - PythonAnywhere Flask

- WSGI configuration
  - On your Web App Configuration page, open "WSGI configuration file", and ensure you add your project folder to code below.

  ```python
  import sys

  # add your project directory to the sys.path
  project_home = u'/home/username/mysite'
  if project_home not in sys.path:
      sys.path = [project_home] + sys.path

  # import flask app but need to call it "application" for WSGI to work
  from flask_app import app as application  # noqa
  ```

- more [here](https://flask.palletsprojects.com/en/2.2.x/tutorial/deploy/)

## Static Site with Flask-Frozen

- Static site can be generated and hosted on Netlify or GitHub pages.

- link
  - [td.io - Frozen](https://testdriven.io/blog/static-site-flask-and-netlify/)

## Access localhost flask app on Network

- Suppose on an Ubuntu VM a flask app is running on localhost and you want to access it from you host machine that is Mac.

- Run flask app with `app.run(host='0.0.0.0', debug=True)`
- This tells your operating system to listen on all public IPs.
- then access `192.168.10.33:5000` from host machine.

Now that our app is running we can add a database to this app. We will use FlaskSQLAlchemy package for this. Or Pandas.


## Machine Learning Pandas App in Flask

You can use Flask it with Pandas, Matplot and other ML libraries to make it easily usable for end users.

- Import all your libs in flask app that you have used in Jupyter NB.
- Add code and functions to read data and perform tasks.
- Flask routes are executed for each request, so keep data reads outside to read them once.
- `return render_template( 'search.html', data=df_result.to_html(classes='table table-striped table-hover')` - to_html makes html table that can be passed to html page.
- `{{ data|safe }}` - safe makes it as markup and browser renders it.

Reference:

- <https://sarahleejane.github.io/learning/python/2015/08/09/simple-tables-in-webapps-using-flask-and-pandas-with-python.html>


## Charts Graphs Visualization in Flask

- Requirements
  - HTML5 instead of PNG
  - dynamic, shows info on hover
  - interactive, filters modify charts
  - dashboard, filters update multiple charts
  - streaming dataset
  - animation

- Plotly
  - dynamic & interactive charts
  - handle data and build-chart in view function, then send JSON to template, use JSON in JS.

- Plotly Express
  - `import plotly.express as px`
  - `fig = px.bar()` lets build bar
  - `fig.show()` makes PNG

- Plotly Graph Objects
  - `import plotly.graph_objects as go` builds figure objects.
  - has class for object like `go.Bar()`
  - objects need to be added to figure `fig = px.Figure()`

- Bokeh
  - beautiful charts, simple plot to complex dashboard with streaming dataset!
  - dynamic & interactive
  - `bokeh.plotting` has plotting functions
  - `bokeh.models` has data handling functions
  - `bokeh.embed` has component that return HTML with JS ready to embedd, when python `fig` is passed.

- Dash
  - React front-end - yes
  - dashboard - yes
  - HTML in Python - NOooo
  - `from dash import Dash, html, dcc`
    - Dash is app
    - html lets build html components `Div()` H1
    - dcc is Dash Core Components - lets build `Graph() Dropdown()`, graph has figues, from px.

- Flask, Plotly & AJAX
  - Flask app and html template
  - use `json.dumps()` to get fig JSON and send to template
  - use list of `chartJSON[]` for sending multiple charts
  - template can use plotly js to plot chart with the json.
  - js `Plotly.plot('chart',graphs,{});` where `chart` is `id` of `div`
  - to extend, send graphJSON, header, description
  - AJAX
    - `onchange=cb(this.value)` to invoke callback function, that passes value to python and python returns updated chartJSON

- Data Handling
  - mostly libraries use list, which has series from DataFrame
  - px takes in dataframe as `data`

- Altair
  - py library

- Chart.js
  - No Python wrapper
  - is dynamic

- Highchart, google charts, d3.js ?

- anychart
  - can be drawn from JSON, JSON needs to build without python wrapper

- Matplot, ggplot
  - static chart, save fig as png, return file from view_function

- Links
  - [TDS - Web Visualization with Plotly and Flask](https://towardsdatascience.com/web-visualization-with-plotly-and-flask-3660abf9c946)
  - [TSD - Flask plotly AJAX](https://towardsdatascience.com/an-interactive-web-dashboard-with-plotly-and-flask-c365cdec5e3f)
  - [Dash offical](https://dash.plotly.com/layout)



## RestAPI in Flask

What is REST?

- Client and Server are separate
- **Stateless:** No information from a request is stored on client to be used in other requests, eg, no session can be started, if authentication is required, username and password need to be sent with every request.

What is RESTful API:

- There is a resource, eg, tasks
- It has endpoints for CRUD operations
- HTTP methods, GET PUT POST DELETE, are used for these operations.
- Data is provided with these requests in no particular format but usually as:
  - JSON blob in request body, or
  - Query String arguments as portion of URL.


| HTTP Method | URI | Action |
| ---|---|--- |
| GET | <http://[hostname]/todo/api/v1.0/tasks> | Retrieve list of tasks |
| GET | <http://[hostname]/todo/api/v1.0/tasks/[task_id]> | Retrieve a task |
| POST |  <http://[hostname]/todo/api/v1.0/tasks> | Create a new task |
| PUT | <http://[hostname]/todo/api/v1.0/tasks/[task_id]> | Update an existing task |
| DELETE |  <http://[hostname]/todo/api/v1.0/tasks/[task_id]> | Delete a task |

Data of a task can be, JSON blob, as:

```py
{
  'id': 1,
  'title': 'Title of a to do task',
  'description': 'Description of to do task', 
  'done': False
}
```

- This API can be consumed by client side app which can be single page HTML.
- Note, JSON object is defined in python as dict, `jonify` converts and send as JSON Object.

## JWT Authentication in Flask

- JWT Authentication
  - `jwt` python library is used to make a `token` that can be send in every request instead of sending username and password.
  - Token is encoded string which has a valid time and it expires after that time.
  - `ExpiredSignatureError` is raised if you `decode` and expired token string.
  - [ ] how to add remember me.

- how to register?
  - comment `token_authentication` for `create_user`
  - `curl -i -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin"}' http://127.0.0.1:5000/admin`

- CURL Requests
  - Send Username and password to get token
    - `curl -u username:password -i -X GET http://127.0.0.1:5000/login` returns token and duration
  - Send token in header to access protected resources
    - `curl -H "x-access-token: token" -i -X GET http://127.0.0.1:5000/users`
    - `curl -H "x-access-token: token" -i -X GET http://127.0.0.1:5000/users/9d8c738b-3a39-482d-8a17-0c1b755f9a23`
    - `curl -H "x-access-token: token" -i -X GET http://127.0.0.1:5000/api/v1.0/tasks`
    - `curl -H "x-access-token: token" -i -X GET http://127.0.0.1:5000/api/v1.0/tasks/19`
  - [ ] will this be more secure and beneficial?
    - `curl -u username_or_token:password_or_unused -i -X GET http://127.0.0.1:5000/users`

## App - RESTful API in Flask

to be added

## Serving over HTTPS

- generate certificate key using `openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365`
- allow insecure connection to localhost in chrome, paste `chrome://flags/#allow-insecure-localhost`
- <https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https>


## App - Social Blogging App in Flask

- **User Authentication**
  
  - **Password hashing**
    - extensions - `from werkzeug.security import generate_password_hash, check_password_hash` this is tried and tested lib that is safe to use.
    - model - implement `password` as write-only property of `User` class to set `password_hash`
  
  - **Blueprint** - structure it as a sub-module `auth` Blueprint. It has view having login-route

  - **Normal auth**
    - Login - `session['user_id'] = user['id']` once credentials are verified, save `user_id` in `session` dictionary, it makes it available across requests for the session.
      - `g.User` can hold user object. Using Blueprints decorator `@bp.before_app_request` register a function that sets `g.user`. If there is no `user_id` in session, `g.User` will be `None`

        ```python
        @bp.before_app_request
        def load_logged_in_user():
            user_id = session.get('user_id')

            if user_id is None:
                g.user = None
            else:
                g.user = get_db().execute(
                'SELECT * FROM user WHERE id = ?', (user_id,)
                ).fetchone()
        ```

    - Logout - `session.clear()`

    - Login Required Decorator - lets you use `@login_required` on view function so the following code is run before view-route code.

      ```python
      def login_required(view):
          @functools.wraps(view)
          def wrapped_view(**kwargs):
              if g.user is None:
                  return redirect(url_for('auth.login'))

              return view(**kwargs)

          return wrapped_view
      ```

  - **Flask-login** is ext having functions and decorators that make authentication easy.
    - model - few required class members can either be declared in `User` class or can be importe from `UserMixin` class of Flask-login.
    - initialize and instantiate extension with required conf

      ```python
      from flask_login import LoginManager
      
      login_manager = LoginManager()
      login_manager.login_view = 'auth.login'
      
      def create_app(config_name):
        # ...
        login_manager.init_app(app)
        # ...
      ```

    - model implement user_loader in `User` class

      ```python
      from . import login_manager

      @login_manager.user_loader
      def load_user(user_id):
        return User.query.get(int(user_id))
      ```

    - `login_required` decorator lets protect route.
    - Flask-Login’s `login_user()` logs user in once verified. It setts user session.
    - `logout_user()` logs user out.
  
  - **Register User**
    - build a form class in new `auth/forms.py`, add unique email and username validator using `validate_` function
    - build a template that uses form `templates/auth/register.html`
    - build a register route in `auth/views.py`
      - get - render form
      - post - validate and add user to db
  
  - **account confirmations**
    - use expiry token to validate email url.
    - model - add token generation and validation function.
    - view - send email on registration
    - view - `@auth.route('/confirm/<token>')`
  
  - **Links**
    - [RealPython Flask-Login](https://realpython.com/using-flask-login-for-user-management-with-flask/)

- **Roles and Permissions**
  - database implementation
    - add `role` table
    - add `permission` column to role table as integer
      - multiple permission can be binary numbers, 1,2,4,8,16
      - add them and subtract them to get unique number as total permission of user. 2+4=6
      - do bit wise and operation to match permission. 6&2=2, 6&4=4
  - add decorator function to make it easy to protect route to access only if permission is checked.

- **User Profiles**

## App - Mega Tutorial by MG

_This is understanding of a tutorial by Miguel Grinberg, we are learning to create a micro-blogging site using flask and other dependencies._


- [ ] UserMixin?
- [ ] Why we pass Classes as param to Class?

## Elastic Search in Flask

- You can install elastic search by `brew install elasticsearch` on mac.
- Access `http://localhost:9200` to view service JSON output.
- Also, install in python `pip install elasticsearch`
- To have launched start elasticsearch now and restart at login: `brew services start elasticsearch`
- Or, if you don't want/need a background service you can just run: `elasticsearch`

## Advanced Flask

- Request Processing
  - Following diagram show the cycle of request-response

    ```mermaid
    graph LR
    Request -->|GET\n1| Web_Server
    Web_Server --> WSGI_Server
    WSGI_Server -->|Spawns\n2| Flask_App
    Flask_App -->|Pushes\n3| Application_Context
    Flask_App -->|Pushes| Request_Context
    Application_Context -->|current_app\n4| View_Function
    Request_Context -->|request| View_Function
    subgraph Global
    Application_Context
    Request_Context
    end
    subgraph Worker
    Flask_App --> View_Function
    end
    View_Function -->|5| Response
    ```

  - Step 1 - Handle request
    - Web_server - Apache & NginX
    - WSGI_Server - Gunicorn, uWSGI, mod_wsgi
  - Step 2 - Spawn a **Worker**
    - it can be a thread, process or coroutine.
    - **one worker** handles **one request** at a time.
    - hence for multiple concurrent request multiple worker can be spawned.
  - Step 3 - pushes context
    - worker pushes context to global-stack as `context-local` which uses `thread-local` data, which means, a worker, which is one thread, has data specific to a thread and can be only accessed by worker that created it. So its global-memory but worker-unique data as `global LocalStack()`.
  - Step 4 - local context, proxy
    - this context data is basically an object, stored as stack data structure. To make it available in view-function it is not passed as a parameter, neither is imported as a global object, rather it is made available using proxy
  - Step 5 - Clean Up
    - req and app context are removed from stack

- Threading


- Link
  - [td.io - Request processing](https://testdriven.io/blog/flask-contexts-advanced/#:~:text=The%20Flask%20app%20generates%20a,server%2C%20and%20a%20web%20application.)




## Links

- [Official Flask Blogging Tutorial - Flaskr](https://flask.palletsprojects.com/en/latest/tutorial/)
  - app factory, blueprint
  - Plane DB operations, no ORM SQLAlchemy
- [RealPython Flask Tutorial - Part I](https://realpython.com/python-web-applications-with-flask-part-i/)
- [Flask Mega Tutorial I - Miguel Grinberg](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [Flask Mega Tutorial I Legacy - Miguel Grinberg](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world-legacy)
  - no blueprint.




