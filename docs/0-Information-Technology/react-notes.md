# React JS Notes

_here are notes on React JS Library_

## React JS Overview

_added: 12-07-2022, updated: 26-07-2023_

**What** - It is a JS Library, it can be added to HTML page as other JS libraries (like jQuery). It is used to create **single-page applications**. It uses only one HTML page `index.html` and then all changes to page and routes are managed **strictly** by JS events.

**How** - You build DOM elements using JS rather than defining them in HTML. To do this easily, use JSX, which is a format that is combination of HTML and JS and it lets write HTML in JS.

**Tools Setup**:

- Build in Browser using <https://react.new/>
- Upgrade browser with `React Developer Tool` browser extension. It shows react components.


## Quickstart - Traditional Style - Use Without Node.js

You can use react as other JS library by adding script to HTML. Both React and ReactDOM are available over a [CDN](https://reactjs.org/docs/cdn-links.html). Add following to the body of HTML.

This makes `React` and `ReactDOM` classes available in JS. `React.createElement()` function is used to create new DOM elements. `ReactDOM.render()` function to render elements in DOM.

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React without JSX</title>

    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

</head>

<body>
    <div id="root"></div>

    <script type="text/javascript">


        const element = React.createElement(
            "h1",
            { className: 'greeting' },
            "Welcome User"
        );

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(element);

    </script>
</body>

</html>
```

Here, a DOM element, `element` is defined using `React.createElement` which takes `createElement(type, props, ...children)`. Type is DOM elem type like p, h2, div. props are properties of type. and then children. It can be multiple children, here we are only passing one child, which is text `"Welcome User"`.

Next, we define `root` which is used to build rest of DOM tree. Finally, we render root by adding `element` to it.

You see how HTML is now written in JS. To make it simple, JSX is introduced which lets write HTML and JS together.

**Adding JSX and Babel**

Traditionally, HTML is written as string, eg `"<h1>"`. Using JSX, you can write HTML in JS.

**JSX** is not HTML, JSX is JavaScript XML, an extension of JavaScript that allows writing HTML in JS. To execute it, we need a _compiler_ that can convert JSX to JS and HTML, because browsers still expect HTML and JS separately as in traditional way.

**Babel** is a JS compiler. You can insert plane HTML without quotes. Also add variable names with JS code within curly braces. Eg: `<p>Hi {name.toUpperCase()}</p>`.

Babel converts JSX `<p>Hi</p>` to JS `React.createElement("p", null, "Hi");` on the fly.

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React JSX</title>

    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone@7.10.3/babel.min.js" crossorigin></script>

</head>

<body>
    <div id="root"></div>

    <script type="text/babel"> // type is changed from javascript to babel

        let msg = "Tom";

        const root = ReactDOM.createRoot(document.getElementById('root'));

        root.render(<p>Hi {msg}</p>);

    </script>
</body>

</html>
```

Here, first we added babel script to html body. Next, in `<script type="text/babel">` type is changed from javascript to babel. This tells comiper to change this before run. Then, in `render()` you can see how html and js are written together without using  `React.createElement()` or HTML with quotes.

JSX and JS go one in another and can be _nested_ using `{}`s. When you start JS put in {} , then can again write HTML and again nest JS in {}. Babel can be said it is similar to Jinja in Flask or Blade in Laravel.

**Conceptually** - Using React, HTML can be written in JS, which renders it and adds it to a HTML DOM element, eg `root`. Now that it is in JS, it can be programmed and be data driven and dynamic. To manage the HTML code we split the UI into independent and reusable `Components`.

This _completes_ the basic. Now that you have seen how react works and done it all in single `html` file, it's time to "raise the bar". In next section you will use `node` and create react app. Using single html file is okay for prototype but for production you should use node app. Lets GO....!


## Quickstart - with Node.js

Node.js creates structure for react project with Babel, file bundling etc. You can start from scratch as react-starter-pack or use an existing project.

**Create new**

```sh
npx create-react-app app_name
```

This, creates a folder, `app_name` with all required libraries like react, react dom, babel, react scripts etc.
NPX is a package in node that lets you run and execute packages without having to install them locally or globally. Now do

```sh
cd app_name
npm start
```

This will run a web server using node and serve this app on `http://localhost:3000` as a dev build.

**Use Existing Project**

To run an existing react project, that you have downloaded. It would already have `package.json`. You need to install all the dependencies locally and that can be done by

```sh
cd old_app_name
npm install
npm start
```

It uses `package.json` to install all dependencies. Then starts the web-server.

**Application Structure**

The folder above `app_name`, has following files and folders:

- `package.json` - All dependencies can be seen in this file. Also, in `package-lock.json`
- `node_modules` dir has all dependencies installed by Node.js.
- `src` is where you **code**, it has app code. It has all React Magic of JSX.
- `public` dir has what goes to browser, it is used to serve app. It has index.html and other static files.
- `public/manifest.json` - it is not react specific. Modern web standard adds it, it provides information about the app in JSON format. It is used by mobile and desktop when we install this app. We can update `short_name` and `name` here.
- `build` dir will be *added later* when you create a prod build.

Basics of website is `index.html`, it is the same here, `public/index.html`. It defines the old giants: html, head, meta tags, title and body.  It has `<div id="root"></div>` which is picked by react and then your GREAT single-page app is built on top of it! React will build DOMs and render it in this "root" element. This will be "root of your tree" :) .

The react magic starts in `src/index.js`, this picks the root div from html and builds the app. This is where you see new things. `index.js` is entry point to render app to DOM. `public/index.html` has `<div id="root"></div>` that is used in `index.js`. The `render()` function renders the app and takes JSX tree, as argument, that structures the entire app.

**What is this new kinda JS code?**

Any code that is non-JavaScript standard like "import of file" and "JSX" are converted to standart-JavaScript then they are served on browser. Eg of non-std-js

```js
import varName from 'filename.ext'
// pull any file say image as var

import "./styles.css";
// add css to head
```

The codes above are from starter-code, they are _non-std code_ and are later _compiled and transformed_ to make it standard JS code and execute on browser.

JSX uses CamelCase while HTML uses lower case.


## Third Party Packages

As project proceeds, you can make use of other packages that like UI framework BootStrap.

```sh
npm install bootstrap@5.2.0 react-bootstrap
```

Here, the it adds two packages:


- `bootstrap`: UI framework.
- `react-bootstrap`: a React component library wrapper for the bootstrap package.


## React Components

You know HTML gives you div/p/h1/span standard components. You use them to build structure of page and add your data to it. This builds your website, right?

Now, using react, you build custom "super-powered" components like:

```js
<Header name="Sara" />
```

Imagine, this is your styled header, with all branding and functionality you want and it changes with data you pass.

To define it, react lets you define it as a function that accepts parameters or go OOPs style and define it as a class.

```js
function Header(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

It is that simple...! Isn't it?

This lets split whole page in to **independent, dynamic, resuable components**. Hence, it is eaisier to manage and control them using JS.

**React Component** is a building block of app, one of the UI component (same as a template in Flask). Eg, `Header`, `Sidebar`, `Content` and `Footer`.

**Conceptually** components are like JavaScript functions. They accept arbitrary inputs (called **“props”**) and return React elements (JSX) describing what should appear on the screen. Here is complete code, within `src` each component is defined in its own file, eg, `app.js`, `header.js`.

```js
function Header(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header name="Sara" />;
```

`export default App` means export this component (function) as default `App` component.

So previously we could only render standard tags like `<div>`, `<p>` etc. but now can render custom tags like `<Header />`, also pass properties (props) to it. Remember, every `ComponentFunction` follows CamelCase. It should return only one JSX tag like `<div>`, `<p>` or `<Header />`. To return muliple elements, wrap them in div, and if you want to avoid extra divs added to dom, use `<React.Fragment>blah blah</React.Fragment>` or shorthand `<> ... </>`.

Props make components **dynamic**. You can use logic in any component, like hiding sidebar when loggin in. Props is basically an `JSON object` (key-value), its properties can passed in JSX in same way as we pass props in HTML `<App name="Tom" yob={1990}>`, they are passed where we render a component. It can be recieved as `function App(props)` or as using ES6 as `function App ({name, yob})`.

A component must return a representation of itself as an HTML element tree.

**Javascript tricks to use in React**

To **loop** lists of elements use `map()` of `Array` class. You can map a function to an array, that is, apply a functions to each element of array and return the applied value for each of them.

```js
choices = ['Yes', 'No', 'May be']

choices.map(choice => {
  return <li>{choice}</li>
});
```

The above returns three `<li>` elements.

React required 'key' for every dom element so that it can maintain their state.

and include a `key` attribute with a unique value per element. React requires it to efficiently rerender only part of list.

eg, `<p key={data.id}></p>`

**Conditional** Logic: you may need to apply if-then or if-then-else when returning DOMs. Eg, if there are post then return post else return 'User has no posts.'. This can be implemented in React using `&&` (if-then) and `?:` (if-then-else) operators. Expression on right of && is executed when left is true. Eg,

```js
function Posts() {
  const posts = [
    {id: 1, text: 'Hello, world!'},
    {id: 2, text: 'The Next Post'},
  ];

  return (
    <>
      {posts.length === 0 ?
        <p>There are no blog posts.</p>
      :
        posts.map(p => {
          return (
            <p key={post.id}>{post.text}</p>
          );
        })
      }
    </>
  );
}
```

Ways to handle conditional in JSX, [JSX Conditional Expressions](https://stackoverflow.com/questions/40477245/is-it-possible-to-use-if-else-statement-in-react-render-function)

Good **strategy** is to build multiple components with each having one purpose. Eg, `Header` `Sidebar`. Add `ContentArea` that can be swapped based on navigation.

Components can be **nested** to build hierarchy. Eg,

```js
<Body name="Tom">
  <Posts />
</Body>
```

If the component is called with children, like above, then a `children` key is included in `props` object, which is equal to child components, here `<Posts />`.

```js
function Body({name, children}) {
  return (...);
}
```

**Class Implementation**

Component can also be a ES6 Class, that `extends React.Component` and implements `render() {}`.

```js
class Post extends React.Component {
  render() {
    return <h2>Post Title!</h2>;
  }
}
```

**React-Bootstrap**

React-Bootstrap provides `Container` and `Stack` components to design layout of website.

```js
  return (
    <Container fluid className="App"> // className is HTML class
      ...  // <-- no changes to JSX content
    </Container>
  );
```

**Strategy of components**

- build base components like `header`, `content` `footer`.
- use them in pages.

## Hooks

**useState Hook**

useState is a function in React class that can be used to manage state of App.

`useState(arg)` arg can be any data type.

it returns array having `[stateValue, setStateFunc] = setState("a Value")` we can use them in app to manage states. We can have multiple states of app, so make multiple instance of this function.

Whatever is the variable, the setter works for it, don't think of how this function is defined.

**useEffect Hook**

These are like eventListners that can listen to some variable and if there is a change in its state they can do something.

`useEffect(funcDoSomething, [varToListenTo]);` when arg2 changes, arg1 is executed. arg2 = [] then only run once, arg2 can have multiple vars to listen to.

**useReducer Hook** can be used to manage state and effect at once.

It takes two arguments, arg1 is function to execute on state change, and arg2 is initial state value.

It returns, 1 state value, 2 function to change state. Eg, state is counterValue

```js
const [counterValue, setCounterValue] = useReducer(
  (a) => a++, //
  0
);
```

ToDo: Need some more understanding here on, how to use reducer to do different action based on param passed?

## Handling Forms

_added: 14-07-2022, updated: 26-07-2023_

Uncontrolled Component: `useRef` we can create instance of this function and attach that to form inputs.

```javascript
const empName = useRef();

<input ref={empName} ...>

// on Submit

a = empName.current.value; // GET
empName.current.value = 'A'; // SET
```

We can get and set the values using `empName.current.value`

Controlled Component: `useState` and bind to input tag using `onChange`:

```javascript
const [empName, setEmpName] = useState("");

<input value={empName} onChange={ (e) => setEmpName(e.target.value) } ...>

// on Submit

a = empName; // GET
setEmpName("A"); // SET
```

**Custom Hooks**

We can create our own custom hooks that can be reused based on our requirements. They have to start with `use...`. They instantiate another hook within them. Eg, we can make a custom hook to handle form events like setting default value, getting current value, onChange events, validation etc.

Others: formik.org, react-hook-form.com, usehooks.com

## Routes

React makes SPA, only one page is served from server. So `react-router-dom` is library that can be used to manage routes on browser.

In `index.js` or`App.js` you can create `<Route>` in `<Routes>` having `path` and `element`.

```javascript
import { App, About, Contact } from "./App";
import { BrowserRouter, Routes, Route, Navigate } from react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

You can link routes to create hierarcy. Use `{ Link }` a XHR, to add link to component in DOM. It is like `url_for` in Flask.

**Routes with Bootstrap**

Bootstrap has `Nav.Link` component that creates nav-item, it has `as` and `to` props to work with React-Route's `NavLink`.

```js
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Navbar sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}
```

**Parameters and Routes**

To define a route with a dynamic section, the path attribute of the Route component uses a special syntax with a colon prefix:

```js
<Route path="/user/:username" element={<UserPage />} />
```

The component referenced by the element attribute or any of its children can use the `useParams()` hook function to access the dynamic parameters of the current URL as an object.

## Development and Structuring

Following steps can help you build a React App:

1. Plan the UI that you want to build as a wireframe or sketch.
2. Break the UI into top level Components like header, sidebar, content and footer.
   1. Build these components and place in `src/components`
3. Think of logical pages that use the above components but have different low level componenets. Eg, ProfilePage and FeedPage, both have header, sidebar and content BUT the content will have different sub-components like profile or posts.
   1. Build these components and place in `src/pages`
4. Build routes for these Pages and update the header.

State - use to set and get data, like responses, session variables and state (loading, error, done)

Effect - use to do functionality like - fetch, or any function.

If a function returns JSX then it is a react component.

## Testing

`Jest.js` is used to write test.

## Deployment

App can be deployed to Netlify.com

Do `npm run build` and then `build` folder has prod ready code to deploy.

## React Way

- there is a JSX tree which has components
- components are mostly UI blocks, or transparent utility like Routes, Context.
- `Props` are variables that you can send to component to make them dynamic or reusable.
- **url parameters** are managed in `useParam` hook
- **data** is managed by `useState`
- any **work** like, backend call, update state, re-render component is done using `useEffect`. It has dependencies, which can be param or prop.. so
- URL **param and prop can trigger effect**, effect can do **calls and set state** which **re-renders**. This is URL param, to trigger effect, to re-render, thus things get dynamic in react-way.
- if anything in useEffect arg2-dependency-var changes, it executes arg1-function which sets state var, which rerenders components.
- Eg, in code below, as soon as username changes in url, it updates `username` which is dependency vriable in `useEffect` so it runs async, which fetches new user and then sets user, which is re-rendered in component.
- The better your backend is structured, models, rest, pagination etc. the better it is to use react and bootstrap. So base has to be structured.
- Never render contents directly to the page with DOM APIs, as this introduces a risk of XSS attacks.


```js
// url: /users/:username
const { username } = useParams();
const [user, setUser] = useState();

const api = useApi();

useEffect(() => {
  (async () => {
    const response = await api.get('/users/' + username);
    setUser(response.ok ? response.body : null);
  })();
}, [username, api]);

return (
  <p>user.name</p>
);
```

## Extras

Notice here, that it is not only JS packages but also CSS frameworks like `bootstrap`. CSS are loaded to HTML using JS line

```js
// Load only css file
import 'bootstrap/dist/css/bootstrap.min.css';

// Alternatively, load entire library
import Container from 'react-bootstrap/Container'
```

## Resources

Links

- React Tutorial Miguel Grinberg - <https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-2-hello-react>
- LinkedIn Learning - <https://www.linkedin.com/learning/react-js-essential-training>
- React Docs - <https://reactjs.org/docs/hello-world.html>

Next

- ReactNative
- GraphQL

## ECMA 6+

ECMAScript is a JavaScript standard meant to ensure the interoperability of web pages across different web browsers.

ECMA 6 or ES 6 or ECMAScript 2015, added new feature to javascript which are highlighted below.

Some changes in ES6 compared to ES5

### Variables

`let` is used to allow block scope of variables.

`const` is used to define a fixed value to variable, if it changes, it throws error and does not allow to change.

Template strings are used to print formatted strings. use `Name is $(fName)`, here fName is a variable. it cna be multiline too.

```js
let greeting = `Hello, ${name}!`;
```

### Functions

`for ... of` new for loop.

```js
for (name of names) {
  console.log(name)
}
```

`new Symbol()` can be added to an object (dict) to give it a unique identifier that never conflicts with its other keys.

`new Map()` is new data type that can be used to hold key and value of any type, we can have non-string keys. We can mix the data types. both key and value can be value or key. it is iterable in order of insersion.

`new Set()` have unique values. it has index 0,1...n.

`...` is spread operator and is used to flatten an array.

Object's key/values can be functions as well. In this case objects behave as class having static instance.

**Desctucturing** - If in function argumnet we see `{}` thats destructuring of object. We can only recieve key of object using this syntax. Eg, `function App ( {emp} ) {...}`

```js
// destructuring array
const [a,b] = [1,2]; // a=1, b=2

// destructuring object
const {p,q} = {p:1,q:2} // use same key name
// p=1, q=2
```

### Import and Export

Now you can import functions from modules that export it. This is more robust dependency management compared to using `<script>` tag.

A JavaScript module is a JS file. It can have a function with `export` to make use of it in another file. Or import entire JS file.

```js
export GRAVITY = 9.81;
export default function abc() {
  console.log('from abc in file1.js !');
}
```

Another file can import it. As it is `default`, it can be imported with any name.

```js
import abc from './file1.js';
import { GRAVITY } from './file1.js';
import './index.css';
```

Provide relative path of file (module). `.js` is optional. `index.css` has no export and hence entire file is imported without using `from` keyword.

Other way is to use library, like `react`. You can import without absolute path. `Module` is a unit of software that is basically a file that you can refer. It usually has variables and functions. `Library` is collection of modules that is distributed as `package` and is managed by a manager like npm or pip. Library has multiple files.


```js
import React from 'react';
```


### Arrow Functions

`=>` arrow funcitons.

```js
let funcName = (arg1, arg2) => {
  statement1;
  return statement2;
}
```

If there is one argument then remove the parantheses brackets, if there is only one statement the remove the curly barckets and the return keyword. Eg,

```javascript
const square = x => x * x; // no  ()

const mult = (x, y) => x * y; // no {}

const mult = (x, y) => {
  const result = x * y;
  return result;
};

data.map(element =>
  return (console.log(element))
);

```

`map` is function of `Array` class.

`generator` functions can be used to add a pause to execution of function and make it execute in parts using `yield` keyword. That is a funciton can yield many outputs or returns. It can be iterated calling `funcName.next()`

### Promises and Asynchronous

**Promises and Asynchronous** behaviour - Async means that there is delay in response when requested. A promise is a proxy object that is returned to the caller of an asynchronous operation running in the background. This object can be used by the caller to keep track of the background task and obtain a result from it when it completes.

In JS code, promise is executed in background and the execution moves to next statement. Later promise can either resolve or reject and the chained methods gets executed.

A Promise is in one of these states:

- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation was completed successfully.
- rejected: meaning that the operation failed.

When we define then Promise takes a callBackFunction as an argument.


`myPromiseObj.then(funcName() {}` anything in this funcName is passed as `resolve` to Promise.

This object can be used by the caller to keep track of the background task and obtain a result from it when it completes. We can use `then` in chain to execute one func on top of other.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

myPromise
  .then()
  .catch(e => console.log(e)); // prints error if

// Example

fetch('http://example.com/data.json') // returns apromise
  .then(r => r.json()) // output of promise is passed to r
  .then(data => console.log(data)) // chained functions
  .catch(error => console.log(`Error: ${error}`)); // Error cached
```

This is good, but all execution has to be chained which makes it different than a normal function. To make the syntax same as normal funciton we can use `async... await`

### Async and Await

Async/Await - we can define an async function, which executes a Promise(), and then await until the promise is resolved. This makes synchronous execution for a asynchronous call.

```javascript
async function f() {
  const r = await fetch('https://example.com/data.json');
  const data = await r.json();
  console.log(data);
}
```

Error handling can be done using `try.. catch` block in this.

### Classes

Now you can use classes in ES6.

### JSX - JavaScript XML

This is not part of ES6, but is an extension to make it easier to use HTML in JavaScript. It lets us write HTML inline and this templates are eaisier to maintain. More in [React](#todo)

**Links**

- Modern JavaScript - <https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-1-modern-javascript>
- Learning ECMAScript 6+ (ES6+) - <https://www.linkedin.com/learning/learning-ecmascript-6-plus-es6-plus/using-modern-javascript-today>
