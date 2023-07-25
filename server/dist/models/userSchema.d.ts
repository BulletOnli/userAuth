import mongoose, { InferSchemaType } from "mongoose";
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    password: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
}> & {
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
export type UserType = InferSchemaType<typeof userSchema>;
declare const _default: mongoose.Model<{
    email: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
}> & {
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
