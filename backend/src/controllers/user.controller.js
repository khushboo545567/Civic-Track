import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo } = req.body;

    // 1️⃣ Validate fields
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // 2️⃣ Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }

    // 3️⃣ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
    });

    // 5️⃣ Send response without password
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
        },
        "User registered successfully"
      )
    );
  } catch (error) {
    next(error); // Pass to error middleware
  }
};

const loginUser = async (req, res, next) => {
  // get the email, password from the user
  // this email is existed or not
  // if the email is exist then check the password
  // if password is correct then generate teh token / resfresh tolken
  // store refresh token in to the db
  // set cookies
  // send response

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "email and password is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "user does not exist");
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      throw new ApiError(400, "eamil or passwrod is not valid");
    }
    // genetare token
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, role: user.roles },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    const refreshtoken = jwt.sign(
      { _id: user._id },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "5d" }
    );

    const logedInuser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { refreshToken: refreshtoken },
      },
      { new: true }
    ).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true, // use true in production with HTTPS
      sameSite: "none",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshtoken", refreshtoken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: logedInuser,
            accessToken,
            refreshtoken,
          },
          "user logged in successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res) => {
  // get the user details form the req which is added by the middleware
  // find by id and upadate that refresh token set to null
  // clear the token from the user

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshtoken")
    .json(new ApiResponse(200, {}, "user looged out"));
};

const getCurrentUser = async (req, res) => {
  // middleware add user in req
  // find the user by id
  // return

  const user = await User.findById(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "get user successfully"));
};

const refreshAccessToken = async (req, res) => {
  // get the refresh token form req,
  // check ref Present or not
  // verify token
  // if verified token then find user
  // if find user then check the ref correct or not
  // if correct generate the access and ref token
  // store ref in to db
  // set the cookie
  // send the res

  const incomingRefToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefToken) {
    throw new ApiError(401, "unauthorized access");
  }
  try {
    const verifyreftoken = jwt.verify(
      incomingRefToken,
      process.env.REFRESHTOKEN_SECRET
    );
    const user = await User.findById(verifyreftoken?._id);
    if (!user) {
      throw new ApiError(400, "invalid refresh token");
    }
    if (incomingRefToken !== user.refreshToken) {
      throw new ApiError(401, "refresh token expired ");
    }

    // generate the access and refresh token

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, role: user.roles },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    const refreshtoken = jwt.sign(
      { _id: user._id },
      process.env.REFRESHTOKEN_SECRET,
      { expiresIn: "5d" }
    );

    const setRefreshToken = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { refreshToken: refreshtoken },
      },
      { new: true }
    ).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true, // use true in production with HTTPS
      sameSite: "strict",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshtoken", refreshtoken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshtoken },
          "access token is refreshed"
        )
      );
  } catch (error) {}
};

const changePassword = async (req, res) => {
  // get the current password and old password
  // get user
  // compare the both password
  // if correct store the current pss in db
  // return res

  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const ispassCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!ispassCorrect) {
    throw new ApiError(400, "invalid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
};
const updateAccount = async (req, res) => {
  // get the details to change
  // check if they are present or not
  // set the changes to the db
  // send response

  const { name, email, phoneNo } = req.body;
  if (!name || !email || !phoneNo) {
    throw new ApiError(400, "fields are required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { name, email, phoneNo },
    },
    { new: true }
  ).select("-password -refreshtoken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "profile successfully updated"));
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  changePassword,
  updateAccount,
};
