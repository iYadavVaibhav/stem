---
description: JavaScript Libraries and Frameworks Notes
date: 2018-07-12
---

# JavaScript

_all about JavaScript, it's frameworks and variations_

## JavaScript Concepts

**How Functions behave:**

We can make a function in JS by defining it like we define a variable.

```javascript
myFunction = function(arg1, arg2, arg3) {
  // all that you want to do
  // use args or may be they are optional
  //...
  return myResult;
}
```

another way is, arrow notation:

```javascript
myFunction = arg1 => {
  // all that you want to do
  // use args or may be they are optional
  //...
  return myResult;
}
```

now this function can return a variable which could possibly be any data/object/json etc.

Function can now be used to get the result

```javascript
myFunction(arg1, arg2).done( function (data) {
  // Now do what you want to do with result in data
});
```

Now we see that, done would be triggered once myFunction is completed. All jQuery promises provide a done method that takes a callback.

**JS Objects**

- JS Object can hold anything, they can even hold another function.
- They are accessed using . DOT notation.

## Node JS

Overview:

- node js is like asp/php/python, it makes use of JS for backend lang.
- you can run .js files outside browser
- npm is package manager for node js, like pip
- pakages are nothing but js libraries.
- `npm install` downloads a package and it's dependencies defined in a `package.json` file and generates a node_modules folder with the installed modules.

## Angular JS

Overview:

- We can define a resource in app folder eg: hero.ts to include the class with it's members.
- We can make components for various behaviors of our app. eg:
  - heroes - to list all heroes
  - hero-detail - to keep functionality for one hero

## Typescript

It is superset of javascript, basically used to make use of new features of JS coming with ES6, ES7 and compile them back to old ES3 that can be used with IE and Safari as well.



## JS Snippet - How to quickly scrape all links from page

Use JS path to get all a tags you are interested in, do inspect, go to div having all a, then right click and copy `JS Path`. Then add path till `a` tag to this `div JS Path`. Now that you have JS Path to all the anchor tags, you can iterate over them and make a list then copy. You can execute this in console directly, eg:

- JS Path to div `#root > div > div.sc-AxjAm.tlQbp > div > main > div > div > div`
- JS Path to all a tags `article > div:nth-child(2) > div > div:nth-child(5) > a`
- Join both together, then loop

```javascript
links = '';
document.querySelectorAll("#root > div > div.sc-AxjAm.tlQbp > div > main > div > div > div > article > div:nth-child(2) > div > div:nth-child(5) > a").forEach(function (e) {links+="yourCmd "+e.href+" \n";})
copy(links)
```

This copies the output to clipboard.

## Links

- [NativeScript Notes](../nativescript-notes)
- [ECMA6 Notes](../js-ecma6-notes)
- [React JS Notes](../react-js-notes)
