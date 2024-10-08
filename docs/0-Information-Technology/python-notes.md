---
layout: post
description: Python Conda PIPs Venv RegEx R
date: 2021-05-05
---

# Python

*all learnings here, keep one file for easier updates*

## Python Interpreters

- there may be many python version and interpreter installed on your machine. eg, `/bin/python3` or `~/anaconda/bin/python`
- **identify current** the default, `which python`
- **find all** installed binaries, `locate "bin/python"` - this lists all the binaries including venvs.
- to **set** anaconda python as default python, add following to `~/.bashrc`
  - `export PATH="/home/username/anaconda3/bin:$PATH"`
  - then restart terminal or do `source ~/.bashrc`
  - check with `which python`, should be using anaconda.

## Virtual Environments

- **Why** use virtual environment - It gives different apps isolation and personal environment so that modules don't interfere and it is easy when we have to productionize the app.

- **What** is Python Virtual Environment  
  - Basically a folder having python core binaries and use this new installation to install libraries that will be specific to this installation (or environment).
  - It is an isolated environment
  - When you activate a virtual environment, your PATH variable is changed. The Scripts directory of `venv_app` is put in front of everything else, effectively overriding all the system-wide Python software.

- **Create**
  - `python -m venv venv_app` - creates folder venv_app
  
- **Usage**
  - `source venv_app/bin/activate` - activates this environment
  - `>venv_app\Scripts\activate` in Windows
  - check using `python -V` or `which python`
  - now do `python -m pip install <package-name>` - this installs the package only in this environment.
  - add `#!venv_app/bin/python` on top of main.py file to make it use this python.
  - python or python3 depends on your installation.

- **Deactivate**
  - `deactivate` to deactivate the current env.

- **View & Share**
  - `python -m pip list` to see installed libs.
  - `python3 -m pip freeze` to share libs.
    - `python3 -m pip freeze > requiremeents.txt` to make a file.
    - `python3 -m pip install -r requirements.txt` to install all libs from file

- **Delete**
  - `rm -r venv_app` delete

## Offline Virtual Environment Setup

- On machine with internet
  - `pip download -r requirements.txt -d path/pip-packages` downloads requirements and its dependencies to a folder `path/pip-packages`

- On machine without internet
- `python -m venv venv` create virtual environment
- `venv\Scripts\activate` activate environment
- `pip install -r requirements.txt --find-links=pip-packages --no-index` install requirements
  - `--no-index` tells to not use any repository like pypi
  - `--find-links` tells a path to find all packages, or `-f`
- `flask --app app:create_app('testing') run`

- Links
  - [Stackoverflow answer](https://stackoverflow.com/a/70373570/1055028)
  - [PIP Docs - pip install](https://pip.pypa.io/en/stable/cli/pip_install/#pip-install)

## Conda Miniconda Anaconda


**Conda** is package and virtual environment manager, like pip, for any language—Python, R, Ruby and more. It is a CLI and can

- install packages like flask, jupyter, pandas etc.
- can manage envs, virtual environment is separate python and its packages. This means each project you work on can have its own set of packages.

**Anaconda** is toolkit for Data Science. Along with conda it includes ds and ml libraries (500Mb) installed.

**Anaconda Navigator** is GUI to use conda.

**Miniconda** includes conda and python but not much libraries.

So we can use conda alone to create a development virtual environment for new data science project or use miniconda.

**Installing Conda** on Linux

- `wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh`
- `bash Miniconda3-latest-Linux-x86_64.sh` this installs python, conda, vevn and others, all in virtual environment.
- After installation, restart terminal, and it will load new environmnet called 'base'. Now python is not the default system python.
  - If you'd prefer that conda's base environment not be activated on startup, set the auto_activate_base parameter to false: `conda config --set auto_activate_base false`
  - more: <https://www.projectdatascience.com/step-by-step-guide-to-setting-up-a-professional-data-science-environment-on-a-linux/>

**Quick Start using Conda** for a new project

```sh
conda deactivate
mkdir prj1
cd prj1
conda create -n prj1env pandas numpy jupyter scikit-learn matplotlib seaborn
conda activate prj1env
touch README.md
code .
```

Run `conda activate prj1env` in code shell.

Undo `conda deactivate && conda remove --name prj1env --all` and remove files if any.

**Conda Basic Commands**

- `conda update conda` updates conda
- `conda install PACKAGENAME` installs pkg to default/active env
- `conda update PACKAGENAME` updated pkg
- `pip install pkg` aslo intalls to active env

**Conda Environments**

Environment let you use multiple versions of python

```sh
# list all env
conda env list
```

- `conda create --name py35 python=3.5` created new env called 'py35' and installs py 3.5
- `conda activate py35` activates
- `conda list` lists all packages installed in active env.
- `conda remove --name my-env --all` deletes the env.


```bash
# Windows Create Python 3.8 env
conda create -y --name py38 python=3.8
python -m ensurepip
python -m pip install --upgrade pip
python -m pip install virtualenvwrapper-win
activate py38
```


## Python Programming

- **with**
  - it is keyword, used to handle unmanaged resources like database and filestreams. It gurantees closing of resources once used.
  - eg, `with open(filepath) as f:` - do something, and as the block ends, the resource is closed.

- **next(iterable, default)**
  - returns - next item in iterable
  - params
    - `default` - optional, value to return if end of list is reached.
  - eg, `next(mylist, "orange")`

- **Dictionary** - data type

    ```python
    for key, value in data_py_dict.items():
        print(key, ":", value)
    
    data_py_dict['some_key'] # also shows data
    ```

**Decorators** are a standard feature of the Python language. A common use of decorators is to register functions as handler functions to be invoked when certain events occur.

- **Global Local Variables** and its scope
  - If you use a var with same name in function (local) and module (global) then you need to take caution
  - when you assign a var in function, python create that local var irrespective of it being present in global context. To use the global var in function:
  - either pass as param, or
  - you can use `global` keyword before var to let python interpreter know to use global var and not redeclare it.
  - more on this on [StackOverflow - UnboundLocalError: local variable referenced before assignment](https://stackoverflow.com/a/10852003/1055028)


- **Packages & Modules**
  - `Package` is usually a folder with `__init__.py` in it.
  - Other python files are `modules`.

- **Public, Private, Protected** in python
  - public - every member of class in python is public by defaut, can be accessed outside class using object.
  - protected attribute needs to be prefixed with underscore, `_name`. It can be accessed, just a convension.
  - private members can be `__name` prefixed with double underscore, this makes them non accessible outside "directly". though can be accessed using `_Classname__attrname`
  - Python provides conceptual implementation but not exactly like java or C++. As the underscores tell what is protected and private but does not make them non accessible.
  - To implement a "write-only" attribute use "property"
    - getter - use `@property` decorator with function, `def pvt_prop_name(self):` raise err in this func so no one can get this property.
    - setter - use `@pvt_prop_name.setter` with function `def pvt_prop_name(self, value):` to implement setting some values. You can set value to another public property. Thus this makes `pvt_prop_name` as write-only.

    ```python
    class Book():
        scrambled = None # public, can be get or set
        __safe = None    # pvt, can't be directly get or set

        @property
        def secret(self):
            raise AttributeError()
        
        @secret.setter
        def secret(self,value):
            self.scrambled = value[::-1]

        # `secret` is write_only member
    ```

- **JSON handling** in python
  - JSON is comma separated key-value pairs.
  - Python has most of the things in form of Object which is similar to dictionary. It is similar to JSON but not same. Some differences are None - null, True true.

    ```python
    import json 
    
    # takes string and returns Python serialized object
    data_py_dict = data.loads(some_json_as_str)
    with open("data.json", "r") as read_file:
        data_py_dict = data.load(read_file) # reads from file
    
    # converts py_obj (as dict) to std-JSON-string
    std_json_string = json.dumps(data_py_dict)
    with open("data.json", "w") as write_file:
        json.dump(data_py_dict, write_file) # encode dict into JSON
    ```

## Exception handling with try, except, else, and finally

Try: This block will test the excepted error to occur
Except:  Here you can handle the error
Else: If there is no exception then this block will be executed
Finally: Finally block always gets executed either exception is generated or not

```py

# minimum
try:
  2/0
except:
  print('err')

# nesting, finally and multiple exception example
try:
  connection = pyodbc.connect(con_uri)
  cursor = connection.cursor()

  # nesting of try
  try:
    cursor.execute(query)
    n_rows = cursor.rowcount
    cursor.commit()
    cursor.close()
  
  # in case of any exception
  except Exception as e:
    cursor.rollback()
    logger.error(f'sql_execute - Query failed!. Error "{str(e)}".')
  
  # this executes irrestive of exception occuring
  finally:
    connection.close()

# Excepting a custom error
except pyodbc.OperationalError as e:
  logger.error(f'sql_execute - No connection to "{service}". Message: "{str(e)}"')

# Excepting all other errors
except Exception as e:
  logger.error(f'sql_execute - No connection to "{service}". Message: "{str(e)}"')

```

## Files Handling in python

`f  = open(filename, mode)` Where the following mode is supported:

- r: open an existing file for a read operation.
- w: open an existing file for a write operation. If the file already contains some data then it will be overridden but if the file is not present then it creates the file as well.
- a:  open an existing file for append operation. It won’t override existing data. creates if not exists.
- r+:  To read and write data into the file. The previous data in the file will be overridden.
- w+: To write and read data. It will override existing data.
- a+: To append and read data from the file. It won’t override existing data.

```python

## read
f = open('notes/abc.txt', 'r') # returns handle to file
f.readline() # returns one line, keep using for next lines

content = f.read() # returns whole file, arg is size. Not efficient.
line_list = f.readlines() # read all lines as list, each list item is a line. Not efficient.

f.close()

# peak large file
with open(filepath) as f:
    head = [next(f) for _ in range(10)]
print(head)


## write
file = open('note.txt','a')
file.write("quick brown")
file.write("munde, not fox")
file.close()

# if exists
os.makedirs(pdf_dir, exist_ok=True)
```

### Snippets File Handling

**Find all files of a type in a dir recursively**

```py
def find_images(dir_path):
    """finds all jpg,png in given path

    Args:
        dir_path (str): path to search in

    Returns:
        list: files list
    """
    
    files = []
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.lower().endswith('.jpg') or file.lower().endswith('.png'):
                files.append(os.path.join(root, file))
                
    print(f"{len(files)} images found.")
    
    return files

files = find_images("/home/user/project")
```

**Non-recursive replace `_` with `-` in file names**

```py
[os.rename(f, f.replace('_', '-')) for f in os.listdir('.') if not f.startswith('.')]
```

**Replace `_` with `-` in filenames recursively**

```python title=""
directory = '.'
for subdir, dirs, files in os.walk(directory):
  for filename in files: # !! use dirs instead of files to rename dirs first
    new_filename = filename.replace('_','-')
    subdirectory_path = os.path.relpath(subdir, directory) #get the path to your subdirectory
    file_path = os.path.join(subdirectory_path, filename) #get the path to your file
    new_file_path = os.path.join(subdirectory_path, new_filename) #create the new name
    # os.rename(file_path, new_file_path) #rename your file
    print(file_path, new_file_path) #rename your file
```

- **Handling CSV and JSON**

  - use python std `csv` n `json` library for data handling with file.

    ```py
    # pandas iter rows
    def CSVToJson():
      df=pd.read_CSV('/home/paulcrickard/data.CSV')
      for i,r in df.iterrows():
      print(r['name'])
      df.to_JSON('fromAirflow.JSON',orient='records')
    ```

- **zip a folder**

  ```python
  import zipfile, os
  dir_to_zip = 'path to dir'
      
  def zipdir(path, ziph):
      # ziph is zipfile handle
      for root, dirs, files in os.walk(path):
          for file in files:
              ziph.write(os.path.join(root, file), 
                        os.path.relpath(os.path.join(root, file), 
                                        os.path.join(path, '..')))

  with zipfile.ZipFile(dir_to_zip+'.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
      zipdir(dir_to_zip, zipf)
  ```
  



## Logging in Python

- Logging is done to keep record of events of software. They can be logged to console or a file or emailed.
- `level` is set to filter logs, default is `warning` so anything below it is not logged.
- `basicConfig()` set in one module works for all modules used in a session. You can pass
  - `level` to filter
  - `filename` to save logs
  - `format` - what to log, it can have, log level, message, time, location etc.
    - all format strings [here](https://docs.python.org/2/library/logging.html#logrecord-attributes)
  - `datefmt` to set date format of `asctime`


- **When to use What**
  - `print()` is good for small script to display on console. Else use logging.
  - `raise exception` when run time error occurs, that need to stop software.
  - `logging.exception() or logging.error() or logging.critical()` when error is to be logged and application can continue
  - Following table show when to use which level of logging

    Level     | When it is used
    ----------|----------------
    DEBUG     | detailed info, typically for problem analysis
    INFO      | confirmation that event is working as expected
    WARNING   | default. unexpected behaviour, but system will work. Eg, low space
    ERROR     | serious problem, that software has not performed an action
    CRITICAL  | serious error that may bring system down

- **Advanced**
  - loggers, handlers, filters, and formatters are components that can be used to have control on the functionality.
    - loggers- these have name, like SqlAlchemy logger, `werkzeug` logger, app.logger etc. Each of these can be formatted and added to handler.
    - handles - these are places to log to, eg, file, stream (stdout), email etc.
  - more here on [PythonDocs - Advanced Logging](https://docs.python.org/3.11/howto/logging.html#advanced-logging-tutorial)
  - Configuring Logging - configs can be in code, in file or in dictionary.


```python

import logging

## Very Basic
logging.warning('Watch out!')  # will print a message to the console
logging.info('I told you so')  # will not print anything as it is below default level

## To a file
logging.basicConfig(filename='example.log',level=logging.DEBUG)
logging.debug('This message should go to the log file')
# DEBUG:root:This message should go to the log file

## Formatting
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.DEBUG, datefmt='%m/%d/%Y %I:%M:%S %p')
logging.debug('Something is happenning')
# 02/16/2023 01:50:17 PM - root - DEBUG - Something is happenning


## New filename for each run
import os, time
from time import localtime

basedir = os.path.abspath(os.path.dirname(__file__))
 
log_dir = os.path.join(basedir, 'logs')
parent_process_id=os.getppid()
process_id=os.getpid()
log_time=time.strftime('%Y%m%d_%H%M', localtime())
log_filename=str(log_time)+'_app_'+str(parent_process_id)+'_'+str(process_id)+'.log'
LOG_FILE_PATH = os.path.join(log_dir, log_filename)

logging.basicConfig(level=logging.DEBUG, \
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', \
                    datefmt='%Y/%m/%d %H:%M:%S %p', \
                    filename=LOG_FILE_PATH, \
                    filemode='w')

logging.info("New Working directory is: " + str(os.getcwd()))

# or use RotatingFileHandler

"""Using Components. Using Both File and Stream Handlers"""

logger = logging.getLogger()

formatter = logging.Formatter('[%(asctime)s] %(levelname)s in %(name)s.%(module)s: %(message)s')

# Setup file handler
fhandler  = logging.FileHandler('my.log')
fhandler.setLevel(logging.DEBUG)
fhandler.setFormatter(formatter)

# Configure stream handler for the cells
chandler = logging.StreamHandler()
chandler.setLevel(logging.DEBUG)
chandler.setFormatter(formatter)

# Add both handlers
logger.addHandler(fhandler)
logger.addHandler(chandler)
logger.setLevel(logging.DEBUG)

# Show the handlers
logger.handlers

# Log Something
logger.info("Test info")
logger.debug("Test debug")
logger.error("Test error")
```

Links

- [ ] [RealPython - Logging in Python](https://realpython.com/python-logging/)
- [PythonDocs - When to use what level](https://docs.python.org/2/howto/logging.html#when-to-use-logging)
- [TD.io - logging in python](https://www.patricksoftwareblog.com/python-logging-tutorial/)


## Datetime and Time in Python

`datetime` and `time` are separate python packages

```py
import datetime
import time
# they are different
```

**Datetime** package

`datetime` has most methods to work with date and time, some sub modules are. [more datetime docs](https://docs.python.org/3/library/datetime.html#available-types)

```py
import datetime

# modules
datetime.datetime
datetime.date     # date specific methods
datetime.time     # time specific methods
```

### Datetime.datetime as dt module

Mostly can handle date and time. [eg geek4geek](https://www.geeksforgeeks.org/working-with-datetime-objects-and-timezones-in-python/)
  
- DateTime as String - `time.strftime('%Y-%m-%d %H:%M:%S')`

```python
from datetime import datetime as dt

my_dt_obj = dt(2001, 12, 9, 14, 28, 55)
my_dt_obj
# obj: datetime.datetime(2001, 12, 9, 14, 28, 55)

my_dt_obj.hour
# int: 14

start = dt.now() 
# obj: datetime.datetime(2022, 10, 20, 8, 14, 44, 277307)
# it is datetime object, not a string

dt.now().ctime() 
# str: Thu Oct 20 08:16:51 2022

end = dt.now()
end - start 
# obj: datetime.timedelta(seconds=11, microseconds=129035)

delta = (end - start).seconds 
# int: 11

# Str to Obj
dt.strptime('2023-22-03 12:28:11', "%Y-%d-%m %H:%M:%S")
# obj: datetime.datetime(2023, 3, 22, 12, 28, 11)

# Obj to Str
dt.now().strftime('%Y-%m-%d %H:%M:%S')
# str: '2023-10-27 17:43:23'
```

[date time formats - w3 school](https://www.w3schools.com/python/python_datetime.asp#:~:text=The%20strftime()%20Method)

**TimeZone** Hell

```py
dt.now()
# obj: datetime.datetime(2023, 10, 27, 17, 33, 58, 183305)
# This is GMT + 01:00 hrs

dt.utcnow()
# obj: datetime.datetime(2023, 10, 27, 16, 34, 7, 908839)
# This is GMT
```

GMT (Greenwich Mean Time) or UTC (Universal Time Coordinated) is same. This is time at 00:00 timezone or at 0° latitude (basically -7.5° to 7.5°). Now depending where your server is or your client is, there their time will be different depending on the timezone set in the system. This makes difficult to store the time in database in one timezone, show in another and then include daylight difference, and show timezone save by one time zone to another timezone and things like person moving in timezones, welcome to timezone hell.

Best way to save datetime in database, is to save time at UTC in format, this makes datetime on server, location independent and all time are in one timezone UTC.

To show on browser, send UTC from server and covert on browser using JS or lib like moment.js

To store datetime of event from browser, pick UTC time from server.

To store datetime enterd by user, also get Timezone of browser and then convert it to UTC on server and store it.


### Timezone Hell to Heaven

Firstly, know the international standards. **IANA time zone names** are international standard timezone names that are same in Javascript and Python. Eg, `"Asia/Kolkata"`

IST, BST is not standard as not standard, IST is Indian/Israel/Irish Standard time. BST is British or Bangladesh? It is not defined.

**All IANA Timezones**

```py
# to show all timezones
import pytz
pytz.all_timezones
```

**Get Client Timezone**

```js
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(tz);
// 'Europe/London'
```

### Python timezones

In Python, datetime object can be aware or naive. aware has timezone info, naive does not.

Timezone info is stared in class `class datetime.tzinfo`, this is None for naive object.

**Naive Datetime Object**

```py
# Naive object, not timezone aware

dt_str = '15 April 2024 | 10:45:02'
dt_obj = dt.strptime(dt_str, "%d %B %Y | %H:%M:%S")

dt_obj
# datetime.datetime(2024, 4, 15, 10, 45, 2)

print(dt_obj)
# 2024-04-15 10:45:02

dt_obj.tzinfo      # this is, None
#
```

Now lets add timezone info to this. Eg, this is gym entry time of a client. You can get client tz using JS, lets say it is `"Asia/Kolkata"` which is 'UTC +05:30'.

To **add tzinfo** and make it **tz-aware**, you can use `pytz` module.

**Add Timezone Info**

```py

import pytz

# Add time zone to naive object
client_tz = pytz.timezone("Asia/Kolkata")
client_db_obj = dt_obj.replace(tzinfo=client_tz)
print(client_db_obj)
# 2024-04-15 10:45:02+05:53
```

Now the client_db_obj is tz aware, you can convert it to any timezone.

**Convert to Timezones**

```py

print(client_db_obj.astimezone())  # local system timezone time, I am in London BST +1hr UTC
# 2024-04-15 05:52:02+01:00

print(client_db_obj.astimezone(pytz.utc))   # to store in db, UTC 00
# 2024-04-15 04:52:02+00:00

print(client_db_obj.astimezone(pytz.timezone("US/Pacific")))
# 2024-04-14 21:52:02-07:00
```

**Create TZ Aware Object**

```py

dt_str = '15 April 2024 | 10:45:02 +0530'
dt_obj = dt.strptime(dt_str, "%d %B %Y | %H:%M:%S %z")

print(dt_obj)
# 2024-04-15 10:45:02+05:30

print(dt_obj.astimezone())    # my localtime, London BST +1hr UTC
# 2024-04-15 06:15:02+01:00

print(dt_obj.astimezone(pytz.utc))
# 2024-04-15 05:15:02+00:00

print(dt_obj.astimezone(pytz.timezone("US/Pacific")))
# 2024-04-14 22:15:02-07:00

print(dt_obj.astimezone(pytz.timezone("Asia/Kolkata")))
# 2024-04-15 10:45:02+05:30

```

**ISO Formats**

```py

dt_str = '2024-04-15T08:12:48Z'
dt.strptime(dt_str, "%Y-%m-%dT%H:%M:%S%z")
# datetime.datetime(2024, 4, 15, 8, 12, 48, tzinfo=datetime.timezone.utc)

dt_str = '2024-04-15T08:12:48+0530'
dt.strptime(dt_str, "%Y-%m-%dT%H:%M:%S%z")
# datetime.datetime(2024, 4, 15, 8, 12, 48, tzinfo=datetime.timezone(datetime.timedelta(seconds=19800)))

dt_str = '2024-04-15T08:12:48+0530'
dt.strptime(dt_str, "%Y-%m-%dT%H:%M:%S%z").isoformat()
# '2024-04-15T08:12:48+05:30'

```

This is ISO 8601 standard. Here, `Z` in string is parsed at UTC. and `±hhmm` at end is where timezone offset is parsed, if specified as in the second example.

Links: [wiki ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)

**Date Parser**

When unsure of format, but confident that it would be common format and correct  you may use

```py
from dateutil import parser
parser.parse(dt_str)
```

**Exceptions**

```py
dt_str = '15 April 2024 | 10:45 UTC'

dt_obj = dt.strptime(dt_str, "%d %B %Y | %H:%M %Z")
print(dt_obj)
# '%Z' only takes local timezone, GMT or UTC. Noting else.
# for someone in India it will only accept, IST/GMT/UTC
```


Link:

- [Timezone Hell](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xii-dates-and-times#:~:text=%2C%20Diff.-,Timezone%20Hell,-Using%20Python%20on)
- [SO - JS timezone](https://stackoverflow.com/a/37512371/1055028)
- [Wiki - Abbr are duplicates](https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations)
- [SO - py tz play](https://stackoverflow.com/a/31977588/1055028)
- [Py Docs - datetime](https://docs.python.org/3/library/datetime.html)

### Timedelta

```py
from datetime import datetime as dt
from datetime import timedelta

# Add 10 minutes to now
dt.now() + timedelta(minutes=10)
# obj: datetime.datetime(2023, 10, 27, 17, 41, 50, 848715)
```

### Snippets Datetime

```py
# 1. Get last week start and end
import datetime
today = datetime.date.today()
# my_date = datetime.date(2023,4,6)
my_date = today
start = my_date - datetime.timedelta(days=my_date.weekday(), weeks=1)
end = start + datetime.timedelta(days=6)
print(start, end)
```


### Time Package

```python
import time

time.time() # timestamp

# pause program execution
time.sleep(2) # sleeps for two seconds

time.strftime('%Y-%m-%d %H:%M:%S') # '2023-06-12 11:18:06'
```


## Testing in Python

Manual testing is done to check if all functionalities are performed as expected.

Now if you change the code you have to check all the functionalities again. To avoid this, you can do Automated Testing.

There is `test step` and `test assertion`. Eg, step is that button will turn on light, to see that the light is on is assertion.

An integration test checks that components in your application operate with each other. Eg, switch turns on light.

A unit test checks a small component in your application. Eg, switch, battery, wire, bulb etc.

You can check a output against a `known output`

`assert` keywork is used to check a logical statement. In case of False, error is raised.

```py
def test_sum():
    assert sum([1, 2, 3]) == 6, "Should be 6"
```

`AssertionError` is raised in case of failure, else nothing.

`unittest` is a test runner, based on JUnit from java. It requires that:

- You put your tests into classes as methods
- :TODO <https://realpython.com/python-testing/>

## Documenting Code in Python

- **Why** - when you revisit after months, it _saves time_ to pick back
  - when it is public or team work, it helps _others contribute_

- Documenting is making it understandable to users, like react-docs
- Commenting is for developers, to understand why code is written. It can be to understand, reasons, description or
  - Tagging, `# todo: some work`, `# bug: fix the bug`, `# FIXME: some fix`.

- **Docstrings** - these are structured string format. They can be parsed by parser like Sphinx, and can autogenerate documentation from code.
  - everything in Python is an object. And that object has a property `__doc__` that stores the docstring that can be printed when using help.
  - you can set this as `my_func.__doc__ = "Some string"`
  - or the next line after function in `"""Some string"""` automatically sets the docstring for the function.
  - docstring structures are of three types
    - Google - google's way (_mostly used_)
    - reStructured - python style
    - em - same as done in java

- **Sphinx** lets you write documentation using markdown and can auto-generate documentation from docstrings.
  - Installation - `pip install sphinx`
  - Initialization
    - In the project root folder, `my_project/`
    - `sphinx-quickstart docs`, creates docs dir `my_project/docs`
  - Configuration
  - Build - `sphinx-build -b html docs/source/ docs/build/html`

- Links
  - [TD.io using Sphinx](https://www.patricksoftwareblog.com/python-documentation-using-sphinx/)
  - [PythonHosted.ORG - Examples](https://pythonhosted.org/an_example_pypi_project/sphinx.html)
  - [RealPython - Doc Guide](https://realpython.com/documenting-python-code/)
  - [Sphinx Google Example](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html)
  - [Shinx Autogen from docstring](https://stackoverflow.com/a/62613202/1055028)

## Concurrency and Parallelism in Python

- **wait** is when you have I/O or N/W or processing operation.
- you can at same time do other things while you wait, **concurrency**
- you can also do things simultaneously, **parallelism**
- **Thread** lets break a program into small pieces that execute separately. You can create multiple threads in a program, they all start one after other (not in parallel). This can be faster compared non-thread execution because when a thread waits another starts execution. Hence, it enables **continuous execution**.
- Python has slightly different approach for parallelism, because `threading` module lets create thread but can't execute in parallel, `multiprocessing` module is similar and enables **parallel execution**.

- **Asyncio** is another better way to do tasks **concurrently**. It lets you perform tasks in non-blocking way using `async` / `await` syntax.
  - **Non-blocking** means other tasks can exucute while a task is waiting. Synchronous operations suffer to wait and execute in sync.
  - `aiohttp` for non-blocking requests, `aiofiles` for non- blocking file operations. `asyncio` is python standard library.

- **Parallelism**
  - it can be done using `multiprocessing` or `concurrent.futures` library.
  - it lets distribute compute over multiple processors.

- **CRUX**
  - Threading enable concurrency, execute tasks independently without wait
  - Multiprocessing enables parallelism, execute with more compute power
  - Asyncio enables asynchronous execution, let long running task be handled in a nice way.

- **When to use Multiprocessing or AsyncIO or Threading**
  - When doing compute heavy task use multiprocessing. Eg, heavy math operation, string comparision.
  - Use asyncio or threading when using network, like request response read write.
  - Use both multiprocessing and asyncio tohether when using doing both high compute and n/w task. But, good rule of thumb is to fork a process before you thread(use) asyncio.
  - threads are cheap compared to processes.

- Link
  - [Tstdriven.io - Concurrency  Parallelism AsyncIO](https://testdriven.io/blog/concurrency-parallelism-asyncio/)

## Cryptography - Encode Encrypt Decrypt Decode

**Encode/Decode or Transcode or Endec** is a method of representing data in a different **format** to efficiently transfer information through a network or the web and make it consumable by different systems. Eg, same data can be in string format or bytes format. Encoded data has the same meaning as original.

**Encrypt** - Encryption is a process that transforms information to scrambled and meaningless data, and can only be deciphered by using a **key** (kept safely).It maintains data confidentiality.

**Hashing** is for validating the integrity of content by detecting all modification thereof via obvious changes to the hash output.

**Obfuscation** is used to prevent people from understanding the meaning of something, and is often used with computer code to help prevent successful reverse engineering and/or theft of a product’s functionality.

```py
# Obscuring
from zlib import compress
from base64 import urlsafe_b64encode as b64e

def obscure(data: bytes) -> bytes:
    return b64e(compress(data, 9))
txt = 'random'

obscured = obscure(txt.encode())  # bytes

# write
obs_loc = r"./obs_random.txt"
file = open(obs_loc,'w')
file.write(obscured.decode())
file.close()

## One liner obscuring
b64e(compress('Secret'.encode(), 9)).decode()



# Unobscuring
from zlib import decompress
from base64 import urlsafe_b64decode as b64d

obs_loc = r"C:\code\repos\obs_random.txt"
f = open(obs_loc, 'r')

# One liner
txt2 = decompress(b64d(f.readline().encode())).decode()

# OR, multi use
def unobscure(obscured: bytes) -> bytes:
    return decompress(b64d(obscured))

obscured = f.readline().encode()    # bytes
unobscured = unobscure(obscured)    # bytes
txt2 = unobscured.decode()          # str
```

Links:

- [StackOverflow Ways of security and Py code](https://stackoverflow.com/a/55147077/1055028https://stackoverflow.com/a/55147077/1055028)

## Snippets & Ways Python

- Taking input - `msg = str(input("Message? : "))`
- use `//` to divide and return only integer part of division or Quotient
- you can pass function as an argument to another function.
- you can define a function in an function. the inner function has access to arguments in outer function.

View Python Shell History

```py
import readline; print('\n'.join([str(readline.get_history_item(i + 1)) for i in range(readline.get_current_history_length())]))
```

## Web Scraping - Selenium

- Selenium is browser automation tool
- BeautifulSoup is DOM parser
- Pandas for data handling
- Both can work together, bs4 is best for extraction while selenium is best for performing actions or interactions.

- **Selenium Setup**  
  - *browser* - You need browser installed (Firefox or Chrome)
  
  - *driver* - you need driver for browser installed and added to bath. Its a binary or exe.
    - visit `https://chromedriver.chromium.org/downloads` and download version same as your browser version.
    - unzip and move `chromedriver` to `/usr/local/bin/chromedriver`
  
  - *python package* - you need selenium installed in python
    - `python -m pip install selenium`

  - [Install Chromium, ChromeDriver and Selenium on Ubuntu .sh](https://gist.github.com/DerekChia/d8b30e035def0ce875ff45ae6b2002f5)

- **XPATH in Chrome**
  - it is easy to find DOM elems in browser using console. It highlights the element and lets you hit and try.
  - to inspect a xpath in chrome, write `$x('//div[@role="button"]')`, it finds all elements and returns a list, expand the list the hover to see which element is where on page. then use it in Python.
  - to get any attribute value in python use `elem.get_attribute('innerText')`

- **Python Code Snippets for Web Scraping**

```python
import os, time, datetime, json

from selenium import webdriver
from selenium.webdriver.common.by import By # search elem by

from bs4 import BeautifulSoup   # to parse DOM
import pandas as pd             # to store data structure

import getpass                  # to take hidden password inputs
import pickle
import requests

chrome_options = webdriver.ChromeOptions()

# Download drive that is compatible to your chrome installation
driver_path = "C:\code\chromedriver_win32\chromedriver.exe"
driver_path = "/usr/local/bin/chromedriver"

# Optional Options and preferences

# print PDF to file
pdf_dir = r"C:\code\path-to-pdfs"

#change destination to save as pdf and save in required folder
pdf_settings = {
  "recentDestinations": [{"id": "Save as PDF", "origin": "local", "account": ""}],
  "selectedDestinationId": "Save as PDF",
  "version": 2
  }

prefs = {
  "credentials_enable_service": False,
  "profile.password_manager_enabled": False,
  "printing.print_preview_sticky_settings.appState": json.dumps(pdf_settings),
  "savefile.default_directory": pdf_dir
  }

chrome_options.add_experimental_option("prefs", prefs)
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("useAutomationExtension", False)

chrome_options.add_argument('--kiosk-printing')

driver = webdriver.Chrome(driver_path, options=chrome_options)

url_to_scrape = "https://www.something.com"
driver.get(url_to_scrape) # web page loads
driver.implicitly_wait(5)


""" Cookie Handling """
cookies_path = username+"_cookies.pkl"

# read pickle
if(os.path.exists(cookies_path)):
    cookies = pickle.load(open(cookies_path, "rb"))
    print('Cookie exists')

    # Check logged in by finding insta-home icon
    driver.get(url_to_scrape)
    sleep(randint(2,5))
    # set cookie from pickle
    try:
        for cookie in cookies:
            driver.add_cookie(cookie)
        print('Cookies added')
    except e:
        print('Error adding existing cookie.'+e)

# Save cookie to pickle
pickle.dump( driver.get_cookies() , open(username+"_cookies.pkl","wb"))

""" Doing actions """

# Check if a field exists
xlogin = '//*[@id="loginForm"]/div/div[3]/button'
xlogin_exists = len(driver.find_elements(By.XPATH, value=xlogin)) != 0


# find by name and send keys
username_box=driver.find_element(by=By.NAME, value="username")
username_box.send_keys("some text")

password = getpass.getpass('Enter your password:')

# find by x-path and click
driver.find_element(By.XPATH,'//*[@id="submit-button"]').click()

# Get attribute
xpath = '//span[@id="ctdat"]'
elem = browser.find_element(By.XPATH, value=xpath)
date_text = elem.get_attribute('innerText')       # use any JS attribute

# scroll to click, Can not click on a Element: ElementClickInterceptedException
checkbox_xpath = f"/html/body/div[4]/.../div"
checkbox_elem = driver.find_element(By.XPATH,checkbox_xpath)
driver.execute_script("arguments[0].scrollIntoView(true);", checkbox_elem)

driver.back()
driver.quit() 

# parse HTML
soup = BeautifulSoup(driver.page_source)

# find all where
items = soup.find_all('li', attrs={'class': 'the-items'})

# Request and Beautiful - Scrapping HashTags
term = "nature"
hastag_url = 'https://best-hashtags.com/hashtag/'+term
page = requests.get(hastag_url)
soup = BeautifulSoup(page.content, 'html.parser')
hashtags = soup.select("body > div.wrapper > div.job-description > div > div > div.col-md-8 > div > div > div:nth-child(1) > div:nth-child(4) > p1")[0].text.strip()


# building lists of data
rows = []
for i,item in enumerate(items):
    row = []
    row.append(i) # index of elem, can be used later for traversing
    row.append(item.p.text)
    row.append(item.find_all('li')[0].text)
    row.append(item.find_all('li')[1].text)
    row.append(item.find_all('li')[2].text)
    row.append(item.h3.text)
    rows.append(row)

# build DataFrame
df = pd.DataFrame(columns=['id','date_','region','strength','source','title'], data=rows)
```


- Links
  - [Real Python](https://realpython.com/modern-web-automation-with-python-and-selenium/)
  - [Kiwidamien Github - WebScraping Beyond Beautiful-soup And Selenium](https://kiwidamien.github.io/webscraping-beyond-beautifulsoup-and-selenium.html)
  - [Beautiful Soup 4 Readthedocs - En Latest Index](https://beautiful-soup-4.readthedocs.io/en/latest/index.html)
  - [StackOverFlow - PDF printing from Selenium with chrome-driver](https://stackoverflow.com/q/59893671/1055028)
  - [XPATH - Guide](https://www.lambdatest.com/blog/complete-guide-for-using-xpath-in-selenium-with-examples/)
  - [XPATH - text contains](https://stackoverflow.com/questions/12323403/how-do-i-find-an-element-that-contains-specific-text-in-selenium-webdriver-pyth)



## Data Science Setup

Python installed in Ubuntu or Mac should not be used. Instead create a Virtual Environment for it.

**Virtual Environments** can be created using conda or venv module. Each virtual environment has its own Python binary and can have its own independent set of installed Python packages in its site directories. More [here](https://docs.python.org/3/library/venv.html).

**Quick Start on Linux** more [here](https://cloud.google.com/python/docs/setup).

```sh
sudo apt update
sudo apt install python3 python3-dev python3-venv

sudo apt-get install wget
wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py

pip --version

cd your-project
python3 -m venv env

source env/bin/activate
```

This will create a dir `env` and will have its own python, python3, pip and pip3. Now you can install any packages and this will not interfere with system.

**Install Jupyter** in the venv. Now that we have an environment (base) you can use it, or create a new. Then

- `pip install jupyter`
- `which jupyter` shows `/home/vaibhav/code/miniconda3/bin/jupyter` it does not effect the system python.
- it is pkg, same as flask
- `jupyter notebook` runs a server to server jupyter notebooks at <http://localhost:8888/tree>


## Animation and Modelling in Python

VPython GlowScript

- can be used to create objects and animate them
- VPython makes it unusually easy to write programs that generate navigable real-time 3D animations.
- <https://www.glowscript.org/docs/VPythonDocs/videos.html>


`Manim`

- can animate equations and plots
- <https://github.com/3b1b/manim>
- <https://www.youtube.com/watch?v=ENMyFGmq5OA>

Sage

- Allows equation animations and plotting
- <https://www.sagemath.org/download-mac.html>

`Povray`

- The Persistence of Vision RayTracer is a high-quality, Free Software tool for creating stunning three-dimensional graphics. The source code is available for those wanting to do their own ports.
- <http://www.povray.org/>

ImageMagick

- Create, edit, compose, or convert digital images.
- It can resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors, apply various special effects, or draw text, lines, polygons, ellipses and `Bézier` curves.

EdX

- <https://learning.edx.org/course/course-v1:CornellX+ENGR2000X+1T2017/home>

## Packaging - Installable Packages

You can make the package installable in an environment so that it can used in any program by simply importing like other packages.

### Using SetupTools

- Install setup tools in venv, `python -m pip install --upgrade setuptools`

- Ensure DIR structure as

  ```sh
  .
  ├── Dockerfile
  ├── Makefile
  ├── app
  │   ├── __init__.py         # flask app
  │   └── bp
  ├── config.py
  ├── docker-compose.yaml
  ├── pyproject.toml
  ├── readme.md
  ├── requirements.txt
  ├── tests
  │   ├── __init__.py
  │   └── test_some.py
  └── venv
      └── bin
  ```

- Create and write to pyproject.toml file

  ```sh
  [project]
  name = "my-package"
  version = "1.0.0"
  description = "My Package for.. this"

  dynamic = ["dependencies"]

  [tool.setuptools.dynamic]
  dependencies = {file = ["requirements.txt"]}

  [build-system]
  requires = ["setuptools>=65.5.0"]
  build-backend = "setuptools.build_meta"

  [tool.setuptools.package-dir]
  "" = "app"

  [tool.setuptools.packages.find]
  where = [
      "app",
  ]
  ```

- Install the new package in editable mode, `pip install -e .`

Links:

- [SetupTools - Quickstart](https://setuptools.pypa.io/en/latest/userguide/quickstart.html)
- [Migule Example](https://github.com/miguelgrinberg/microdot/blob/main/pyproject.toml)

### Using Flit_Core

Folder Structure

Inside a root folder like `vy_lib_package` you can have following structure

```sh
.
├── README.md
├── pyproject.toml
├── src
│   └── vylib
│       ├── __init__.py
│       ├── example.py
│       └── utils
│           └── df_util.py
└── tests
```

Here, `example` and `df_util` are modules in `vylib` package.

This will let you import in following way

```py
from vylib import example
from vylib.utils import df_util

# then use any function in module
df_util.some_function(abc)
```

In `pyproject.toml`

```sh
[project]
name = "vylib"
version = "1.0.0"
description = "Common Utilites by Vaibhav"

[build-system]
requires = ["flit_core<4"]
build-backend = "flit_core.buildapi"
```

Package name should be same as folder name, `vylib`. This is a convention.

You can also have your dependencies here.

Install the package in venv or other env using:

```sh
pip install -e ./vy_lib_package/.
```

Baiscally, you need to give path where your `toml` file is. This will install in editable mode.

Links

- [Packaging Python Projects - Python Docs](https://packaging.python.org/en/latest/tutorials/packaging-projects/)
- [Example- miguelgrinberg/Flask-Moment](https://github.com/miguelgrinberg/Flask-Moment)

## Makefile

Make file lets run multiple shell commands easily with one command. It is useful and standard for testing, building resources and tearing down.

Eg

```Makefile
test:
  # source .env_test
  python -m unittest tests.test_namecheckapi

lint:
  python -m flake8 --max-line-length=120 --ignore=E402,E501,W293,E302,E303,W391 ./app
```

Here you have `test` as phase which has one command. You can run this using

```sh
make test
```

Links:

- <https://github.com/josephmachado/beginner_de_project/blob/master/Makefile>

## Links

- [Python Coding Kaggle](https://www.kaggle.com/iyadavvaibhav/python-notes)
- [Pandas Kaggle](https://www.kaggle.com/iyadavvaibhav/pandas-notes)
- [Flask](./flask.md) - back end web framework micro
- [Python Official Tutorial](https://docs.python.org/3.11/tutorial/index.html)
- [pythonbasics.org](https://pythonbasics.org/)
