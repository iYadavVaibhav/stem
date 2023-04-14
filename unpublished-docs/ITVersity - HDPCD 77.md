# HDPCD

```sql
create alias of IP address and give it a name in /etc/host


* IPs and Ports:
8020  HDFS port
8888  Sandbox Home, Welcome screen
8080  Amabri, web interface to acces and monitor everything.
2222  SSH
4200  Web terminal
21000 Atlas
9995  zeppelin
15000 Falcon
6080  Ranger
50070 Hadoop information, name node to access files.
3306  mysql


* how to SSH

# Usage:
  ssh <username>@<hostname> -p <port>;

# Example:
  ssh root@127.0.0.1 -p 2222
  ssh root@sandbox.hortonworks.com -p 2222


* Input local file into HDFS using Hadoop shell

ip:50070 - takes you to name node to access files in HDFS.

>id hive
>id hdfs
shows the process ID for both the process


* HDFS directories

to create directory under HDFS login as user
when we ssh root@sandbox.hortonworks.com then it is logged in as a root.

/root in sandbox is the home directory of linux not hdfs.
In this dir we place data and other local files.

Other users are each services. Like hcat,hive,maria_dev,oozie,root,solr,spark,unit,yarn.

#make dir
>sudo -u hdfs hadoop fs -mkdir /user/root

#list dir
>hadoop fs -ls /user
here we have dir of all users in hdfs
/apps/hive/warehouse - it has all hive managed tables and databases.
/user/root - we created this for development purpose.





08. ** HDPCD - Copy files to HDFS

# change owner
>sudo -u hdfs hadoop fs -chown root:hdfs /user/root
#by default it is above only.

#copying the data
>hadoop fs -copyFromLocal /root/test /user/root

#for 2nd practice we are using hdfc /user/hdpcd/

>cd /etc/hadoop/conf
core-site.xml

fs.defaultFS parameter has information about the port number on which we connect to create the files. Like:

    <property>                                                                                                             
      <name>fs.defaultFS</name>                                                                                            
      <value>hdfs://sandbox.hortonworks.com:8020</value>                                                                   
      <final>true</final>                                                                                                  
    </property> 



#imp: to copy file to a particular name node, pass ip address:port 8020 to copy file to that particular name node
>hadoop fs -ls http://192.xxx.xxx.121:8020/user/root

e.g.
hadoop fs -ls hdfs://sandbox.hortonworks.com/user/

this will list the file on above name node.

it takes connections only on port 8020. rest are refused.





9. ** Create new dir in HDFS:

>hadoop fs -mkdir /user/root/
>hadoop fs -mkdir -p /user/root/dir1/dir2 #will create missing dir1 also.
>hadoop fs -ls -R /user/root # dispays sub directories as well

>hadoop fs -mkdir /dir/t{1..10} # creates dir t1,t2,...,t10
>hadoop fs -mkdir /dir/t{1,2} # creates dir t1,t2






********************** SQOOP **********************



** 10. SQOOP Introduction (very important): 

https://raw.githubusercontent.com/dgadiraju/code/master/hadoop/edw/hdp/sqoop/sqoop_demo.txt #all commands

default port number for mysql is 3306 else it will be specified.
also dont use localhost. Use full IP or hostname.

>hostname -f #tells the hostname

>ls -lrt /usr/share/java/mysql-connector-java*.jar #this is connector to jdbc driver

#find all jars
>find / -name "mysql*.jar"

>wget -o /dir <URL> #downloads the latest file

unlink and relink to new version of file downloaded.

>unlink path.jar

>ln -s path/jar link

#Run sqoop import
replace jar in hadoop and hadoop yarn

>hadoop fs -ls /apps/hive/warehouse/retail_stage.db
#lists all the tables imported to HIVE



** 11 SQOOP: list and eval

>ps -ef | grep -i manager #tells weather node manager and resource manager are running or not

>ps -ef | grep -i node #should be upa and running

>ps -fu hdfs
>ps -fu yarn
#these also show running tasks

>scp -P 2222 code/hdpcd/retail_db.sql root@sandbox.hortonworks.com:/root/data/retail_db.sql
copies files from mac to remote vm via scp

mysql> create database retail_db;

mysql> create user retail_dba identified by 'hadoop';

mysql> grant all on retail_db.* to retail_dba;

mysql> flush privileges;

mysql -u retail_dba -p

mysql> source /root/data/retail_db.sql;

mysql> show tables;              
#to verify the results

mysql> select * from categories limit 10;

hadoop fs -copyFromLocal /root/data/dummyText.txt /user/root




>mysql -u retail_dba -p #to check if mysql is running


>hadoop fs -mkdir /user/root/sqoop_import # just a dir to import


>sqoop help #show commands and how to use the same.

to list databases use hostname only.
while to list databases use connection param /database_name

>sqoop eval #used to run a query after --query "my sql"

list-databases

[root@sandbox data]# sqoop list-databases \
> --connect "jdbc:mysql://sandbox.hortonworks.com:3306" \
> --username retail_dba \
> --password hadoop

>sqoop list-tables --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" --username retail_dba --password hadoop

* Instead of using the --table, --columns and --where 
  arguments, you can specify a SQL statement with the --query argument

e.g.
sqoop import 
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" 
  --username retail_dba --password hadoop 
  --query "select * from categories where category_department_id=8 and \$CONDITIONS"  
  --target-dir /user/hdpcd/d1/categories_query/ 
  -m 1 
  --delete-target-dir

* in sqoop import, the target directory should not exist.

sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --as-textfile \
  --target-dir=/user/root/departments


sqoop eval \
> --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
> --username retail_dba \
> --password hadoop \
> --query "select count(1) from order_items"


* in sqoop import-all-tables there is warehouse-dir and not target-dir.

* during import tablename.java file is created in dir from where we execute the import/import-all-tables statement.
* these are basically ORM java classes.

* when saving as avro data file. tablename.avro file is created form where we launched the import command. 
* It has table details and columnn names in JSON format.

sqoop import-all-tables \
-m 12 \
--connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
--username=retail_dba \
--password=hadoop \
--as-avrodatafile \
--warehouse-dir=/apps/hive/warehouse/retail_stage.db

add driver parameter then above import will work
--driver com.mysql.jdbc.Driver


* To create avro format externa table in hive. We need to use avro classes and avsc file created while importing data from sqoop to avro file format.
  Copy the avsc file to hdfs dir and provide that in avro.schema.url

hadoop fs -put departments.avsc /user/hdpcd/departments.avsc


e.g.:

CREATE EXTERNAL TABLE departments
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.avro.AvroSerDe'
STORED AS INPUTFORMAT 'org.apache.hadoop.hive.ql.io.avro.AvroContainerInputFormat'
OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.avro.AvroContainerOutputFormat'
LOCATION 'hdfs:///user/hdpcd/departments_avro'
TBLPROPERTIES ('avro.schema.url'='hdfs://sandbox.hortonworks.com/user/hdpcd/departments.avsc');



eval command can be used to run query and stored procedures as well.






** 12. SQOOP Import

# sqoop import, refer sqoop documentation as well.

>sqoop --help #use when u get stuck

*imp -m is used as number of mappers in import-all-tables

-m 12 #means 12 parallel threads will run together.

--as-avrodatafile #saves in avro format. same as JSON

--warehouse-dir #give directory where data needs to be saved

boundary conditions are set in background to break data into number of buckets.(min,max)
Then this data is inserted into db by usign where clause on data. 
Then this data is processed using parallel threads passed in -m or --num-mappers

the data is placed in import data location and we can see data using ls command.
table is a folder and inside that folder we have different files which have table data in part/

the parts are made by -m command. default is 4.

so if we pass -m 12, the data will be stored in 12 parts.

the data in file is saved as CSV as default delimiter is comma.

to verify records inserted, use:
>hadoop fs -cat /dir/dw/table/part-m-*|wc -l
#this will cat all parts and count the records.

same can be verified using count(*) in :
>sqoop eval --query ""
or mysql.


** 13 -  SQOOP Import - hive import

>hadoop fs -ls /user/hive/warehouse 
#this is where all data of hive lives

.db extension directories represent database.

>hive #takes to hive CLI

hive> create database sqoop_import;
# creates database

in hive dfs => hadoop fs

from above command sqoop_import.db directory will be created under warehouse directory

hive>show databases; #shows databases.

>use db; # to show databases.

if we dont specify the compression codec then it is compressed as gzip. it is default compression.

--outdir java_files 
creats plane old java pojo class. it is optional.

>describe formatted departments;
shows detailed information, location.

>dfs -du -s -h /path
#gives size of directory in which data is stored.





** 14. SQOOP import - add on

>--hive-database can be used to import to a particalar database.

e.g.:
sqoop import 
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" 
  --username retail_dba --password hadoop --table orders 
  --hive-import --create-hive-table 
  --hive-database hdpcd_d1 
  --driver com.mysql.jdbc.Driver

This also does the same work:
sqoop import 
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" 
  --username retail_dba --password hadoop --table orders 
  --hive-import --create-hive-table --hive-table hdpcd_d1.orders2 
  --driver com.mysql.jdbc.Driver


** 15. sqoop import

we have something called boundry query 
it is used to load the data.
It selects min and max from id (primary key)

no of mappers provide how data needs to be splitted before loading. It creates as number of buckets.

boundary-query is important as it can improve performance of import. The query may take time to compute min and max. so we can use boundry query.

--table and --query cannot be used together.

e.g.
-- Boundary Query and columns
sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --table departments \
  --target-dir /user/root/departments \
  -m 2 \
  --boundary-query "select 2, 8 from departments limit 1" \
  --columns department_id,department_name

to import table using sqoop import command and table is without primaty key then we have to use --split-by or give number of mappers as 1

to use where clause we have to pass conditions in --where as argument.

* split by e.g.

-- query and split-by
sqoop import \
  --connect "jdbc:mysql://sandbox.hortonworks.com:3306/retail_db" \
  --username=retail_dba \
  --password=hadoop \
  --query="select * from orders join order_items on orders.order_id = order_items.order_item_order_id where \$CONDITIONS" \
  --target-dir /user/root/order_join \
  --split-by order_id \
  --num-mappers 4



** 16 - sqoop import

import from sqoop into hive, an particular table

hive parameters can be used to import data into the table

we have many parameters like table, dir, overwrite. 
These are self explainatory.

in case of error, we might need to clean up the staging directory where the hive imports the data.

It is a dir in non hive warehouse fs.
hdfs://sandbox.hortonworks.com:8020/user/root/departments

* to load to a particular database use:
  --hive-table retail_ods2.departments \


--create-hive-table 
can be used to create table at time of load.

--where 
it can be given as parameters.
col <operator> value

can be given in single/double quotes.

--append
simply appends to end of file.



** 17  SQOOP Import - incremental import

it is used to insert data which is left from being imported.
it uses last value inserted to load remaining values.

so one way to import incremental is to use where clause.
like where id>7; this is traditional way.

sqoop way is:
to use 
--check-column #like id
--incremental #append
--last-value #7

or when using --incremental as lastmodified then pass timestamp in #--last-value

e.g.:
  --check-column "department_id" \
  --incremental append \
  --last-value 7 \

* SQOOP job:
sqoop job --create sqoop_job \
  -- import \
  --connect ...

other job related commands:
sqoop job --list

sqoop job --show sqoop_job

sqoop job --exec sqoop_job




** 18. sqoop export

HDFS to mysql

export appends to the table in mysql by pusing duplicate records as well.


use simple export command with various arguments
it imports into mysql table. we need to pass the direcctory from which data is to be picked.

by default it inserts data and does not update the data. to update the data we need to use separate argument.

so in export the files are divided into splits which is parallel processing of threads.
these threads depends on number of mappers.
so for 10gb file. if we have 128mb block then we will have roughly 80files.
now if we have 4 mappers then each mapper will process 20 files in each thread.


  --update-key department_id \
  --update-mode allowinsert


** 19. SQOOP export - merge/upset

for adding data to mysql, we can create file in local fs and then move it to hdfs, then we have to use export command to bring those records to mysql.
we can use update-key and update-mode to append the data.

key can be only primary or unique key only. Composite key can be given by comma seperated. If we dont pass key then we may get duplicate records.

mode can be updateonly or allowinsert.

so old record will be updated and new record will be inserted.

in updateonly mode new data is not inserted only matching key record gets updated.
in allowinsert mode both update and insert occurs.

*imp 
If we dont have primary key in mysql table then the update will not happen, only new records will be inserted.

*how it fails
Insert data into existing table without passing --update-key parameter.
the export fails.
It fails because duplicare record is inserted for primary key. 
If mapper fails it runs the same task 4 times. 
this is built in default feature. 
In this case it will fail all 4 times with same error duplicate entries for primary key.

In other cases, when we dont have primary key, then if export fails then it mapper will commit in batches after say 1000 successfull insert and beyond that whatever fails is attempted to be inserted 4 times.
So data may have 4 duplicate records for last batch.
It might be the case when we are inserting null in not null column.

so sqoop export provides option for staging table with command --clear-staging-table
In this case data in staging table will be cleared and new records will be inserted in staging table. hence, target table will be secured.


we have to give following parameters:
--Merge
sqoop merge 
  --merge-key department_id \
  --new-data /user/root/sqoop_merge/departments_delta \
  --onto /user/root/sqoop_merge/departments \
  --target-dir /user/root/sqoop_merge/departments_stage \
  --class-name departments \
  --jar-file <get_it_from_last_import>



** 20. sqoop import delimiters

fields terminated by and line terminated by
null-string, and 
null-non-string
 
so if we have data having ',' or other delimiters as value then we have to enclose the values.
this can be done by using 
--enclosed-by \"
since double quotes is special charachter hence we have to escape it by back slash.

Now all data in file will be enclosed like "Fan Shop"

--escaped-by
special characters in data can be escaped using this.

--fields and lines
we can terminate filds by say | and lines by say :
and enclose by say double quotes.

all 3 above are special characters and need to be escaped.

--mysql-delimiters
provides regular mysql delimiters.

*Same arguments for import to HIVE.

login to hive shell.
use db;
then
>describe formatted departments_test;

this will show complete details of departments.

when you have null data then take special care of delimiters.




** 21.  SQOOP Export delimiters.

-1 for numeric null
and nvl for string null


In hive null is \u001
hive default terminated by \001
these are octal numbers.

input-null-string = nvl
input-null-non-string = -1

run export by above parameters

null will be inserted in mysql table.




** 22. Sqoop file formats

to import the data in binary format import data in hdfs as a sequence file.

avsc file format saves the data in somewhat json format.

so delimiters and file formats depends on data we have in the file and 
we should take care of null characters and data as well.





** 23. Sqoop Job, Merge

Sqoop job is a predefined job syntax which is created to run a sqoop command as and when required.

there should be a space between import and --

eg:
sqoop job --create sqoop_job \
 -- import
 -- connect
 other such stuff

**to see all jobs
sqoop job --list
shows a list of jobs

sqoop job --exec
to execute the job

**sqoop Merge

it merges data in hdfs not from db

so it matches on an id and picks new record from the dump.
we have to give a seperate new directory for merged results.

a java file is created for each import command.
we can to java_files directory to see all java files.

when we run sqoop import we get jar file path in the logs.
java class file name is same as that of table we are importing

so on merge, new records are inserted and existing are updated with latest value.

use any command with --help
to find syntax and commands.




***************** FLUME *****************


24. ** Flume Introduction
how to play with memory channel is main thing to learn.




** 25. flume configuration and starting an agent

**starting an agent

>flume-ng agent -n $agent_name -c conf -f conf/flume-conf.properties.template

>cd /etc/flume/conf #this is where we have template file having sqquence generator.

so we have 1st an agent named agent.
it has 3 things:
- sources, its name, type:seq, channel
- channels, name, type:memory|file, capacity:100.
- sinks, name, type:logger, channel

so in example we use sequence generator to generate log kind of data that flume will read and bring in to sink/memory.

the command we provide is like

flume-ng agent -n agent -f /etc/conf/flume-conf.properties.template

we can create our own flume conf file anywhere in and just provide the location to the -f parameter.

HISTORY:
cd /etc/flume/conf
ls -lrt
cat flume-conf.properties.template
cd
flume-ng agent -n agent -f /etc/flume/conf/flume-conf.properties.template 




** 26. FLUME - Memory channel Capacity

Maily covers properties of memory.

copy example conf file with parameters having details of net logger and web service that run on it
then copy this and paste it in any directory on local machine

>mkdir flume 
>vi example.conf

paste the contents from flume docs

type bind port type capacity all are defined here

now
flume-ng agent -n a1 -f example.conf

it will start flume agent.

now telnet from another terminal

telnet localhost 44444

type what u wish to.
.
.
.
.

this will be passed to flume agent.

the data will be transfed form memory channel

main focus should be on memory properties.

kill telnet session.

* Memory:
it has two properties:
 - capacity and
 - transaction capacity

also,

type, 
keep-alive
byteCapacityBufferPercentage
byteCapacity

may be asked to increase/decrease the capacity of various parameters

saving data to hive/hdfs is not in scope of certi.


memory can be cinfugured in conf file, mainly has two parameters capacity and transactionCapacity.

Code:

# Use a channel which buffers events in memory
a1.channels.c1.type = memory
a1.channels.c1.capacity = 1000
a1.channels.c1.transactionCapacity = 100










********************** PIG **********************



** 27. PIG Introduction

pig commands, how to use.
see if services are up and running.
HDFS, YARN, MapReduce should be up and running

PIG does not have any daemon so it will run if above 3 r running

to run command u can goto pig grunt shell

make a file in /user/root>demo.txt

bag=table
tuple=row

so when we write a pig script, behind the scene a map reduce job is genereated by api.

this is a jar file is executed in background.

take the job id from logs and goto ambari

services> yarn> quick links> resource manager using
see last job that is run
click on history to see details.

if we do not write on grunt shell then we can make pig script file.




28. ** write and execute pig latin script.

>pig
grunt>exec pig_demo.pig

this will run MapReduce job of pig.

pig -help show all possible options to be used with pig





** 29. PIG - Word Count

describe shows data type of a bag.

*explain shows MapReduce plan. how data will be read.

we use tokenize to create bag of tuples. each touple is one word.

words = FOREACH lines GENERATE FLATTEN (TOKENIZE(line)) as word;

describe words;
thos shows words as bag of tokens.
explain words shows comma separated words.

TOKENIZE breaks line into words and makes a bag of it
FLATTEN makes words in seperate line.

here word is alias.

>grouped = GROUP words by word;

this will create a bag for each word.

so key and its bag in which words are repeated.

>wordcount = FOREACH grouped GENERATE group, COUNT(words);

this will print word and number of times for each word.





** 30. pig execution life cycle

all statements are validated. MapReduce job runs only when dump/illustrate/store is executed.



** 31. LOAD data to pig relation woithout schema

so we should have mysql installed with retail_db database in it.

also this db should be imported to sqoop via hdfs.

data can be imported to /user/root/sqoop_import/

we have to use positional notation to work on relationless schema

we can cast the colums as well

dept_id = FOREACH departments GENERATE (int) $0;




** 32. LOAD data to pig relation with schema

u should have data in sqoop_import directory

department  = LOAD 'dir/sqoop_import/departments' using PigStorage(',') AS (dept_id: int, dept_name: chararray);





** 33. Load data from HIVE table.

fot this we should have HIVe, database in it and tables in it,

we have to use 
>pig -useHCatalog

this will take to grunt shell along with enbling HCatalog

so it will use meta data of hive table and will pick data types from HCatalog.

then when we describe the pig relation we see that all the fields are defined and have schema.





** 34. Transform to match HIVE schema

ok, so here we have two ways to load in pig from hive
one is using:
HCatalog, db.tablename

second:
giving location of hive table which is a file having data.

in 1st case the schema is picked from HCatalog metastore

and in 2nd case we have to define schema as (json)

task is to match schema in both the case.







** 35. Group the data on one or more PIG relation

* To get count of all rows
group the data.

so if we need count of all records then we can pass ALL.

if we need count along with where a=b then we need to pass an expression to GROUP argument

for null in pig use
!= '';







** 36. Grouping one or more relation
* Group by key

we give a key to group the data and then we can count the data.








** 37. remove null values from a relation

so in filer we just have write by column is not null.






** 38. Store data into a folder in HDFS

cannot store in existing directory.

verify if data is present in hdfs directories

then load the data into pig.

simply instead of dump use store/

pig will create just one file in new directory

PigStorage is used to provide the delimiters.

BinStorage stores the data in binary format (machine readable format).

always validate your results.

>STORE <alias> INTO <path> USING JsonStorage('|');
this stores data in json format.

so data can be stored as text, binary or Json format and other format as well.






** 39. Store the data from a Pig relation into a Hive table.

goto hive shell
create datanase pig_demo;

use pig_demo;

create tables in hive database;

goto pig shell -useHCatalog.
verify that data is in hdfs dir.

LOAD path USING PigStorage(',') as ...;

on STORE pass class of HCatalog.

STORE alias INTO 'db.tbl' USING HCatalog class();

Schema in pig has to match with column names and datatype in hive table. 
Else the STORE will not work.






40. **Sort the output of a Pig relation 

load data from hive into pig alias.

then
alias = ORDER alias by $1;
sorts by column 2.

alteast 2 MapReduce jobs for orderBy

above is without schema and sorted using positional notation.







41. **Apache Pig - Remove the duplicate tuples of a Pig relation (using distinct)

alias = DISTINCT alias [PARTITION] [PARALLEL]

[] are used to provide reducers and performance tuning.

distinct only works on the relations and not the columns






42. ** Specify the number of MapReduce job for pig script

PARTITION BY is not in scope, it is related to hash partitioning.

PARALLEL is used to give number of reduce tasks

to set default parallel value for all jobs
>set default_parallel 2;

so for each job it will use parallel tasks as many as possible.

if we provide parallel in transformational level then that many reducers will run.





43. **JOIN Theory:

IJ, OJ: LOJ, ROJ, FOJ




44. ** Pig - Join two datasets using Pig - 01 Introduction





45. ** PIG - INNER JOIN

in exam validate after each step
COUNT_STAR is a function in pig

validation at each step by describe or explain formatted is imp.

use pig HCatalog so that schema can be loaded.






46. OUTER JOIN

cannot use positional notation we have to define the schema.

without schema, join is difficult.

to access column of a table use ::






47. **Replicated join using pig

*replicated join is done when data we need to join is small enough to fit into the memory.

it uses replicated cache and the smaller file is distributed across all jvms for mappers

resouce manager is 8088.






48. **run pig using tez.
just use -x tez to run as tez engine

in pig.properties

exectype=mapreduece

this is default execution engine






49. ** registering JAR, define alias of UDF and invoking UDFs

@todo:

jar -tvf to see classes in jar

find / -name "*piggybank*.jar"

then in pig shell

REGISTER the jar

we can make alias for fully qualified class name.
this alias can be used in statement.









********************* HIVE *********************


50. Data Analysis

* to create orc table, create a text table and then CTAS from text file stored as orc.
e.g. create table sfo_weather stored as ORC as select * from sfo_weather_text;

* when we create an external table in hive then it has a location, the schema, delimiters should match the data at that location. 
  on mataching the table is itself populated with that data.

* data can be loded in hive in following way:
  - by using load data inpath:
      it can be loaded from local,
      from HDFS.
      can be appended or overwritten.
  - by using HCatalog in pig storage.
  - by CTAS.
  - INS*F

* To load data into partition table select the partition columns as well. Also if only particular partition needs to be saved them we can define them in partition (a=b,c=d). then we need not select these columns. 

E.G. LOAD DATA INPATH '/user/data/pv_2008‐06‐08_us.txt' INTO TABLE page_view PARTITION (date='2008‐06‐08', country='US')

from sfo_weather s
insert into table weather_partitioned_all 
partition (year,month)
select s.station_name,s.DayOfmonth, s.precipitation, s.temperature_min, s.temperature_max,s.year,s.month
;


51. HIVE architecture:

HIVE = HDFS, metastore, JARs which compile sql queries to MapReduce jobs

so in hive the database is a dir and inside it are directories of tables, inside them are files/

for hdfs paths onlt hadoop command can go and not linux commands.

etc/hive/conf has hive-set.xml

use this to see db used and name and password.

db=mysql
db_name=metastore

this has all metadata
it has information about the file copied to hdfs.

it is casesensitive

sudo find / -name "*hive*.jar"

these convert sql query to MapReduce jobs amd submit to hadoop cluster.






52. ** Write and execute hive query 01
this has a lot to cover with join and everything.

hive
set fs.defaultFS; #tells name node

dfs -ls /user/root # tells ki hive can connect to hdfs

simply write the hive queries and it executes as a map reduce job.

when we load data from hdfs, that is, load data inpath, then the directory is deleted after succesfull import.



53. ** Write and execute hive query 02

queries on githubusercontent

* like insert into table, we have insert overwrite table.
* the partition column in table cannot be a normal column in table. It is sepecified separately.
  the values are also not stored in file but are picked from folder names.

* to insert into partition column we ins




54. ** HIVE Managed Table.

it is simple table created using query.




55. ** HIVE External table.

to copy file form mac to sandbox use scp command.

>scp host guest

then use put to copy file to hdfs

In EXTERNAL table we can define a location where we can store a table.

When we delete a table only metadata is deleted adn not the files stored/

for managed table use describe formatted and see the directory is a default one.

in external we hve to specify

if table is to be used by pig hive spark and others then make external table
for hive use only use managed table.





56. **Create retail_db tables in hive

in exam use STORED AS AVRO  un;ess they give custom input format and output format.




57. **Create Hive Partitioned Table

create table (...)
 partitioned by (col datatype)


Type of partitioning:
-list
-range
-hash

these are in hive but without terminology.

in hive we have list partitioning as partition by 
and hash paartitonjing as bucket.

so when we partition we create one more colimn on which we partjioon and this can be an existing column or can be a new column as well.

then for each distinf records inthat column that many folders are created inside a table folder;

so the partion column is not stored in the data file.
when we do select form tbale then value of the partiton column is picked from the folder name it self.

we can either alter table to create a static partition in which er pass a vluer for a column or we cna create dtynamic partition in which we hive created partition on runtime itself.

strict mode should be off is we use dnamic partition.



58.  ** BUcketed table.

CLUSTERED BY [col] SORTED BY [col] INTO n BUCKETS

in partition we mention col names and data types both but in case of buciket we only mention the col names and not the data type;

you can create a bucket and partition seperately but
you in case of both you first have to create a partition and then create a bucket.
after creating a bucker you cannot create a partition.

advantage of bucketing is to divide sdata into equal parts.
we cna use fast sampling queries onthat data.





59. ** CTAS AND ORC file formats.

ctas = create table as select.

for ORC


create table ..
 ....
use STORED AS orc
as
select ..

show create table orders_orc;
#shows complete sql to create table.





60. **Specifying file format and delimiters

formats can be file format like text, rcm orc, paraquet, avro
also we cna use cutom input format and output format.
then we have to give sede class file as well.

so just have to pass stored as .


delimiter row format fields terminated by..






61. **Load data from local file system and HDFS to Hive table

LOAD DATA LOCAL INPATH 
load data from local file system, cent os

LOAD DATA INPATH 
loads data from hdfs.

overwrite onto will delet else will append,

load data inpath moves the data from hdfs hence it delets from hdfs.





62. **Load data from hive select query (using insert) and compressed data

insert overwrite table select * from..

else the data will be appended..


so COMPRESSED will compress the data in file.

set hive compress value to true.
by default it is false.





63. ** DML in HIVE. insert update delete.

there are limitations. begin commit and rollback are not supported. 
rest all is auto commit.

only orc file format is supported in update and delete.

hive.txn.manager should be set to DBTxnManager.

tables must be bucketed.

so for dml operations we should have 3 things in table structure.
1. clustered into buckets.
2. stored as orc
3. tblproperties ('transactional'='true')

then only we can make a table ready for update and delete.

for next insert it will again create new directory, having n buckets in each.

for update also new directoy is added. over the time compession will take place and all files will be merged into one file.

only soft delete happens that is data becomes unavailable and will be cleaned on compession.





64. **Hive joins, execution engines (tez and mr) and explain/execution plan

set hive.execution.engine=tez;

this will make query run in tez engine.

so for exam remember the parameter that needs to be changed.

*execution plan:
explain can be used to explain the execution of the query.

practice more in joins from certi point of view.




65. **Hive Sub Queries and Total Ordering (ORDER BY)

cannot use sub query in IN clause.
can only be used in from clause.

subquery should have alias.

*SORT by: this can be used when we donot have to order entire data.

so basically in this use order by on a derived column having an alias.
like order by count in group by query.






66. **Practice Exam - Getting Started.







*************** Setting up AWS *************

password of amazon account.
used ICICI credit card ending 8009, CVV not asked.


Download KeyValue pair for ssh and save it.

connect vnc on public dns and using port 5901.
password for vm is hadoop, when asked in vnc viewer.

launch terminal
run $ ./start-all-services.sh
this will launch ambari.

ambari has username and password ambari.

wait while services are up and running.

exam overvirew gives all this information, like launching and username, password.

perform all taks using user horton, not root.
veriy by whoami

in exam directory we have exam task.

about 10 questions, 2sqoop, 1hdfs, 3pig, 4hive. may b 1 flume.

stop the instance if you need break. we can continue from where we left when we resume.

* Practical:

Public DNS: ec2-54-201-130-145.us-west-2.compute.amazonaws.com
Public IP:  54.201.130.145

To SSH:     ssh -i ~/Downloads/hwx-practise-exam.pem ubuntu@ec2-54-201-130-145.us-west-2.compute.amazonaws.com

then sudo su - horton

then start working by starting script.

* To copy from aws vm:

scp -i ~/Downloads/hwx-practise-exam.pem ubuntu@ec2-54-187-249-103.us-west-2.compute.amazonaws.com:/home/horton/solutions/a.txt ~/Downloads/datasets/sol/




*********************** Mains ****************************

Passport ID proof. Original and copy.
1600x900 monitor
15minutes before we can start the exam. so for 6-8 slot.
5:45 exam start.
5:30 everything up and running. Mobile DND on, 4G on. 
5:00 home. 
4.45 leave office.

