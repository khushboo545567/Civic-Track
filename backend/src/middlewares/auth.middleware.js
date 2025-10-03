// get the token form the user and
// check if the token is valid or not verify jwt
// if correct then add the payload to the req
// and next

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Beared ", "");
    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token");
  }
};
