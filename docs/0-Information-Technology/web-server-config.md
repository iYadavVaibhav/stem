---
description: Web Server Configuration Guide - Ubuntu Apache WSGI Python Flask MySQL PHP
date: 2020-07-14
---

# Web Server Config

Web server can be a linux server that takes client requests and provides a response. It can host a web app. Web app can be backed by a programming language that and process data and store this data in  a database.

In this article we would be covering all that is listed in contents below. It is assumed that you have a machine with Ubuntu server installed. It can be on cloud like [GCP](../google-cloud-platform-notes) or AWS etc, or it can be on a virtual machine via [Vagrant](../vagrant-virtualbox-notes) and Virtual Box.

- Do not remove this line (it will not be displayed)
{:toc}

## Ubuntu Server Configuration

Now that you are connected to host VM via SSH, let's start with:

- Updating Ubuntu: `sudo apt update && sudo apt upgrade`
- Check ram and CPU usage `htop` , we see that we do not have swap memory, this helps in low ram system when on high load.

Adding the swap memory:

- Lets allocate 1GB swap memory: `sudo fallocate -l 1G /swapfile`
- `sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576`
- Assign the correct permission to swapfile: `sudo chmod 600 /swapfile`
- make the swap: `sudo mkswap /swapfile`
- Turn on the swapfile: `sudo swapon /swapfile`
- edit the fstab file: `sudo nano /etc/fstab`
- add this line to the end of file: `/swapfile swap swap defaults 0 0`
- mount the files: `sudo mount -a`
- Check ram and cpu again to verify swap: `htop`

## Install Apache2 PHP and MySQL using LAMP

Install the softwares using below commands:

- `sudo apt install tasksel`
- `sudo tasksel install lamp-server`
- `sudo apt install php-curl php-gd php-mbstring php-xml php-xmlrpc`
- Get the external IP address: `curl ifconfig.me`
- Type <http://123.456.789.10> , the external IP address in browser to see served page.

## Domain Configuration

Now we need to point the domain to this webserver so that we can access files server. We will use `example123.com` in this example.

Only if you do not have a domain to point to server and want to use vhost:

- Modify the host file to add virtual hosts: `sudo nano /etc/hosts`
- To map 'example123.com' tp IP address add this line: `35.111.00.111 example123.com`

If you have a domain,

- edit DNS records and add 'A-record' with the external IP address, for eg:
- host: *
- IP: 35.111.00.111
- then, `example123.com` will open the page from GCP VM machine.
- You may also reserve static external IP address of VM on GCP:
  - From your GCP dashboard find 'Networking > External IP addresses'.
  - Now click the down arrow under the 'Type' column and select 'Static' for the External IP address which is connected to your instance of GCP Compute Engine.
  - By reserving a Static IP Address you will not loose your access to website after server outages or restarts.

Point a domain to external IP Address:

- To Name servers, add DNS name server, eg, `dns1.india-to.com`
- on DNS Management of the DNS server
  - add Host Name '@', record type 'A (Address)', then your IP Address
  - add Host Name 'www', record type 'A (Address)', then your IP Address

### Add sites to Apache Server

Now we need to enable sites on apache we server to connect domain with dir of files to be served by this server.

- `cd /etc/apache2/sites-available/`
- `ls -l`
- Copy configuration file for new domain to be added: `sudo cp 000-default.conf example123.com.conf`
- Let us switch to root user: `sudo su`
- edit: `nano example123.com.conf` and add following content to file:

```py
<Directory /var/www/html/example123.com>
  Require all granted
</Directory>
<VirtualHost *:80>
  ServerName example123.com
  ServerAlias www.example123.com
  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/html/example123.com

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

- disable default site: `a2dissite 000-default.conf`
- enable new site: `a2ensite example123.com.conf`
- restart apache service: `systemctl reload apache2`
- go to web documents location: `cd /var/www/html`
- create directory for new site: `mkdir example123.com`
- `cd example123.com` go in the directory.
- `nano index.html` create an html file.
- Now open browser and goto 'example123.com' you should see the contents of index.html.

## MySQL Database Configuration

Now we will configure MySQL database so that we can use that in our web apps.

- `mysql -u root`

```sql
> CREATE DATABASE db123;  
> GRANT ALL ON db123.* TO 'db123_user' IDENTIFIED BY 'db123_pwd!';  
> quit;  
```

- Secure the installation `mysql_secure_installation`, select Y for all or as per your need.

Configure PHP:

- `nano /etc/php/7.2/apache2/php.ini`
- update:

```py
upload\_max\_filesize = 20M  
post\_max\_size = 21M
```

Congratulations, can you believe we are already done! We can create and host any webapp on one of the Worlds biggest cloud infrastructure, GCP, and its scalable!

## Wordpress Installation on Ubuntu Server

Now that we have Apache, PHP and MySQL configured, connected and working together, we can start developing web apps. Wordpress is a easy to use CMS in PHP, lets get started with installing wordpress.

- `cd /var/www/html/example123.com/`
- download wordpress: `wget https://wordpress.org/latest.tar.gz`
- Unzip the file `tar -xvf latest.tar.gz`
- `mv wp-config-sample.php wp-config.php`
- `nano wp-config.php`

## Web Server Tuning

Configure MPM_Prefork.conf to manage apache load performance:

- `nano /etc/apache2/mods-enabled/mpm_prefork.conf`
- Update to below:

```py
<IfModule mpm_prefork_module>
  StartServers    1
  MinSpareServers   2
  MaxSpareServers   5
  MaxRequestWorkers 10
  MaxConnectionsPerChild  1000
</IfModule>
```

Tune the new Apache install:

- `cd ~`
- `wget https://raw.githubusercontent.com/richardforth/apache2buddy/master/apache2buddy.pl`
- `chmod +x apache2buddy.pl`
- `./apache2buddy.pl`
- This perl script tells the health of Apache server.

User guides:

- video used: [YouTube](https://youtu.be/vIJdypOqlL4)

## How to add multiple domains on Apache Web Server

We can host multiple sites on one server with vistual hosts in Apache.

- create conf file `cd /etc/apache2/sites-available/` then `sudo cp 000-default.conf addonDomain.com.conf`
- open conf file using nano, then edit

```py
<Directory /var/www/html/addonDomain.com>
  Require all granted  
</Directory>
<VirtualHost *:80>
  ServerName example.com
  ServerAlias www.example.com
  ServerAdmin admin@example.com
  DocumentRoot /var/www/example.com/html
</VirtualHost>
```

- make folders `mkdir var/www/html/addonDomain.com/`
- enable site:

```py
a2ensite example.com.conf
systemctl reload apache2
```

- More details [here](https://www.hiyansoft.com/blog/cloud/google/hosting-multiple-websites-on-single-google-cloud-compute-engine/index.html).

## Serve Python files on Apache Web Server

Python files can be served via CGI or WSGI. Python is language, Apache2 is webServer, CGI and WSGI are protocol to help web server and language talk to each other.

### CGI Scripts

Common Gateway Interface or CGI provides interface for web server to serve HTML from console programs like Python.

- By CGI we can directly open `index.py` in browser and it works like PHP file. It outputs the result of the script file.
- default directory is `/usr/lib/cgi-bin/`, you can add, `hello.cgi` here and open in browser.
- enable in apache: `a2dismod mpm_event`
- enable cgi module: `a2enmod mpm_prefork cgi`
- to make new dir for cgi files, add following to site conf file:

```py
<VirtualHost *:80>
  ...
  <Directory /var/www/html/cgi_dir>
    Options +ExecCGI
    AddHandler cgi-script .py .cgi
    # DirectoryIndex index.py
  </Directory>
  ...
</VirtualHost>
```

- CGI runs script when requested, where as WSGI runs script with start of WebServer.


### WSGI

Web Server Gateway Interface or WSGI is a simple calling convention for web servers to forward requests to web applications.

- `mod_wsgi` is an Apache HTTP Server module that provides a WSGI compliant interface for hosting Python based web applications. It is an alternative to CGI.

#### Flask, WSGI and Apache2 on Linux [Hands On]

Assuming you have a working apache2 server and you have python installed. Next we need to install pip and WSGI module.

Python 3:

- `sudo apt-get install libapache2-mod-wsgi-py3`
- `sudo apt-get install python3-pip`

Python 2:

- `sudo apt-get install libapache2-mod-wsgi`
- `sudo apt-get install python-pip`

Enable WSGI and install flask:

- `a2enmod wsgi` enable the WSGI module in apache.
- `pip3 install flask`

Set up directory and flask files:

- `mkdir /var/www/apps` this contains all flask apps.
- `mkdir /var/www/apps/blog` this is our first app.
- `mkdir /var/www/apps/blog/lib` this contains code for our blog app.
- `mkdir /var/www/apps/blog/lib/static` this will serve static files for our blog app.

Make flask app:

- `sudo nano /var/www/apps/blog/lib/main.py`

```py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello from Flask blog app!'

if __name__ == '__main__':
  app.run()
```

Make this folder as python module, (important):

- `touch /var/www/apps/blog/lib/__init__.py`
- We created `__init__.py` as a blank file. This is important and is required to import our lib folder as a python module. Now we can import `lib.main` in wsgi file.

Add the wsgi file:

- `sudo nano /var/www/apps/blog/app.wsgi`

```py
import sys
sys.path.insert(0, '/var/www/apps/blog')

from lib.main import app as application
```

Configuring virtual hosts conf file to make it work:

- **Imp**, in exmple below, replace 'myapps.com' with your domain name.
- `cd /etc/apache2/sites-available/`
- add a site file `cp 000-default.conf myapps.com.conf`
- `nano myapps.com.conf`

```py
<VirtualHost *:80>
  ServerName myapps.com
  ServerAdmin webmaster@localhost

  # This is path for homepage of myapps.com
  DocumentRoot /var/www/html/myapps.com

  # App: blog, URL: http://myapps.com/myblog
  WSGIScriptAlias /myblog /var/www/apps/blog/app.wsgi
  <Directory /var/www/apps/blog>
    Order deny,allow
    Allow from all
  </Directory>
  Alias /myblog/static /var/www/apps/blog/lib/static

  # Enables passing of authorization headers
  WSGIPassAuthorization On

  # logs configuration
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

- `a2ensite myapps.com.conf` enable the site.
- `service apache2 restart` restart the service.
- Now visit `http://myapps.com/myblog/` to access app.

If you see errors:

- `tail -30 /var/log/apache2/error.log` shows you error logs from apache server.

---

#### Multiple Flask apps and adding user and group to process

- Add new user `adduser apps`, remember password here
- update primary group `usermod -g www-data apps`
- give permission to group `chmod 775 /home/apps`

- login with new user `apps`
- `git clone the_web_app.git`
- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip3 install -r requirements.txt`
- `touch __init__.py`
- add `app.wsgi`

```py
#!venv/bin/python3
import sys
import logging
logging.basicConfig(stream=sys.stderr)

sys.path.insert(0, '/home/apps/todo')

from lib.main import app as application
```

Apache v-host file:

```py
<VirtualHost *:80>
  ServerName py.ess.com
  ServerAdmin webmaster@localhost

  DocumentRoot /var/www/html/py.ess.com

  WSGIScriptAlias /site1 /var/www/apps/app1/app1.wsgi
  <Directory /var/www/apps/app1>
    Order deny,allow
    Allow from all
  </Directory>
  Alias /site1/static /var/www/apps/app1/static

  WSGIScriptAlias /flap /var/www/apps/flap/app.wsgi
  <Directory /var/www/apps/flap>
    Order deny,allow
    Allow from all
  </Directory>


        WSGIScriptAlias /todo /var/www/apps/todo/app.wsgi
        <Directory /var/www/apps/todo>
                Order deny,allow
                Allow from all
        </Directory>

  WSGIDaemonProcess todo-client user=apps group=www-data threads=5
        WSGIScriptAlias /todo-client /home/apps/todo/app.wsgi
        <Directory /home/apps/todo>
    WSGIApplicationGroup todo-client
    WSGIProcessGroup todo-client
                Order deny,allow
                Allow from all
    Require all granted
        </Directory>
  Alias /todo-client/static /home/apps/todo/lib/static
  WSGIPassAuthorization On


  # WSGIDaemonProcess site2 user=myserviceuser group=myserviceuser threads=5 python-home=/$
  # WSGIScriptAlias /site2 /var/www/apps/app2/application.wsgi
  # <Directory /var/www/apps/app2>
  #     WSGIApplicationGroup site2
  #     WSGIProcessGroup site2
  #     Order deny,allow
  #     Allow from all
  # </Directory>

  # logs configuration
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```

Note:

- ensure group has permission to database and log directories.

To Do:

- WSGIDaemonProcess helloworldapp user=www-data group=www-data threads=5
- WSGIProcessGroup
- Multiple Apps: Apache virtualhost is only for domain/sub-domain, to add more apps with different directories, add directory tags to configuration file. If the two Flask apps are running on the same domain just as subfolders, then you only need one VirtualHost but you’ll need multiple WSGIScriptAlias directives.

Links:

- [Muiltiple flask apps usgin Apache2 and Ubuntu](https://stackoverflow.com/questions/29882579/run-multiple-independent-flask-apps-in-ubuntu).
