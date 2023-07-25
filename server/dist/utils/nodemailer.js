"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "bulletlangto@gmail.com",
        pass: "3gNK7vqtBd9VaX0s",
    },
});
async function sendVerificationEmail(recipient) {
    const uniqueCode = (0, uuid_1.v4)().slice(0, 5);
    const info = await transporter.sendMail({
        from: "noreply@bullet.com",
        to: recipient,
        subject: "Verify your Email address ✔",
        html: `<div> Your verification code: <b>${uniqueCode}</b> </div>`,
    });
    console.log(`Message sent: ${info.messageId}`);
    return uniqueCode;
}
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=nodemailer.js.map