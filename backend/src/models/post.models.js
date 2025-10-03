import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["streetlight", "road"],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["resolved", "in progress", "reported"],
      default: "reported",
      required: true,
      index: true,
    },
    postImage: {
      type: String,
      required: true,
    },
    postVedio: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedThisWorkTo: {
      type: String,
      default: "Not assigned  yet",
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
