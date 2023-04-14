# How to Create fake data using Faker

Auuming you are using flask in `app.py` and it has `db` and `Employee` as ORM

## Create Fake function

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
            manager = faker.name(),
            team = faker.name(),
            hr = faker.name(),
            office_id = 'OFC_'+str(random.randint(20, 80)),
            type = faker.random_choices(elements=('Perm', 'Contract', 'Temp'), length=1)[0],
            salary = random.randint(3000000, 20000000))
        db.session.add(employee)
    db.session.commit()
    print(f'Added {n} fake employees to the database.')


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print('Pass the number of employees you want to create as an argument.')
        sys.exit(1)
    create_fake_employees(int(sys.argv[1]))
```

## Execution

- `flask --app app.py shell`
- `from create_fake_employees import create_fake_employees`
- `create_fake_employees(10)`

