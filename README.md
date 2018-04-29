# e31-assignment-08-proxy-and-client-wreilly

#### Combination Git Repository for both:
* Express Server (Proxy Server)
* Angular Client

## LibraryThing.com

### No "CORS" Allowed - Solution

My two-part application is used to reach a LibraryThing.com Web Service that is **not** configured to allow for "Cross-Origin Resource Sharing" (CORS)

##### XML as String -> XML Document -> JavaScript Object
Additionally, the Angular app integrates two parsers to handle XML as the response format.

### Author
- Assignment 8 (Graduate Credit Extra Work)
- CSCI-E31 https://canvas.harvard.edu/courses/35096
- wreilly2001@gmail.com
- April 30, 2018

### Demo Online
- http://104.236.198.117:3000/ (Digital Ocean)

## Usage
SEE DEMO ONLINE to avoid need for key, etc. Thank you.

#### Pre-Requisite
- Obtain WS API Key from [librarything.com] (https://www.librarything.com/services/keys.php)
- Enter key into _/proxy-server/.env_

#### Install
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- $ npm install
- cd ../ng-client
- $ npm install

#### Build (local)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build  (creates /dist; uses "local" environment)
  - (npm note: ~~npm run build-local~~   (ran same command: ng build, but was buggy))

##### Build (deploy to Digital Ocean)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd ng-client
- ng build --env=prod (creates /dist; uses "prod" environment)
  - (npm note: ~~npm run build~~ (ran same command: ng build --env=prod, but was buggy))


#### Run (local)
- $ pwd -> /e31-assignment-08-proxy-and-client-wreilly
- cd proxy-server
- npm run start (or, as up at Digital Ocean: nohup npm run start & )

#### Browser
- http://localhost:3000
- (For online at Digital Ocean, please see "Demo Online" above)

## User Instructions
See application homepage.

- Essentially:
  - Simple input box entry for a LibraryThing book_id number (e.g. 1528).
  - Retrieves the LibraryThing "Common Knowledge" record for that title (_The Red Badge of Courage_)
  - Displays to screen a couple bibliographic fields

