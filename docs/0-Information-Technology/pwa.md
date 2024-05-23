---
date: 2023-10-20
---

# PWA with Flask

_making PWA and Flask work best togther_

## PWA Notes

As John Price explained in his article, How to Turn Your Website into a PWA, the advantages of a PWA are:

- Offline capable
- Installable
- Improved performance
- App-like experience
- Push notifications
- Discoverable
- Linkable
- Always up to date
- Safe
- Cost-effective

**PWA Requirements**

In order to convert a web application to a PWA, there are three main requirements.

- Run it over HTTPS.
- For Installation: Create and serve a manifest file in JSON format.
- For Offline and more: Create and serve a JavaScript file to be registered as a service worker file.

## Manifest

Web App [Manifest](https://app-manifest.firebaseapp.com/) Generator to create `manifest.json`.

## Service Worker

Now depending on your use-case you will expand you `serviceWorker.js` to add more listeners, opening the cache, activating the cache, and adding/fetching URLs and responses to/from the cache and handling offline state.

### Notifications

It **does not** require Service-Worker. There are two main things to notification:

- Is supported?
- Have permission?

If both are `True` you can send notifications.

### Push API

Push notifications extend the notifications and help push notification from server to user. Each client installation gets a `push-endpoint` which device vendor gives.

It requires service worker and public key from server and much more to push.

```js
Eg:
https://fcm.googleapis.com/fcm/send/ctqg6w78iYE:APA9...srGoQ
https://web.push.apple.com/fjthuwerh53iv4mn...dshnfu4
```

## Flask and PWA

For a Progressive Web App in Flask you need a minimum of 3 files:

- Static - A service worker, this must contain a fetch event listener.
- Static - A complete manifest.json file in your root web directory.
- Static - A pwa-app.js to register service worker on document load.
- Route - A landing page (index page) to have pwa-app.js and manifest. May be static as well.

Your app must be served with HTTPS.


## Handon flask-pwa by uwi-info3180

Link <https://github.com/uwi-info3180/flask-pwa>

### Service Worker

This is based on the [First Progressive Web App Tutorial](https://codelabs.developers.google.com/codelabs/your-first-pwapp/) by Google.

The files are cached (stored in browser on device) to make the app-shell work offline. **App Shell** is basic app, may be just landing page. This may include caching the html, javascript, css, images and any other files important to the operation of the application shell.

Non JS App - It is good to avoid your index page as app shell specially if it contains new information, because it may show cached page. Instead you can catch a landing page and an offline page. So landing page is assumed to not change frequently with data. It can show instantly form cache and the other offline page can show when the user is offline and is requesting a n/w reasource.

In `sw.js` (service worker), the cache has a name, `cacheName` and a list of files to cache, `filesToCache`. Note: `sw.js` is not cached.

**Working Offline**: On install, the files from list are cached with the name in `cacheName`. In order to get the web app working offline, the browser needs to be able to respond to network requests and choose where to route them. Use event `fetch`.

**Updating Cache**: To update the cache, on sw activation, we check if the cacheName in sw and cache stored name are same or not. If not, the files are updated, else used from the cache.

The name is like `projectname-v1`. In new release the version can be changed in then name.

Now whenever the app is started, it will request the files from the network. The sw will use cache and will not do network request. If any of the file is not in cache, it can be pulled from network. If no network then it will display an offline page.

You have _control_ at each of these steps using sw. You can specify what to cache, you can use cache or not. You can specify when to update cache. You can specify what to do when offline, you use cache and show old content, or show offine page.

Case Offline: Show basic app, with an optional 'You are offline' banner and for any n/w reqeust show your custom offline page.

Case Online: Show basic app from cache, fast. Show rest of pages via n/w fetch.

Case Update: Update the cache, show optional 'Updating' banner.

So sw does following, in `sw.js`, [github link](https://github.com/uwi-info3180/flask-pwa/blob/main/static/service-worker.js):

```js
const cacheName = 'pwa-with-flask-v1';

const filesToCache = [
    '/',
    '/static/pwa-app.js',
    '/static/my.css',
    '/offline.html',
    '/static/images/pwa-light.png'
];

self.addEventListener('install', (e) => {
    // When the 'install' event is fired we will cache
    // the html, javascript, css, images and any other files important
    // to the operation of the application shell
});

self.addEventListener('activate', (e) => {
    // We then listen for the service worker to be activated/started.
    // Once it is, ensures that your service worker updates its cache
    // whenever any of the app shell files change.
    // In order for this to work, you'd need to increment the cacheName variable
    // at the top of this service worker file.
});

self.addEventListener('fetch', (e) => {
    // Serve the app shell from the cache
    // If the file is not in the cache then try to get it via the network.
    // otherwise give an error and display an offline page
    // This is a just basic example, a better solution is to use the
    // Service Worker Precache module https://github.com/GoogleChromeLabs/sw-precache
});
```

### Responses from Server

In each response sent from server, its header tells browser not to cache. [Github link](https://github.com/uwi-info3180/flask-pwa/blob/main/flask-pwa.py)

```py
...

@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')

...

@app.after_request
def add_header(response):
    """
    Add headers to tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response
```

### Manifest JSON

It has metadata like namme, short name, icons, id, start_url, app_protocol, orientations, theme_color. [github link](https://github.com/uwi-info3180/flask-pwa/blob/main/static/manifest.json)


### PWA Register JS - pwa-app.js

This will have few things related to PWA. [github link](https://github.com/uwi-info3180/flask-pwa/blob/main/static/app.js)

**Register Service Worker (Mandatory)** - This will tell browser to register the sw.

```js
navigator.serviceWorker.register('/sw.js')
```

**Display Network Banner** - Use online and offline event listener to show/hide the banner.

**Install to Home Screen Buttons** - A2HS Button lets user install app to home screen on one click. This is implemented differently.

### Layout

Add following not let user zoom in out and make it feel like app. In `templates/layout.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta name="theme-color" content="#34A5DA">
    <meta name="description" content="A demo flask progressive web app">
    <link rel="icon" sizes="192x192" href="{{ url_for('static', filename='images/android-launchericon-192-192.png') }}">
    <link rel="manifest" href="{{ url_for('static', filename='manifest.json') }}" />
</head>
<body>
    <div class="offline-notification">No Network!</div>
    <header></header>
    <main></main>
    <footer></footer>

    <script type="module" src="{{ url_for('static', filename='app.js') }}"></script>
</body>
</html>
```

-------------------------------------------------

## Handson Dzone

Understanding [Dzone - Flask Game as PWA](https://dzone.com/articles/whatz-the-good-word-pwa-with-flask)

The manifest.json and serviceworker.js files are placed in the static folder, from which Flask serves public assets without requiring server-side routing.



### PWA Register JS - pwa-app.js

This has code to register the service worker when app loads

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
        .register('/wtgw/static/serviceworker.js', {scope: '/wtgw/'})
        .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
```

### Service Worker

Very similar to uwi-info3180. [Github link](https://github.com/mh-github/mh-wtgw/blob/main/static/serviceworker.js). A cacheName and fileToCache var.

In this case, SW checks if request is to a specific URL, which is new word, it goes to server, else, it is tried from cache, if not, it is fetched and added to cache.

In `activate` event, where cache is activated, user has list of caches to be kept. [ ] Why?

### Responses from Server

Nothing specific in this case. No response header, no sw as route.

## Handson flask-pwa by umluizlima

Link [Github umluizlima flask-pwa](https://github.com/umluizlima/flask-pwa)

This one uses workbox by chrome, which is ready to use sw modules.

### PWA Blueprint

It server two files which make them location agnostic. Alos you can set no-caching

```py
from flask import (
    Blueprint, make_response, send_from_directory
)

bp = Blueprint('pwa', __name__, url_prefix='')


@bp.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


@bp.route('/sw.js')
def service_worker():
    response = make_response(send_from_directory('static', 'sw.js'))
    response.headers['Cache-Control'] = 'no-cache'
    return response
```

### Service worker

It uses workbox for caching, updating and installing.

## Handson Conclusion

Use logic of umluizlima as it has blueprint and simplicity
Use SW of uwi-info3180

## Links

- [WebDev article and codelabs](https://web.dev/articles/new-pwa-training)
- [Mozilla Game Build codelab](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames)
- [Web.dev PWA](https://web.dev/explore/progressive-web-apps)
- [Handon - Flipkart](https://auth0.com/blog/introduction-to-progressive-apps-part-one/)
- [Notifications - Mozilla](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push)
- [pwafire.org](https://pwafire.org/developer/codelabs/pwafire/)
- [tool - realfavicongenerator.net](https://realfavicongenerator.net/)
- [what pwa can do today](https://whatpwacando.today/)
- [Github IO PWA Bug Fix Gist](https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e#file-_serviceworker_for_github_pages-md)
- [Github IO PWA Guide](https://christianheilmann.com/2022/01/13/turning-a-github-page-into-a-progressive-web-app/)
- [Github CM Minimal Demo](https://github.com/CodeoMascot/frontends/blob/main/pwa1.html)