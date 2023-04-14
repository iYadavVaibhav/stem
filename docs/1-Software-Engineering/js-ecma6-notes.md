---
description: ECMA 6+ Notes
date: 2022-07-11
---

# ECMA 6+

ECMAScript is a JavaScript standard meant to ensure the interoperability of web pages across different web browsers.

ECMA 6 or ES 6 or ECMAScript 2015, added new feature to javascript which are highlighted below.

## New Changes in ES6

Some changes in ES6 compared to ES5

### Variables

`let` is used to allow block scope of variables.

`const` is used to define a fixed value to variable, if it changes, it throws error and does not allow to change.

Template strings are used to print formatted strings. use `Name is $(fName)`, here fName is a variable. it cna be multiline too.

```javascript
let greeting = `Hello, ${name}!`;
```

### Functions

`for ... of` new for loop.

```javascript
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

```javascript
// destructuring array
const [a,b] = [1,2]; // a=1, b=2

// destructuring object
const {p,q} = {p:1,q:2} // use same key name
// p=1, q=2
```

### Import and Export

Now you can import functions from modules that export it. This is more robust dependency management compared to using `<script>` tag.

A JavaScript module is a JS file. It can have a function with `export` to make use of it in another file. Or import entire JS file.

```javascript
export GRAVITY = 9.81;
export default function abc() {
  console.log('from abc in file1.js !');
}
```

Another file can import it. As it is `default`, it can be imported with any name.

```javascript
import abc from './file1.js';
import { GRAVITY } from './file1.js';
import './index.css';
```

Provide relative path of file (module). `.js` is optional. `index.css` has no export and hence entire file is imported without using `from` keyword.

Other way is to use library, like `react`. You can import without absolute path. `Module` is a unit of software that is basically a file that you can refer. It usually has variables and functions. `Library` is collection of modules that is distributed as `package` and is managed by a manager like npm or pip. Library has multiple files.


```javascript
import React from 'react';
```


### Arrow Functions

`=>` arrow funcitons.

```javascript
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
  const response = await fetch('https://example.com/data.json');
  // response has header, body, status codes
  const data = await response.json(); // extract json from body
  console.log(data);
}
```

Error handling can be done using `try.. catch` block in this.

### Classes

Now you can use classes in ES6.

## JSX - JavaScript XML

This is not part of ES6, but is an extension to make it easier to use HTML in JavaScript. It lets us write HTML inline and this templates are eaisier to maintain. More in [[React]]

Links

- Modern JavaScript - <https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-1-modern-javascript>
- Learning ECMAScript 6+ (ES6+) - <https://www.linkedin.com/learning/learning-ecmascript-6-plus-es6-plus/using-modern-javascript-today>
