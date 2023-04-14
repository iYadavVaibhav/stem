---
description: MySQL, SQLite, Database, SQL
date: 2019-05-06
---

# Databases & SQL

*all about databases, SQL only*

## SQLite

- It is a micro database that can work in memory or a saved in file, eg, `store.db` .
- Queries are same as any other SQL.
- It can be used in many ways, some are:
  - Python Program and DB Engine In memory
  - Python Program and DB Engine as File
  - SQLite installed as utility and access via shell, this is `sqlite3.exe` program.
  - SQLite ODBC driver.

### Interaction

- shell
  - `sqlite3` opens a shell in command line, just like mysql shell. DB is in memory
    - to open a file, use `.open FILENAME` to open an existing database.
  - `sqlite3 data.sqlite` to work on this file
  - `ctrl + z` enter to exit

- DDL
  - `.tables` to show all tables
  - `.schema orders` to check create statement

- load CSV
  - `.mode csv` and then `.import data.csv orders` loads csv to db, creates if not exists.

- GUI [SQLite Browser](https://sqlitebrowser.org/)

## MySQL

Installation:

- `brew install mysql`

Start Server:

- `brew services start mysql` - background mysql start
- `mysql.server start` - no background
- `mysql_secure_installation` - run this and set root pwd, etc.
- `ps -ef | grep mysqld` process

Login:

- `mysql -u root -p` then enter password

Queries:

```sql
show DATABASES;

create user 'bob_me'@'localhost' identified with mysql_native_password by 'bob_pwd';

create database bob_db;

grant all privileges on bob_db.* to 'bob_me'@'localhost';
```

Client - SequelPro:

- Connecting:
  - Standard
  - Host: 127.0.0.1
  - enter uername and password and connect.

Shutdown Server:

- `mysql.server stop` - stops server

Other Notes:

- Column and Table names are case-sensitive.
- `mysqladmin` is also installed

Trouble Shooting:

- If you see error in clients, eg Sequel Pro, it might not be ready yet for a new kind of user login, [link](https://stackoverflow.com/questions/51179516/sequel-pro-and-mysql-connection-failed).
- do `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newrootpassword';` then try loggin in.


## Microsoft SQL Server

### MSSQL Snippets

```sql
-- Create and Insert
SELECT FirstName, LastName
INTO TestTable
FROM Person.Contact
WHERE EmailPromotion = 2

-- Existing Table Append
INSERT INTO TestTable
SELECT FirstName, LastName
FROM Person.Contact
WHERE EmailPromotion = 2
```


## Redis

- `redis-server` to start the server.

