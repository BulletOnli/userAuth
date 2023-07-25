"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmail = exports.sendCode = exports.changePassword = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("../utils/nodemailer");
const generateToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema_1.default.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("Email already exists");
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error("Passord must be greater than 8 characters");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const newUser = await userSchema_1.default.create({
        email,
        password: hashedPassword,
    });
    if (newUser) {
        res.status(201).json({
            userId: newUser._id,
            token: generateToken(newUser._id.toString()),
        });
    }
});
exports.loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("Email not found");
    }
    if (user && (await bcrypt_1.default.compare(password, user.password))) {
        res.status(200).json({
            user: user._id,
            token: generateToken(user._id.toString()),
        });
    }
    else {
        res.status(400);
        throw new Error("Incorrect password");
    }
});
exports.changePassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await userSchema_1.default.findById(req.user._id);
    if (user && (await bcrypt_1.default.compare(oldPassword, user?.password))) {
        user.password = await bcrypt_1.default.hash(newPassword, 12);
        await user.save();
        res.status(200).json({ message: "Password changed success", user });
    }
    else {
        res.status(404);
        throw new Error("Password don't match");
    }
});
exports.sendCode = (0, express_async_handler_1.default)(async (req, res) => {
    const verificationCode = await (0, nodemailer_1.sendVerificationEmail)(req.user.email);
    res.cookie("verificationCode", verificationCode, { maxAge: 1000 * 60 * 2 });
    res.status(200).json(`Verification code sent to your email.`);
});
exports.verifyEmail = (0, express_async_handler_1.default)(async (req, res) => {
    const { code } = req.body;
    const verificationCode = req.cookies["verificationCode"];
    if (verificationCode === code) {
        res.status(200).clearCookie("verificationCode").json({
            message: "Verification success",
            isAuthorized: true,
        });
    }
    else {
        res.status(400);
        throw new Error("Wrong verification code");
    }
});
//# sourceMappingURL=user.controller.js.map