import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// No need to specify which environment file (e.g. "prod")
import { environment } from '../environments/environment';

@Injectable()
export class LibraryThingService {
/*
Service to reach REST Services
from LibraryThing.com (LT)
for two purposes:

1) "LT Web Services API"
   - No CORS support
   - JSONP can *not* be used...
   -- ...because it *returns XML*
   - Therefore requires Proxy Server

2) "LT JavaScript API"
   - No CORS support
   - JSONP can be used
   -- (Therefore does *not* require proxy server)

INPUTS TO QUERY:
# 1) API Key, Book ID
# 2) User ID

DATA TYPE RETURNED:
# 1) returns XML
# 2) returns JSON

BUSINESS PURPOSE:
# 1) provides general information about a given work (book)
# 2) provides specific information from your own LT catalog/account

SAMPLE URL:
# 1) example:
 http://www.librarything.com/services/rest/1.1/
 ?method=librarything.ck.getwork
 &apikey=59211e...
 &id=1060

 ("ck" is their "Common Knowledge" database)


# 2) example:
 http://www.librarything.com/api_getdata.php/
 ?userid='wreilly'
 &showstructure=1
 &max=10
 &showCollections=1
 &showTags=1
 &booksort=title_REV

 */

    apiUrlStubInService = environment.apiUrlStubInEnvironment;

    constructor(private _myHttpService: HttpClient) {  }

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
/* ^^^^^^   TOC   ^^^^^^^^^^^^^  */
/*

get100FakeAPI()  (just demonstration purpose)

getLibraryThingCK(book_id)

getLibraryThingMyBooks(user_id)

*/

  get100FakeAPI() {
    // "100" is the default return for "get ALL" from this free, open, "fake" API.

/* YER WRONG: No. Do not just "return" this asynchronous call like so: */
// Yes we DO "just return" from here.
      return this._myHttpService.get('https://jsonplaceholder.typicode.com/posts');

/* WRONG: Hmm.    Must handle with XXPromise!XX XXObservable!!XX */
/* NO. Here, Angular HttpClient thing GENERATES an Observable.
       In the calling app.component.ts, we SUBSCRIBE to that Observable.
       Cheers.

      this._myHttpService.get('https://jsonplaceholder.typicode.com/posts')
          .subscribe(
              (whatIGot) => {
                  return whatIGot;
              }
          )
*/
  }

  getLibraryThingCK(book_id) {
      // "CK" = Common Knowledge, a LibraryThing.com feature.
    console.log('here we are in LT SERVICE & Etc. book_id is ', book_id);
      return this._myHttpService.get(`${this.apiUrlStubInService}myspecialproxy/${book_id}`);
/* WORKS !
      return this._myHttpService.get(`http://0.0.0.0:3000/myspecialproxy/${book_id}`);
*/

      /* E.g., Proxy Server in turn sends to:
       http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=59211e...
       */

      /* CORS ERROR:
       If you try to visit this address from BROWSER.
       Needs PROXY SERVER instead.

       Failed to load http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&apikey=59211e...&id=1060:
       No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://0.0.0.0:4200' is therefore not allowed access.
       */

  }


} // /LibraryThingService
