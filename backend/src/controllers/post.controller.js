import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.models.js";
import uploadOnCloudnary from "../utils/cloudinary.js";
import e from "express";

const postIssue = async (req, res, next) => {
  try {
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

    const postImageLocalPath = req.files?.postImage[0]?.path;
    const postVideoLocalPath = req.files?.postVideo?.[0]?.path || null;
    if (!postImageLocalPath) {
      throw new ApiError(400, "image is required");
    }

    const postImage = await uploadOnCloudnary(postImageLocalPath);
    let postVideo = null;
    if (postVideoLocalPath) {
      postVideo = await uploadOnCloudnary(postVideoLocalPath);
    }

    if (!postImage) {
      throw new ApiError(400, "image is required");
    }

    const postIssue = await Post.create({
      category,
      title,
      description,
      address,
      postImage: postImage.url,
      postVideo: postVideo?.url || "", //in case the vedio is not present
      reportedBy: req.user._id,
    });

    if (!postIssue) {
      throw new ApiError(500, "something went wrong while posting the issue");
    } //i am not getting this it measn

    return res
      .status(201)
      .json(new ApiResponse(200, postIssue, "issue posted sussfully"));
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      // throw new ApiError(404, "No posts found");
      return res.status(404).json(new ApiResponse(404, "No posts found !"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts fetched successfully"));
  } catch (error) {
    console.log("Post is unable to fetch:", error);
    next(error);
  }
};

const getFilteredPost = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const posts = await Post.find(filter).sort({ createdAt: -1 });
    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, [], "No posts found with the given filters")
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "posts fetched successfully"));
  } catch (error) {
    console.log("Error fetching filtered posts:", error);
    next(error);
  }
};

const getOneCardDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cardDetails = await Post.findById({ _id: id });
    if (!cardDetails) {
      return res.status(404).json(new ApiResponse(404, null, "card not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, cardDetails, "card details fetched sussfully")
      );
  } catch (error) {
    console.log("error occurs while fetching the card detail in db  ", error);
    next(error);
  }
};

export { postIssue, getPost, getFilteredPost, getOneCardDetails };
