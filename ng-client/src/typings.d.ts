/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
// Q. Do I need this?
// A. No. Must have been part of an earlier fix.
//    See notes, URLs instead in /src/utils/parse.ts
/*
declare namespace _ {
 // https://stackoverflow.com/questions/47542928/lodash-refers-to-a-umd-global-and-lodash-js-is-not-a-module-errors
}
*/
