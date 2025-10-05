import { Router } from "express";
import postIssue from "../controllers/post.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const router = Router();
router.route("/report-issue").post(
  verifyJWT,
  upload.fields([
    { name: "postImage", maxCount: 1 },
    { name: "postVideo", maxCount: 1 },
  ]),
  postIssue
);
