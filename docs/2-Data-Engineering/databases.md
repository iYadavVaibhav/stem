---
description: MySQL, SQLite, Database, SQL
date: 2019-05-06
---

# Databases & SQL

_all about databases, SQL only_

- [ ] add query examples for each.

**Database** lets store data usually in tabular format.

## ----- DDL -----

Data Definition Commands, they let define the data table structure and things around them.

## CASCADE

can be used when defining tables, it helps do action on the child table based on a action on parent table.

## TRIGGERS

Triggers let do action on another table based on activity on one table.

## ----- DML -----

Data Manipulation Language, this lets manipulate the data.

## Date Operations

```sql

-- get month from timestamp
extract(month from activity_date)
```

Link <https://www.postgresql.org/docs/8.1/functions-datetime.html>

## Distinct

Can bes used after select to fetch only distinct row in result set. It works on **multiple** column as a set of row, whole row would be unique.

## NVL COALESCE

To change null values cell

```sql
NVL (col, "val-when-null")
NVL2 (col, "val-not-null", "val-when-null")
```

**COALESCE**

returns first not-null value, or null if all are null, `COALESCE()`

```sql
SELECT column(s), CAOLESCE(expression_1,….,expression_n)FROM table_name;
```

## CASE WHEN THEN

END ELSE is an optional component but WHEN THEN these cases must be included in the CASE statement.

```sql
SELECT ...,
CASE
  WHEN col_a = "val_1" THEN 'res_1'
  WHEN col_a = "val_2" THEN 'res_2'
  WHEN col_b = "val_4" THEN 'res_4'
  ELSE 'val_0'
END as col_my
FROM ...


-- syntax 2
CASE col_a
  WHEN val_1 THEN res_1
  WHEN val_1 THEN res_1
  ELSE res_0
END CASE


-- Use in Order by
SELECT CustomerName, Country
FROM Customer
ORDER BY
(CASE
    WHEN Country  IS 'India' THEN Country
    ELSE Age
END);
```

**DECODE**

same as case

**Use AVG to find Percentage**

Percentage is `flag/total`, say flag is active uses as 1 and total is total users.

AVG age is (sum of age) / (number of students), that is, if age is 1 and 0, like flag, then avg(flag) is percentage. Because avg will be sum(flag)/total row. So use:

```sql
select
avg(case when is_active_flg = 1 then 1.0 else 0 end) as pct_low_fat_and_recyclable
from products p
```

## GROUP ROLLUP CUBE

Use `GROUP BY` to group data. the columns in select should be same as in group by clause, or you can have aggregated columns.

use `ROLLUP`, to add **sub-totals** and totals in grouped columns.

```sql
GROUP BY ROLLUP( col_a, col_b ... )
```

Use `CUBE` similar to rollup to get subtotals by combination of dimentions.

Eg, lets say database having, country, state, department and Sales. You can make a **cube** to get sub totals by combination of dimentions, that is, country-department totals, country-state totals, state-department totals, and total by all 3dims.

## HAVING

HAVING is used to specify a condition for a group or an aggregate function.

WHERE filters before grouping, then HAVING filters after grouping.

## EXISTS

The EXISTS operator tests for the existence of rows in the results set of the subquery. If a subquery row value is found the condition is flagged TRUE and the search does not continue in the inner query, and if it is not found then the condition is flagged FALSE and the search continues in the inner query.

```sql
SELECT employee_id, last_name, job_id, department_id
FROM employees outer
WHERE EXISTS ( SELECT ’X’
FROM employees
WHERE manager_id =
outer.employee_id);
```

## Sub Queries

- A subquery is a **query within a query**.
- We can **use** it in multiple ways:
  - in `from` as another table
  - in `where` as a set to filter in main query
  - as a `column`
- example

```sql
SELECT name, cost
FROM items
WHERE cost > (        --sub query
    SELECT AVG(cost)
    FROM items
);
```

**Correlated Sub-Queries**

The **Correlated Subqueries are dependent on the outer query** and are **executed for each row** of the main query.

Wheras, **regular subqueries** (non-correlated) are **independent of the outer query** and are evaluated **only once** before the main query runs.

Correlated subqueries are useful when you need to filter the result of the outer query based on some condition that requires referencing values from the outer query itself. They are commonly used in scenarios where the condition relies on data from related tables.

```sql
SELECT last_name, salary, department_id
 FROM employees outer
 WHERE salary >
                (SELECT AVG(salary)
                 FROM employees
                 WHERE department_id =
                        outer.department_id group by department_id);
```


## JOINS

A `CROSS JOIN` produces a cartesian product between the two tables, returning **all possible combinations of all rows**. It has **no ON clause** because you're just joining everything to everything.

A `FULL JOIN` / `OUTER JOIN` / `JOIN` are same and have `ON` clause that has matching condition in between tables.

**Problem: Rank with Self Join**

You can self join a table:

- left side is your table
- right side is again your table but only rows that have sales more than the current row, so
  - sales 5 in left, will have sales 6, 7, 8 joined to it
  - sales 10 will have only 11 joined to it.
- then you can count the rows that got joined from right table. It will give you the rank.

```sql
SELECT a1.Name, a1.Sales, COUNT(a2.sales) Sales_Rank
FROM Total_Sales a1, Total_Sales a2
WHERE a1.Sales <= a2.Sales or (a1.Sales=a2.Sales and a1.Name = a2.Name)
GROUP BY a1.Name, a1.Sales
ORDER BY a1.Sales DESC, a1.Name DESC;
```

Link: <https://www.experts-exchange.com/questions/24783940/RANK-Using-a-SELF-JOIN-or-other.html>

## UNION

In Union the order is not guranteed to be preserved. As a result, you can add `row_number()` or `rank()` and table_number hardcoded as table1 and table2 to reselect from union.

`UNION` only returns a **unique** record, while `UNION ALL` returns all the records (**including duplicates**)

## CTE - Common Table Expression

- It is a query that we write before the main query.
- use `WITH` to implement create CBT and use it in main query
- Example

```sql
WITH names_cte AS (
  SELECT name
  FROM students
)
SELECT * FROM names_cte;
```

- CTEs can be **recursive**
- CTEs are **reusable**
- CTE are more **readable** and help manage long and complex queries
- CTE are similar to Subqueries, however, **CTE can't be used in WHERE clause**


The WITH clause lets define a table. The definition is available only to the query in which the with clause occurs.


**Recursion**

Imagine you have a tree structure:

```sql
drop table if exists data_sci.org_structure;
create table data_sci.org_structure (
    id integer,
    department_name text,
    parent_department_id integer);


insert into data_sci.org_structure values
  (1, 'CEO Office', null),
  (2, 'VP Sales', 1),
  (3, 'VP Operations', 1),
  (4, 'Northeast Sales',2),
  (5, 'Northwest Sales',2),
  (6, 'Infrastructure Operations', 3),
  (7, 'Management Operations', 3);
```

and you want to find complete path from one node to root (top parent), you know the algo, find parent of child, then find grand-parent, ... until you reach the root.

This is where recursion can help.

```sql
WITH RECURSIVE <table_name_recursive_cte> (<columns>) AS
  <terminal select statement>
  UNION
  <recursive select statement>
SELECT
  ...
```

Eg

```sql
with recursive report_structure(id, department_name,parent_department_id) as
 (select id,  department_name, parent_department_id 
  from data_sci.org_structure where id = 7
 union
   select os.id, os.department_name, os.parent_department_id 
    from data_sci.org_structure os
    join report_structure rs on rs.parent_department_id = os.id
 )
 select
  *
 from report_structure
```

This will find all parent for child id 7, you can similary pass any id and find all its parents using recursion.

## Window Functions

You can partition the data over a column, and then apply some function over the rows in each partition. The value of function is related to items in a partition, but resets in each partition. Some of the functions that you can apply are

- `RANK()` gives rank based on value, if two item get same rank, next one would be same as row number, that is, 1,2,2,4 and so on, where 2, 3 have same rank 2, hence 4th item has rank 4, 3 is skipped.
- `DENSE_RANK()` gives rank, but it doesn't skip rank, 1,2,2,3 and so on.
- `ROW_NUMBER()` give row number like 1,2,3,4 and so no
- `SUM(col_a)` - like sum (cost) over months, this will give **running total** by months
- `NTILE(n)` - over a partition, it gives a number to each data item by dividing into n quarters, eg, 4 will break into 4 quartiles based on value of data item in window.
- `LEAD(sales)` will show 2nd row in 1st row and so on..
- `LAG(sales)` will show 1st row in 2nd row and so on..; `LAG(sales,2)` will show 1st row in 3rd row and so on.. you can specify the offset, by default it is 1.

Syntax: `RANK() OVER (PARTITION BY col_b ORDER BY col_a)`

- **Imp** In PARTITION BY... , the **ORDER BY** .... makes huge difference as order changes the way function is applied, eg:

```sql
-- this gives running total by each month and resets on year
sum(total_sales) over (partition by year_sold order by year_sold, month_sold) as running_total

-- this gives running total by year and resets on year, it skips months, that is one total for year and is same in each month
sum(total_sales) over (partition by year_sold) as running_total
```

The partion that you create is called **window**. You can use as above, or have to use same partition again and again, you can define the partion as window and re-use it. syntax `WINDOW win_name AS (PARTITION by col_a ORDER by col_b)`

Exmple query:

```sql
-- Window Function

SELECT emp.firstName, mdl.model, count(sls.salesId) as num_sold,
  rank() over (PARTITION by emp.firstName ORDER by count(sls.salesId) desc) as ranks, -- this could also be fname, it is just to show
  dense_rank() over (fname) as dense_ranks,
  row_number() over (fname) as row_numbers,
  sum(sls.salesAmount) over (fname) as running_sales
FROM sales sls
INNER JOIN employee emp
  ON sls.employeeId = emp.employeeId
INNER JOIN inventory inv
  ON inv.inventoryId = sls.inventoryId
INNER JOIN model mdl
  ON mdl.modelId = inv.modelId
GROUP BY emp.firstName, emp.lastName, mdl.model
WINDOW fname AS (PARTITION by emp.firstName ORDER by count(sls.salesId) desc)

-- Running Total using Window fn with CTE

with total_sales_cte as (
select
  soldDate
  , strftime('%Y', soldDate) as year_sold
  , strftime('%m', soldDate) as month_sold
  , sum(salesAmount) as total_sales
from sales
GROUP by year_sold, month_sold
ORDER by soldDate
--LIMIT 5
)

select * 
  , sum(total_sales) over (partition by year_sold order by year_sold, month_sold) as running_total
from total_sales_cte
```

Links:

- [All Cars DB SQLite](https://raw.githubusercontent.com/LinkedInLearning/level-up-advanced-sql-4311094/main/CarsForAll.db), [LL Course Adv SQL](https://www.linkedin.com/learning/level-up-advanced-sql/)


## Pivot

Lets say you have table as below

Name | Occupation
-- | --
Ashley | Professor
Samantha | Actor
Julia | Doctor
Britney | Professor
Maria | Professor
Meera | Professor

You can pivot by harcoding the colum names and using case statement.

Lets first try to give row numbers over occupations

Name | Occupation | row_id
-- | -- | --
Actor | Eve | 1
Actor | Jennifer | 2
Actor | Ketty | 3
Actor | Samantha | 4
Doctor | Aamina | 1
Doctor | Julia | 2
Doctor | Priya | 3
Professor | Ashley | 1
Professor | Belvet | 2
Professor | Britney | 3

Then select from this table and hardcode the column names

```sql
-- sql server
select 
    t1.row_id
    , max(case when o='Doctor' then name else NULL END) as 'Doctors'
    , max(case when o='Professor' then name else NULL END) as 'Professors'
    , max(case when o='Singer' then name else NULL END) as 'Singers'
    , max(case when o='Actor' then name else NULL END) as 'Actors'
FROM

(select Occupation as o
    , Name
    , Row_number() over (partition by occupation order by name) as row_id
from occupations) as t1

GROUP BY t1.row_id
ORDER by t1.row_id
```

Output:

row_id | Doctors | Professors | Singers | Actors
-- | -- | -- | -- | --
1 | Aamina | Ashley | Christeen | Eve
2 | Julia | Belvet | Jane | Jennifer
3 | Priya | Britney | Jenny | Ketty
4 | NULL | Maria | Kristeen | Samantha
5 | NULL | Meera | NULL | NULL
6 | NULL | Naomi | NULL | NULL
7 | NULL | Priyanka | NULL | NULL

That's how you can pivot tables.

## ----- DBMS -----

## Normalization

Normalization is done to avoid data duplication and easily manage relational data, specially 1-many and many-many relationships

**OLTP**

- It is mostly normalized, as there are many reads and writes but on specific data, eg, add new book, update an author
- you work on **row level**, eg, update address of a cutomer, you need all detail but only of one customer, so one row

**Snowflake schemas are normalized**, avoiding data redundancy by storing dimensional data in separate tables. This improves data quality and reduces the required storage space.

LINK: [NORM VS DENORM](https://www.keboola.com/blog/star-schema-vs-snowflake-schema)

## Denormalization

- it improves **read performance**.
- **reduced risk of anomalies** as we are mostly analysing and not updating / writing / deleting data at atomic level.
- streaming inserts, like from IoT can use denormalized data model as it has simple structure of timestamp and value.
- **Eliminates complex joins** and give performance gain
- Common way is **star-schema** where you have facts and dimentions.
- **Wide table** is also good but when data is petabyte scale then use specific databases like google big query.

**OLAP**

- It is for data analysis, many read by many process on many data points. hence denormalized is prefered.
- you work on **column level**, eg average of temprature.


**Why star schema is not normalized?**

- In a star schema, there is only one level of dimension tables, and all foreign key relationships are defined between the fact table and the dimensions. A **query never needs to join tables beyond the single layer** of dimension tables, resulting in better performance than if the dimension tables were normalized.

## Partitioning

- large table can be inefficient, as it may have large indexes to manage. It has to scan large index.
- Horizontal Partitioning divides table into parts, it **limits scans to subset of partitions**. So if you break into 3 horizontal partition, there will be smaller index to scan/maintain and limited rows to read.
- efficient deleting, lets say you can drop a old timed partition, eg if older than 5 year, drop whole partition.

Vertical Partitions

- partitions into set of columns, good when using columnar storage
- retains all rows in one partition
- cam have global indexes, but reduced I/O as reading less

Range Partitioning

- similar to horizontal, uses time / numeric range / alphabetical range for partitioning
- it partitions on non-overlapping keys.

Hash Partitioning

- identify a partitioning key, apply a hash and take modulus of hash (remainder) to identify which partition it should go into. Eg, you determine the number of partitions you need, then can do hash partitioning.
- useful when range partition does not make sense, or you need more balanced partitions.

Code in Postgre

- **define partition** when creating,
- you can **create parttion tables** by creating table as `partition of for values from ... to ...`

```sql
CREATE TABLE (
  ...
  msmt_date date not null,
  ...
)
PARTITION BY RANGE (msmt_date); 

CREATE TABLE tab_part_a PARTITION OF table_x
  FOR VALUES FROM ('2021-01-01') TO ('2021-01-31') ; -- monthly
```

## Materialized Views

- Instead of executing query again and again through execution plan, you can save results using materialized view.
- Persist the results, form of caching
- trade space for time.

When to use

- long running **complex** queries with joins
- computing **aggregate data**

When NOT to use

- can get **out of sync**, so depends how **consistent** data is required in view, eg 1hr refresh of materialized view will not have data generated in last 59 mins.

```sql
CREATE MATERIALIZED VIEW mv_myview AS (
  -- your sql query
)

SELECT * FROM mv_myview;    -- use as normal table
```

## Read Replicas

There is a primiary server which takes all read and write operation, you can add a read replica fo this server where asll the writes aslo go in, now you can query this.

Data is up to date with write ahead log.

this makes primary to focus on writes, other relica(s) can **help heavy reads**.

there are things to consider, like consistency requriements, transaction conplition, all depends on tradeoffs.

**Challenge Sensor Data - Write Heady example**

You have sensor data coming in from IoT device, there **should not be latency or lag in writes**.

**System Design**

- You should model the table to be same as data coming in, eg (device_id, timestamp, measure1, measure 2), **exactly** these 4.
- then can have **materialized view** on top of these to have aggregated hourly / daily results
- also consider **partitioning** which would ideally be on the time column.
- consider when do you need to **purge the materized view**, old hoully data need not to be kept
- latest hour data materialized view need to be **refreshed more frequently** if required
- all these questions should be asked from domin expert, **interrogate**.
- if low level raw data is required, then avoid doing reads on primary server, rather create **read-replica** for this.

## Indexes

This is **indexing strategy**. Indexes help reduce the data blocks. But there is cost to it. more space, more writes on each update/write. more cardianlity (more disticnt values) then indexing is more useful.

**Indexing Attributes**

- **Access Types**: does it help to access range or a specific value
- **Access Time**: time to find the result
- **Insertion Time**: time to find the appropriate space to insert data
- **Deletion Time**: time to find data, delete it and update the index.
- **Space Overhead**: additional space required by the index.

Index is not used in Google Big query or aws red shift. They are columnar storage databases and have different strategy.

Type

- B-tree
- bit map
- hash index

B-tree

- balanced tree index
- look-up in logarithmin time, same as binary search.
- its like binary tree, small value go to left, large go to right, and so on. it halfes and halfes and halfes, hence, $O(\log n)$

Bitmap index

- samll possible values in column, encode to bit string. eg, yes 1, no is 0, null is 00; Any enums can be represented by bit map.
- read intensive and few writes, because can be expensive to create bit maps for write
- PostgreSql does not support natively

Hash

- Function for mapping arbitrary lenght data to a fixed-size string
- unique values output, eg `hello` is `5d41402abc4b2a76b9719d911017c592` in **MD5** hash. and is always same for a string.
- any change in input produ es new hash.
- You cannot reverse a hash, simple it is way math algo have done it, as eg, consider 912 is hash, 912 = 900 + 12 or 400 + 512 and so on. You will have to try all possible outputs to match, but can't exactly know what it is.

GiST and SP-GiST

- Generalized search tree.
- for specialized data trypes, like ltree and htree. special type like circle, box, latittudes, etc.
- SP - partitioned trees.

GIN and BRIN

- Generalized inverted index. vlues that are in comsposite item.
- slow insertion.
- either you can make insert fast or fetching.
- BRIN - block range index,
  - used with very large index, ike post-code or dates.
  - pages adajacent in table.
  - stores summary information in block ranges.

**Challenge**

calims data, large size, 12 col data. how would you index to coptimize join on claim id.

Solution

- claim id is for join. by default, postgre has b-tree. but claim_id is unique in dataset, so b-tree is not useful, rather we can use hash-index. So that would be one-one lookup.


## SQL Execution Plan

_how database engine executes the SQL statements_

- In SQL we **tell what** we want, **not how** we want, in java/python we do tell how we want to do.
- The c**ost of execution** mostly depends on the **number of rows**.
- Few scans on large table is okay, otherwise, prefer indexes.
- Indexes help filter data on index, rather than on rows. And this may help in fetching just a partition.

**Table Join Algo**

- tables join on keys, the internal alog is one of these
- **Nested Loop Join** - compare all rows in both tables. n^2 ?
- **Hash Join** - Calculate hash value of keys and join based on matching hash values.
- **Sort Merge Join** - Sort both tables and then join rows with advantage of order. n log n ?

**Plan Builder**

- It builds the plan of execution based on the meta data statistics.
- You can look at query plan for a query
- If that query plan is inefficient, you can run `ANALYZE` commnad to update the statistics on meta data.

**Explain**

- Add `EXPLAIN` before any query to see the **query plan**.
- It shows operations, like Seq Scan.. or Append. It can be something happening in parallel and others.
- With indexed in table, the plan changes, instead of sequence scan, you can see index scan, which takes less time.
- This way you can see what going on under the hood, are the indexes useful?

- Explain Join - here you can see the algo used for join. If the execution plan is expensive, you can consider adding indexes on key used for join.

**Challenge**

- You have to optimise a long running query. You see that it has
  - 3 tables
  - 2 left joins
  - 2 tables with ~500k rows and one with 200 rows

**Solution**

- Run EXPLAIN
- look for full-table scan, if so create index, on col used in join.
- look to filter dataset if not required.
- Run ANALYZE to ensure stats are up to date.

**Tip** You can generate **fake data** in Postgres using `generate_series()` function. It is like range() in Python. It can generate numbers, timestamps etc. And use `random()` for random data.

- select is executed before group hence you can use select aliases in group by.

- examples
  - you can calculate month, year from order_date and use that in group by.
  - use sum over month to find running total
  - make this CTE, then reuse it.

## User Defined Functions

- you can define functions to do some steps, it can be oversloaded
- Postgres supports using python in functions.

## Hstore

You can use hstore with postgres to support storage of key-value pair in efficient way.

- Useful when you have large number of attributes not being used, this creates sparse columns.
- GIN and GiST indexes can be used efficiently.
- Eg: Catalog for store items.
- you can have a normal table. with columns as defined and have another column defined as hbase, which can have key value pair to store attributes.
- Useful when you do not have fixed structure to attributes. It is combination of sql with no-sql.

## JSON and Semi-structured data

Postgres 9+ lets you store both kind of data in relational database with flexibility of semi-structured data. You can have a column data type as JSON and store JSON in it. It will have JSON as text, but JSON key can be queries and filtered using `->` notation.

```sql
CREATE TABLE customer_summary  
  (id serial primary key,  
  customer_doc jsonb);

insert into customer_summary (customer_doc) values 
  ('{
  "customer_name": { "first_name": "Alice", "last_name": "Johnson" },
  "address": { "city": "Boston", "state": "MA" }
}');

select customer_doc->'customer_name'->>'first_name' from customer_summary;

-- Alice
```


## ----- Databases -----

- **Relational Databases**
  - store in rows. Eg, MySQL, `PostgreSQl`
  - good to store transactions and build relationships.
  - Eg, **PostgreSQL** is relational db.

- **Columnar Databases**
  - used commonly in warehousing. eg, Amazon Redshift, Google BigQuery, Apache Cassandra.

- **NoSQL Databases**
  - They do not have defined structure and are document based.
  - **Elasticsearch** - a search engine based on `Apache Lucene` and can be used as nosql db.
  - **Apache Kibana** - adds GUI to ElasticSearch.

## PostgreSQL

- **PostgreSQL** is relational db.
  - `pgadmin4` is GUI to it. It is available on web and can run on localhost.
  - `pgcli` is emac CLI to client for database access.
  - login with linux user on the server as `username@server`
  - then add server, expand it, see database, schemas, public.

## SQLite

- It is a micro database that can work in memory or a saved in file, eg, `store.db` .
- Queries are same as any other SQL.
- It can be used in many ways, some are:
  - Python Program and DB Engine In memory
  - Python Program and DB Engine as File
  - SQLite installed as utility and access via shell, this is `sqlite3.exe` program.
  - SQLite ODBC driver.

**Interaction**

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

**Snippets**

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

## Elasticsearch

- **Elastic Search** is a search engine based on `Apache Lucene` and can be used as nosql db.
- you can set cluster and node in elastic search.
- once installed it doesn't has GUI but is rather an API. at `localhost:9200` you can see JSON out from API
- uses JSON Query called Elastic Query DSL (Domain Specific Language)

- **Apache Kibana**
  - adds GUI to ElasticSearch.
  - you can use it to build visualizations and dashboards of your data held in Elasticsearch.
  - after installation it can be accessed on `http://localhost:5601`
  - you can create viz from index in elasticsearch. viz is widget that can be added to dashboard. dashboard filter filter all widget if field is present.
  - `developer tools` is scratchpad area where you can crate and query data/indices.

