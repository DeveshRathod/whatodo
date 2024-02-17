import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongodbconnect } from "./database/dbconnection.js";

//dependencies
const app = express();
dotenv.config();
app.use(cors());

//db connection
mongodbconnect();

//routes

//server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
