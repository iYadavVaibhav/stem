# App - mBlog

These notes are taken when learning from "[React Mega Tutorial](https://blog.miguelgrinberg.com/post/introducing-the-react-mega-tutorial)" by Migulel Grinberg. The code or notes text may be similar to what the author wrote and belongs to them.

Here we will implement react and build Micro Blog project.

## Set up Basics

Start the basic stuff

**Start from scratch**

```sh
npx create-react-app app2-mblog
cd app2-mblog
npm start
```

It builds basic structure and adds dependencies.

**Add Third Party Packages**

We will need following dependencies:

```sh
npm install bootstrap@5.2.0 react-bootstrap react-router-dom serve
```

Here, the packages are:


- `bootstrap`: UI framework.
- `react-bootstrap`: a React component library wrapper for the bootstrap package.
- `react-router-dom`: a React component library that implements client-side routing.
- `serve`: is a static file web server that can be used to run the production version of the React application.

**Update Meta Info**

Update defaults with project specific stuff in `index.html`.

```html
    <meta
      name="description"
      content="Web site is Micro Blog"
    />
    ...
    <title>Microblog</title>
```

To `src/index.js` Add the bootstrap framework

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

**Remove not required default files**

```sh
git rm src/logo.svg src/App.css
```

Modify `src/App.js`

```js
export default function App() {
  return (
    <h1>Microblog</h1>
  );
}
```

## Webpage components

So, basically any app will have components like `header`, `sidebar`, `content` and `footer`. Which may have nested components like content has `posts`, `tables`, action `cards` etc. They are all built using UI framework like Bootstrap which beneath uses HTML standard components.

**Bootstrap in React - Grid Layout**

You might have used bootstrap traditionally using div with columns for grid-layout. Bootstrap in react is implemented using bootstrap-components called `Container` and `Stack` that implement same grid-layout.

In any `src/MyComp.js`, add

```js
import Container from 'react-bootstrap/Container';

export default function App() {
  const posts = [
    ...  // <-- no changes to fake blog posts
  ];

  return (
    <Container fluid className="App">
      ...  // <-- no changes to JSX content
    </Container>
  );
}
```

to make bootstrap-components container available use `import X from 'react-bootstrap/X'`. All components can be found here [React Bootstrap Components](https://react-bootstrap.netlify.app/docs/components/accordion)

**Adding Header**

Now, you can add your own components like header, footer. Use `src/components` dir to arrange them. Add following to `src/components/Header.js`, you are making a component.

```js
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Header() {
  return (
    <Navbar bg="light" sticky="top" className="Header">
      <Container>
        <Navbar.Brand>mBlog</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
```

Now you can import it in `src/App.js`

```js
import Container from 'react-bootstrap/Container';
import Header from './components/Header';

export default function App() {
  const posts = [
    ...  // <-- no changes to fake blog posts
  ];

  return (
    <Container fluid className="App">
      <Header />
      <Container>
        {posts.length === 0 ?
          ...
        }
      </Container>
    </Container>
  );
}
```

**Adding Sidebar**

Any css goes to `src/index.css`

Same way you can add a sidebar, to `src/components/Sidebar.js`: A sidebar component

```js
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Sidebar() {
  return (
    <Navbar sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link href="/">Feed</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/explore">Explore</Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}
```

Here, you can see that `flex-column` makes navbar items vertical. And `sticky="top"` make it visible if you scroll down.

To add it to App we will use `Stack` component of Bootstrap.

**Using Stack Bootstrap Component**

You can stack content and sidebar side-by-side. Add following code to `src/App.js`:

```js
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';          // New
import Header from './components/Header';
import Sidebar from './components/Sidebar';         // New

export default function App() {
  const posts = [
    ...  // <-- no changes to fake blog posts
  ];

  return (
    <Container fluid className="App">
      <Header />
      <Container>
        <Stack direction="horizontal">
          <Sidebar />
          <Container>
            {posts.length === 0 ?
              ...  // <-- no changes to render loop
            }
          </Container>
        </Stack>
      </Container>
    </Container>
  );
```

Here you see `<Stack direction="horizontal">` makes sidebar and container stack side by side.

This **completes** basic webpage that can be used in any app.

**Content sub Components**

Now `src/App.js` imports `header`, `sidebar` and also shows `content`. Next, what you can do is, to build `components` that can be used in `content`, like `Posts` to view, `Friends` to follow, `Table` of activity.

**Posts Component**

Now lets make first content component that shows list of posts for user. Add code in `src/components/Posts.js` to Render a list of blog posts:

```js
export default function Posts() {
  const posts = [
    {
      id: 1,
      text: 'Hello, world!',
      timestamp: 'a minute ago',
      author: {
        username: 'susan',
      },
    },
    {
      id: 2,
      text: 'Second post',
      timestamp: 'an hour ago',
      author: {
        username: 'john',
      },
    },
  ];

  return (
    <>
      {posts.length === 0 ?
        <p>There are no blog posts.</p>
      :
        posts.map(post => {
          return (
            <p key={post.id}>
              <b>{post.author.username}</b> &mdash; {post.timestamp}
              <br />
              {post.text}
            </p>
          );
        })
      }
    </>
  );
}
```

Now we can use it in `src/App.js` to show Posts component:

```js
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Posts from './components/Posts';     // New

export default function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Container>
        <Stack direction="horizontal">
          <Sidebar />
          <Container>
            <Posts />                       // New
          </Container>
        </Stack>
      </Container>
    </Container>
  );
}
```

That's how we do it, YaYYY....!! But with fake data. Let's now try to play with data and pass it from one component to another.

**Parameters in Components**

Simply, _paramenters_ or _arguments_ that we pass to component are same as _attributes_ in HTML and are called _props_ in react. Eg,

```js
<Body sidebar={true}>
  <Posts />
</Body>
```

Here, props is `sidebar`. Also, you see that in `Body` component we nest `Posts` component, this also gets passed to `Body` definition, that is, in `Body` function all children are available, see below. In `src/components/Body.js`: A body component

```js
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Sidebar from './Sidebar';

export default function Body(props) {
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {props.sidebar && <Sidebar />}
        <Container className="Content">
          {props.children}
        </Container>
      </Stack>
    </Container>
  );
}
```

Here, `{props.sidebar && <Sidebar />}` is way of if-then in JSX. Also, above can be simplified further using destructuring

```js
// destructuring
{a,b} = {a:1, c:3, b:2, d:4}
//a=1, b=2
```

So above can be re-written as

```js
export default function Body({ sidebar, children }) {       // modified
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}                            // modified
        <Container className="Content">
          {children}                                        // modified
        </Container>
      </Stack>
    </Container>
  );
}
```

Lets modify App to have a Body component that show Sidebar based on condition, and the children.

`src/App.js`: Refactored application component

```js
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Body from './components/Body';
import Posts from './components/Posts';

export default function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Body sidebar>
        <Posts />
      </Body>
    </Container>
  );
}
```

## Routing and Page Navigation

Now that we have the base structure, (same as flask template base.html with index.html). Lets add, more pages like login, profile, users etc. Pages are simply _components_ which make use of base-components.

Add dir,

```sh
mkdir src/pages
```

**Feed Page**

Lets make feed page, that shows user feeds, `src/pages/FeedPage.js`. Basically we will use base-components here, `Body` and `Posts`.

`src/pages/FeedPage.js`: the Feed page, that says return body with sidebar and posts. Simple?

```js
import Body from '../components/Body';
import Posts from '../components/Posts';

export default function FeedPage() {
  return (
    <Body sidebar>
      <Posts />
    </Body>
  );
}
```

Similarly add `src/pages/ExplorePage.js`: a placeholder for the explore page

```js
import Body from '../components/Body';

export default function ExplorePage() {
  return (
    <Body sidebar>
      <h1>Explore</h1>
      <p>TODO</p>
    </Body>
  );
}
```

and a login page without sidebar, `src/pages/LoginPage.js`: a placeholder for the login page

```js
import Body from '../components/Body';

export default function LoginPage() {
  return (
    <Body>
      <h1>Login form</h1>
      <p>TODO</p>
    </Body>
  );
}
```

Now that we have pages, let us add routing

**Route links**

`src/App.js`: Page routing

```js
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  // New
import Header from './components/Header';
import FeedPage from './pages/FeedPage';        // New
import ExplorePage from './pages/ExplorePage';  // New
import LoginPage from './pages/LoginPage';      // New

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>                           // New
        <Header />
        <Routes>                                // New
          <Route path="/" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
```

Okay, lot of changes here.

`BrowserRouter` component is transparent. It shows nothing but id required because, in SPA browser needs to know all pages. This adds all pages links to DOM. This should be added too above in heirarhy.

`Routes` is a component that needs to be inserted in the place in the component tree where the contents need to change based on the current page. Here it is after `Header` and replaces `Content` with subsequent routes.

`Route` is used to define a route inside the Routes component. This is where we define, the component to render based on the path. It is _simply_, if path = this, then show this component. Simple... right?

`Navigate` is a special component that allows to redirect from one route to another (just like `redirect_to` in flask).

Now, the js in app knows the routes to handle on JS level (neither browser, nor server, remember this is SPA).

If you use normal href links, the components work but will reload page, however, in React, navigation should move from browser to JS. to do this.

**React Navigation**

Following components help implement JS level navigation without page-reloads

- `Nav.Link` this is bootstrap component and build Nav DOM
- `Link` this is React-Router package component and prevents page reload to do JS routing.
- `NavLink` same as Link from React-Router package but adds link "active" by matching route. It is good to use in nav-bar.

Now, NavLink and Nav.Link both need to be used together, for this, use bootstrap's `as` attribute to specify a different base component. Gulp it.... :)

```js
<Nav.Link href="/">Feed</Nav.Link>              // Old
<Nav.Link as={NavLink} to="/" end>Feed</Nav.Link>   // New
```

Here, `href` is replaced with `to`, and end tells react to do exact match to `/` and not make link active for anything else like `/home`, gulp again...

Now, browser load does not happen, JS handles rounting with back and forward buttons working.

**Varibales in Route**

Just use special syntax in path

```js
<Route path="/user/:username" element={<UserPage />} />
```

Here, `:` is placeholder that matches any value. And this placeholder can be accessed as an object in the component defined in `element`, or any of its children, using  `useParams()` as an object. So to use the param in component add to `src/pages/UserPage.js` a simple user profile page

```js
import { useParams } from 'react-router-dom';
import Body from '../components/Body';

export default function UserPage() {
  const { username } = useParams();     // destructuring

  return (
    <Body sidebar>
      <h1>{username}</h1>
      <p>TODO</p>
    </Body>
  );
}
```

Here, `useParams` is a **hook**, anythin that has use... is hook in react. hook gives access to **application state**.

## Adding Backend

App needs data, and data is values read and write, which is get and set.. simple.. right?

React gives, **getter** and **setter** right out of the box and can be implemented using hook called `useState()`, we will come to this later, so for now this does the job.

Now, lets see how things render on screen. So components render asap on screen, to speed up this skips data fetch from server and sends it to **background job** and meanwhile shows 'loading..', as soon as data is served from backend server, the components re-renders with the data. Same happens when a value is set, components show the new data and background job sends data to server. Cool...!

This "background job" is handled using **Side Effect Functions**.

Now, lets add useState to app in `src/components/Posts.js`: Add a posts state variable

```js
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function Posts() {
  const [posts, setPosts] = useState();

  // TODO: add a side effect function to request posts here

  return (
    <>
      {posts === undefined ?
        <Spinner animation="border" />
      :
        <>
          ... // <-- no changes to blog post JSX
        </>
      }
    </>
  );
}
```

**Side Effect Functions**

To tell backend URL to frontend, use environment variable. Create `./.env`

```bash
REACT_APP_BASE_API_URL=http://localhost:4000
```

**Imp**: Since react runs in front-end, to avoid exposing env variable to client, it only pics env var starting with `REACT_APP_*`.

The vaiable will be accessible everywhere with `process.env.REACT_APP_BASE_API_URL`.

The fetch() function, is standard JS function available in all modern browser, we will use the same.

```js
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const response = await fetch(BASE_API_URL + '/api/feed');
```

The fetch() function uses promises, so it needs to be _awaited_ when you are in a function declared as _async_. It returns [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

In `Response` object:

- `response.ok` is true on success
- `response.json()` parses the data in body of response and returns it as a JavaScript object or array

**Side Effect for Background Job**

`useEffect()` is a function to do something based on a variables.

```js
useEffect( `arg1` , `arg2` )

useEffect( `do this` , `based on these vars` )

useEffect( `function` , `array` )

useEffect( () => {}, [] )

useEffect( () => { (define)(call) }, [] )

useEffect( () => { ( async () => {} )() }, [] )

useEffect( () => { ( async () => { await fetch(); } )() }, [] )
```

Here, `arg1` is a function that is **executed**, the execution is **controlled** by `arg2` which is array of variables.

You can implement this to do _background-job_. The arg1 will do `fetch()` to backend server.

**Imp**: A simple rule to remember, is that when `arg2` is set to an _empty array_, the `arg1` function _runs once_ when the component is _first rendered_ and never again.

So, when component is first rendered, and `arg2` is empty, `arg1` func will do `fetch()` to backend server. Simple..

Now in `src/components/Posts.js`: Load blog posts as a side effect

```js
import { useState, useEffect } from 'react';                // New
import Spinner from 'react-bootstrap/Spinner';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;    // New

export default function Posts() {
  const [posts, setPosts] = useState();
                                                            // New
  useEffect(() => {
    (async () => {                                          // arg1 func
      const response = await fetch(BASE_API_URL + '/api/feed');
      if (response.ok) {
        const results = await response.json();
        setPosts(results.data);
      }
      else {
        setPosts(null);
      }
    })();                                                   // arg1 func ENDS
  }, []);       // arg2, empty array

  return (
    <>
      {posts === undefined ?
        <Spinner animation="border" />
      :
        <>
          {posts === null ?                                 // New
             <p>Could not retrieve blog posts.</p>          // New
          :
            <>
              ... // <-- no changes to blog post JSX
            </>
          }
        </>
      }
    </>
  );
}
```

Here, we added side effect and handled null condition in JSX.

Understanding `arg1` function

```js
() => {
    (
        async () => {
            const response = await fetch(BASE_API_URL + '/api/feed');
            if (response.ok) {
                const results = await response.json();
                setPosts(results.data);
            }
            else {
                setPosts(null);
            }
        }   // async defined closed
    )();    // async called / executed immediately
}   // main closed
```

Here, it is `arg1` as a function, within which we define an inner async function and immediately call it.

In async function, we `fetch()`, then pass result to `setPosts()` which is setter from `useState` hook, the setter sets state-variable posts. When state variable is set, it triggers re-render of component.

**Simply**, on first render it displays-blank and in background it fetches then sets the posts, on set it re-renders with data.

Or, on first render, _useEffect_ fetches in background, and _useState_ sets the posts, then re-renders component with the data.

Bravoo..! render empty.. fetch.. render.. :)

Now you can further break down `Posts` component by making a sub component `Post.js`.

**Time Ago - Displaying Relative Times**

_The following can be **skipped**. It is a better way to do things but hard to understand, if you want you can skip to 'Build an API Client' section._

Add another component `TimeAgo.js` which shows relative time, compared to now. In this, there are two functionalities:

1. Show realtive time, like, 'a second ago', '2 months ago'.
2. Update this _as time passes_, so 'a second ago' becomes '20 seconds ago' after 20 seconds.

While, 1 is simple to do. 2 is good to have and can be done on client side without making call to server. To do this, you can use `useState` and `useEffect` function of react.

We are doing something new, "to change a value on browser even though the inputs have not changed", re-render the timeago even if the data has not changed. Remember, react only re-renders when the state of variable is changed.

Code is added to `src/components/TimeAgo.js`: TimeAgo component

```js
export default function TimeAgo({ isoDate }) {
  const date = new Date(Date.parse(isoDate));
  const [time, unit, interval] = getTimeAgo(date);

  const [, setUpdate] = useState(0);

  useEffect(() => {
    const timerId = setInterval(
      () => setUpdate(update => update + 1),
      interval * 1000
    );
    return () => clearInterval(timerId);
  }, [interval]);

  return (
    <span title={date.toString()}>{rtf.format(time, unit)}</span>
  );
}
```

Here, above two lines and last return is what you know. So `const [, setUpdate] = useState(0);` is use of setState in a different way. Only setter function is stored. As we want to re-render timeago even when no input has changed so we will make a _dummy variable_ that is not used anywhere but is changed when a re-render is needed.

**Simply**, when you want to change timeago component change its state so that is re-render. Here, state is a dummy-variable.

Next, `useEffect()` implements a function,

```js
() => {
    const timerId = setInterval(
      () => setUpdate(update => update + 1),
      interval * 1000
    );
    return () => clearInterval(timerId);
}
```

This is WILD-CODE.. get your brain here...

It implements, `setInterval` and returns a function, `clearInterval`.

```js
const timerId = setInterval(func,val);
return () => clearInterval(timerId);
```

func in `setInterval` is:

```js
() => setUpdate(
    (update) => {
        returns update + 1;
        }
    )
```

which is again a function, that calls setter function of state, `setUpdate`, within which, is another function having arg `update` and returns `update + 1`.

**Simply**, in specific interval, increment state by 1.

Remember, useEffect is _do-something_ based on _value_. So here, it is incrementing and setting that value to a state so that the component re-renders. And this is done whenever the value of arg2, `interval * 1000` is changed.

Here, return function, `clearInterval` has no purpose in component update but is used to clean up the resources when component is removed from the page. On removal react will call the function returned by useEffect, which here will clearInterval and hence prevents **memory leakage**.

As a result, **A dummy write-only state variable can be used to force a component to re-render when none of its inputs have changed.**

If you don't get this (like me), move on..! This is specific to a need and you can do wonders without understanding this... :)






## Build an API Class and Context

You know how to do `fetch()` (or API calls) within a component (we did in `Posts`).

Now, lets do all API calls in central place that can be used by any component and does following things:

- authentication
- has info of server domain and host
- knows common api path
- knows pagination arguments
- does error handling
- parses JSON

**Note**: We will do this by making a class that has methods to do `get post put delete` and returns a `response` object. Simple.. right?

### Building API Request Class

In `src/MicroblogApiClient.js`: An API client class

```js
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class MicroblogApiClient {
  constructor() {
    this.base_url =  BASE_API_URL + '/api';
  }

  async request(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: error.toString(),
        }; }
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }

  async get(url, query, options) {
    return this.request({method: 'GET', url, query, ...options});
  }

  async post(url, body, options) {
    return this.request({method: 'POST', url, body, ...options});
  }

  async put(url, body, options) {
    return this.request({method: 'PUT', url, body, ...options});
  }

  async delete(url, options) {
    return this.request({method: 'DELETE', url, ...options});
  }
}
```

Mostly it is self explainory. Some changes are, now you are using `request()` insted of `fetch()` because it is more elaborative.

Second important thing here is, `options` object passed as param to `MicroblogApiClient.request()` method. It gives all details like url, body, method, query and other params as object (or dictionary).

So keys in `options` object are:

- `options.url` - set by `get post put` and `delete`
- `options.method` - set by `get post put` and `delete`
- `options.body` - set by `post` and `put`
- Any additional options that the caller might need, such as custom headers or query string parameters, are accepted as a last argument on the four helper methods.

`URLSearchParams` is helper class in browser that build query string in proper format.

It finally does the request using try/catch handling all scenarios and builds the response object. The object it returns has:

- `ok` - boolean, shows success or faliure
- `status`: HTTP code like 200, 404, 500 etc as returned from server.
- `body`: object having payload returned in body of the response from server.


### Skippable - Understanding React-Context

_**In short**, most efficient way to use the above API class is by using react-context and implement it by making a custom hook. Read on for details. or skip to 'Add an API Provider'_

One way is create instance of it in the component you want to use, **problem** is one page each component will create new instance which is **inefficient**.

Another way is to create one instance and share with components, **problem** is passing from top to bottom in hierarchy of tree is **not easy**.

**Solution** that lets the instance to be shared in tree is, **contexts** provided by React.

**Creating context**

```js
import { createContext } from 'react';
const MyDataContext = createContext();
```

Now the object `MyDataContext` can be used as JSX, `<MyDataContext.Provider value={'data-to-share'}>`.

To **make context available**, insert it in *JSX Tree* high enough so all members in tree can access it. Eg, in `App.js` you can do this:

```js
export default function MyApp() {
  return (
    <Container>
      <Header />
      <MyDataContext.Provider value={'data-to-share'}>      // New
        <Sidebar />
        <Content />
      </MyDataContext.Provider>                             // New
    </Container>
  );
}
```

Here, you can see, context will be available to sidebar and content but not to header as it is not in the tree hierarchy.

To **use context value** the child component can use the `useContext` **hook** as follows:

```js
import { useContext } from 'react';
import { MyDataContext } from './MyDataContext';

export default function Sidebar() {
  const myData = useContext(MyDataContext);
  // ...
}
```

### Add an API Provider

**Simply**, here we will import MicroblogApiClient class, create its instance, wrap instance in context. Make hook to access context. Gulp it.

Another way to understand:

- There is a simple class
- Class has instance
- Instance is wrapped in context
- Context is made availabe as hook

Same thing with reasons

- There is a simple class - so we don't repeat and do fetch/try/catch in each component
- Class has instance - to use class. This instance can be used, however...
- Instance is wrapped in context - so that one instance is used in all components efficiently. This context can be used, however...
- Context is made availabe as hook - that's react way, hooks are special and can be used outside render to interact with other functions. Also, it makes code neat (less imports).

Same thing with code

- There is a simple class, `MicroblogApiClient`
- Class has instance, `const api = new MicroblogApiClient();`
- Instance is wrapped in context

    ```js
    <ApiContext.Provider value={api}>   // Instance added here
        {children}
    </ApiContext.Provider>
    ```

- Context is made availabe as hook, `return useContext(ApiContext);`

This is react-way of doing things efficiently. Trust it..!

Adding it all together to make APIContext, in `src/contexts/ApiProvider.js`: An API context, add

```js
import { createContext, useContext } from 'react';
import MicroblogApiClient from '../MicroblogApiClient';

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = new MicroblogApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
```

Here, there two exports, one is default which is same as any other react-componenet, another is `useApi()` a custom hook.

`{children}` in `<ApiContext.Provider>` makes the context available to all child components.

**Simply**, understand it as an invisible component high-above in JSX tree to make api-instance avilable to all components (children) in JSX tree. Let's add it to `src/App.js`: Add the API context to the application

```js
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ApiProvider from './contexts/ApiProvider';   // New
import Header from './components/Header';
import FeedPage from './pages/FeedPage';
import ExplorePage from './pages/ExplorePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <ApiProvider>                               // New
          <Header />
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApiProvider>                              // New
      </BrowserRouter>
    </Container>
  );
}
```

Now you have the class available as hook. Lets use this in `src/components/Posts.js`: Using the useApi() hook

```js
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useApi } from '../contexts/ApiProvider';       // added
import Post from './Post';

export default function Posts() {
  const [posts, setPosts] = useState();
  const api = useApi();                                 // added

  useEffect(() => {
    (async () => {
      const response = await api.get('/feed');          // updated
      if (response.ok) {
        setPosts(response.body.data);                   // updated
      }
      else {
        setPosts(null);
      }
    })();
  }, [api]);                                            // updated

  ... // <-- no changes in the rest of the function
}
```

Here, `api` is passed as dependency to `useEffect` because it is good to have dependency on the variable (api) used in `useEffect` function.

### Add Pagination

You can make a generic "More" button as a component. This uses props to have two params `{ pagination, loadNextPage }`. Pagination has pagination data from API, loadNextPage if true will fetch more data from API and set pagination and posts. So a new state to manage Pagination was also added to `Posts` page.

## Forms and Validations

React-Bootstrap offers components that can be used to build DOM elements of form. It offers at low level that is, a component for label, input, placeholder, help text etc. You can group them all to make a high level custom-component that uses low level and groups them so you use only one custom component and it in backend uses all. this is done to avoid code repetition.

**Building Form** - Using low level **Bootstrap-react form components**`

```js
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      {"We'll never share your email with anyone else."}
    </Form.Text>
  </Form.Group>

  // ... more fields here

</Form>
```

**Code Reusability** - You can make your **custom high level component** with props so it is reusable. In `src/components/InputField.js`: A generic form input field

```js
import Form from 'react-bootstrap/Form';

export default function InputField(
  { name, label, type, placeholder, error, fieldRef }
) {
  return (
    <Form.Group controlId={name} className="InputField">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type || 'text'}
        placeholder={placeholder}
        ref={fieldRef}
      />
      <Form.Text className="text-danger">{error}</Form.Text>
    </Form.Group>
  );
}
```

**Implementing custom-template** - Now you can use following in any component to build form, eg in login page, `src/pages/LoginPage.js`:

```js
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';

export default function LoginPage() {
  const [formErrors, setFormErrors] = useState({});

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('handle form here');
  };

  return (
    <Body>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username" label="Username or email address"
          error={formErrors.username} />
        <InputField
          name="password" label="Password" type="password"
          error={formErrors.password} />
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Body>
  );
}
```

Here, errors is kind of data, to handle data, you need state variable, One state variable for all fields. To submit, you need a funciton, hence added. And you can see use of custom-input-field-componenent that we created.

**Handling Form Submit**

Now, lets think about getting form-values, remember, here everything is _client-side_. So start with `event.preventDefault();`. Then to get value, traditional way with vanilla javascript is `document.getElementById()` but rather than maintaining `id` for each element, react has smarter way of using _references_. This is done by using hook, `useRef()` inside component's render function.

```js
export default function MyForm() {
  const usernameField = useRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    alert('Your username is: ' + usernameField.current.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" ref={usernameField} />
    </form>
  );
}
```

**Simply**, initialize a variable using hook `useRef()`, then add `ref` prop to input field, now this maps the input field with this variable and makes available. To access var, use `usernameField.current.value`. All linked togther.. bravo..!

So, now you can add ref like this, here we are using custom-component:

```js
// create ref var
const usernameField = useRef();

// add link using fieldRef, which is ref in actual
<InputField
    name="password" label="Password" type="password"
    error={formErrors.password} fieldRef={passwordField} />

// now access like this
const onSubmit = (ev) => {
    ev.preventDefault();
    const username = usernameField.current.value;
    console.log(`You entered username: ${username}`);
};

// or do something like this
useEffect(() => {
    usernameField.current.focus();
}, []);

```

All crystal clear, right? It is same as id, but `ref` is "react-way".

**Form Validations** - This is done in `onSubmit()` function.

```js
const [formErrors, setFormErrors] = useState({});

const onSubmit = (ev) => {
    ev.preventDefault();

    const username = usernameField.current.value;
    const errors = {}

    if (!username) {
        errors.username = 'Username must not be empty!'
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
        return;
    }
};
```

**Form Submit** - send validated data to server

Sending data is simple as an async post request to server. In `src/pages/RegistrationPage.js`

```js
import { useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';

export default function RegistrationPage() {
    ... // <-- no changes to state variables and references
    const navigate = useNavigate();
    const api = useApi();

    const onSubmit = async (event) => {
        event.preventDefault();

        // validation
        if (passwordField.current.value !== password2Field.current.value) {
            setFormErrors({password2: "Passwords don't match"});
        }
        else {
            // submit
            const response = await api.post(
                '/users',
                {
                    username: usernameField.current.value,
                    email: emailField.current.value,
                    password: passwordField.current.value,
                }
            );

            // if error
            if(!response.ok) {
                setFormErrors(response.body.errors.json);
            }
            // success
            else {
                setFormErrors({});
                navigate('/login');
            }
        }
    }

    ... // <-- no changes to returned JSX
};
```

**Imp**: Interesting thing to see there is that in case the validation error from server, response has error, and that has the same structure as is used in the form. Notice, how `setFormErrors(response.body.errors.json);` sets error and applies to the form to the frontend. Hence, when designing **keep data structure same from db to orm to api json to react form to errors**. Keeping same format is very convinient.

### Showing Flash Messages

Flash message will be displayed from one component hierarchy to another. This requires data (flash message) created in one component (register) to render in another (login). To share data react provides _context_ (used in Api sharing previously). You can use `import { createContext, useContext, useState } from 'react';` to implement Flash messaging. In `src/contexts/FlashProvider.js`: A Flash context

```js
import { createContext, useContext, useState } from 'react';

export const FlashContext = createContext();
let flashTimer;

export default function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({});
  const [visible, setVisible] = useState(false);

  const flash = (message, type, duration = 10) => {
    if (flashTimer) {
      clearTimeout(flashTimer);
      flashTimer = undefined;
    }
    setFlashMessage({message, type});
    setVisible(true);
    if (duration) {
      flashTimer = setTimeout(hideFlash, duration * 1000);
    }
  };

  const hideFlash = () => {
    setVisible(false);
  };

  return (
    <FlashContext.Provider value={{flash, hideFlash, flashMessage, visible}}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash() {
  return useContext(FlashContext).flash;
}
```

Then add this to JSX hierarchy high so that it is available to all components, best place is to add to `src/App.js`

```js
... // <-- no changes to existing imports
import FlashProvider from './contexts/FlashProvider';   // Added

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>                                 // Added
          <ApiProvider>
            <Header />
            <Routes>
              ... // <-- no changes to routes
            </Routes>
          </ApiProvider>
        </FlashProvider>                                // Added
      </BrowserRouter>
    </Container>
  );
}
```

This facilitates, sharing of flash message as data and making it available via context to all components, next part is showing the flash message which can be done using Flash Component. In `src/components/FlashMessage.js`: Display a flashed message

```js
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { FlashContext } from '../contexts/FlashProvider';

export default function FlashMessage() {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    <Collapse in={visible}>
      <div>
        <Alert variant={flashMessage.type || 'info'} dismissible
          onClose={hideFlash}>
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  );
}
```

Finally, add it to `src/components/Body.js`: Show a flashed message in the page

```js
... // <-- no changes to existing imports
import FlashMessage from './FlashMessage';

export default function Body({ sidebar, children }) {
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}
        <Container className="Content">
          <FlashMessage />          // Added
          {children}
        </Container>
      </Stack>
    </Container>
  );
}
```

**Imp**: A React context is not only useful when a parent needs to share data with its children. It can also be used to enable children components to pass information between themselves with the parent as intermediary.


## Authentication

Enable auth in backend by changing .env to `DISABLE_AUTH=false`.

The auth in this API works by:

- sending `POST` username and password to server
- on success, get `access_token` from server
- now to make "authenticated API calls" the requests must include "Bearer Authentication Header" with a valid access-token in each call.

**Add Auth Headers**

To do this, modify the API class fetch code to include this header. In `src/MicroblogApiClient.js`: Include bearer token header

```js
  response = await fetch(this.base_url + options.url + query, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), // added
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  });
}
```

Here, you notice that `accessToken` is passed in each request without check if it is set, idea is that mostly api calls will need it, for those that are public, that is `login` will overwrite this.

**Add auth methods**

The following code is added to class to facilitate login with overwritten auth header. In `src/MicroblogApiClient.js`: add Login method

```js
  async login(username, password) {

    // submit POST
    const response = await this.post('/tokens', null, {
      headers: {
        Authorization:  'Basic ' + btoa(username + ":" + password)
      }
    });

    // check error
    if (!response.ok) {
      return response.status === 401 ? 'fail' : 'error';
    }

    // success
    localStorage.setItem('accessToken', response.body.access_token);
    return 'ok';
  }
  ```

Similarly, add a `logout` method and `isAuthenticated` in `src/MicroblogApiClient.js`: Logout method

```js
  async logout() {
    await this.delete('/tokens');
    localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
    return localStorage.getItem('accessToken') !== null;
  }
```

**User Context** - or g.user in flask

UserContext provides information of logged in user to all the component in app. It can be used to handle these attributes:

- `user`: user object, null if logged out.
- `setUser`: setter for above.
- `login`: helper method to login with username and password.
- `logout`: helper method to logout.

Here, doing things react-way. User information is data, so use `useState`, and a setter to setUser. Next, to do api calls, you need side-effect, so use `useEffect`.

Create `src/contexts/UserProvider.js`: User context and hook

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiProvider';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      if (api.isAuthenticated()) {
        const response = await api.get('/me');
        setUser(response.ok ? response.body : null);
      }
      else {
        setUser(null);
      }
    })();
  }, [api]);

  const login = async (username, password) => {
    const result = await api.login(username, password);
    if (result === 'ok') {
      const response = await api.get('/me');
      setUser(response.ok ? response.body : null);
    }
    return result;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
```

Here, context has a companion hook, that is context is made available making hook, other components can use this hook to access entire object in context and can obtain requried attributes using destructuring.

Again to make it available, add to `src/App.js`: Add user context

```js
... // <-- no changes to existing imports
import UserProvider from './contexts/UserProvider';

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
              <Header />
              <Routes>
                ... // <-- no changes to routes
              </Routes>
            </UserProvider>
          </ApiProvider>
        </FlashProvider>
      </BrowserRouter>
    </Container>
  );
}
```

### Login Required - PrivateRoute

Some routes are only available when logged-in, else redirect user to login and the back to requested page. To implement this, `PrivateRoute` component. It can be added as parent to any component that requires auth (same as `@login_requried` decorator in flask). Add `src/components/PrivateRoute.js`: Private route component

```js
import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function PrivateRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return children;
  }
  else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{next: url}} />
  }
}
```

Simply, add it high in hierarchy. It has children of JSX tree. Return the children passed, only if user is logged in.. simple.

As an added functionality, else, it navigates to `/login` with information of request-url. This is done using `useLocation` hook and `Navigate` component. `useLocation` reads browser url with params. `Navigate` componet has prop `state` to store any data that might be useful, you can use this to pass `url`, it will be available in key `next`.

Similarly, you can craete **PublicRoute** for login and logout. Create `src/components/PublicRoute.js`: Public route component

```js
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function PublicRoute({ children }) {
  const { user } = useUser();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return <Navigate to="/" />
  }
  else {
    return children;
  }
}
```

Now, you just need to wrap the routes. Below are the changes to App to apply the route wrappers `src/App.js`: Routing of public and private routes

```js
... // <-- no changes to existing imports
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

export default function App() {
  return (
    ... // <-- no changes to outer components

    <Routes>
      <Route path="/login" element={
        <PublicRoute><LoginPage /></PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute><RegistrationPage /></PublicRoute>
      } />
      <Route path="*" element={
        <PrivateRoute>
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PrivateRoute>
      } />
    </Routes>

    ... // <-- no changes to outer components
  );
}
```

After doing, this, once you login, the status becomes authenticated and login ang logout routes are no-longer available. You can type `/register` in browser but nothing happens as this route is not returned from `<Routes>` component.

Now that we have all set-up to make login and logout modular, reusable, react-way and flask-way. Lets add them all to login page.

**Logging User In**

Modify `src/pages/LoginPage.js`: Log users in

```js
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // Added
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useUser } from '../contexts/UserProvider';       // Added
import { useFlash } from '../contexts/FlashProvider';     // Added

export default function LoginPage() {
  ... // <-- no changes to existing state and references
  const { login } = useUser();                         // Added
  const flash = useFlash();                            // Added
  const navigate = useNavigate();                      // Added
  const location = useLocation();                      // Added

  ... // <-- no changes to side effect function

  const onSubmit = async (ev) => {                        // Updated
    ... // <-- no changes to existing submit logic

    const result = await login(username, password);       // Added this & below
    if (result === 'fail') {
      flash('Invalid username or password', 'danger');
    }
    else if (result === 'ok') {
      let next = '/';
      if (location.state && location.state.next) {
        next = location.state.next;
      }
      navigate(next);
    }
  };

  ... // <-- no changes to returned JSX
}
```

### Using user info in header

Now we can show username and login/logout buttons as the app is user aware. Modify `src/components/Header.js`: Show a user account dropdown

```js
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

export default function Header() {
  const { user, logout } = useUser();

  return (
    <Navbar bg="light" sticky="top" className="Header">
      <Container>
        <Navbar.Brand>Microblog</Navbar.Brand>
        <Nav>
          {user === undefined ?
            <Spinner animation="border" />
          :
            <>
              {user !== null &&
                <div className="justify-content-end">
                  <NavDropdown title={
                    <Image src={user.avatar_url + '&s=32'} roundedCircle />
                  } align="end">
                    <NavDropdown.Item as={NavLink} to={'/user/' + user.username}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              }
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}
```

### Refreshing Tokens

Access token has timeout of 15 mins, to auto refresh it and hide the functionality from client, it is good to do that in class. Steps to follow:

- Send a requet
- if response is not 401, return response to caller
- else, refresh token, resend original request with new token, return response.

One thing to note is, access token is not returned from server in each request. It is only returned when the request type is from login, that is, it has following in request header.

```js
headers: {Authorization: 'Basic ' + btoa(username + ":" + password)}
```

We again need the access token in response, so that it can be set to cookit, but need this without sending username and password, as we are not again asking user for credentials. To do this, add below code to request options.

```js
credentials: options.url === '/tokens' ? 'include' : 'omit',
```

Now cookie is returned from server when token is requested. This now needs to to be added to localStorage. For this, rename `request` to `requestInternal` and add another `request` method as wrapper that handles to refresh token using following code to `src/MicroblogApiClient.js`: Refresh token logic:

```js
export default class MicroblogApiClient {
  async request(options) {
    let response = await this.requestInternal(options);
    if (response.status === 401 && options.url !== '/tokens') {
      const refreshResponse = await this.put('/tokens', {
        access_token: localStorage.getItem('accessToken'),
      });
      if (refreshResponse.ok) {
        localStorage.setItem('accessToken', refreshResponse.body.access_token);
        response = await this.requestInternal(options);
      }
    }
    return response;
  }

  ... // <-- no changes to other methods
}
```

Adding `credentials: include` returned `refreshResponse.body.access_token` hence we can do `localStorage.setItem()`.

## Building Application Features

Now you can use above react-concepts to build rest of the application parts.

### Submitting Blog Posts

Task here is to:

- let user write a new post - add new component `Write.js`
- then submit that post to server - do `onSubmit` an async req
- show that post to user by updating posts state - use prop in Write that uses existing `posts` state `setPosts()` in `Posts.js`
- make the form blank - in `Write.js`

Since `Posts.js` is reusable and is used in explore, feed and user posts. We need to add a prop for `write` in `Posts()` that will show write post only when we want.


Add `src/components/Write.js`: Blog post write form

```js
import { useState, useEffect, useRef } from 'react';
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import InputField from './InputField';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';

export default function Write({ showPost }) {
  const [formErrors, setFormErrors] = useState({});
  const textField = useRef();
  const api = useApi();
  const { user } = useUser();

  useEffect(() => {
    textField.current.focus();
  }, []);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const response = await api.post("/posts", {
      text: textField.current.value
    });
    if (response.ok) {
      showPost(response.body);
      textField.current.value = '';
    }
    else {
      if (response.body.errors) {
        setFormErrors(response.body.errors.json);
      }
    }
  };

  return (
    <Stack direction="horizontal" gap={3} className="Write">
      <Image
        src={ user.avatar_url + '&s=64' }
        roundedCircle
      />
      <Form onSubmit={onSubmit}>
        <InputField
          name="text" placeholder="What's on your mind?"
          error={formErrors.text} fieldRef={textField} />
      </Form>
    </Stack>
  );
}
```

Here, `showPost` is a _callback_ function provided by the _parent_ component to perform action of adding newPost to posts.

### User Page Actions

Add Edit-Profile, Follow/Unfollow.

To determine when to show edit/follow/unfollow you need the know who is logged in and who is being viewed, if they are same show edit. if the logged in user has not followed the user being viewed show follow else unfollow.

In `src/pages/UserPage.js`: Action buttons in user page

```js
... // <-- no changes to existing imports
import Button from 'react-bootstrap/Button';          // added
import { useNavigate } from 'react-router-dom';       // added
import { useUser } from '../contexts/UserProvider';   // added
import { useFlash } from '../contexts/FlashProvider'; // added

export default function UserPage() {
  ... // <-- no changes to existing state, references and custom hooks
  const [isFollower, setIsFollower] = useState();
  const { user: loggedInUser } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await api.get('/users/' + username);
      if (response.ok) {                                          // updated
        setUser(response.body);
        if (response.body.username !== loggedInUser.username) {   // added & below
          const follower = await api.get(
            '/me/following/' + response.body.id);
          if (follower.status === 204) {
            setIsFollower(true);
          }
          else if (follower.status === 404) {
            setIsFollower(false);
          }
        }
        else {
          setIsFollower(null);
        }
      }
      else {
        setUser(null);
      }
    })();
  }, [username, api, loggedInUser]);

  const edit = () => {
    // TODO
  };

  const follow = async () => {
    // TODO
  };

  const unfollow = async () => {
    // TODO
  };

  return (
    <Body sidebar>
      {user === undefined ?
        <Spinner animation="border" />
      :
        <>
          {user === null ?
            <p>User not found.</p>
          :
            <>
              <Stack direction="horizontal" gap={4}>
                <Image src={user.avatar_url + '&s=128'} roundedCircle />
                <div>
                  ... // <-- no changes to user details

                  {isFollower === null &&                         // added & below
                    <Button variant="primary" onClick={edit}>
                      Edit
                    </Button>
                  }
                  {isFollower === false &&
                    <Button variant="primary" onClick={follow}>
                      Follow
                    </Button>
                  }
                  {isFollower === true &&
                    <Button variant="primary" onClick={unfollow}>
                      Unfollow
                    </Button>
                  }
                </div>
              </Stack>
              <Posts content={user.id} />
            </>
          }
        </>
      }
    </Body>
  );
}
```

Follow/unfollow is data and needs a new state to be created. `isFollower` has three values, null then same user, true then show unfollow, false then show follow. The value of this is determined by request to API.

`const { user: loggedInUser } = useUser();` is a JS syntax that renames user to loggedInUser as user is already a variable in component and represents the user being viewed.

The buttons that present the actions to the user are going to have onClick handlers edit(), follow() and unfollow() respectively, all placeholders for now.

### Edit User Profile

Simply navigate to new `/edit` route. This is new page, `src/pages/EditUserPage.js`.

**To edit a resource**:

- Build a **resource state** to build getter object and setter function for `resource`. `useState()` hook.
- Build a **form-error state** to handle `formErrors`. `useState()` hook.
- Build **form references** using `useRef()` for all fields.
- Build useApi from **api-context**.
- Build **side-effect** using `useEffect()` to call API, then `setResource()`. This pre-fills form.

- Use `<Form onSubmit={onSubmit}>` to let form know submit function.

- Build a `onSubmit()` function, that that implements `async` api `PUT` request with values from form. Within onSubmit:
  - **prevent default** `event.preventDefault()`
  - check **validations** - `if (!name)`
  - if no client side form error, do **API PUT**.
  - if response is ok,
    - **set new response** and **remove form errors** - `setResource(response.body)`, `setFormErrors({})`.
    - **flash** `flash('woo hoo..!', 'success');`
    - **navigate** - `navigate('/user')`
  - else response is not okay, server returns errors
    - **set errors** in form, `setFormErrors(response.body.errors.json)`

Here is implementation of above in `src/pages/EditUserPage.js`: Edit user form

```js
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function EditUserPage() {
  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const emailField = useRef();
  const aboutMeField = useRef();
  const api = useApi();
  const { user, setUser } = useUser();
  const flash = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    usernameField.current.value = user.username;
    emailField.current.value = user.email;
    aboutMeField.current.value = user.about_me;
    usernameField.current.focus();
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await api.put('/me', {
      username: usernameField.current.value,
      email: emailField.current.value,
      about_me: aboutMeField.current.value,
    });
    if (response.ok) {
      setFormErrors({});
      setUser(response.body);
      flash('Your profile has been updated.', 'success');
      navigate('/user/' + response.body.username);
    }
    else {
      setFormErrors(response.body.errors.json);
    }
  };

  return (
    <Body sidebar={true}>
      <Form onSubmit={onSubmit}>
        <InputField
          name="username" label="Username"
          error={formErrors.username} fieldRef={usernameField} />
        <InputField
          name="email" label="Email"
          error={formErrors.email} fieldRef={emailField} />
        <InputField
          name="aboutMe" label="About Me"
          error={formErrors.about_me} fieldRef={aboutMeField} />
        <Button variant="primary" type="submit">Save</Button>
      </Form>
    </Body>
  );
}
```

### Follow / Unfollow

Send API request and `setIsFollower()` with true/false. Modify `src/pages/UserPage.js`: Follow and unfollow handlers

```js
  const follow = async () => {
    const response = await api.post('/me/following/' + user.id);
    if (response.ok) {
      flash(
        <>
          You are now following <b>{user.username}</b>.
        </>, 'success'
      );
      setIsFollower(true);
    }
  };

  const unfollow = async () => {
    const response = await api.delete('/me/following/' + user.id);
    if (response.ok) {
      flash(
        <>
          You have unfollowed <b>{user.username}</b>.
        </>, 'success'
      );
      setIsFollower(false);
    }
  };
```

### Change the Password

To do this:

- Add new link to nav-bar
- Add new route to `App.js`
- Add new page to show change password form

`src/components/Header.js`: Change password menu option

```js
<NavDropdown.Item as={NavLink} to="/password">
  Change Password
</NavDropdown.Item>
```

`src/App.js`: Change password route

```js
// add this import at the top
import ChangePasswordPage from './pages/ChangePasswordPage';

export default function App() {
  ... // <-- no changes to logic in this function

  return (
    ...

    // add this route in the private routes section, above the "*" route
    <Route path="/password" element={<ChangePasswordPage />} />

    ...
  );
}
```

The form to change password, this is very similar to `edit a resource` structure, except that you don't have to per-fill the form.

`src/pages/ChangePasswordPage.js`: Change password form

```js
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ChangePasswordPage() {
  const [formErrors, setFormErrors] = useState({});
  const oldPasswordField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    oldPasswordField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== password2Field.current.value) {
        setFormErrors({password2: "New passwords don't match"});
    }
    else {
      const response = await api.put('/me', {
        old_password: oldPasswordField.current.value,
        password: passwordField.current.value
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been updated.', 'success');
        navigate('/me');
      }
      else {
        setFormErrors(response.body.errors.json);
      }
    }
  };

  return (
    <Body sidebar>
      <h1>Change Your Password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="oldPassword" label="Old Password" type="password"
          error={formErrors.old_password} fieldRef={oldPasswordField} />
        <InputField
          name="password" label="New Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="New Password Again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Change Password</Button>
      </Form>
    </Body>
  );
}
```

### Password Resets

This needs two new routes:

- Request reset - where user enters valid email address and requests a link.
- Reset page - when user clicks link on email, this lets reset password by entering new password twice.

Add two new routes in, `src/App.js`: Password reset routing updates

```js
// add these imports at the top
import ResetRequestPage from './pages/ResetRequestPage';
import ResetPage from './pages/ResetPage';

export default function App() {
  ... // <-- no changes to logic in this function

  return (
    ...

    // add these routes in the public routes section
    <Route path="/reset-request" element={
      <PublicRoute><ResetRequestPage /></PublicRoute>
    } />
    <Route path="/reset" element={
      <PublicRoute><ResetPage /></PublicRoute>
    } />

    ...
  );
}
```

Modify login page, `src/pages/LoginPage.js`: Reset password link

```js
// add this above the registration link
<p>Forgot your password? You can <Link to="/reset-request">reset it</Link>.</p>
```

Build, `src/pages/ResetRequestPage.js`: Reset request form

```js
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ResetRequestPage() {
  const [formErrors, setFormErrors] = useState({});
  const emailField = useRef();
  const api = useApi();
  const flash = useFlash();

  useEffect(() => {
    emailField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/tokens/reset', {
      email: emailField.current.value,
    });
    if (!response.ok) {
      setFormErrors(response.body.errors.json);
    }
    else {
      emailField.current.value = '';
      setFormErrors({});
      flash(
        'You will receive an email with instructions ' +
        'to reset your password.', 'info'
      );
    }
  };

  return (
    <Body>
      <h1>Reset Your Password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="email" label="Email Address"
          error={formErrors.email} fieldRef={emailField} />
        <Button variant="primary" type="submit">Reset Password</Button>
      </Form>
    </Body>
  );
}
```

If you have setup mail server you will get an email.

You can get real email, or on localhost:8025 you can start email server using

```sh
python -m smtpd -n -c DebuggingServer localhost:8025
```

The link in email can be clicked to go to reset page, which is handled by route below.

Now, lets build reset request page `src/pages/ResetPage.js`: Reset password

```js
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ResetPage() {
  const [formErrors, setFormErrors] = useState({});
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();
  const { search } = useLocation();
  const api = useApi();
  const flash = useFlash();
  const token = new URLSearchParams(search).get('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    else {
      passwordField.current.focus();
    }
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (passwordField.current.value !== password2Field.current.value) {
        setFormErrors({password2: "New passwords don't match"});
    }
    else {
      const response = await api.put('/tokens/reset', {
        token,
        new_password: passwordField.current.value
      });
      if (response.ok) {
        setFormErrors({});
        flash('Your password has been reset.', 'success');
        navigate('/login');
      }
      else {
        if (response.body.errors.json.new_password) {
          setFormErrors(response.body.errors.json);
        }
        else {
          flash('Password could not be reset. Please try again.', 'danger');
          navigate('/reset-request');
        }
      }
    }
  };

  return (
    <Body>
      <h1>Reset Your Password</h1>
      <Form onSubmit={onSubmit}>
        <InputField
          name="password" label="New Password" type="password"
          error={formErrors.password} fieldRef={passwordField} />
        <InputField
          name="password2" label="New Password Again" type="password"
          error={formErrors.password2} fieldRef={password2Field} />
        <Button variant="primary" type="submit">Reset Password</Button>
      </Form>
    </Body>
  );
}
```

This completes build of the app.

## Memoization

Memoization is technique to optimize calls and implementing caching.

React renders top component `App` followed by rendering child components. However, it first builds virtual DOM and then real DOM on browser. This helps in re-render, only those real DOM elements are updated which are different from re-built virtual DOM.

Now state var can do side effect and side effect do state change, this cycle continues but settles down and then things are shared.

You can memoization a post using a wrapper. In `src/components/Post.js`: Memoize the component

```js
import { memo } from 'react';
... // <-- no changes to existing imports

export default memo(function Post({ post }) {
  ... // <-- no changes to function body
});
```

**Render Loops**

Sometimes cyclic dependency may introduce this and it causes high CPU usage and poor performance.

To handle unresponsive behaviour, we can have app wide error handler (just like flask 500 or 404 handler) to report no connectivity or unresponsive behaviour. In `src/MicroblogApiClient.js`: custom error handler, add

```js
export default class MicroblogApiClient {
  constructor(onError) {
    this.onError = onError;
    this.base_url =  BASE_API_URL + '/api';
  }

  async request(options) {
    let response = await this.requestInternal(options);
    if (response.status === 401 && options.url !== '/tokens') {
      ... // <-- no changes to retry logic
    }
    if (response.status >= 500 && this.onError) {
      this.onError(response);
    }
    return response;
  }

  ... // <-- no changes to the rest of the class
}
```

This sets onError with erros sent from server. Next we need to flash this error, make this change global in ApiProvider at `src/contexts/ApiProvider.js`: Error handling

```js
import { createContext, useContext } from 'react';
import MicroblogApiClient from '../MicroblogApiClient';
import { useFlash } from './FlashProvider';               // Added

export const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const flash = useFlash();                               // Added

  const onError = () => {                                 // Added
    flash('An unexpected error has occurred. Please try again.', 'danger');
  };

  const api = new MicroblogApiClient(onError);            // updated

  // <-- no changes to the returned JSX
}

... // <-- no changes to the hook function
```

Now, when we use it, it make a **circular dependency**, api request causes error, errors build flash. Now ApiProvider component depends on the flash() function, so now API is rebuilt, this make **a loop**.

To prevent this, react provides the `useCallback()` and `useMemo()` hooks to **memoize** functions and other values.

In `src/contexts/FlashProvider.js`, update code to memoize flash() and hideFlash()

```js
import { createContext, useContext, useState, useCallback } from 'react';

export const FlashContext = createContext();
let flashTimer;

export default function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({});
  const [visible, setVisible] = useState(false);

  const hideFlash = useCallback(() => {               // updated
    ... // <-- no changes in the function body
  }, []);

  const flash = useCallback((message, type, duration = 10) => {
    ... // <-- no changes in the function body
  }, [hideFlash]);

  // <-- no changes to the returned JSX
}

... // <-- no changes to the hook function
```

`hideFlash()` is moved above because now it is a dependency on `flash()`.


The next listing shows the **memoizing** changes for ApiProvider. `src/contexts/ApiProvider.js`: Memoize onError and api

```js
import { createContext, useContext, useCallback, useMemo } from 'react';
import MicroblogApiClient from '../MicroblogApiClient';
import { useFlash } from './FlashProvider';

export const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const flash = useFlash();

  const onError = useCallback(() => {
    flash('An unexpected error has occurred. Please try again later.', 'danger');
  }, [flash]);

  const api = useMemo(() => new MicroblogApiClient(onError), [onError]);

  // <-- no changes to the returned JSX
}

... // <-- no changes to the hook function
```

Now we have removed all circular dependencies.

## Testing Automation

When you modify code to add new feature, you test that manually. At same time, take some time to write test case for it so that testing can be automated.

[Jest](https://jestjs.io/) is a testing framework for React apps.

Naming convenstion is to use, `.test.js` suffix. So tests for `src/App.js` are written in `src/App.test.js`.

How to do test:

- You can render a component in test.
- Then read text from screen.
- the asset that text to be something

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Here, the function has this signature, `test( test-description , function with test logic)`.

You can re-write this as,

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand element', () => {
  render(<App />);

  const element = screen.getByText(/Microblog/);

  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('navbar-brand');
});
```

Most of the tests will have same structure, render.. read screen and assert.

To **read screen** you can use funcitons like `getBy...()`, `queryBy...()`, `findBy...()` and when you need all as list, `getAllBy...()`, `queryAllBy...()`, `findAllBy...()`.

The **expect** can have `toBeNull()`, `toBeInTheDocument()` and `toHaveClass()`.

**Advanced testing**, Jest allows the tests to mock timers, remote services and other external entities required by the application, so that the test runs in an isolated, controlled and reproducible environment.

## Production Builds

Development build is slow as it facilitates debudding and reloads, production build is built for fast and small size.

Generate build

```sh
npm run build
```

The to serve that

```sh
npx serve -s build
```

This servers the prod build to `localhost:3000` for you to test.

The prod build is dir `./build` which has files that can be hosted on prod web server. It has `index.html` and static folder has css and js.

Now you can run this locally using a simple python server

```bat
c:
cd \code\repos\tutorials\react-mblog\app2-mblog\build
python -m http.server --bind 127.0.0.1 3001
```

Now you can access app at [http://127.0.0.1:3001](http://127.0.0.1:3001)

## Deployment

You can load these to any static web-server like github pages, netlify or using docker.

`DockerFile`: A simple Dockerfile for the React application

```DockerFile
FROM nginx
COPY build/ /usr/share/nginx/html/
```

Build image `docker build -t react-microblog`

Run Container `docker run -p 8080:80 --name microblog -d react-microblog`

Remove containter `docker rm -f microblog`

### Docker-Compose for front-end and back-end

You can define two service in docker compose so that it starts multiple containers, one for front end and another for backend.

`docker-compose.yml`: A Docker Compose configuration

```yml
version: '3.2'
services:
  frontend:
    build: .
    image: react-microblog
    ports:
      - "8080:80"
    restart: always
  api:
    build: ../microblog-api
    image: microblog-api
    volumes:
      - type: volume
        source: data
        target: /data
    env_file: .env.api
    environment:
      DATABASE_URL: sqlite:////data/db.sqlite
    restart: always
volumes:
  data:
```

To run `docker-compose up -d` -d is detached in background

To stop `docker-compose down`

All above steps are:

```sh
npm run build
docker-compose build
docker-compose up -d
```

This can be tedious, another option is to use `npm run deploy` to do all in one command. For that add your scripts in `package.json`

`package.json`: Custom deploy command

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "npm run build && docker-compose build && docker-compose up -d",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

Brilliant...! All done... :)

Nect, [React Native](https://reactnative.dev/), a framework for building React applications that run natively on Android and iOS devices.

## References

- [React Mega Tutorial](https://blog.miguelgrinberg.com/post/introducing-the-react-mega-tutorial)
- [Realpython - Python Http Server](https://realpython.com/python-http-server/)
- [Freecodecamp - News React Crud App How To Create A Book Management App From Scratch](https://www.freecodecamp.org/news/react-crud-app-how-to-create-a-book-management-app-from-scratch/)
