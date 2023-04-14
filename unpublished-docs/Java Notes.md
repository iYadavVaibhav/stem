# Java Notes

## Up and runnin with Java

> To mainain data integrity, members are private and are accessed using methods.

### ArrayList:

```java
ArrayList<class,..> myVar = new ArrayList<class,..>();
```

JAVA:
- j2ee and spring adds on
- 8 lpa in india
- 30 lpa in au/uk/us

Main skills:
- spring
- web services  -SOAP, REST
- hibernate
- Multi threading,
- da/ds
- jms, junit, spring, hibernate, struts, j2ee, jpa, rest, soap

### Lynda - OOPS:
- the method of making complex applications
- UML to visually represent the OOPs logic.
- put ideas into practice.
- analysis, design, programming >> desig, build and code/
- first this and then code.
- insted of waterfall we use agile methology.
- because the requirements change.
- an obejct has a data and logic which communicate among themselves.
- for object we need a class.
- each instance of object is its unique existance.
- pre written classes are into frameworks and libraraies.
- we have standard library.
- polymorphism, abstraction, inheritance and encapsulation.


### Abstraction
- it is like showing the same outer appearance.

### Encapsulation
- Hide as much as possible.
- show only whats necessary.
- helps in dependencies and reusability.
- 
### Inheritance
- use members of pre defined class.
- one can have only one parent and not multipe parent class.
- keyword: extends.
- super.doSomething() - thats how we call a method from the parent calss.

### Polymorphism
- differen behaviour for same thing.

### Understanding the object-oriented analysis and design processes- 
1. gather your requirements. 
2. describe the application.
3. identify the most important objects.
4. describe the interaction between those objects.
5. create a class diagram. 

- the above should be done on paper and not tool.
- it does not need to be done once but instead it is done over n over weeks n months.

### UML
- these are used to represent the object, a class.
- its interactions with other objects.
- it should not be much emphsised but should be created to have big picture.

### Domain Modelling (Modelling the App)
- In this we identify the classes/
- then we make relationships between them, the interactions.
- this is not database modelling. so no primarty, foreign keys or 1-1, 1-m relationships here.
- this is just for reference.
- determine the responsibilities of each object.

### UML diagrmas
- they have attiburtes and functionality
- with data type, + - for public, private.
- Static, shared or classs-level variable is one that has same state across all instances of objects.


### Abstract Class
- this is just for sake of being inherited and is nvr instantiated.
- like bank account, inhertited by, SA, CA, LA.
- this can be made abstract.
- abstract class BankAccount { ... }

### Interface
- this has just definitions and no functionality.

```java
interface Printable {
	// message signature
	void print();
	void printToPdf (String fileName);
}
```

- these are like contract. fixed methods and names.
- not to miss something.

to use:
```java
class MyClass implements Printable {...}

// we can even as if an object is part of an interface.
if ( myObj instanceOf Printable ) {
	myObj.print();
}
```

### Aggregation and Composition
- this show uses is a part of etc.


### Design Pattern - Singelton
- it is class which has private constuctor
- so that this class cannot be instantiated from outside.
- we declare object as private static in class itself. __me
- we make public static getInstance() which instantiates and returns the object.

### Design Pattern - Memento
- this is used when we want to undo a state of a object.
- there is a care taker class which asks the object to save the state.
- then the object returns its state to care taker.
- care taker stores the state and keeps it with it
- it can be used when we want to undo
- without breaking the encapsulation, going into the object and modifying it's state.

### Desing Principles
- there are design principles which make the code robust.
- we break the cide into peices to make it more stable and maintainable.
- we choose object that all have a particular responsibily and not one has all work to do.

---
END