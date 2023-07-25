/// <reference path="../types/custom.d.ts" />
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserType } from "../models/userSchema";
import asyncHandler from "express-async-handler";

const protectRoute = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token;
        const authHeader = req.headers["authorization"];

        if (authHeader) {
            token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
                _id: string;
            };
            req.user = await User.findById(decode._id).select("-password");
            next();
        } else {
            res.status(401);
            throw new Error("Not authorized");
        }
    }
);

export default protectRoute;
