// Interface Exports --------------------------------
import {
  MetaData,
  encodeImageParams,
  encodedImageResult,
  decodeImageParams,
  decodeImageResult,
  extractImageMetaDataResult,
} from "./interface/image.interface";
import { CloudUploadOptions } from "./interface/cloudinary.interface";

export {
  MetaData,
  encodeImageParams,
  encodedImageResult,
  decodeImageParams,
  decodeImageResult,
  extractImageMetaDataResult,
  CloudUploadOptions,
};

// Implementation Exports ----------------------------

import {
  encodeImage,
  decodeImage,
  extractImageMetaData,
} from "./helper/image.utils";
import { uploadOnCloudinary } from "./helper/cloudinary.utils";

export {
  encodeImage,
  decodeImage,
  extractImageMetaData,
  uploadOnCloudinary
};
