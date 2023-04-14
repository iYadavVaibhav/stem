# HDPCD

# Sqoop Notes

## Import data from a table in a relational database into HDFS

```bash
sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --as-textfile \
  --target-dir=/user/root/departments
```

## Import the results of a query from a relational database into HDFS

### Boundary Query and columns

```bash
sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --target-dir /user/root/departments \
  -m 2 \
  --boundary-query "select 2, 8 from departments limit 1" \
  --columns department_id,department_name
```

### Query and split-by

```bash
sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --query="select * from orders join order_items on orders.order_id = order_items.order_item_order_id where \$CONDITIONS" \
  --target-dir /user/root/order_join \
  --split-by order_id \
  --num-mappers 4


  sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --target-dir /apps/hive/warehouse/retail_ods.db/departments \
  --append \
  --fields-terminated-by '|' \
  --lines-terminated-by '\n' \
  --num-mappers 4 \
  --outdir java_files


  sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --fields-terminated-by '|' \
  --lines-terminated-by '\n' \
  --hive-home /apps/hive/warehouse \
  --hive-import \
  --hive-table departments_test \
  --create-hive-table \
  --outdir java_files


sqoop export --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_rpt_db" \
  --username retail_dba \
  --password hadoop \
  --table departments_test \
  --export-dir /apps/hive/warehouse/departments_test \


sqoop eval --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username retail_dba \
  --password hadoop \
  --query "insert into departments values (8000, 'Testing Merge')"

 sqoop merge --merge-key department_id \
  --new-data /user/root/sqoop_merge/departments_delta \
  --onto /user/root/sqoop_merge/departments \
  --target-dir /user/root/sqoop_merge/departments_stage \
  --class-name departments \
  --jar-file /tmp/sqoop-root/compile/5952d1747b799e7ca009cb03a9378efc/departments.jar

```

# FLUME

practice from video directly



# PIG

```bash
lines = LOAD '/user/root/dummyText.txt' AS (line:chararray); 
words = FOREACH lines GENERATE FLATTEN(TOKENIZE(line)) as word;
grouped = GROUP words BY word;
wordcount = FOREACH grouped GENERATE group, COUNT(words);
DUMP wordcount;


sqoop import-all-tables \
  -m 1 \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --warehouse-dir /user/root/sqoop_import \
--driver com.mysql.jdbc.Driver


PHONE_NUM number, PLAN number, REC_DATE number, STAUS number, BALANCE number, IMEI number, REGION varchar(30)


orders = LOAD 'pig_demo.orders' USING org.apache.hive.hcatalog.pig.HCatLoader();
grouped = GROUP orders BY order_status;
orderstatusdistinct = FOREACH grouped {
  odistinct = DISTINCT orders.order_status;
  GENERATE FLATTEN(odistinct);
};
DUMP orderstatusdistinct;
```


# HIVE

```bashsql
select * from categories into outfile '/tmp/categories01.psv' fields terminated by '|' lines terminated by '\n';
select * from customers into outfile '/tmp/customers.psv' fields terminated by '|' lines terminated by '\n';
select * from departments into outfile '/tmp/departments.psv' fields terminated by '|' lines terminated by '\n';
select * from products into outfile '/tmp/products.psv' fields terminated by '|' lines terminated by '\n';
```

> Like this we can export mysql table to linux files;




## Load data from local file system to hive table

```bashsql
load data local inpath '/tmp/categories01.psv' overwrite into table categories;
load data local inpath '/tmp/customers.psv' overwrite into table customers;
load data local inpath '/tmp/departments.psv' overwrite into table departments;
load data local inpath '/tmp/products.psv' overwrite into table products;
```

> You can remove overwrite while appending data to underlying hive table

order_item_id            | int(11)    | NO   | PRI | NULL    | auto_increment |
| order_item_order_id      | int(11)    | NO   |     | NULL    |                |
| order_item_product_id    | int(11)    | NO   |     | NULL    |                |
| order_item_quantity      | tinyint(4) | NO   |     | NULL    |                |
| order_item_subtotal      | float      | NO   |     | NULL    |                |
| order_item_product_price

```bashsql
order_item_order_id   int,   
order_item_product_id   int, 
order_item_quantity     int,
order_item_subtotal     int,
order_item_product_price int
```

- stage is for loading data as it is. It has all tables loaded.
- ods has partition and buckets. Currently orders and order_items .

cards
 deck_of_cards
 deck_of_cards_external

default

pig_demo
 categories
 customers
 departments
 order_items
 orders
 products

retail_edw --enterprise data warehousing
 order_fact
 products_dimension

retail_ods --operational data store
 categories
 customers
 departments
 order_items
 order_items_bucket
 orders
 orders_bucket
 products
 --all are populated except buckets

retail_stage --avroSerDe, avro schema not found.
 departments_delta
 order_items_stage --missing on git
 orders_demo
 orders_stage

xademo
 call_detail_records
 customer_details
 recharge_details

hive_demo --TRANSACTIONS

```sql
insert overwrite table order_items partition (order_month)
select oi.order_item_id, oi.order_item_order_id, o.order_date,
oi.order_item_product_id, oi.order_item_quantity, oi.order_item_subtotal,
oi.order_item_product_price, substr(o.order_date, 1, 7)
order_month from retail_stage.order_items_stage oi join retail_stage.orders_stage o
on oi.order_item_order_id = o.order_id;

create table order_items_stage ( 
 order_item_id int,
 order_item_order_id   int,   
 order_item_product_id   int, 
 order_item_quantity     int,
 order_item_subtotal     int,
 order_item_product_price int
 )
ROW FORMAT DELIMITED FIELDS TERMINATED BY '|'
STORED AS TEXTFILE;

SELECT order_status, count(1) FROM orders
WHERE order_date = '2013-12-14 00:00:00'
GROUP BY order_status
ORDER BY order_status;
```

---
END
