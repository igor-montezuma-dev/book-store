import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import roleRouter from "./routes/role.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/role", roleRouter);

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
