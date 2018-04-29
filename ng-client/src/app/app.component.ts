import { Component } from '@angular/core';
import { LibraryThingService } from './library-thing.service';

// https://juristr.com/blog/2016/09/ng2-get-window-ref/
import { WindowRefService } from './WindowRefService';

import { lilInspector } from '../utils/lilInspector';
import { flatten, parse } from '../utils/parse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LibraryThingService, WindowRefService ]
})
export class AppComponent {
  title = 'LibraryThing - Web Services API';
  fakeApiStuff; // the [{},{}...] of lorem ipsum ....
  ltWsApiStuff; // the XML data off of the web service return
  myAuthor;
  myTitle;
  myRating;
  myLtUrl;
  myCharacterNames = [];


  constructor(private _myLibraryThingService: LibraryThingService, private _myWindowRefService: WindowRefService) {  }

  /* ******************************* */
  /* *******  FAKEAPI ************** */
  getFakeAPI(event) {
    this._myLibraryThingService.get100FakeAPI()
    .subscribe(
       (response: any) => {
         console.log('Ng HTTP response is ', response);
         lilInspector(response[0], '');
/* Input:
[ 0: {userId: 1, id: 1, title: "sunt aut facere ..."}
*/
         this.fakeApiStuff = response;
          console.log('Ng HTTP this.fakeApiStuff is ', this.fakeApiStuff); // [{},{}...]
       },
       (err) => {
         console.log('Ng HTTP err ', err);
       },
       () => { console.log('Complete .......'); }
     );
  }

  clearFakeAPI() {
      this.fakeApiStuff = []; // reset
  }

  /* ******************************* */
  /* ***** LIBRARYTHING - WEB SERVICES (XML) API ******* */
  /* ******************************* */
  getLtWsApi(inputElementRefPassedIn) {
    // console.log('LtWsApi eventPassedIn ', eventPassedIn);
    // const book_id_hardcoded = '1528'; // Red Badge of Courage
    // const book_id: string = inputElementRefPassedIn.value;

    let book_id = '';

    // If user just clicks Submit (no entry to input box),
      // we'll run default book 1528 (Red Badge of Courage)
    inputElementRefPassedIn.value ? book_id = inputElementRefPassedIn.value : book_id = '1528';


    // Reset display of data
    this.myAuthor = '';
    this.myTitle = '';
    this.myRating = '';
    this.myLtUrl = '';
    this.myCharacterNames = [];


    this._myLibraryThingService.getLibraryThingCK(book_id) // (book_id) // (book_id_hardcoded)
      .subscribe(
        (whatIGot: any) => {

          /*
          Special Note
          For use with Angular's HTTP
          (as opposed to with Axios, before),
          I doctored the proxy server.
          Here is what it is sending us:

           // Time to try my own "wrapping" right here in my Proxy Server:
           const myWrappedDataObject = { myDataProperty: data }
           res.status(200).send(myWrappedDataObject); // << Working fine, sends whole object. All set.

           We may need to use whatIGot.myDataProperty to get at the XML string.
           We'll see.
           */

      //    console.log('here we are & Etc. whatIGot.myDataProperty ', whatIGot.myDataProperty);
            /* STILL COMPLAINING. W-a-a-a-a-h.
"ERROR in src/app/app.component.ts(87,40): error TS2339: Property 'myDataProperty' does not exist on type 'Object'."
             */
          this.ltWsApiStuff = whatIGot.myDataProperty;

// https://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript
          /* TODO Consider this alternative:
           https://naturalintelligence.github.io/fast-xml-parser/
           */
          function myParseXml(xmlStr, thingAsThis) {
            const that = thingAsThis;

/* TypeScript complained about ".DOMParser" not a property on window.
See // https://juristr.com/blog/2016/09/ng2-get-window-ref/
              return new window.DOMParser() // << No.
*/
              return new that._myWindowRefService.myNativeWindowGetter.DOMParser().parseFromString(xmlStr, 'text/xml');
          }
/* COMPLAINED about '.myDataProperty'
"src/app/app.component.ts(95,59): error TS2339: Property 'myDataProperty' does not exist on type 'Object'"

            const myGroovyXmlDocument = myParseXml(whatIGot.myDataProperty);
*/
            const myGroovyXmlDocument = myParseXml(this.ltWsApiStuff, this);
   //       console.log('myGroovyXmlDocument ', myGroovyXmlDocument);
          /* The XML (partial):
           <?xml version="1.0" encoding="UTF-8"?>
           <response stat="ok">
              <ltml xmlns="http://www.librarything.com/" version="1.1">
                 <item id="1528" type="work">
                    <author id="720" authorcode="cranestephen">Stephen Crane</author>
                    <title>The Red Badge of Courage</title>
                    <rating>6.8</rating>
            <url>http://www.librarything.com/work/1528</url> ...
           */

           /* **** JAVASCRIPT to PARSE XML to OBJECT

https://andrew.stwrt.ca/posts/js-xml-parsing/
Has dependency on lodash. (I did npm install lodash...)
(initially tried using CDN; dropped that)
https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js
--------------------------------------
parse.js --> parse.ts
           */
          const myParsedGroovyXmlDocument =   parse(myGroovyXmlDocument);
          lilInspector(myParsedGroovyXmlDocument, '');
          console.log(myParsedGroovyXmlDocument, '');

// https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
// https://gist.github.com/jashmenn/b306add36d3e6f0f6483 Javascript var self = this; vs. .bind

/* Some Hard-Coded Values (for Testing)
re: CharacterNames
- Because the LibraryThing entry records for books will vary (a great deal),
-- I cannot place one "blanket" object "dot location" path-like thing
--- to obtain this "List of Character Names" from all searches...
- So, I simply hard-coded two examples (I manually discovered the exact object location for each)
- And made provision for default, as well as for empty search box
*/
          switch (book_id) {
            case '1528': // The Red Badge of Courage
              this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[9].versionList.factList;
              getCommonFour(this);
              break;

            case '1527': // The Picture of Dorian Gray
              this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[13].versionList.factList;
              getCommonFour(this);
              break;

              case '': // Red Badge, if they just click Submit
              this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[9].versionList.factList;
              break;

            default:
              getCommonFour(this);
              break;
          }

          function getCommonFour(thingAsThis) {
            const that = thingAsThis; // "this equals that"
            that.myAuthor = myGroovyXmlDocument.getElementsByTagName('author')[0].childNodes[0].nodeValue;
            that.myTitle = myGroovyXmlDocument.getElementsByTagName('title')[0].childNodes[0].nodeValue;
            that.myRating = myGroovyXmlDocument.getElementsByTagName('rating')[0].childNodes[0].nodeValue;
            that.myLtUrl = myGroovyXmlDocument.getElementsByTagName('url')[0].childNodes[0].nodeValue;
          }
        },
        (err) => {
          console.log('LtWsApi err: ', err);
        },
        () => {
          // done
          console.log('LtWsApi Complete ...');
        }
      );
  }

}
