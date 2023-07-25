import express from "express";
import {
    changePassword,
    loginUser,
    registerUser,
    sendCode,
    verifyEmail,
} from "../controllers/user.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/", protectRoute, (req, res) => {
    res.status(200).json(`Hello, ${req.user.email}`);
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/code", protectRoute, sendCode);
router.post("/verify/email", protectRoute, verifyEmail);
router.post("/change/password", protectRoute, changePassword);

export default router;
