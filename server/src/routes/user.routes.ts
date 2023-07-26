import express from "express";
import {
    changePassword,
    getUserDetails,
    loginUser,
    registerUser,
    sendCode,
    verifyUser,
} from "../controllers/user.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/", protectRoute, getUserDetails);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/code", sendCode);
router.post("/change/password", protectRoute, changePassword);
router.post("/verify", protectRoute, verifyUser);

export default router;
