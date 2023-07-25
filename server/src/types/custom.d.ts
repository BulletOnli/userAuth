import { UserType } from "../models/userSchema";

type User = {
    _id: "string";
} & UserType;

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
