import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "bulletlangto@gmail.com",
        pass: "3gNK7vqtBd9VaX0s",
    },
});

export async function sendVerificationEmail(
    recipient: string
): Promise<string> {
    const uniqueCode = uuidv4().slice(0, 5);

    const info = await transporter.sendMail({
        from: "noreply@bullet.com",
        to: recipient,
        subject: "Verify your Email address ✔",
        html: `<div> Your verification code: <b>${uniqueCode}</b> </div>`,
    });

    console.log(`Message sent: ${info.messageId}`);
    return uniqueCode;
}
