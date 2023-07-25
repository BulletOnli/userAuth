/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="src/types/custom" />
declare const protectRoute: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export default protectRoute;
