import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Error handler ", err);
  if (err instanceof ApiError) {
    return res.status(err.statuscode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};
