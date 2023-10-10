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
  - flask --app has app command
  - flask run has --host or -h, --port or -p and --no-debug

```sh
set FLASK_ENV=production
set FLASK_DEBUG=0
cd repo\prj1
venv\Scripts\activate
flask --app app:create_app('uat') run --no-debug -h 0.0.0.0 -p 5002
```



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
  - Code is logic with data. Data is variables or constants or objects. This data can be configurations, input data or data from file/database. In flask, "Context" is used to keep track of this data.
  - It let certain objects to be globally accessible, but are not global variable. They are globally accessible to only one thread. There can be multiple threads serving multiple requests from multiple client.
  - Context is simply data that is specific to something. Eg
    - **App-context** is specific to app, like its mail server, its database location, or other configurations. Keeps track of application-level data. Objects: `current_app`, `g`.
    - **Request-context** is specific to request, like its browser, its client, its form data, its headers, all that is request-level. Objects: `request`, `session`.
  - this data is stored in object, in attribute such as `config`
  - this data is used by extensions in flask, hence they do not run if context is not available.
  - context is automatically made available once app is initialized.
  - context can be made explicitly available by calling `with app.app_context():`
  
- **Request Handling** - How flask handles a request?
  - when there is request, web server activates a thread that initializes app and this app context is pushed with data that is available globally, similarly request context is also pushed.

    ```mermaid
    graph LR;
    Web_Browser --> request --> web_server --> Flask_app_instance --> route --> function_to_execute
    ```

- **Flask variables for Request Handling**
  - `current_app` variable in Application context, has info of active application.
  - **Imp**: `current_app` is app-context, but is **only available when serving a request**, that is, in a route function only. It can be used in any module but the function should be called when serving a request.
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

**WTForms** - **Object Oriented** Form building. It supports forms validation, CSRF protection, internationalization (I18N), showing errors, extending forms, rendering form, file upload, reCAPTCHA and more for any Python framework, its generic. [WTForms](http://wtforms.simplecodes.com/).

It also works well with other extensions like Flask-Bootstrap and Flask-SQLAlchemy to do common tasks in one line.

**Installation**

```sh
pip install -U Flask-WTF
```

**Instantiation**

Global CSRF protection

```sh
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect()

def create_app():
    ...
    csrf.init_app(app)
    ...
```

### Build a Form

Make a class to build form, members are form fields. See [quick-start flask-wtf](https://flask-wtf.readthedocs.io/en/1.2.x/quickstart/). Form Class can be build in main `app.py` or in module `forms.py` with fields and validate functions.

```python
from flask_wtf import FlaskForm

from wtforms import StringField, SubmitField, SelectField, DateField, BooleanField

from wtforms.validators import DataRequired, Length, Optional

from wtforms.widgets import DateTimeLocalInput

class RegistrationForm(FlaskForm):
    username = StringField(
                    'Username', 
                    validators=[DataRequired(), Length(min=4, max=25)]
                )
        username = StringField('Username', [validators.Length(max=40)])
    level    = IntegerField('User Level', [validators.NumberRange(min=0, max=10)])
        birthday  = DateTimeField('Your Birthday', format='%m/%d/%y')
    signature = TextAreaField('Forum Signature')
    accept_rules = BooleanField('I accept the site rules', [validators.InputRequired()])

    # Select
    period = SelectField('Period', [DataRequired()],
                        choices=[('a','Apple'), ('b','Ball')],
                        prepend_blank=False))

    # Select from Database
    gym_choices = [(gym.id, gym.name) for gym in Gym.get_gyms()]
    gym_id = SelectField('Select Gym', choices=gym_choices)

    # Date
    start_date = DateField('Start Date', format='%Y-%m-%d')
    
    in_at = DateTimeField('In Date-Time',
                      validators=[
                          DataRequired()
                          ],
                      format="%Y-%m-%dT%H:%M",
                      default=datetime.now,
                      widget=DateTimeLocalInput()
                      )

    # Submit
    submit = SubmitField('Submit')

    def validate_in_at(form, field):
    """max 10 minutes from now can be in time"""
    if field.data > datetime.now() + timedelta(minutes=10):
        raise ValidationError('Your in time cannot be in future!')
```

**Data Types Fields** in `wtforms` that can be used to build form fields. [more on wtforms fields](https://wtforms.readthedocs.io/en/3.0.x/fields/#basic-fields)

DataType        | Details
-|-
StringField     | One line string
BooleanField    | check box
DateField       | date only
DateTimeField   | date and time
DecimalField    | decimal numbers
IntegerField    | whole numbers
SelectField     | dropdown picklist
RadioField      | radio buttons
SubmitField     | submit button
HiddenField     | not visible
EmailField      | Email type
PasswordField   | Password type dots
TextAreaField   | multi-line

**Validators** that can be used for each field. Each field accepts list of validators in `validators=` argument. [More on wtform validations](https://wtforms.readthedocs.io/en/3.0.x/validators/#built-in-validators)

```py
from wtforms.validators import DataRequired
```

Validator           | Details
-|-
DataRequired() | Required Field
NumberRange(min=0, max=10) | For IntegerField
Optional() | Lets continue form submission, used with DateField


**Custom Validation** lets you define your own validation method.  In the form class one can define a method `validate_{fieldname}` that validates the corresponding field. This method takes as arguments `field` and `form` so I can refer to the startdate field as `form.startdate_field`.

```py
class SignupForm(Form):
    age = IntegerField('Age')
    startdate_field = DateField('Start Date', format='%Y-%m-%d')
    enddate_field = DateField('End Date', format='%Y-%m-%d')

    def validate_age(form, field):
        if field.data < 13:
            raise ValidationError("We're sorry, you must be 13 or older to register")
    
    def validate_enddate_field(form, field):
        if field.data < form.startdate_field.data:
            raise ValidationError("End date must not be earlier than start date.")
```

**Widgets**

Widgets are Classes that bring a specific selector UI for input field. Eg, Date-Picker, Color-Picker etc. [WTForm Widgets](https://wtforms.readthedocs.io/en/3.0.x/widgets/?highlight=widget#widgets) and [HTML5 Input Types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) for more.


```py
from wtforms.widgets import DateTimeLocalInput
```

Widget           | Details
-|-
DateTimeLocalInput | Show datetime-local input type. Lets user input date and time.

For extra `input` params, you can use render_kw argument to send.

```py
in_at = DateTimeField('In Date-Time',
                      format="%Y-%m-%dT%H:%M",
                      widget=DateTimeLocalInput(),
                      render_kw={"step": "300"} 
                     )
```

--------------------------------------------------

- **Flask-WTF** integration of Flask and WTForms
  - Includes CSRF, file upload, and reCAPTCHA. You mostly have to use formats of WTForms but write less as few things are done automatically that are related to Flask patter.
  - Form fields are Class variables with different field type
  - validator functions can help validate, like `Email()`.
  - Link to [Flask-WTF](http://pythonhosted.org/Flask-WTF/)
  
  - **Validation** controller

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

**Editing Resource**

You can use same form to edit or add a resource. To populate the form with what is saved in database is one-line:

```py
task = Task.query.get(id)
form = taskForm(obj=task)   # one line form fill
```

On getting edited response back from client, again one-line to update the resource object:

```py
if form.validate_on_submit():
    form.populate_obj(task)      # one-line object update
    db.session.commit()
```

When combined, it looks like:

```py
@app.route('task/<int:id>/edit', methods=['GET', 'POST'])
def edit(id):
    task = Task.query.get(id)
    form = TaskForm(obj=task)

    if form.validate_on_submit():
        form.populate_obj(task)
        db.session.commit()
        return redirect(url_for('task.all'))

    return render_template('task/form.html', form=form)
```

**Rendering View**

You can use same view (html template) to add or edit resource. This template recieves `form` as object and it has all the members to show label, button, inputs etc.

Here is code to show form fileds one ny one

```jinja
<form method="POST">
{{ form.hidden_tag() }}
{{ form.name.label }} {{ form.name() }}
{{ form.submit() }}
</form>
```

Or, use `flask-bootstrap` with `flask-wtf` to magically display form with one-line

```jinja
{% import "bootstrap/wtf.html" as wtf %}
{{ wtf.quick_form(form) }} <!-- one line -->
```

**Deleting Resource**

Delete can be done via POST request, this needs form to be built.

Add delete route

```py
@task.route('/<int:id>', methods=['DELETE', 'POST'])
def delete(id):
    task = Task.query.get(id)
    task.active = False
    db.session.commit()
    flash('Task deactivated!', 'danger')
    return redirect(url_for('task.all'))
```

Add delete button where you list resource, the code below will only add a button with a confirm check:

```jinja
<form action="{{ url_for('task.delete', id=task.id) }}" method="POST">
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
    <button type="submit" class="btn btn-outline-danger" 
      onclick="return confirm('Are you sure?')" 
    >
      Delete
    </button>
</form>
```

**Adding CSRF to whole app**

You may also need to add CSRF in app, in `app.py` or `__init__.py`, add

```py
from flask_wtf.csrf import CSRFProtect
...
csrf = CSRFProtect()
...
csrf.init_app(app)
```

## Databases in Flask

DB_package or ORM - Python has packages for most database engines like MySQL, Postgres, SQLite, MongoDb etc. If not, you can use ORM that lets you use Python objects to do SQL operations, SQLAlchemy or MongoEngine are such packages.

[Flask-SQLAlchemy](http://pythonhosted.org/Flask-SQLAlchemy/) is wrapper on [SQLAlchemy](http://www.sqlalchemy.org/). You have to use SQLAlchemy pattern but it helps by making things tied to Flask way like session of SQLAlchemy is tied to web-request of flask.
  - It is designed for Flask and adds support for SQLAlchemy to your application. So basically you use all knowledge and concept of SQLAlchemy but tied up with flask. Remember, SQL Alchemy can be used withour flask from command line or any other python program.
  - You can define table as a class, called model, with member variables as column names.
  SQLAlchemy documentation is to be reffered, just add `db` before commands. so 

    ```py
    session.add(user)       # SQLAlchemy
    db.session.add(user)    # Flask-SQLAlchemy
    ```

**Installation** 

```sh
python -m pip install flask-sqlalchemy
```


**Initiation**

create `SQLAlchemy()` class object and pass `app` for context. In `app.py`

```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app) # Object for all ops
```

### Define Tables/Models

Conventions:

- in database, table name is plural - users, books etc
- in python, model class name is singular - User, Book etc

Tables can be defined in OOP pattern as a class called "model". Model is a Class which represents application entities, like, User, Task, Author, Book etc. You can define, table, its columns, data types, keys and relationships. The class has attributes that represent column name, eg `name = db.Column(db.String(64)`.

In `model.py` 

```py
from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), unique=True)
    admin = db.Column(db.Boolean)
    created_on = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow(),
                            onupdate=datetime.utcnow())
```

You can define column as following **Data Types**:

DataType | Detail
-|-
Integer | an integer
String(size) | a string with a maximum length (optional in some databases, e.g. PostgreSQL)
Text | some longer unicode text
DateTime | date and time expressed as Python datetime object.
Float | stores floating point values
Boolean | stores a boolean value

You can define **properties** like:

Prop | Value | Detail
-|-|-
primary_key | True | makes primary key
unique | True | ensures unique
nullable | True/False | allows NULLs or not
default | any value of same data-type | provides default value that is inserted if value provided is NONE. The default value is provided in INSERT query.
onupdate | any value of same data-type | changes on row update
db.ForeignKey('some.id') | pass table_name.column_name |  Adds relationship
server_default | any value of same data-type | It adds to DDL, create table statement, [more](https://docs.sqlalchemy.org/en/20/core/defaults.html#server-invoked-ddl-explicit-default-expressions)


### Create Tables

Once you have created a db model in flask app, you can create db and tables using following steps, open python shell:

```py
from app import db
db.create_all() # creates all tables from model class, if they don't exist
```

**Advanced**, if you are using application factory, then you need app_context to work with database object:

```py
from app import db, create_app

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.create_all()
```

Now you can check SQL for tables created. You can do:

```sh
sqlite3 filename.db
.tables
```

If you have done any _changes_ to the model, like adding a column, you need to again recreate tables, but command above doesn't recreate existing tabke, you need to drop them and recreate, in python shell

```py
db.drop_all()
db.create_all()
```

[Migrations](#migrations-in-database) is a better way to do this without dropping created data and keeping version control to go back is, more on this later.


### Relationships in Database

You can define relationship in OOPs way as attribute of class. Beauty is that the tables are linked both ways. In `model.py`.

Example of **One to Many** relationship. User has multiple posts but post has only one author. `User 1-m Post`:

```py
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    
    # relationships
    posts = db.relationship('Post',
                backref=db.backref('author'),
                lazy=False,
                order_by="desc(Post.created_at)")
```

Here you **note**, the `ForeignKey()` relation has to be defined in the table that has many records but `db.relationship(.. ,backref=)` can be in either of the two tables, so following statements are same:

```py
# in Post table, this tells Post has 1 Author and that has MANY posts
author = db.relationship('User', backref=db.backref('posts'))

# OR in User table, this tells User has MANY Posts, and that has 1 author
    posts = db.relationship('Post', backref=db.backref('author'))

```

Here, `backref` adds a back-reference to other model. `lazy=False` tells SQLAlchemy to load the relationship in the same query as the parent using a JOIN statement.

Here, `order_by` lets you specify and order and returns and ordered `InstrumentList`.

Example of **multiple One to Many** relation between tables. Lets say, User has many memberships and has many membership approvals. But Membership has only one User and one Approver. Also, both member and approver are user, so two relationships. Here we have to include, `foreign_keys=[]` argument to relationship to define which foreign-key it is reffering to and avoid ambiguity.

```py
class User(db.Model):
    ...
    # One to Many relationships
    memberships = db.relationship(Membership, backref='user', foreign_keys=[Membership.user_id])
    memberships_approved = db.relationship(Membership, backref='approver', foreign_keys=[Membership.approved_by])

class Membership(db.Model):
    ...
    # Many to One relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    approved_by = db.Column(db.Integer, db.ForeignKey('users.id'))
```

Example, **One to One** relationship, like User has a Profile but only one which can have extra user details like height, weight etc. You can pass `uselist=False` to `relationship()`.

```py
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    height = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    
    # relationships
    profile = db.relationship('Profile', backref=db.backref('user'), uselist=False)
```

Example, **Many-to-Many Relationships** you will need to define a helper table. Say, Post has multiple Tags and Tags have multiple Posts

```py
# this is table
post_tag_m2m = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tags = db.relationship('Tag', secondary=post_tag_m2m, lazy='subquery',
        backref=db.backref('posts', lazy=True))

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
```

Link: [Models - FlaskSqlAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/)

### Insert or Create

Create an Object of Class to build a new row. Usually in a route in `views.py` or in python shell:

```py
user = User()

user.username = 'john'
user.role = 'admin'

db.session.add(user)
db.session.commit()
```

Here, we create a new object. Initialize it's attributes. Finally add it to be saved. Lastly, commit it to datebase, this where `INSERT` is performed.

To use INSERTed object for another operation, `id` is added to object after `commit()` and is made available for use.

### Read or Select or Query

Each model has `query` object is available. It has to be chained with _filter-options_ and/or _executors_ that build a SQL Query statement.

**Filter-Options** - They are added to choose records. Eg, `filter()`, `filter_by()`, `limit()`, `offset()`, `order_by()`, `group_by()`

**Executors** - they are at end of chained methods and finally execute the query to get result set. Eg, `all()`, `first()`, `first_or_404()`, `get()`, `get_or_404()`, `count()`, `paginate()`.

**Imp**, when refering column of a Models, `.c` is not required. When refering a col from table, like many2many join table, helper table, then use `.c` collection of columns, eg, `Post.query.join(followers, (followers.c.followed_id == Post.user_id))`.

Links:

- [operators, is_()](https://docs.sqlalchemy.org/en/20/core/operators.html)
- [select ORM, join where](https://docs.sqlalchemy.org/en/20/orm/queryguide/select.html#selecting-orm-entities-and-attributes)
- [models - flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/queries/#)
- [pagination - flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/pagination/)

Examples:

```py
# Get list of objects
db.session.scalars(db.select(User).order_by(User.id)).all()

# Complex Where with Join

db.session.scalars(
    db.select(Gym)
    .join(Membership)
    .where(
        (Membership.user_id == 3) &
        (Gym.active) &                          # Boolean
        (~Gym.closed) &                         # Boolean Reverse
        (Membership.approved_by.is_not(None))   # NOT NULL
    )
).all()


# Get ScalarResult, not scriptable, but works with for
user = db.session.execute(db.select(User).filter_by(username=username)).scalar_one()

users = db.session.execute(db.select(User).order_by(User.username)).scalars()

users = db.session.execute(db.select(User).order_by(User.username)).scalars()

u = db.session.get(User, 4)

u = db.session.execute(db.select(User).filter_by(name="sandy")).scalar_one()

u = session.execute(db.select(User.fullname).where(User.id == 2)).scalar_one()

# view queries
user = db.get_or_404(User, id)

user = db.one_or_404(db.select(User).filter_by(username=username))

# 404 with message for abort
user = db.one_or_404(
    db.select(User).filter_by(username=username),
    description=f"No user named '{username}'."
)

# Pagination
users = db.paginate(db.select(User).order_by(User.join_date))
return render_template("user/list.html", users=users)

# ORM Queries
db.select(user_table).where(user_table.c.name == "spongebob")

# JOINs
db.select(user_table.c.name, address_table.c.email_address).join(address_table)

db.select(address_table.c.email_address)
  .select_from(user_table)
  .join(address_table, user_table.c.id == address_table.c.user_id)

# outer join
print(select(user_table).join(address_table, isouter=True))
print(select(user_table).join(address_table, full=True))

# order group having
db.select(User.name, func.count(Address.id).label("count"))
        .join(Address)
        .group_by(User.name)
        .having(func.count(Address.id) > 1)

select(Address.user_id, func.count(Address.id).label("num_addresses"))
    .group_by("user_id")
    .order_by("user_id", desc("num_addresses")
```


Examples, **OLD and Legacy**, uses `Model.query`, Prefer using `db.session.execute(db.select(...))` instead.:

```py
# select by primary key, ID
u = User.query.get(1)   # 1 is id in table
u.name                  # prints name
posts = u.posts.all()   # if user has 1-m relationship with Post table

# SELECT
users = User.query.all()

# select WHERE
admins = User.query.filter_by(role='admin').all()

# select TOP 1 where
u = User.query.filter_by(username='johndoe').first()
# u is None if username does not exist

# Select TOP n or LIMIT
User.query.limit(10).all()

# WHERE column ENDSWITH
users = User.query.filter(User.email.endswith('@example.com')).all()

# ORDER BY
users = User.query.order_by(User.username).all()

# Get SQL query Statement, see there is no executor
sql_stmt = str(User.query.filter_by(role='admin'))

# 404 errors, this will raise 404 errors instead of returning None
@app.route('/user/<username>')
def show_user(username):
    user = User.query.filter_by(username=username).first_or_404()
    p = Post.query.get_or_404(1)
    return render_template('show_user.html', user=user)

# Pagination
page = User.query.order_by(User.join_date).paginate()

# Joins

Post.query.join(...).filter(...).order_by(...)

followed = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)
```

For pagination, during a request, this will take page and per_page arguments from the query string request.args. Pass max_per_page to prevent users from requesting too many results on a single page. If not given, the default values will be page 1 with 20 items per page.

Link: [Quickstart - flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/)

### Update

Load the object, modify its attributes, then do `add` and `commit`.

```py
u = User.query.get(1)   # 1 is id in table
u.role = 'staff'        # modified attribute

db.session.add(user)    # ready to save
db.session.commit()     # UPDATE is performed
```

### Delete

```py
u = User.query.get(1)   # 1 is id in table
db.session.delete(u)
db.session.commit()     # DELETE is performed
```

### RAW SQL

Give your SQL statements

- `db.session.execute(SQL)` returns cursor
- `db.session.execute(SQL).all()` - returns List result set

**Shell Operations**

CRUD from Flask Shell

- `flask --app hello.py shell` start shell with *app_context*, python shell will not have that.
- `db.create_all()` creates SQLite file.

**Extras - Database Schema**

For MS-SQL you may need to use schema name along with table and database name. It can be defined in configuration and then used in models. **db.metadatas** - You can add schema of table in model using:
```py
class User:
    __table_args__ = {'schema': db.metadatas['SCHEMA']}
```

and define schema in metadata when initializing `db` object in `__init__.py` of app using:

```py
db.metadatas['SCHEMA'] = app.config.get("SCHEMA") or "[dbo]"
```

You can also add more metadata here, like database name.

**Extras - Py ORM Model from SQL**

If you have a existing tables in database and want o Generate SQLAlchemy class model from database table - `sqlacodegen mssql+pyodbc://<servername>\<schema>/<database>/<table_name>?driver=SQL+Server --outfile db.py`

## Migrations in Database

- **Why?** - When DB is handled using ORM, all changes to DB is done via ORM. If you have to add a column it is added by ORM so it will delete the table and create new but to prevent data loss in table it will create a migration script to create and populate again.

- **What?** - `Flask-Migrate` is wrapper on `Alembic` a SQLAlchemy migration framework. It generates Py script to keep the database schema updated with the models defined. It help upgrade and roll back the schemas.

- **Installation** - `pip install flask-migrate`

**Initiation**

```sh
from flask_migrate import Migrate
migrate = Migrate(app, db)
flask --app hello.py db init
```

This generates migration directory, script is generated

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

- Email is only sent when FLASK_ENV = production

- **Sending errors via Email**
  - Errors can be sent via email using Logs.

- **Dev - send emails to console**
  - `MAIL_SERVER = 'localhost'`
  - `MAIL_PORT = 8025`
  - `python -m smtpd -n -c DebuggingServer localhost:8025`

  - Links
    - [Flask docs - Email errors to admin](https://flask.palletsprojects.com/en/2.2.x/logging/#email-errors-to-admins)
    - [MG's microblog - email errors](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-vii-unit-testing-legacy#:~:text=of%20the%20application.-,Sending%20errors%20via%20email,-To%20address%20our)
    - [Pythonbasics - Flask Mail](https://pythonbasics.org/flask-mail/)


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
  - `pytest` or `unittest` to test
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

- **UnitTest** - test small units
  - use py native `import unittest`
  - in `tests/test_basics.py`
    - import modules you need for test, `create_app`, `db`
    - import modules you want to test, `User`, `current_app`
    - define class `class BasicsTestCase(unittest.TestCase):`
      - build functions
        - `setUp()` runs before each test function, builds env for testing
        - `tearDown()` runs after each test function, removes things from env
        - `test_somecase()` these functions run as test.
          - `assertTrue` Ok if True
          - `assertFalse` Ok if False
          - `with self.assertRaises(AttributeError):` statement that raise error.
  - tests can be written in separate py files (modules) and the folder `tests` can have `__init__.py` as blank to make it a pkg
  - `python -m unittest` discovers and runs all tests.
  - to run specific test class `unittest mypkg.tests.test_module.TestClass`
  - to run specific method `unittest mypkg.tests.test_module.TestClass -k test_method`

- **Unittest vs PyTest**
  - Unittest is universally accepted and is built in Python standard library
  - PyTest has lot of features and we need to write less
  - Unitest needs classes & methods. Pytest only needs methods.d
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
      from parameterized import parameterized

      ...

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


- **Report - Coverage**
  - `coverage run -m pytest` runs tests and measures coverage
  - `coverage run -m unittest` runs tests using unittest and measures coverage
  - `coverage report` shows coverage report on CLI
  - `coverage html` builds dir for detailed report
    - `htmlcov/index.html` has detailed report.
    - shows code covered and not covered.
  - To exempt a code block from coverage, add `# pragma: no cover` after code block. Make this a tough decision to skip code from testing.


  - more [here](https://flask.palletsprojects.com/en/2.2.x/tutorial/tests/)

### Manual Testing

- Basic testing can be done using flask shell and executing functions `flask --app flasky.py shell`
- do things similar to as you do in wrinting code, like import module, create objects, call functions etc.
- use `current_app` to use `app_context`, or
- `with app.app_context():` when using factory
- What you test in shell should be automated by making test cases.

A practical way of doing manual tests is using interactive coding and running it on python shell. You can write code in editor or shell and keep executing it line by line to see outputs as you go. Once you are happy with the code, you can put them in test cases. Below is an example that shows how to get started.

```py
from flask import current_app
from app import create_app, db

app = create_app('default')  # testing
app.config['WTF_CSRF_ENABLED'] = False  # no CSRF during tests
app_context = app.app_context()
app_context.push()
client = app.test_client()

import app.db_conn as db_conn
import app.sql_snippets as sql_snippets
```

The code above builds basic app working with the configs and imports. It makes `client` available which can be used to interact with the flask routes. It also makes modules available which can be used for functionalities. More on how to use it below.

### Writing Tests

**Folder Structure** The below tree shows how to organise test package and modules.

```sh
├── requirements.txt          # on this level, project requirements
├── tests                     # root folder for tests, this is outside app
│   ├── conftest.py           # define fixtures (only in pytest)
│   ├── assets                # keep files here to check file upload
│   ├── functional            # tests functionality, usually routes
│   │   ├── __init__.py
│   │   ├── test_books.py
│   │   └── test_users.py
│   └── unit                  # tests units, usually models
│       ├── __init__.py
│       └── test_models.py
└── venv
```

**Philosophy** - Use _GIVEN.. WHEN.. THEN.._ ideology when writing test cases. So your function for test can start as, in `tests/unit/test_models.py`:

```py
from project.models import User

def test_new_user():
    """
    GIVEN a User model
    WHEN a new User is created
    THEN check the email, hashed_password, and role fields are defined correctly
    """
    user = User('johndoe@gmail.com', 'j0hnD0e')
    assert user.email == 'johndoe@gmail.com'
    assert user.hashed_password != 'j0hnD0e'
    assert user.role == 'user'
```

A common practice is to use the GIVEN-WHEN-THEN structure:

- GIVEN - what are the initial conditions for the test?
- WHEN - what is occurring that needs to be tested?
- THEN - what is the expected response?

**Testing Web App**

Web app testing needs `client` and client needs `app_context`. They are used in test cases. So as a minimum, you need three function in a `Class` to get started. So in `tests/functional/test_basic.py` add:

```py
import unittest
from flask import current_app
from app import create_app, db
import app.db_conn as db_conn

class BasicTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')              # testing
        self.app.config['WTF_CSRF_ENABLED'] = False   # no CSRF during tests
        self.app_context = self.app.app_context()
        self.app_context.push()
        db_conn.init_db()                             # destroys and builds database
        self.client = self.app.test_client()

    def tearDown(self):
        self.app_context.pop()
        self.app = None
        self.app_context = None
        self.client = None

    def test_app_exists(self):
        """Tests the hello from __init__.py"""
        assert self.app is not None
        assert current_app == self.app
        response = self.client.get('/hello')
        html = response.get_data(as_text=True)
        assert 'Hello, World!' in html
```

You can add more functions to this calls. Each of theses functions will be new test-cases and the `setUp` and `tearDown` methods will run before and after each of them.

**Flow**: You can write a SQL query, get the results in variable. Use the variables to send request to client. Very response in HTML with other variables from SQL query. Eg, query user details and get `{id: 1, name: 'John'}`. The request `user/1` and `assert f'{name}' in html`. Basically, values in DB should match in HTML and values you POST as HTTP request should appear in DB. Access restrictions on routes should work as expected. Redirects should work as expected. User is able to do all actions required.

**Imp**: Please note, `db_conn.init_db()` this will run for all `test_*()` methods in the class. Do this only if required.

**Tip:**: Write what you expect users to do and don't. Then code test cases. You can use `print` in test cases to debug steps. You can use manual-interactive-testing to help write test cases.

**Note**: Tests are executed in **alphabetical** order within a class. So ensure you do, `test_a_upload()` then `test_b_check()`

**Test File Upload**

You can test a page where user upload a file, and then match that result back with database update. In `tests/functional/test_admin.py`

```py
# ... prev imports

from werkzeug.datastructures import FileStorage

class AdminTestCase(unittest.TestCase):

    # ... set up and teardown

    def test_admin_upload(self):
        """admin can upload csv"""
        self.login()

        # upload file
        csv_file = FileStorage(
            stream=open(r"tests/assets/sample.csv", "rb"),
            filename="sample.csv",
            content_type="text/csv"
        )
        response = self.client.post(
            "admin/upload",
            data={
                "csv_file": csv_file,
            },
            content_type="multipart/form-data",
            follow_redirects = True
        )
        assert response.status_code == 200
        html = response.get_data(as_text=True)
        assert 'Load successful!' in html

        # match flow count
        sql = f"""
            select count(*) as flows
            from {self.app.config.get("DATABASE")}.{self.app.config.get("SCHEMA")}.[my_table]
            """
        res = app.db_conn.get_db().execute(sql)
        rows = res.fetchone()
        rows_count = rows[0]
        assert f'{rows_count} records loaded' in html
```

**Test Code Structure**

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
  - [Codethechange Stanford - Guides Guide_flask_unit_testing](https://codethechange.stanford.edu/guides/guide_flask_unit_testing.html)

## Error Handling

- **Try.. Except..**
  - You can use `try except finally` block to handle errors that you think might occur. With requests, it is **best** to handle errors at **last step** , that is before making the response, because, if at any previous step an error has occured it will bubble up. In another scenario, use `try.. except` at the step where you have another option to do in case of error. Eg, handle error in view when you make a db call that is last function before returning response. Do not handle it in model or db connections unless you have another database to fall over to or another table to ping.

- **Email / Log error**
  - Error can be emailed to admin automatically.

- **Error Templates**
  - You can have templates for exceptions and errors so they don't go out to end users.
  - These templates only work, when `FLASK_ENV=production` and `FLASK_DEBUG=0` in your environment.

    ```py
    # blueprint handler
    @bp.app_errorhandler(404)
    def internal_error(error):
        return render_template('errors/404.html'), 404
    
    # app handler
    @app.errorhandler(500)
    def internal_error(error):
        return render_template('errors/500.html'), 500
    ```

- Links
  - [RealPython Flask App Part III](https://realpython.com/python-web-applications-with-flask-part-iii/#error-handling)



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

**Links**

- [FlaskDocs - Config Logger](https://flask.palletsprojects.com/en/2.2.x/logging/#basic-configuration)
- [MG - Logging to a File Legacy](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-vii-unit-testing-legacy#:~:text=the%20console%20window.-,Logging%20to%20a%20file,-Receiving%20errors%20via)
- [RealPython - Flask Part III - Logging](https://realpython.com/python-web-applications-with-flask-part-iii/#logging). Eg, shows to Log Errors, keep 7 days history.



## CLI in Flask

_how to build CLI commands in flask_

**Test - add a CLI command to run tests**

You can build a CLI command to run  tests automatically. Add following code to files where you build app, usually `app/__init__.py`

```py title="CLI command for running tests"
@app.cli.command()
def test():
    """Run the unit tests."""       # help msg on cli
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)
```

To run this CLI command do following and it will run all the rest cases.

```sh
flask --app flasky.py test
```


## Security Flaws Checks

You can use `bandit` package to check security flaws in app. It scans code and lets you know any possible security flaw.

**Install and Run**

```sh
# install the package
python -m pip install bandit

# run on the app module
bandit -r app
```

The second command above, runs the checks on the whole app and lists the issues by severity and confidance.

**Links**

- [Realpython - Python Testing](https://realpython.com/python-testing/#testing-for-security-flaws-in-your-application)


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
| GET | <http://hostname/todo/api/v1.0/tasks> | Retrieve list of tasks |
| GET | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Retrieve a task |
| POST |  <http://hostname/todo/api/v1.0/tasks> | Create a new task |
| PUT | <http://hostname/todo/api/v1.0/tasks/[task_id]> | Update an existing task |
| DELETE |  <http://hostname/todo/api/v1.0/tasks/[task_id]> | Delete a task |

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

## Flask Snippets

**URL Redirect to previous**

```py
def redirect_url(default='index'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)

# Use it in in the view
def some_view():
    # some action
    return redirect(redirect_url())
```

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

