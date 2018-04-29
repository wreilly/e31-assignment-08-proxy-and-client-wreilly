// https://juristr.com/blog/2016/09/ng2-get-window-ref/

import {Injectable} from "@angular/core";



@Injectable()
export class WindowRefService {
    get myNativeWindowGetter(): any {
        return _window();
    }
}

function _window(): Window {
    // return the global native browser window object
    return window;
}