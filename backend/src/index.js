import express from "express";
import dbConnection from "./db/db.js";
import { app } from "./app.js";
const PORT = process.env.PORT || 3000;
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started successfully");
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
  });
