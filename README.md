# e31-assignment-08-proxy-and-client-wreilly

#### Combination Git Repository for both:
* Express Server (Proxy Server)
* Angular Client

# Table of Contents
- [e31-assignment-08-proxy-and-client-wreilly](#e31-assignment-08-proxy-and-client-wreilly)
- [LibraryThing.com](#librarythingcom)
- [<span style="color:red">>> Demo Online <<</span>](#-span-style--color-red--demo-online--span-)
- [Usage: Install, Build, Deploy](#usage--install--build--deploy)
  * [1. LOCAL](#1-local)
  * [2. PRODUCTION (Digital Ocean)](#2-production--digital-ocean-)
- [End User Instructions](#end-user-instructions)
- [Technical Notes](#technical-notes)
  * [CORS Issue](#cors-issue)
  * [XML Response Handling](#xml-response-handling)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# LibraryThing.com

### No "CORS" Allowed -> Solution

My two-part application is used to reach a LibraryThing.com (https://www.librarything.com) Web Service that is **NOT** configured to allow for "Cross-Origin Resource Sharing" (CORS)

##### XML as String -> XML Document -> JavaScript Object
Additionally, the Angular app integrates two parsers to handle XML as the response format.

## Author
- Assignment 8 (Graduate Credit Extra Work)
- CSCI-E31 https://canvas.harvard.edu/courses/35096
- wreilly2001@gmail.com
- April 30, 2018

# <span style="color:red">>> Demo Online <<</span>
- http://104.236.198.117:3000/ (c/o Digital Ocean)

# Usage: Install, Build, Deploy

#### Pre-Requisite
- Obtain WS API Key from [librarything.com] (https://www.librarything.com/services/keys.php)
- Enter key into _/proxy-server/.env_
  - <span style="color:red">__*SEE DEMO ONLINE*__</span> to avoid need for key, etc. Thank you.


## 1. LOCAL
Instructions for developing and testing Proxy Server and Client on __Local Machine__

(See further below for instructions on deploying to __Production__ (Digital Ocean).)

#### Install Modules
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- $ npm install
- cd ../ng-client
- $ npm install

#### Client Build (for local)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build  (creates /dist; uses "local" environment)
  - (npm note: I tried ~~_npm run build-local_~~   (to run same command: _ng build_, but was buggy))

##### Client Build (for deploying to Digital Ocean)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build --env=prod (creates /dist; uses "prod" environment)
  - (npm note: I tried ~~_npm run build_~~ (to run same command: _ng build --env=prod_, but was buggy))


#### Run (local)

Local Client App will run with either Client Build you create: Local or Production

A. For the Local Build, this Local Client App points to
the Local Proxy Server on http://0.0.0.0:3000/

B. For the Production Build, here used in the LOCAL Client App, it will actually point up to the Production Digital Ocean Proxy Server http://103.236.198.117:3000/


- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- npm run start

#### Browser
- http://localhost:3000


## 2. PRODUCTION (Digital Ocean)
Instructions for getting Proxy Server and Client onto __Digital Ocean__ (D.O.)

#### Prepare the _/dist_ Client Build for D.O.
- Log in to __LOCAL__
- Do "Client Build for Deploying to Digital Ocean" (see above)
- git commit -a -m 'Latest Client App Prod Build to /dist'
- git push

#### Get Code from Github
This gets code for both Proxy Server and Client App Build
- Log in to __Digital Ocean__
- First time: # git clone git@github.com:wreilly/e31-assignment-08-proxy-and-client-wreilly.git
  - Subsequent updates: # git pull

#### Install on D.O.
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- $ npm install
  - (Note: Not necessary to do 'npm install' on the Angular client.)

#### Run
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- nohup npm run start &
  - (optional): tail -f nohup.out

#### Browser
- http://104.236.198.117:3000/ (Digital Ocean)


# End-User Instructions
See application homepage.

- Essentially:
  - Simple input box entry for a LibraryThing book_id number (e.g. 1528).
  - Retrieves the LibraryThing "Common Knowledge" record for that title (_The Red Badge of Courage_)
  - Displays to screen a couple bibliographic fields

# Technical Notes

## CORS Issue

CORS: "Cross-Origin Resource Sharing"

Q. What problem is this solving?

A. To begin, a little narrative, about the browser's "Same Origin Policy":

```
Assume you are logged into Facebook and visit a malicious website in another browser tab.

Without the same origin policy JavaScript on that website could do anything
to your Facebook account that you are allowed to do.

For example read private messages, post status updates, or
analyse the HTML DOM-tree after you entered your password...

(https://teamgaslight.com/blog/circumventing-same-origin-policy-using-a-proxy-server)
```


That is, this Same Origin Policy means that:

- Browser visiting web app on one domain (e.g. http://localhost:4200) ...
- ... is **not** allowed to make service request from that app over to another domain (e.g. https://www.librarything.com) ...
- ... **unless** that other domain does set server headers to **allow** Cross-Origin Resource Sharing.

In our example app, we see that:

- FakeAPI.com **does** allow Cross-Origin Resource Sharing, and our app request direct to that API works fine.
  - Response Headers:
    - Access-Control-Allow-Origin: *
- LibraryThing.com on the other hand does **not** have CORS headers set. A direct app request from the browser will fail.
  - Response Headers: (_none_ of these are "Access-Control-Allow-Origin")
    - Connection: keep-alive
    -  Content-Encoding: gzip
    -  Content-Type: application/xml; charset=UTF-8
    -  Date: Mon, 30 Apr 2018 09:36:48 GMT
    -  lt-backend: 192.168.0.102:80
    -  Server: nginx
    -  Transfer-Encoding: chunked
    -  X-Clacks-Overhead: GNU Terry Pratchett

Selected Resources:
- https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
- https://fetch.spec.whatwg.org/#http-access-control-allow-origin

#### CORS Error:
To test, I did temporarily put a web service request to LibraryThing.com directly into my Angular client app. It caused this error:

```
Failed to load
http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&apikey=59211e...&id=1060:

No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'http://0.0.0.0:4200' is therefore not allowed access.
```

#### Proxy Server Instead
One solution (which we use in this app) is to create a Proxy Server which your app calls, to have it issue the web service request to LibraryThing.com.

There is no issue with "Cross-Origin" when the request is coming from a server, instead of from a browser.

Helpful explanatory article: https://teamgaslight.com/blog/circumventing-same-origin-policy-using-a-proxy-server

### Enabling CORS on *YOUR* Server
As a side note:

Finally, at the risk of confusion, if YOU are OWNER of a Server (say if you were owner of LibraryThing) and you wanted to make it "CORS-Enabled," here is the beginning of some information on the middleware you would use (for Node.js and Express anyway):

https://enable-cors.org/server_expressjs.html

https://fetch.spec.whatwg.org/#http-cors-protocol


```
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
    });
```


## XML Response Handling
Notes on Processing the XML (as String) Response:

- 1). LibraryThing Web Services API returns XML as String (to my Proxy Server).

- 2). Proxy Server returns XML String to Angular Client, which uses Browser's window.DOMParser to create XML Document from String.
  - I used Inject 'window' as Angular Service, to access the DOMParser

- 3). Angular Client integrates with 3rd party JavaScript: 'parse.js' (which in turn has dependency on Lodash), to create JavaScript object from XML Document, parts of which finally are displayed to Client app webpage.
  - parse.js:
    - Convert to parse.ts.
    - Export functions for import into Angular components
  - Lodash:
    - npm install lodash
    - npm install @types/lodash
    - import * as _ from 'lodash'