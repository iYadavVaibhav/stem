---
description: React JS Notes
date: 2022-07-14
---

# ReactJS

It is a JS Library, it can be added to HTML page as other JS libraries (like jQuery). It is used to create **single-page applications**. It uses only one HTML page `index.html` and then all changes to page and routes are managed **strictly** by JS events.

Build in Browser using <https://react.new/>

Upgrade browser with `React Developer Tool` browser extension. It shows react components.

## React Traditional Style - Without Node.js

Scripts to include, Both React and ReactDOM are available over a [CDN](https://reactjs.org/docs/cdn-links.html).

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Add this to page and you can use react.

`ReactDOM` class is available, call its `render()` function to render elements in DOM.

`React` class is available, call its `createElement()` function to create new DOM elements.

```html
<body>
    <div id="root"></div>

    <script type="text/javascript">
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        React.createElement("h1",null,"Hi"), // adds as heading
        // "<p>hi</p>", // does not add as p, adds as string
        document.getElementById("root")
    );
    </script>
    
</body>
```

We can write HTML in JS to add it to DOM. HTML is written as string in, eg `"<h1>"` tag. However to directly write HTML in JS not as string, JS is extended and JSX is introduced.

## JSX and Babel

**JSX** is not HTML, JSX is JavaScript XML, an extension of JavaScript that allows writing HTML in JS. To execute it, we need a compiler that can convert JSX to JS and HTML.

JSX and JS go one in another and can be nested using {}s. When you start JS put in {} , then can again write HTML and again nest JS in {}.

**Babel** is a JS compiler. You can insert plane HTML without quotes. Also add variable names with JS code within curly braces `<p>Hi {name.toUpperCase()}</p>`. Eg:

Babel converts JSX `<p>Hi</p>` to JS `React.createElement("p", null, "Hi");` on the fly.

```html
...
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel"> //type is changed from javascript to babel

  let msg = "Tom";

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <p>Hi {msg}</p>, // JSX, text without quotes. Renders as react element using babel}
  );

  </script>

</body>
```

Babel can be said to be like Jinja in Flask and Blade in Laravel but not same.

**Conceptually** - Using React, HTML can be written in JS, which renders it and adds it to a HTML DOM element, eg `root`. Now that it is in JS, it can be programmed and be data driven and dynamic. To manage the HTML code we split the UI into independent and reusable `Components`.

This was all in file and now we will use node and create react app. file use is okay for prototype but prod should use app.

## React with Node.js

Node.js creates structure for react project with Babel, file bundling etc.

`npx create-react-app app_name` create a folder with all required libraries like react, react dom, babel, react scripts etc.

NPX, a package in node, that lets you run and execute packages without having to install them locally or globally.

`cd app_name` then `npm start` to run a web server using node and serve this app on `http://localhost:3000` as a dev build.

### Understanding the folder structure and files

`package.json` - All dependencies can be seen in this file.

`node_modules` dir has all dendencies installed by Node.js.

`public` dir is used to serve app. It has index.html and other static files.

`build` dir will be *added later* when you create a prod build.

`manifest.json` - In `public` dir this file provides information about the app in JSON format. It is used by mobile and desktop when we install this app. We can update `short_name` and `name` here.

`src` dir has app code.

### Running existing project

To run an existing react project, that you have downloaded, you need to install all the dependencies and that can be done by `npm install`. It uses `package.json` to install all dependencies.

### Adding Dependencies

```sh
npm install bootstrap@5.2.0 react-bootstrap react-router-dom serve
```

`serve` is a static file web server that can be used to run the production version of the React application.

Notice here, that it is not only JS packages but also CSS frameworks like `bootstrap`. `import 'bootstrap/dist/css/bootstrap.min.css';` to load only CSS file. `import Container from 'react-bootstrap/Container'` loads the library.

### The index.js File

`index.js` is entry point to render app to DOM. `public/index.html` has `<div id="root"></div>` that is used in `index.js`. `render()` function renders the app and takes JSX tree, as argument, that structures the entire app.

**Note:** Any code that is non-JavaScript standard like import of file and JSX are converted to standart-JavaScript then they are served on browser. `import varName from 'filename.ext'` can be used to pull any file say image as var. Eg, in `app.js`, `import "./styles.css";` is non- javascript kind of code. This is later compiled and transformed to make it standard JS code and execute on browser. JSX uses CamelCase wile HTML lower.

Each component is in its own file, eg, `app.js`, `header.js`.

`export default App` means export this component (function) as default App component.

## React Components

React Component is a building block of app, one of the UI component (same as a template in Flask). Eg, `Header`, `Sidebar`, `Content` and `Footer`. This lets split whole page in to independent, dynamic, resuable components. Hence, eaisier to manage and control them using JS.

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called **“props”**) and return React elements (JSX) describing what should appear on the screen. Eg,

```javascript
function Header(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header name="Sara" />;
```

So previously we could only render standard tags like `<div>`, `<p>` etc. but now can render custom tags like `<Header />`, also pass properties (props) to it. Remember, every `ComponentFunction` follows CamelCase. It should return only one JSX tag like `<div>`, `<p>` or `<Header />`. To return muliple elements, wrap them in div, and if you want to avoid extra divs added to dom, use `<React.Fragment>blah blah</React.Fragment>` or shorthand `<> ... </>`.

Props make components **dynamic**. You can use logic in any component, like hiding sidebar when loggin in. Props is basically an `object` (key-value), its properties can passed in JSX in same way as we pass props in HTML `<App name="Tom" yob={1990}>`, they are passed where we render a component. It can be recieved as `function App(props)` or as using ES6 as `function App ({name, yob})`.

To **loop** lists of elements use `map()` of `Array` class, and include a `key` attribute with a unique value per element. React requires it to efficiently rerender only part of list. It can be inline function, eg, `arr.map( (a) => (a.length) )`.

Add **conditional** rendering expressions with the `&&` (if-then) and `?:` (if-then-else) operators. Expression on right of && is executed when left is true. Eg, `data.length === 0 && <p>There is nothing to show here.</p>`

```javascript
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

Good **strategy** is to build multiple components with each having one purpose. Eg, `Header` `Sidebar`. Add `ContentArea` that can be swapped based on naigation.

Components can be **nested** to build hierarchy. Eg,

```javascript
<Body name="Tom">
  <Posts />
</Body>
```

If the component is called with children, like above, then a `children` key is included in `props` object, which is equal to child components, here `<Posts />`.

```javascript
function Body({name, children}) {
  return (...);
}
```

### Class Implementation

Component can also be a ES6 Class, that `extends React.Component` and implements `render() {}`.

```javascript
class Post extends React.Component {
  render() {
    return <h2>Post Title!</h2>;
  }
}
```

### React-Bootstrap

React-Bootstrap provides `Container` and `Stack` components to design layout of website.

```javascript
  return (
    <Container fluid className="App"> // className is HTML class
      ...  // <-- no changes to JSX content
    </Container>
  );
```

## Hooks

**useState Hook**

useState is a function in React class that can be used to manage state of App.

`useState(arg)` arg can be any data type.

it returns array having `[stateValue, setStateFunc] = setState("a Value")` we can use them in app to manage states. We can have multiple states of app, so make multiple instance of this function.

**useEffect Hook**

These are like eventListners that can listen to some variable and if there is a change in its state they can do something.

`useEffect(funcDoSomething, [varToListenTo]);` when arg2 changes, arg1 is executed. arg2 = [] then only run once, arg2 can have multiple vars to listen to.

**useReducer Hook** can be used to manage state and effect at once.

It takes two arguments, arg1 is function to execute on state change, and arg2 is initial state value.

It returns, 1 state value, 2 function to change state. Eg, state is counterValue

```javascript
const [counterValue, setCounterValue] = useReducer(
  (a) => a++, //
  0
);
```

ToDo: Need some more understanding here on, how to use reducer to do different action based on param passed?

## Handling Forms - 14-07-2022

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

### Routes with Bootstrap

Bootstrap has `Nav.Link` component that creates nav-item, it has `as` and `to` props to work with React-Route's `NavLink`.

```javascript
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

### Parameters and Routes

To define a route with a dynamic section, the path attribute of the Route component uses a special syntax with a colon prefix:

```javascript
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

## Resources

Links

- React Tutorial Miguel Grinberg - <https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-2-hello-react>
- LinkedIn Learning - <https://www.linkedin.com/learning/react-js-essential-training>
- React Docs - <https://reactjs.org/docs/hello-world.html>

Next

- ReactNative
- GraphQL
