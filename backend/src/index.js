import express from "express";
import dbConnection from "./db/db.js";
import { app } from "./app.js";

dbConnection()
  .then(() => {
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((error) => {
    console.log("mongoDb connection failed ", error);
  });
