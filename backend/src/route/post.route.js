import { Router } from "express";
import {
  getFilteredPost,
  getPost,
  postIssue,
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/report-issue").post(
  verifyJWT,
  upload.fields([
    { name: "postImage", maxCount: 1 },
    { name: "postVideo", maxCount: 1 },
  ]),
  postIssue
);

router.route("/get-allPosts").get(getPost);
router.route("/filtered-posts").get(getFilteredPost);

export default router;
