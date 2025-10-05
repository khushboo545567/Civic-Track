import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.models.js";
import uploadOnCloudnary from "../utils/cloudinary.js";

const postIssue = async (req, res, next) => {
  const { category, title, description, address } = req.body;
  if (
    !category?.trim() ||
    !title?.trim() ||
    !description?.trim() ||
    !address?.trim()
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //   now get the files form the server uploded by the multer

  console.log(req.files);
  const postImageLocalPath = req.files?.postImage[0]?.path;
  const postVideoLocalPath = req.files?.postVideo[0]?.path;

  if (!postImageLocalPath) {
    throw new ApiError(400, "image is required");
  }

  const postImage = await uploadOnCloudnary(postImageLocalPath);
  const postVideo = await uploadOnCloudnary(postVideoLocalPath);

  if (!postImage) {
    throw new ApiError(400, "image is required");
  }

  Post.create({
    category,
    title,
    description,
    address,
    postImage: postImage.url,
    postVideo: postVideo?.url || "", //in case the vedio is not present
  });
};

export default postIssue;
