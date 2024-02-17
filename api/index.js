//imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongodbconnect } from "./database/dbconnection.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

//dependencies
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//db connection
mongodbconnect();

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

//server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
