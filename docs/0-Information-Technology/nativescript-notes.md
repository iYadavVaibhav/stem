---
description: NativeScript Notes
date: 2018-07-03
---

# NativeScript

NativeScript ( or tns Telerik NativeScript) is used to make native iOS and Android apps using Angular/TypeScript or JavaScript.

## Setting up the environment

Required:

- node
- nativescript cli
- native script cli uses npm

Installation:

- do npm install script and then add package

- `$ sudo npm install nativescript -g` to install globally
- `nativescript --version` to confirm installation
- tns is alias to nativescript

iOS prerequisites

- Xcode
- Xcode CLT

NS CLI

- component
- module
- html

## Application Architecture

How the application is architectured.

### JavaScript

- **app.ts** is the entry point of application. We can do app level initialization here. But this is basically used to pass control to first module.
- we can have **app.css** to keep our global css rules.
- A folder for each module/view
  - eg: home
- home folder can have three files.
  - home-page.xml having xml for UI
  - home-page.ts code behind file for xml above. Can call functions
  - home-view-model.ts having data, binding and other logics.

### Angular Script

for each module we need:

- home.component.html it has all html ui defined
- home.component.css has css rules related to this module
- home.component.ts has code behind the html ui
- home.module.ts imports everything to one place
- home-routing.module.ts routing for module ui

Component is building block of all angular nativescript

- Component defines UI elem and screens
- root - app.component
- child - pt_backlog
- backlog module

Modules

- use one module per file as an ES15 standard


## Notes

- Every UI element should be inside a layout, else only last UI element takes whole screen.
- Making Angular Groceries App
  - All UI elements come in stack layout in app.component.ts and add their css to css files

## Uninstalling

- `$ sudo npm uninstall nativescript -g` to uninstall globally

---

References:

- Refer: <https://docs.nativescript.org/angular/start/tutorial/ng-chapter-1#11-what-youre-building>
