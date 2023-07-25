import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/user.routes";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5051;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/user", userRoute);

app.use(errorHandler);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("Mongodb connected"));

app.listen(PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
});
