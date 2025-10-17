import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const _dirname = path.resolve();
const app = express();

app.use(
  cors({
    origin: "https://civic-track-260d.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./route/user.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import postRouter from "./route/post.route.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/post", postRouter);

app.use(errorHandler);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get((req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
export { app };
