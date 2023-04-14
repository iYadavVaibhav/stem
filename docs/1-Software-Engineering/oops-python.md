# OOPs in Python

- Object is a Class and has
  - `attributes` - variables
  - `methods()` - functions

## Instance, Class or Static Methods

- Instance - method is specific to instance of class. First argument is `self` (referece to object) and is auto passed.
- Class - method can be called without instantiating the class. First argument is `cls` (referece to class itself) and is auto passed.
- Static - similar to class but can be called without passing `cls`

```python
class Book:

    # Class attribute, common for all instances
    kind = "Novels"
    
    def __init__(self, row):
        # row is db record

        # instance attribute
        self.title = row.title
        self.author = row.author
        self.year = getattr(row, 'year', None) # if year is not in row

    def age(self):
        # return age of book
        # this is per instance of book
        return (year_today - self.year)

    @classmethod
    def fetch_book(cls, id):
        # fetch the row from db or api
        row = fetch_service(id)
        obj = cls(row)
        return obj

    @staticmethod
    def fetch_books():
        # fetch the row from db or api
        objs = []
        rows = fetch_service('all')
        for row in rows:
            # create object and add to objcts list
            objs.append(Book(row))
        return objs

book_obj = Book.fetch_book(21) # class method
book_obj.age() # instance method

book_objects = Book.fetch_books() # static method, no auto arg passed

```

- More about different class methods [here on stackoverflow](https://stackoverflow.com/a/12179752/1055028)

## Inheritance

- to be added

## Links

- RealPython OOPS - <https://realpython.com/python3-object-oriented-programming/>

