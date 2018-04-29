require('dotenv').config()
// `apikey=${process.env.LIBRARYTHING_WS_APIKEY}`  (e.g. 59211e ...)

var express = require('express');
var path = require('path');
var http    = require('http');

// THIS FILE:
// /Users/william.reilly/dev/VueJS/AXIOS-etc/server-proxy-my-simple-attempt/server.js

/* A(NOTHER) NICE (EARLIER) EXAMPLE SERVER:
$ pwd
/Users/william.reilly/dev/VueJS/Udemy-vuejs-from-beginner-to-professional-Bo-Andersen/12-HTTP-vue-resource/start/backend/server.js
 */

// console.log('wass is http? ', http) // << Yes, it's there. 
// Q. But from where ? 
// A. Must be baked into Node, n'est-ce pas?
// A+.: https://nodejs.org/api/http.html#http_http  :o)

// Express server
var app = express(); /* express.createServer will not work here */

// CORS in Express.js / Node.js
// https://enable-cors.org/server_expressjs.html
// Just learning: guess there's an "app.use(cors)" thing out there, simplifies things ... cheers.
var cors = require('cors');
/* Hmm. For me:

(1) Did NOT Work: app.use(cors)
My client app only got to OPTIONS (pending)
Request URL:http://127.0.0.1:3000/myspecialproxy/asset/4040-PDF-ENG
Provisional headers are shown
Access-Control-Request-Headers:authorization
Access-Control-Request-Method:GET

(2) DID Work: (at least, got further) : OPTIONS 200; GET (pending)
 app.use(function(req, res, next){ ...
Request URL:http://127.0.0.1:3000/myspecialproxy/asset/4040-PDF-ENG
Provisional headers are shown
Accept:application/json, text/plain, * / *
Authorization:bearer eyJjdHkiOiJKV1QiLCJlbmMiOiJBMTI ...
Origin:http://127.0.0.1:8000
Referer:http://127.0.0.1:8000/
 */
// (1) app.use(cors); // << Nope. See above.
// (2) :
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // ADDED Authorization << Yeah! That helped
	// https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr
	// https://fetch.spec.whatwg.org/#http-cors-protocol
	// https://www.npmjs.com/package/cors
	next();
    });


/*   DIST subfolder for the CLIENT
The Angular client app will go inside the overall parent directory for
this Express proxy server app.



 */

const client_dist_dir = path.join(__dirname, '..', '..', 'ng-client', 'dist');
// '../../ng-client/dist'
/* N.B.
With new "combo" proxy + client Git repository,
this path now goes UP and OUT of
the Express /proxy-server directory,
to get over and then down to the
Angular Client /ng-client/dist directory.
Will that work ???
 */
app.use('/', express.static(client_dist_dir))


var server = http.createServer(app);

// HTTP time - we'll try AXIOS y not
var axios = require('axios');

console.log(' Listening on port :3000' );
server.listen(3000); // , '0.0.0.0');


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// GET '/'
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
app.get('/', function (req, res) {
	// DEPRECATED: 
	// res.sendfile(__dirname + '/index.html');
	   res.sendFile(__dirname + '/index.html');
    });

// $$$$$$$ LIBRARY THING WS API (1) XML BOOK_ID (2) API-KEY "BAKED IN" $$$$$
// GET '/myspecialproxy/:book_id'
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// app.get('/myspecialproxy', function (req, res) {
app.get('/myspecialproxy/:book_id', function (req, res) { // trying PASS a URL PARAM!   (e.g. 1528 = "The Red Badge of Courage")
	// http://expressjs.com/en/api.html#req.params

	// hoping to send cross-domain request to LibraryThing
	// get back XML
	// send that back to the requesting client who called this resource (my little Vue.js app)
	// wish us luck (WUL)
	/* 
http://www.librarything.com/services/rest/documentation/1.1/

`http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=${process.env.LIBRARYTHING_WS_APIKEY}` << wreilly

Tim Spalding (public): d231aa37c9b4f5d304a60a3d0ad1dad4
	 */

	var book_id_here = req.params.book_id;
	console.log('WR__ PARAM! book_id_here: ', book_id_here); // << YES. 1528
	console.log('WR__ myspecialproxy req.headers: ', req.headers); // << yes
	console.log('WR__ myspecialproxy res.outputSize: ', res.outputSize); // << yes. '0'

	getData(book_id_here, function(err, data) {
		if (err) {
		    res.status(500).send(err);
		} else {
		    // Time to send the Good News back to the browser
		    // (my little Vue.js app. whoa.
		    //    res.json(data); 
		    // Here because LT sends back XML, it IS a STRING. (But HBSP sends back JSON. OBJECT. Oy!)
		    console.log('wow getData as callback, data.substring(0,250) is: ', data.substring(0,250)); 
		    /* All nice and unescaped and everything:
  <?xml version="1.0" encoding="UTF-8"?>
<response stat="ok"><ltml xmlns="http://www.librarything.com/" version="1.1"><item id="1060" type="work"><autho
		     */
			var answer = typeof(data);
			console.log('well, the answer is: ', answer); // string

			// http://expressjs.com/en/4x/api.html#res.send

			/* FALSE ALARM:
I *thought* we had an issue but we do not.
- The "escaped" quote marks do NOT appear in the string that does make it to the Vue.js app. :o)
- The "escaped" quotes WERE seen on the *rendered to HTML* version :o(
- But, simply rendering response.data instead of response, and the escaping business GOES AWAY. :o)

Nope>>>			// Seems ".send()" is making our string, which being XML has lots of quoted attributes in it, and those quotes are all getting escaped \"
			// Hmm, can we send the whole string unescaped, in an object somehow?
...
			*/
			/* *************** WORKED for AXIOS ************************ */
            //  res.status(200).send(data); // << Working fine, sends whole object. All set.

			/*  :o)   We get XML, but wrapped in simple object { data: "<?xml..." }
			Special Note: That "wrapping" is done by AXIOS and the "xhrAdapter" - ./~/axios/lib/adapters/xhr.js

            Axios response! is this stuff XML?
                {data: "<?xml version="1.0" encoding="UTF-8"?>↵<response s… API terms of service.</legal></ltml></response>↵", status: 200, statusText: "OK", headers: {…}, answer
			*/
			/* *************** /WORKED for AXIOS ************************ */

			/* **** DOES *NOT* WORK for ANGULAR HTTP **************** */
            //  res.status(200).send(data); // << Not working, sends XML string, breaks on JSON parser.
			/* :o(  We get XML:  "<?xml...>"

			 LtWsApi err:  HttpErrorResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://0.0.0.0:3000/myspecialproxy/1528", ok: false, …}
			 SyntaxError: Unexpected token < in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad
			 */

			/* **** Time for FIX! Try my own "wrapping" right here in my Proxy Server: *** */
			/* ************ WORKS for ANGULAR HTTP  ************** :o) */
			const myWrappedDataObject = { myDataProperty: data }
            res.status(200).send(myWrappedDataObject); // << Working fine, sends whole object. All set.


		}
	    });
    });

// ==================
function getData(book_id_passed, callback) {
    // NEW! Try PARAM for which book: 1528 for The Red Badge of Courage
    // only param is the callback
    // otherwise, just hard-coded to get one book from LTWSAPI / XML
    console.log('If you see me, we are in getData(). AND, book_id_passed is: ', book_id_passed)
    
	var whatIGot = 'dummystringfernow'

	/* HERE (I think) we Go To LibraryThing
	   - Server calling server means NO CORS DIFFICULTIES (I think)
	   - Get XML back (No "JSONP" mismatch handling)
	   - Going to "send" that XML (as String, I presume) back to calling client (my little Vue.js app)
	   - Who knew.
	 */

	/* CORS ERROR:
	    If you try to visit this address from BROWSER.
	    Needs PROXY SERVER instead.

	 Failed to load http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&apikey=${process.env.LIBRARYTHING_WS_APIKEY}&id=1060:
 	 No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://0.0.0.0:4200' is therefore not allowed access.
	 */


    ltWebServicesApiUrlStub = 'http://www.librarything.com/services/rest/1.1/';
    ltWebServicesMethodStub = '?method=librarything.ck.getwork&apikey=';
    ltWebServicesApiKey = `${process.env.LIBRARYTHING_WS_APIKEY}`; // for wreilly
    ltWebServicesBookIdHardCoded = '1060'; // for Stephen Crane's "Red Badge of Courage"

	/*
	 ?method=librarything.ck.getwork&apikey=${process.env.LIBRARYTHING_WS_APIKEY}&id=1060';
	 */

	/* THIS URL is what the *http proxy server* guy does:  Not my little in-app "service" here.
	 (`${this.ltWebServicesApiUrlStub}${this.ltWebServicesMethodStub}${this.ltWebServicesApiKey}&id=${book_id}`)
	 */


    // Hard-coded to '1060'
	//	axios.get(`http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=${process.env.LIBRARYTHING_WS_APIKEY}`)
	axios.get(`http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=${book_id_passed}&apikey=${process.env.LIBRARYTHING_WS_APIKEY}`)
	.then(response => {
		var localWhatIGot = response.data //
		var localWhatIGot250 = localWhatIGot.substring(0,250) //
		//		console.log('Axios response.data.substring(0, 250)! is this stuff XML? ', response.data.substring(0,250));

		// ? subString breakin' stuff?
		// Yah-hah! dope. it's not "subString()" - it is "substring()" Ye Gawds.
		//		console.log('Axios response.data. localWhatIGot.substring(0, 250)! is this stuff XML? ', localWhatIGot.substring(0,250));

		// yeah yeah		console.log('Axios response.data.  localWhatIGot250 is this stuff XML? ', localWhatIGot250);
		callback(null, localWhatIGot) // null is, "We ain't got no stinkin' error"
	    }).
	catch(error => {
		console.log('Ah CRAP. SERVER. getData() Did na work. error.code: ', error.code);
	    })
	

	    // Hmm. Not from here... Move it above. ^^     callback(null, whatIGot) // null is, "We ain't got no stinkin' error"
}

/*
Catch-All: If user hits refresh page, the Angular SPA will not be first recipient of that new request.
The Express app will be. For any request the Express app does not have a route for, it will simply
use this catch-all, and redirect to the Angular index.html page.
Recall, the Express (proxy server) app only has one route, for the GET :3000/myspecialproxy/:book_id
Anything else will fall to this Catch-All:
---------
app.js in Express
---------
It worked. :o)   http://0.0.0.0:4200/foobar  came back to Angular SPA page
Spoke too soon.
Try: http://0.0.0.0:3000/foobar
And you (quite properly) get:
"Error: ENOENT: no such file or directory, stat '/Users/william.reilly/dev/JavaScript/CSCI-E31/Assignments/08-graduate-assignment-proxy-server/e31-assignment-08-express-proxy-server-no-cors-wreilly/client/dist/index.html'"
Good!
*/
app.use('/*', (req, res, next) => {
    res.sendFile('index.html', {root: client_dist_dir})
})
