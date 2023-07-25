"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const protectRoute = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        token = authHeader.split(" ")[1];
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = await userSchema_1.default.findById(decode._id).select("-password");
        next();
    }
    else {
        res.status(401);
        throw new Error("Not authorized");
    }
});
exports.default = protectRoute;
//# sourceMappingURL=protectRoute.js.map