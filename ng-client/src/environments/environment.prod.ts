export const environment = {
  production: true,


  /* For doing "Prod in Dev" trial: */
//  apiUrlStubInEnvironment: 'http://0.0.0.0:3000/'

/* The REAL Prod value: */

  apiUrlStubInEnvironment: 'http://104.236.198.117:3000/'

};

/*

 To "test" Production right here on local machine,
 I must put this *local* value for the "apiUrlStub"
 into the "prod" environment configuration,
 temporarily.


 $ pwd
 /Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-ng-client-no-cors-wreilly/src/environments/environment.prod.ts

 The 'ng build --prod' then does use this "prod" environment configuration:

 $ npm run build

 > e31-assignment-08-ng-client-no-cors-wreilly@0.1.0 build /Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-ng-client-no-cors-wreilly
 > ng build --prod

 Date: 2018-04-28T03:01:54.799Z                                                t Hash: a5271c68d6a4b73e4e0e
 Time: 20568ms
 chunk {0} polyfills.46af3f84a403e219371b.bundle.js (polyfills) 59.7 kB [initial] [rendered]
 chunk {1} main.687ca244cc21d10aa7cf.bundle.js (main) 261 kB [initial] [rendered]
 chunk {2} styles.6da739fcd01bbf44b968.bundle.css (styles) 521 bytes [initial] [rendered]
 chunk {3} inline.9a93e81c2ad8393cf32e.bundle.js (inline) 1.45 kB [entry] [rendered]


 I then COPY that Angular client's build to /dist into the
 Express server's "root/client" directory,

 $ cp dist/* ../e31-assignment-08-express-proxy-server-no-cors-wreilly/client/dist/


 And then can run the entire app from
 one port, one URL, one server startup.

 1). Angular on local dev is *NOT* running:
 $ pwd
 /Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-ng-client-no-cors-wreilly
 $ fg
 -bash: fg: current: no such job

 2). Express on local dev *IS* running, AND it contains (and serves up) the Angular client app!

 ---------
 See Express /server.js for all the magic to make that happen:
 ---------
 const client_dist_dir = path.join(__dirname, '.', 'client', 'dist');
 app.use('/', express.static(client_dist_dir))
 ---------

 $ pwd
 /Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-express-proxy-server-no-cors-wreilly

 $ npm run start

 > server-proxy-my-simple-attempt@1.0.0 start /Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-express-proxy-server-no-cors-wreilly
 > nodemon server.js

 [nodemon] 1.14.11
 [nodemon] to restart at any time, enter `rs`
 [nodemon] watching: *.*
 [nodemon] starting `node server.js`
 Listening on port :3000


 http://0.0.0.0:3000/
 Works.
 Brings up the Angular client
 http://0.0.0.0:3000/index.html
 which brings in all the built JavaScript at /client/dist
 which runs the Single-Page App in the browser.
 Then, clicking "Submit" does work to invoke the Express Proxy Server
 on
 http://0.0.0.0:3000/myspecialproxy/:book_id
 which in turn uses Axios (HTTP) to send request to librarything.com/api/...


 */