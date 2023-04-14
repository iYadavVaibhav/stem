# JSPs and Servlets Notes

## Setup:
- We use Tomcat as server. Download and browse it to new server.
- Runs at 8080 as localhost.
- makes a project in eclipse which are files and can be configured.


## Simple Servlet:

- Create new web > dynamic web project.
- keep everything default.
- WebContent has WEB-INF having web.xml file.
- It has configuration about default page and web app.
- javax.servlet.http.HttpServlet - super class for servlet.
-  
- to print from servet we use PrintWriter = response.getWriter();


## Understanding Servlet:
- Tomcat runs servlet by path mentioned in annotation.
- it does not run by javaClass.
- it run by servlet path.
- it is defined by urlPatterns = {"path"}

- Say Tomcat has many web apps. 
- it creates request n response objects.
- from url it runs a particular servlet depending upon annotation or web.xml.
- then 2 object req n res are passed to SimpleServlet.
- it process and sends data to response object.
- goes through PrintWriter.
- then the page is rendered.
- req n res are two params in doGet() method.


## Simple XML configuration:
- in wed.xml we can define path.
- deployment descriptor.
Instead of annotation we can write:
```xml
	<servlet>	
		<servlet-name>xmlServlet</servlet-name>
		<servlet-class>org.vby.XmlServlet</servlet-class>
	</servlet>
	
	<servlet-mapping>
		<servlet-name>xmlServlet</servlet-name>
		<url-pattern>/xmlServletPath</url-pattern>
	</servlet-mapping>
```

**Why web.xml?**
- annotation started from java v5.
- dont have to compile or change the code.


## POST method and passing parameters.
- response is the object we need to work on.


## HTTP is stateless:
- we can set session attributes and get them when needed.
- we can get session by:
	`HttpSession session = request.getSession();`
- then we can use session.get/set for values and variables.

## Making object persistent across browsers.
- sessions can save data but what if we want to save object.
- so that value needs to be saved across application.
- shared across servlets and users/browsers.

- we can use context object for the same. 
- `ServletContext context = request.getServletContext();`

---
END