import express from "express";
import dbConnection from "./db/db.js";
import { app } from "./app.js";

dbConnection()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
  });
