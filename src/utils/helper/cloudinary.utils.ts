import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CloudUploadOptions } from "../interface/cloudinary.interface";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadOnCloudinary = async ({image, tags} : CloudUploadOptions) => {
  try {
    if (!image) return null;

    const response = await cloudinary.uploader.upload(`./${image}`, {
      resource_type: "auto",
      image_metadata: true,
      tags: tags || "defibliss",
    });
    fs.unlinkSync(image);
    return response;

  } catch (error) {
    console.log(error);
    fs.unlinkSync(image);
    return null;
  }
};

export { uploadOnCloudinary };