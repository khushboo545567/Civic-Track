import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudnary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    console.log("file has been sussfully uploaded ", response.url);
    // console.log(response);
    fs.unlinkSync(localfilepath);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    // localy file saved should be deleted after the upload fails
    return null;
  }
};

export default uploadOnCloudnary;
