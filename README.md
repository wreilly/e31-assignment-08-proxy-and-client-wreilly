- [e31-assignment-08-proxy-and-client-wreilly](#e31-assignment-08-proxy-and-client-wreilly)
- [LibraryThing.com](#librarythingcom)
- [<span style="color:red">Demo Online</span>](#-span-style--color-red--demo-online--span-)
- [Usage: Install, Build, Deploy](#usage--install--build--deploy)
      - [Pre-Requisite](#pre-requisite)
  * [1. LOCAL](#1-local)
  * [2. PRODUCTION (Digital Ocean)](#2-production--digital-ocean-)
- [User Instructions](#user-instructions)
- [XML Response Handling](#xml-response-handling)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>





# e31-assignment-08-proxy-and-client-wreilly

#### Combination Git Repository for both:
* Express Server (Proxy Server)
* Angular Client

# LibraryThing.com

### No "CORS" Allowed - Solution

My two-part application is used to reach a [LibraryThing.com] Web Service that is **not** configured to allow for "Cross-Origin Resource Sharing" (CORS)

##### XML as String -> XML Document -> JavaScript Object
Additionally, the Angular app integrates two parsers to handle XML as the response format.

## Author
- Assignment 8 (Graduate Credit Extra Work)
- CSCI-E31 https://canvas.harvard.edu/courses/35096
- wreilly2001@gmail.com
- April 30, 2018

# <span style="color:red">Demo Online</span>
- http://104.236.198.117:3000/ (c/o Digital Ocean)

# Usage: Install, Build, Deploy

#### Pre-Requisite
- Obtain WS API Key from [librarything.com] (https://www.librarything.com/services/keys.php)
- Enter key into _/proxy-server/.env_
  - <span style="color:red">__*SEE DEMO ONLINE*__</span> to avoid need for key, etc. Thank you.


## 1. LOCAL
Instructions for getting Proxy Server and Client on __Local Machine__

(See further below for instructions on deploying to __Production__ (Digital Ocean).)

#### Install
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- $ npm install
- cd ../ng-client
- $ npm install

#### Client Build (for local)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build  (creates /dist; uses "local" environment)
  - (npm note: ~~npm run build-local~~   (ran same command: ng build, but was buggy))

##### Client Build (for deploying to Digital Ocean)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build --env=prod (creates /dist; uses "prod" environment)
  - (npm note: ~~npm run build~~ (ran same command: ng build --env=prod, but was buggy))


#### Run (local)

Local Client App will run with either Client Build: Local or Production:

A. For the Local Build, this Local Client App points to
the Local Proxy Server on http://0.0.0.0:3000/

B. For the Production Build, here used in the LOCAL Client App, it will actually point up to the Production Digital Ocean Proxy Server http://103.236.198.117:3000/


- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- npm run start (or, as up at Digital Ocean: nohup npm run start & )

#### Browser
- http://localhost:3000
- (For online at Digital Ocean, please see <span style="color:red">"Demo Online"</span> above)

## 2. PRODUCTION (Digital Ocean)
Instructions for getting Proxy Server and Client onto __Digital Ocean__

#### Prepare the _/dist_ Client Build for D.O.
- Log in to __LOCAL__
- Do "Client Build for Deploying to Digital Ocean" (see above)
- git commit -a -m 'Latest Client Build'
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


# User Instructions
See application homepage.

- Essentially:
  - Simple input box entry for a LibraryThing book_id number (e.g. 1528).
  - Retrieves the LibraryThing "Common Knowledge" record for that title (_The Red Badge of Courage_)
  - Displays to screen a couple bibliographic fields

# XML Response Handling
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