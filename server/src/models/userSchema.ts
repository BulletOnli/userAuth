import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: Boolean,
});

export type UserType = InferSchemaType<typeof userSchema>;

export default mongoose.model<UserType>("User", userSchema);
