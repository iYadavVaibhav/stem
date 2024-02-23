---
date: 2024-01-12
---

# Software Design Principles and Patterns

_Software Design Process, Principle, Patterns and System Design_

Software design principles and patterns help developers make a good system design. It helps in better code design, maintainability, and extendability (adding new code won't break the existing one).

It was introduced in 2000 in [paper](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) published by Robert C. Martin (Uncle Bob).

Coding can be done without pattern knowlednge but to make something big, like frameworks (flask, laravel) and for you to be senior developer, it needs good understanding of patterns like decorator Pattern, Strategy Pattern etc. These frameworks apply best required design principle wisely. Eg, Laravel 5 use the Dependency Inversion Principle (IoC Container, Dependency Injection) for their core.

Open-source software often uses a lot of Design Patterns: Singleton, Factory Method, Decorator Pattern, Strategy Pattern, Proxy, and so on. Hence contribution to these require good understanding of design patterns and process.

Ever worked on bug in big system? You can quickly find the part that has bug, read and understand the code, change it to fix the bug and other parts of system stay unaffected.

## Software Design Process

It is process that lets convert customer requirements in to programmable code. It includes following phase of design:

- Interface Design - Events, Messages, Data Format and relationship.
- Architectural Design - Components and communication
- Detailed Design - DSA, UI, State

In each phase you design the components it is responsible for.

## Software Design Principle

Software Design Principles are guidelines. Basically, Sofware Design Principles are Object-Oriented Design Principles which includes:

- SOLID Principles
- DRY (Don’t repeat yourself) Principle
- KISS (Keep it simple, stupid!!) Principle
- YAGNI (You ain’t gonna need it) Principle
- PHAME

### SOLID Principles

#### Single Responsibility Principle

Class (or function) should have one job and should change only if the purpose of that job changes. Decorator Pattern is useful to comply with this principle. Like, in a room it is easy to keep one type of items at one place rather dump anything anywhere.

To _implement_ this, write small classes with very specific names.

For _example_, instead of throwing everything inside an `Teacher` class, separate the responsibilities into `TeacherTimeLog`, `TeacherTimeOff`, `TeacherSalary`, `TeacherDetails`, etc.

This gives designated place for everyting rather than code lying all at once, it will be easier to read and fix after one year.

#### Open / Close Principle

A module should be Open for extension but closed for modification. This lets add new feature by extending module, rather than modifying it. It is done so that the tested code is not changed.

For example, VS Code is open for extensions but closed for modification without extension.

Example 2, if you make a `Delivery` class that delivery methods, if you have to add/modify a method the class changes, which will open the existing code. Rahter make a `DeliveryInterface` which lets implement different option classes. This lets add new methods without modifying the core system.

#### Liskov Substitution Principle

This principle states that when a parent class is replaced with a child class it should not break the system.

Eg, In prototype, you make a class `DataProviderFile` that reads from file and provide array. Now when you upgrade, you make another class `DataProviderDatabase` that reads from database and returns object. You system will break because now you are getting object whereas array is expected. One option is use to make interface `DataProvider` which has return type-hinting so that when it is implemented developer uses same return type.

Another example, is all the method of parent class should be implemented in child class, this will make child class replace parent class.

#### Iterface Segregation Principle

The client (or user of a class) should not be dependent on code it doesn't use.

Eg, if a client uses `payment` module of ecommerce system, it should not be depended on `ordering` or `inventory` module code. There should not be on `Ecommerce` class with order, inventory and payment as methods, rather it should be broken down into separate classes / interfaces like `Order` `Inventory` and `PaymentInterface`. Now when a client uses `PaymentInterface`, it does not depend on `Order` code.

#### Dependency Inversion Principle

High level module should not depend on low level module - Both should depend on abstraction.

Eg, when you switch database driver from MSSQL to NoSQL, it should not break the system. It is possible by using abastract interface.

#### Link SOLID Principles

- [Adevait - Software Solid Design Principles The Guide To Becoming Better Developers](https://adevait.com/software/solid-design-principles-the-guide-to-becoming-better-developers)
- [Freecodecamp - News Solid Design Principles In Software Development](https://www.freecodecamp.org/news/solid-design-principles-in-software-development/)

### YAGNI

This principle states that always implement things when you actually need them never implements things before you need them.

### PHAME

Principles of Hierarchy, Abstraction, Modularisation, and Encapsulation

Links:

- [Medium - Software Design Principles Every Programmer Should Know](https://medium.com/@peterlee2068/software-design-principles-every-programmer-should-know-c164a83c6f87)

## Software Design Patterns
