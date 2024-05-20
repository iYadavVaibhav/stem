# How to Create fake data using Faker

Faker is library in Python and it exists for Java as well.

## Create Fake Records in Database

Following script will insert fake records in database table

```py
from datetime import datetime as dt
import sqlite3
import random

from faker import Faker

# Create a Faker instance
fake = Faker()

# Connect to the SQLite database
conn = sqlite3.connect(r'/home/john/db-app-dummy-v1.sqlite')
cursor = conn.cursor()

# Generate and insert fake data into the 'users' table

for i in range(10):  # Insert 10 fake records as an example

    uid = fake.bothify("uSr00000#??##?#?")      # random alpha-numeric
    name =  fake.name()
    emp_number = 'EMP'+fake.numerify('########')
    dob = fake.date_time()

    sql = f'''
    INSERT INTO app_users (
        uid, name, emp_number, dob
    ) VALUES (
        "{uid}", "{name}", "{emp_number}", "{dob}"
    );
    '''
    print (sql)

    # cursor.execute(sql)


# Commit the changes and close the connection
conn.commit()
conn.close()
```

## Create Fake function FLASK

Asuming you are using flask in `app.py` and it has `db` and `Employee` as ORM

```python
import random
import sys
from faker import Faker
from app import db, Employee
from datetime import datetime

def create_fake_employees(n):
    """Generate fake employees."""
    faker = Faker()
    for i in range(n):
        employee = Employee(
            created_date = datetime.utcnow(),
            department_id = faker.bothify(text='Dept_????-########'),
            manager = faker.name()
        )
        db.session.add(employee)
    db.session.commit()
    print(f'Added {n} fake employees to the database.')


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print('Pass the number of employees you want to create as an argument.')
        sys.exit(1)
    create_fake_employees(int(sys.argv[1]))
```

**Execution**

```sh
$ python -m flask --app app.py shell
>>> from create_fake_employees import create_fake_employees
>>> create_fake_employees(10)
```

## Snippets

Below are ways to generate random things

```py

# Pick from a list, make choices

my_categories = ['dog', 'cat', ... , 'ant']

animal_category = random.choice(my_categories)
metric = random.choice(['abc', 'pqr', 'xyz'])      # inline
relationship_name = fake.name() + random.choice([' Relationship', ' Family', ''])


# Random numbers, in range, between

value_ = random.randint(3000,5000) * random.choice([1,-1])


# bothify inserts random alpha for ? and random number for #
crm_id = fake.bothify("CR0######")
emp_num = 'EMP'+fake.numerify('########')
team_uid = fake.bothify("t35qG00000#??##?#?")
office_id = 'OFC_'+str(random.randint(20, 80))

banker_name = None

week_number = random.randint(1,2)
wc = [1, 8]
week_commencing = dt(2024,1,wc[week_number-1])
load_datetime = dt.now()
load_datetime = fake.date_time()


user_name = fake.name()
user_all_ids = user_uid+'|'+user_name.replace(' ','.').lower()
team_owner_id = user_name.replace(' ','.').lower()+"@example.com"
team_name = "Team " + fake.name()


# Locale Settings
fake = Faker('en-in')  # Locale ID (LCID) Chart
```

## Links

- [Providers - different type of things](https://faker.readthedocs.io/en/master/providers.html)
- [datetime randomness](https://faker.readthedocs.io/en/master/providers/faker.providers.date_time.html)
- [Geekflare - Python Faker Explained](https://geekflare.com/python-faker-explained/)
- [Faker Doc](https://faker.readthedocs.io/en/master/index.html)

