import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected");
  } catch (error) {
    throw error;
  }
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
