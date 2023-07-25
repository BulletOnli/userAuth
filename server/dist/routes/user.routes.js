"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const router = express_1.default.Router();
router.get("/", protectRoute_1.default, (req, res) => {
    res.status(200).json(`Hello, ${req.user.email}`);
});
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.get("/code", protectRoute_1.default, user_controller_1.sendCode);
router.post("/verify/email", protectRoute_1.default, user_controller_1.verifyEmail);
router.post("/change/password", protectRoute_1.default, user_controller_1.changePassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map