import mongoose from "mongoose";

export const mongodbconnect = () => {
  mongoose
    .connect("mongodb+srv://Devesh:Devesh@cluster0.o20kmd0.mongodb.net/whatodo")
    .then(() => {
      console.log("DB connected");
    });
};
