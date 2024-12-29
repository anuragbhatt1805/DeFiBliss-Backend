export class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];

  constructor(
      statusCode: number,
      message: string = "Something went wrong",
      error: any[] = [],
      stack: string = ""
  ){
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.errors = error;

      if (stack) {
          this.stack = stack;
      } else {
          Error.captureStackTrace(this, this.constructor)
      }
  }
}


interface IApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
}

export class ApiResponse implements IApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: any = null, message: string = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
  }
}


import { Request, Response } from 'express';

interface AsyncHandler {
  fn: Function;
  req: Request;
  res: Response;
  next: Function;
}

export const AsyncHandler = (fn: Function) => async (req: Request, res: Response, next: Function) => {
  try {
      return await fn(req, res, next);
  } catch (error: any) {
      res.status(error.statusCode || 500).json({
          success: false,
          message: error.message,
      })
  }
}


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