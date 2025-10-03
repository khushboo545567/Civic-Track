import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config({ path: "./.env" });

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.CONNECT_DB}/${DB_NAME}`
    );
    console.log(`database connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("error while connection", error);
  }
};

export default dbConnection;
