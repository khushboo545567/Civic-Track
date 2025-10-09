// // get the token form the user and
// // check if the token is valid or not verify jwt
// // if correct then add the payload to the req
// // and next

// import { User } from "../models/user.models.js";
// import { ApiError } from "../utils/apiError.js";
// import jwt from "jsonwebtoken";

// export const verifyJWT = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       throw new ApiError(401, "unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );
//     if (!user) {
//       res.clearCookie("accessToken");
//       throw new ApiError(401, "invalid access token");
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.clearCookie("accessToken");
//     return next();
//   }
// };

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

// requireAuth = true → protected route
export const verifyJWT = (requireAuth = false) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      // No token
      if (!token) {
        if (requireAuth) {
          return res
            .status(401)
            .json({ message: "Unauthorized. Please login." });
        }
        return next(); // public route: continue
      }

      const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        res.clearCookie("accessToken");
        if (requireAuth) {
          return res
            .status(401)
            .json({ message: "Invalid token. Please login." });
        }
        return next(); // public route: continue
      }

      req.user = user; // attach user to request
      next();
    } catch (error) {
      res.clearCookie("accessToken");
      if (requireAuth) {
        return res
          .status(401)
          .json({ message: error?.message || "Invalid or expired token" });
      }
      return next(); // public route: continue
    }
  };
};
