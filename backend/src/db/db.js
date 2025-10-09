import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config({ path: "./.env" });

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.CONNECT_DB}`
    );
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
