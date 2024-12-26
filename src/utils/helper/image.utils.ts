import { exiftool, Tags } from "exiftool-vendored";
import {
  decodeImageParams,
  decodeImageResult,
  encodedImageResult,
  encodeImageParams,
  extractImageMetaDataResult,
} from "../interface/image.interface";

export async function encodeImage({ image, metaData }: encodeImageParams): Promise<encodedImageResult> {
  try {
    const res = await exiftool.write(
      image, {
        UserComment: Buffer
          .from(JSON.stringify(metaData), "utf8")
          .toString("base64")
      });
    return {
      image: image,
      success: true,
      message:res.updated === 1 ? "Updated successfully" : "Unable to update tags",
    };
  } catch (e: unknown) {
    return {
      image: image,
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function decodeImage({ image }: decodeImageParams): Promise<decodeImageResult> {
  try {
    const metaData: Tags = await exiftool.read(image);
    if (metaData.UserComment === undefined || metaData.UserComment === null) {
      throw new Error("CustomRendered tag not found");
    }
    return {
      image: image,
      metaData: JSON.parse(Buffer.from(metaData.UserComment, "base64").toString("utf8")),
      success: true,
    };
  } catch (e: unknown) {
    return {
      image: image,
      metaData: null,
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function extractImageMetaData({ image }: decodeImageParams): Promise<extractImageMetaDataResult> {
  try {
    const metaData: Tags = await exiftool.read(image);
    if (metaData === undefined || metaData === null) {
      throw new Error("No Metadata found");
    }
    return {
      image: image,
      metaData: metaData,
      success: true,
    };
  } catch (e: unknown) {
    return {
      image: image,
      metaData: null,
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
