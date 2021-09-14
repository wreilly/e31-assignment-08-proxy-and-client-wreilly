require('dotenv').config()
// apikey=`${process.env.LIBRARYTHING_WS_APIKEY}`  (e.g. 59211e ...)
var thisEnvironmentIs = `${process.env.THIS_ENVIRONMENT_IS}`; // (e.g. LOCAL)

var express = require('express');
var path = require('path');
var http    = require('http');

var app = express();

const client_dist_dir_done_right = path.join(__dirname, '..', 'ng-client', 'dist');

/* N.B.
With new "combo" proxy + client Git repository,
this path now goes UP and OUT of
the Express /proxy-server directory,
to get over and then down to the
Angular Client /ng-client/dist directory.
Video 13.8 at ~07:48
 https://canvas.harvard.edu/courses/35096/pages/week-13-build-and-deploy?module_item_id=378294
 app.use('/', express.static('../client/dist'));
 */

app.use('/', express.static(client_dist_dir_done_right))

var server = http.createServer(app);

// For "HTTP" - we'll use AXIOS here in our Proxy Server, to make the request to go to LibraryThing.com
var axios = require('axios');

console.log(' Listening on port :3000 and This Enviroment Is: ', thisEnvironmentIs)
server.listen(3000);

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//  LIBRARY THING WEB SERVICES API
//  (1) BOOK_ID (2) API-KEY
//  GET '/myspecialproxy/:book_id'
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
app.get('/myspecialproxy/:book_id', function (req, res) {

	/*
      http://www.librarything.com/services/rest/documentation/1.1/

      http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=${process.env.LIBRARYTHING_WS_APIKEY}

      Tim Spalding (public APIKEY): d231aa37c9b4f5d304a60a3d0ad1dad4
	 */

	var book_id_here = req.params.book_id;
	console.log('PARAM book_id_here: ', book_id_here); // << E.g., 1528
    console.log('myspecialproxy req.headers: ', req.headers);

	getData(book_id_here, function(err, data) {
		if (err) {
		    res.status(500).send(err);
		} else {
		    // Time to send the CORS data back to the browser
		    // Because LT sends back XML, it IS a STRING.
		    console.log('getData as callback; data.substring(0,250) is: ', data.substring(0,250));
		    /* 'data' here is correct, unescaped, ready to use:
  <?xml version="1.0" encoding="UTF-8"?>
<response stat="ok"><ltml xmlns="http://www.librarything.com/" version="1.1"><item id="1060" type="work"><author...
		     */

			/* ***************  (1) WORKED for AXIOS ************************ */
            //  res.status(200).send(data); // << Working fine, sends as a whole object. All set.

			/*  Special Note:
			     I had used this server.js previously.
			     >> The calling application used AXIOS. <<

			:o)  With Axios, we got back the XML, but was wrapped in simple object { data: "<?xml..." }
			Special Note: That "wrapping" is done by AXIOS and (I believe) the "xhrAdapter" - ./~/axios/lib/adapters/xhr.js

                {data: "<?xml version="1.0" encoding="UTF-8"?>↵<response s… API terms of service.</legal></ltml></response>↵", status: 200, statusText: "OK", headers: {…}, answer
			*/
			/* ***************  /WORKED for AXIOS ************************ */


			/* ********  (2) DOES *NOT* WORK for ANGULAR HTTP **************** */
            //  res.status(200).send(data); // << Not working, sends XML string, breaks on JSON parser.

			/* Special Note:
			     But now shifting to >> Angular's HTTP << for the calling application, I hit an issue:
			 */

			/*  :o(  We get XML string directly:  "<?xml...>"

			 LtWsApi err:  HttpErrorResponse {headers: HttpHeaders, status: 200, statusText: "OK", url: "http://0.0.0.0:3000/myspecialproxy/1528", ok: false, …}
			 SyntaxError: Unexpected token < in JSON at position 0 at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad
			 */
			/* ********  /DOES *NOT* WORK for ANGULAR HTTP **************** */



			/* ************  (3) WORKS for ANGULAR HTTP  ************** :o) */
			/* **** Time for FIX! Do my own "wrapping" right here in my Proxy Server: *** */
			const myWrappedDataObject = { myDataProperty: data }
            res.status(200).send(myWrappedDataObject); // << Working fine, now sends whole object. All set.
			/* ************  /WORKS for ANGULAR HTTP  ************** :o) */
		}
	    });
    });


/* ================== */
function getData(book_id_passed, callback) {
    console.log('getData() - book_id_passed is: ', book_id_passed)
    
	var whatIGot = '';


	/* CORS ERROR:
	    If you try to visit this "Cross Origin" address from web app using BROWSER.
	    Needs PROXY SERVER instead.

	 "Failed to load http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&apikey=${process.env.LIBRARYTHING_WS_APIKEY}&id=1060:"
 	 "No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://0.0.0.0:4200' is therefore not allowed access."
	 */

    ltWebServicesApiUrlStub = 'http://www.librarything.com/services/rest/1.1/';
    ltWebServicesMethodStub = '?method=librarything.ck.getwork&apikey=';
    ltWebServicesApiKey = `${process.env.LIBRARYTHING_WS_APIKEY}`; // for wreilly

	axios.get(`http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=${book_id_passed}&apikey=${process.env.LIBRARYTHING_WS_APIKEY}`)
	.then(response => {
        var localWhatIGotHeaders = response.headers //
		console.log('localWhatIGotHeaders ', localWhatIGotHeaders)
		/* Good. NO "CORS" HEADERS from LibraryThing: (Just as we expected)
		 { server: 'nginx',
		 date: 'Mon, 30 Apr 2018 10:57:20 GMT',
		 'content-type': 'application/xml; charset=UTF-8',
		 'transfer-encoding': 'chunked',
		 connection: 'close',
		 'set-cookie':
		 [ 'cookie_from=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/',
		 'LTAnonSessionID=4055040167; expires=Mon, 29-Apr-2019 10:57:19 GMT; path=/' ],
		 'lt-backend': '192.168.0.35:80',
		 'x-clacks-overhead': 'GNU Terry Pratchett' }
		 */
        var localWhatIGot = response.data //
		var localWhatIGot250 = localWhatIGot.substring(0,250) //
		//	console.log('Axios response.data. localWhatIGot.substring(0, 250) ', localWhatIGot.substring(0,250));

		callback(null, localWhatIGot) // null means, "No error"
	    }).
	catch(error => {
		console.log('SERVER. getData() Did not work. error.code: ', error.code);
	    })
}

/*
Catch-All:
- If user hits browser button to refresh page, the Angular SPA will not be first recipient of that new request.
The Express app will be.
- For any request the Express app does not have a route for, it will simply
use this catch-all, and redirect to the Angular index.html page.
- Recall, the Express (proxy server) app only has one route, for the WS API GET :3000/myspecialproxy/:book_id
- Anything else will fall to this Catch-All:
*/
app.use('/*', (req, res, next) => {
	console.log('CATCH-ALL  "/*" req.headers.host: ', req.headers.host);
	// ^^^^^ Yes:  CATCH-ALL  "/*" req.headers.host:  0.0.0.0:3000
    res.sendFile('index.html', {root: client_dist_dir_done_right})
})
