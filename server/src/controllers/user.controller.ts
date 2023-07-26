import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { UserType } from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../utils/nodemailer";

const generateToken = (_id: string): string => {
    return jwt.sign({ _id }, process.env.JWT_SECRET!, {
        expiresIn: "2d",
    });
};

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password, confirmPassword } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.status(400);
            throw new Error("Email already exists");
        }

        if (password.length < 8) {
            res.status(400);
            throw new Error("Passord must be greater than 8 characters");
        }

        if (password !== confirmPassword) {
            res.status(400);
            throw new Error("Password don't match");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        if (newUser) {
            res.status(201).json({
                userId: newUser._id,
                token: generateToken(newUser._id.toString()),
            });
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("Incorrect email address");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            user: user._id,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error("Incorrect password");
    }
});

export const changePassword = asyncHandler(
    async (req: Request, res: Response) => {
        const { oldPassword, newPassword } = req.body;
        console.log(oldPassword, newPassword);
        const user = await User.findById(req.user._id);

        if (user && (await bcrypt.compare(oldPassword, user?.password))) {
            user.password = await bcrypt.hash(newPassword, 12);
            await user.save();

            res.status(200).json("Password changed success");
        } else {
            res.status(404);
            throw new Error("Password don't match");
        }
    }
);

export const sendCode = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("Email not found");
    }

    const verificationCode = await sendVerificationEmail(email);

    res.status(200).json({
        verificationCode,
        token: generateToken(user._id.toString()),
    });
});
