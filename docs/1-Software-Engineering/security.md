---
date: 2024-01-16
---

# Security, IAM, RBAC

_role permissions policies users groups rbac iam and more_

## Access and Authorization

Access give permission to connect.

Authorization gives permission to a do an action on a resource.

Usually, a user first needs access to system (which is when user logs in) and then needs proper authorization to do things (like add a post, edit a post, delete a comment) etc.

## User Roles and Permissions

There are two methods to implement authorization:

- Role-based access control (RBAC)
- Attribute-based access control (ABAC)


### Role Based Access Control

Broadly speaking, in a system, **Actions** are performed on **Resources** by **User** within a **Session**. These information are enought to implement **Permission** to control access.

In a small system, user is stored in a `table`, action is a `method` and permission are applied with method to control access. Eg,

```py
@role_required('Author')    # User: Role should be Author
def edit_post(id):          # resource: Post, action: edit
    ...
```

To do this in more systematic way for big system, you can do, Model-Driven Role Base Access Control (MD-RBAC)

#### Model-Driven Role Base Access Control

Role, Permission, Resource, Action are added as table in database. Mapping tables like User-Role and Role-Permission are also added to handle m-m mappings. Besides this, the system has User table and individual resources tables like Post, Comments etc.

**Permission Table** - It stores information about resources and actions that can be performed on resources.

For more complex appliaction, you can have `user_group` table to implement Hierarchial role based access control with/out model tables.

### Attribute Based Access Control

Everything has associated attributes to them, or every object has attributes, eg:

- User has name, role, age, location
- Product has name, category, price, quantity, origin
- Action has what (read, edit), when, where

So, on a request, there is a model which checks these entities and decides to grant or deny the request.

Eg, User from Delhi wants to buy a GTA-5 CD from China. Here attributes are:

- Subject: Name - Rahul
- Subject: Age - 15
- Subject: Location - Delhi, IN
- Action: Buy
- Action Time: 12:55 am on Sunday 21 January 2024
- Object: Name: GTA-5
- Object: Category: Game 16+
- Object: Price: USD 20
- Object: Origin: New York, US

Now based on these attributes in the request, a Policy Based Desicion Making System can either grant or deny the request. Policy defines **5Ws** - what, where, when, who and why.

More on RBAC and ABAC at [Nikhilajain - Post User Role Permission Model](https://www.nikhilajain.com/post/user-role-permission-model)

## Links

- [Aalpha - Blog Best Practice For Designing User Roles And Permission System](https://www.aalpha.net/blog/best-practice-for-designing-user-roles-and-permission-system/)
- [Bootcamp Uxdesign - Designing Roles And Permissions Ux Case Study B1940f5a9aa](https://bootcamp.uxdesign.cc/designing-roles-and-permissions-ux-case-study-b1940f5a9aa)
