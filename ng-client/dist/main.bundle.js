webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/WindowRefService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRefService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
// https://juristr.com/blog/2016/09/ng2-get-window-ref/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WindowRefService = /** @class */ (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "myNativeWindowGetter", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowRefService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])()
    ], WindowRefService);
    return WindowRefService;
}());

function _window() {
    // return the global native browser window object
    return window;
}


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"background-color: #e4e5c0\">\n    <div class=\"column left\">\n        <div style=\"text-align:center\">\n            <h1>\n                {{ title }}\n            </h1>\n        </div>\n    </div>\n    <div class=\"column right\">\n        <img src=\"https://www.librarything.com/pics/piles/downpile/18.jpg\" style=\"max-height: 100px\" alt=\"\">\n    </div>\n</div>\n    <div class=\"row\">\n    <div style=\"text-align:center\">\n        <a href=\"https://www.librarything.com/services/rest/documentation/1.1/\" target=\"_blank\">LibraryThing's API Documentation</a> | <a\n        href=\"https://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=d231aa37c9b4f5d304a60a3d0ad1dad4\" target=\"_blank\">LibraryThing's Sample XML Response</a>\n</div>\n\n    <hr />\n    <div style=\"text-align:center\"><a href=\"https://canvas.harvard.edu/courses/35096/assignments/syllabus\" target=\"_blank\">CSCI-E31</a> Assignment 8 (Graduate Credit Extra Work)</div>\n</div>\n    <h1 style=\"text-align:center\">Angular Client and Express Proxy Server</h1>\n<div>Proxy Server technique used to reach a Web Service from LibraryThing.com that has <strong><span style=\"font-size: large;\">No <a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS\" target=\"_blank\">CORS</a> Allowed</span></strong></div>\n\n<h3>PLEASE SEE README.md: <a href=\"https://github.com/wreilly/e31-assignment-08-proxy-and-client-wreilly/blob/master/README.md#e31-assignment-08-proxy-and-client-wreilly\" target=\"_blank\">https://github.com/wreilly/e31-assignment-08-proxy-and-client-wreilly/blob/master/README.md</a></h3>\n\n    <hr />\n\n\n<div class=\"row\">\n  <h3>0. FakeAPI</h3>\n    <p><em>Just for contrast to the more complex Proxy Server for LibraryThing: here is a straightforward HTTP service.</em></p>\n  <h4>Get 100 FakeAPI \"Lorem Ipsum\" Entries</h4>\n  <div style=\"font-size: x-small;\">1. HTTP REQ: https://jsonplaceholder.typicode.com/posts</div>\n  <ul>\n    <li>This API <em>does</em> allow CORS; there is no need for a Proxy Server.</li>\n    <li>(Note: In the Angular Client app, I for convenience did put the HTTP request direct to FakeAPI.com inside of my \"LibraryThingService\".)</li>\n</ul>\n  <button type=\"submit\" (click)=\"getFakeAPI($event)\">Display FakeAPI Entries</button>\n  <br />\n  <br />\n<button type=\"submit\" on-click=\"clearFakeAPI()\"><em>(Clear FakeAPI Entries)</em></button>\n  <hr />\n  <ol>\n  <li *ngFor=\"let fapi of fakeApiStuff\">\n    {{ fapi.title }}\n  </li>\n</ol>\n</div>\n<div class=\"row\" style=\"background-color: #bdd8ba\">\n        <div class=\"column left\">\n            <h3>1. LibraryThing - Web Services API</h3>\n        </div>\n        <div class=\"column right\" style=\"align-content: center\">\n            <img src=\"http://pics.cdn.librarything.com/picsizes/24/bd/24bd271ed51344f5979696a5551434f414f4141.jpg\"  style=\"max-height: 100px\" alt=\"\">\n        </div>\n    </div>\n  <div class=\"row\">\n\n      <!-- e.g. 'http://104.236.198.117:3000/' -->\n      <div style=\"font-size: x-small;\">1. PROXY pointing to: {{ apiUrlStubInApp }} myspecialproxy/:book_id</div>\n      <!-- Use \"{{ '{' }}\") to escape it. -->\n      <div style=\"font-size: x-small;\">2. HTTP REQ: http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=${{'{'}}book_id_passed{{'}'}}&apikey=59211e...</div>\n      <ul>\n        <li>This LibraryThing Web Service has the \"No CORS Allowed\" problem, and so this solution makes use of a Proxy Server.</li>\n        <li>Uses my Angular app \"LibraryThingService\", for HTTP request first to the Proxy Server (hence from Proxy Server to LibraryThing).</li>\n      </ul>\n      <br />\n      <div  style=\"background-color: #c8d3f4; padding: 15px;\">\n        <label for=\"bookId_id\">LibraryThing Book ID # : </label>\n        <input type=\"text\" ref-bookId id=\"bookId_id\" name=\"bookId_name\" on-keydown.enter=\"getLtWsApi($event)\" placeholder=\"e.g. 1528\" />\n        <br />\n        <button type=\"submit\" on-click=\"getLtWsApi(bookId)\">Indicate Book ID# to Retrieve</button>\n        <ul>\n          <li>1528 = The Red Badge of Courage</li>\n          <li>1527 = The Picture of Dorian Gray</li>\n          <li>1526 = The Odyssey</li>\n          <li>1525 = The Name of the Rose</li>\n        </ul>\n      </div>\n      <ul>\n        <li>Author: {{ myAuthor }}</li>\n        <li>Title: {{ myTitle }}</li>\n        <li>Rating: {{ myRating }}</li>\n        <li>LibraryThing URL: <a href=\"{{myLtUrl}}\" target=\"_blank\">{{ myLtUrl }}</a></li>\n      </ul>\n      <h5 *ngIf=\"myCharacterNames.length\">Character Names</h5>\n      <ol>\n        <li *ngFor=\"let cName of myCharacterNames\">{{ cName }}</li>\n      </ol>\n</div>\n\n<h3>PLEASE SEE README.md: <a href=\"https://github.com/wreilly/e31-assignment-08-proxy-and-client-wreilly/blob/master/README.md#e31-assignment-08-proxy-and-client-wreilly\" target=\"_blank\">https://github.com/wreilly/e31-assignment-08-proxy-and-client-wreilly/blob/master/README.md</a></h3>\n\n\n<div class=\"center\">\n    <hr />\n    <div>(c) Some Times Accesses LibraryThing, & Beyond 2018</div>\n    <div>William Reilly - wreilly2001@gmail.com</div>\n    <div>CSCI-E31 Assignment 8 (Graduate Credit Extra Work) - April 30, 2018</div>\n    <hr />\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_thing_service__ = __webpack_require__("../../../../../src/app/library-thing.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WindowRefService__ = __webpack_require__("../../../../../src/app/WindowRefService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_lilInspector__ = __webpack_require__("../../../../../src/utils/lilInspector.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_parse__ = __webpack_require__("../../../../../src/utils/parse.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// https://juristr.com/blog/2016/09/ng2-get-window-ref/

// Only bringing in this Environment property so we can display it to the U/I (testing/dev purposes)
// No need to specify which environment file (e.g. "prod")



var AppComponent = /** @class */ (function () {
    // e.g. 'http://104.236.198.117:3000/'
    function AppComponent(_myLibraryThingService, _myWindowRefService) {
        this._myLibraryThingService = _myLibraryThingService;
        this._myWindowRefService = _myWindowRefService;
        this.title = 'LibraryThing - Web Services API';
        this.myCharacterNames = [];
        this.apiUrlStubInApp = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrlStubInEnvironment;
    }
    /* ******************************* */
    /* *******  FAKEAPI ************** */
    /* ******************************* */
    AppComponent.prototype.getFakeAPI = function (event) {
        var _this = this;
        this._myLibraryThingService.get100FakeAPI()
            .subscribe(function (response) {
            console.log('Ng HTTP response is ', response);
            Object(__WEBPACK_IMPORTED_MODULE_4__utils_lilInspector__["a" /* lilInspector */])(response[0], '');
            /*
              [ 0: {userId: 1, id: 1, title: "sunt aut facere ..."}
            */
            _this.fakeApiStuff = response;
            console.log('Ng HTTP this.fakeApiStuff is ', _this.fakeApiStuff); // [{},{}...]
        }, function (err) {
            console.log('Ng HTTP err ', err);
        }, function () { console.log('Complete .......'); });
    };
    AppComponent.prototype.clearFakeAPI = function () {
        this.fakeApiStuff = []; // reset
    };
    /* *************************************************** */
    /* ***** LIBRARYTHING - WEB SERVICES (XML) API ******* */
    /* *************************************************** */
    AppComponent.prototype.getLtWsApi = function (inputElementRefPassedIn) {
        // console.log('*** LtWsApi inputElementRefPassedIn ', inputElementRefPassedIn);
        var _this = this;
        var book_id = '';
        /* Two triggers to this method:
          The Enter Key sends Keyboard Event,   which has what we want in:  $event.target.value
          The Submit Button sends InputElement, which has what we want in:  .value
         */
        // If user makes no entry to input box),
        // we'll run default book 1528 (Red Badge of Courage)
        if (inputElementRefPassedIn.target) {
            // This was the Enter Key...
            // console.log('inputElementRefPassedIn.target: ', inputElementRefPassedIn.target);
            // console.log('inputElementRefPassedIn.target.value: ', inputElementRefPassedIn.target.value);
            inputElementRefPassedIn.target.value ? book_id = inputElementRefPassedIn.target.value : book_id = '1528';
        }
        else {
            // Else this was the Submit Button...
            inputElementRefPassedIn.value ? book_id = inputElementRefPassedIn.value : book_id = '1528';
        }
        // Reset display of data
        this.myAuthor = '';
        this.myTitle = '';
        this.myRating = '';
        this.myLtUrl = '';
        this.myCharacterNames = [];
        this._myLibraryThingService.getLibraryThingCK(book_id)
            .subscribe(function (whatIGot) {
            /*
            Special Note about the Proxy Server:
  
            For use now with Angular's HTTP
            (as opposed to my previous use of Axios with this Proxy Server),
            I doctored the proxy server.
            Here is what it is sending us:
  
             // I did my own "wrapping" of the data object, over in my Proxy Server:
             const myWrappedDataObject = { myDataProperty: data }
             res.status(200).send(myWrappedDataObject); // << Working fine, sends whole object. All set.
            */
            _this.ltWsApiStuff = whatIGot.myDataProperty; // the XML string
            /* ********* XML STRING PARSE TO XML DOCUMENT ************* */
            // https://stackoverflow.com/questions/649614/xml-parsing-of-a-variable-string-in-javascript
            /* TODO (Later) Consider this alternative:
               https://naturalintelligence.github.io/fast-xml-parser/
             */
            function myParseXml(xmlStr, thingAsThis) {
                var that = thingAsThis;
                /* TypeScript complained about ".DOMParser" not a property on window.
                   See // https://juristr.com/blog/2016/09/ng2-get-window-ref/
                */
                return new that._myWindowRefService.myNativeWindowGetter.DOMParser().parseFromString(xmlStr, 'text/xml');
            }
            var myGroovyXmlDocument = myParseXml(_this.ltWsApiStuff, _this);
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
            /* **** JAVASCRIPT to PARSE XML to OBJECT ************* */
            /*
               https://andrew.stwrt.ca/posts/js-xml-parsing/
               Has dependency on lodash. (I did npm install lodash...)
               --------------------------------------
               parse.js --> parse.ts
           */
            var myParsedGroovyXmlDocument = Object(__WEBPACK_IMPORTED_MODULE_5__utils_parse__["a" /* parse */])(myGroovyXmlDocument);
            Object(__WEBPACK_IMPORTED_MODULE_4__utils_lilInspector__["a" /* lilInspector */])(myParsedGroovyXmlDocument, '');
            console.log('myParsedGroovyXmlDocument ', myParsedGroovyXmlDocument);
            // https://stackoverflow.com/questions/17604071/parse-xml-using-javascript
            /* Some Hard-Coded Values (for Testing)
               re: ***List of CharacterNames***
            - Because the LibraryThing XML records for books will vary (a great deal),
            -- I cannot place one single "blanket" object "dot location" path-like thing
            --- to obtain this "List of Character Names" from all searches...
            - So, I simply hard-coded two examples (I manually discovered the exact object location for each)
            - And made provision for default, as well as for empty search box
            */
            switch (book_id) {
                case '1528':// The Red Badge of Courage
                    _this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[9].versionList.factList;
                    getCommonFour(_this);
                    break;
                case '1527':// The Picture of Dorian Gray
                    _this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[13].versionList.factList;
                    getCommonFour(_this);
                    break;
                case '':// Red Badge, if they just click Submit
                    _this.myCharacterNames = myParsedGroovyXmlDocument.ltml.item.commonknowledge[9].versionList.factList;
                    break;
                default:
                    getCommonFour(_this);
                    break;
            }
            function getCommonFour(thingAsThis) {
                // https://gist.github.com/jashmenn/b306add36d3e6f0f6483 Javascript var self = this; vs. .bind
                var that = thingAsThis; // "this equals that"
                // Discovered (trial & error) that book_id 88, for example, has NO AUTHOR
                var ifThereIsAnAuthor = myGroovyXmlDocument.getElementsByTagName('author');
                // console.log('ifThereIsAnAuthor typeof HTMLCollection[] array ? ', typeof ifThereIsAnAuthor);
                /*
                  HTMLCollection[]
                  https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
                 */
                if (ifThereIsAnAuthor.length > 0) {
                    that.myAuthor = myGroovyXmlDocument.getElementsByTagName('author')[0].childNodes[0].nodeValue;
                }
                // Agh. Book_ID 1257 has NO TITLE.
                /*
                 http://www.librarything.com/work/1257 = "No title"  O la. Empty record. How (in the world) did I hit upon this one?
                 */
                var ifThereIsATitle = myGroovyXmlDocument.getElementsByTagName('title');
                if (ifThereIsATitle.length > 0) {
                    that.myTitle = myGroovyXmlDocument.getElementsByTagName('title')[0].childNodes[0].nodeValue;
                }
                // Going on assumption these 2 fields are ALWAYS there. (Might be wrong.)
                that.myRating = myGroovyXmlDocument.getElementsByTagName('rating')[0].childNodes[0].nodeValue;
                that.myLtUrl = myGroovyXmlDocument.getElementsByTagName('url')[0].childNodes[0].nodeValue;
            }
        }, function (err) {
            console.log('LtWsApi err: ', err);
        }, function () {
            // done
            console.log('LtWsApi Complete ...');
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_1__library_thing_service__["a" /* LibraryThingService */], __WEBPACK_IMPORTED_MODULE_2__WindowRefService__["a" /* WindowRefService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__library_thing_service__["a" /* LibraryThingService */], __WEBPACK_IMPORTED_MODULE_2__WindowRefService__["a" /* WindowRefService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/library-thing.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryThingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// No need to specify which environment file (e.g. "prod")

var LibraryThingService = /** @class */ (function () {
    // e.g. 'http://104.236.198.117:3000/', -OR- 'http://0.0.0.0:3000/'
    function LibraryThingService(_myHttpService) {
        this._myHttpService = _myHttpService;
        /*
        Angular Service to use HTTP to reach 3rd party REST Services
        E.g. from LibraryThing.com (LT), where there are in fact two APIs:
        
        1) "LT Web Services API"   << This IS Implemented Herein
           - No CORS support
           - JSONP can *not* be used...
           -- ...because it *returns XML*
           - Therefore requires Proxy Server
        
        2) "LT JavaScript API"    << **NOT** Implemented Herein
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
        this.apiUrlStubInService = __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrlStubInEnvironment;
    }
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    /* ^^^^^^   TOC   ^^^^^^^^^^^^^  */
    /*
    get100FakeAPI()  (just demonstration purpose)

    getLibraryThingCK(book_id)

    getLibraryThingMyBooks(user_id) << **NOT** Implemented Herein
    */
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    LibraryThingService.prototype.get100FakeAPI = function () {
        /* FakeAPI.com
        Just put here for comparison purpose. Simpler API call, no "CORS" issues.
         */
        // "100" is the default return for "get ALL" from this free, open, "fake" API.
        return this._myHttpService.get('https://jsonplaceholder.typicode.com/posts');
        /* Note: Here, Angular HttpClient GENERATES an Observable.
               In the calling app.component.ts, we SUBSCRIBE to that Observable.
        */
    };
    LibraryThingService.prototype.getLibraryThingCK = function (book_id) {
        // "CK" = Common Knowledge, a LibraryThing.com feature.
        return this._myHttpService.get(this.apiUrlStubInService + "myspecialproxy/" + book_id);
        /* E.g., Proxy Server in turn sends to:
           http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&id=1060&apikey=59211e...
         */
        /* CORS ERROR:
         If you try to visit this address directly from a Client App in the  BROWSER.
         Needs PROXY SERVER instead.
  
          "Failed to load http://www.librarything.com/services/rest/1.1/?method=librarything.ck.getwork&apikey=59211e...&id=1060:"
          "No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://0.0.0.0:4200' is therefore not allowed access."
         */
    };
    LibraryThingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], LibraryThingService);
    return LibraryThingService;
}()); // /LibraryThingService



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    /* For doing "Prod in Dev" trial: */
    //  apiUrlStubInEnvironment: 'http://0.0.0.0:3000/'
    /* The REAL Prod value: */
    apiUrlStubInEnvironment: 'http://104.236.198.117:3000/'
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);




// https://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application/38357150#38357150

if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/utils/lilInspector.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lilInspector; });
// This 'export' does work:
var lilInspector = function (yourObject, yourObjectVariableName_kids) {
    var lilKey; // we won't even initiate. what Type is a key, anyway? String? Hmm
    var lilObject = yourObject; // pros? cons? of doing this?
    console.log("\n **** !!!! lilInspector !!!! ****");
    /* *********
       Now we're just PASSING the "name" (we give it) IN:
       yourObjectVariableName_kids
    */
    if (yourObjectVariableName_kids) {
        var objectVariableNameThisTime = yourObjectVariableName_kids;
        console.log("objectVariableNameThisTime : " + objectVariableNameThisTime);
    }
    else {
        //	console.log("You forgot to pass in the yourObjectVariableName_kids, kid. No big deal.");
    }
    for (lilKey in lilObject) {
        if (lilObject.hasOwnProperty(lilKey)) {
            //	    console.log("!!!! lilInspector !!!!");
            console.log("KEY   : lilKey            : " + lilKey);
            console.log("VALUE : lilObject[lilKey] : " + lilObject[lilKey]);
            // console.log("VALUE : lilObject[lilKey][objectVariableNameThisTime] : " + lilObject[lilKey][objectVariableNameThisTime]);
        }
        else {
            // do nuttin'
        }
    }
    console.log("**** !!!! /END lilInspector !!!! **** \n");
};
// Does Not Work in Angular ...  (See first line instead with 'export')
// module.exports = lilInspector;


/***/ }),

/***/ "../../../../../src/utils/parse.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/**
 * COPIED FROM
 * https://andrew.stwrt.ca/posts/js-xml-parsing/   parse.js
 * Dependency on Lodash.
 * npm install lodash ...
 * (Was initially loaded from CDN. (See /index.html <head><script...> )
 */
/*
Just did $ npm install --save lodash

https://medium.com/@armno/til-importing-lodash-into-angular-the-better-way-aacbeaa40473
 */
// https://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application
/*
 $ npm install --save lodash
 # This is the new bit here:
 $ npm install --save @types/lodash
 */

// flattens an object (recursively!), similarly to Array#flatten
// e.g. flatten({ a: { b: { c: "hello!" } } }); // => "hello!"
// (Note: No need to export this internal function.)
var flatten = function (object) {
    var check = __WEBPACK_IMPORTED_MODULE_0_lodash__["isPlainObject"](object) && __WEBPACK_IMPORTED_MODULE_0_lodash__["size"](object) === 1;
    return check ? flatten(__WEBPACK_IMPORTED_MODULE_0_lodash__["values"](object)[0]) : object;
};
var parse = function (xml) {
    var data = {};
    var isText = xml.nodeType === 3, isElement = xml.nodeType === 1, body = xml.textContent && xml.textContent.trim(), hasChildren = xml.children && xml.children.length, hasAttributes = xml.attributes && xml.attributes.length;
    // if it's text just return it
    if (isText) {
        return xml.nodeValue.trim();
    }
    // if it doesn't have any children or attributes, just return the contents
    if (!hasChildren && !hasAttributes) {
        return body;
    }
    // if it doesn't have children but _does_ have body content, we'll use that
    if (!hasChildren && body.length) {
        data.text = body;
    }
    // if it's an element with attributes, add them to data.attributes
    if (isElement && hasAttributes) {
        data.attributes = __WEBPACK_IMPORTED_MODULE_0_lodash__["reduce"](xml.attributes, function (obj, name, id) {
            var attr = xml.attributes.item(id);
            obj[attr.name] = attr.value;
            return obj;
        }, {});
    }
    // recursively call #parse over children, adding results to data
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](xml.children, function (child) {
        var name = child.nodeName;
        // if we've not come across a child with this nodeType, add it as an object
        // and return here
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["has"](data, name)) {
            data[name] = parse(child);
            return;
        }
        // if we've encountered a second instance of the same nodeType, make our
        // representation of it an array
        if (!__WEBPACK_IMPORTED_MODULE_0_lodash__["isArray"](data[name])) {
            data[name] = [data[name]];
        }
        // and finally, append the new child
        data[name].push(parse(child));
    });
    // if we can, let's fold some attributes into the body
    __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](data.attributes, function (value, key) {
        if (data[key] != null) {
            return;
        }
        data[key] = value;
        delete data.attributes[key];
    });
    // if data.attributes is now empty, get rid of it
    if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](data.attributes)) {
        delete data.attributes;
    }
    // simplify to reduce number of final leaf nodes and return
    return flatten(data);
};


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map