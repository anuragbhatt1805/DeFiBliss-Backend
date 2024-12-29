import { ApiError, ApiResponse, AsyncHandler } from "../utils";
import { Category } from "../model";
import { CategoryRequest, AddCategoryRequest } from "../interface/Category.interface";
import { Request, Response } from "express";

export const AddCategory = AsyncHandler(
  async (req: AddCategoryRequest, res: Response) => {
    try {
      const { name } = req.body;

      const existingCategory = await Category.findOne({
        name,
      });
      if (existingCategory) {
        throw new ApiError(409, "Category already exists");
      }

      const category = await Category.create({
        name,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { ...category },
            "Category Accepted successfully"
          )
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);

export const GetCategory = AsyncHandler(
  async (req: CategoryRequest, res: Response) => {
    try {
      const { name } = req.body;

      const category = await Category.findOne({ name });
      if (!category) {
        throw new ApiError(404, "Category not found");
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...category },
            "Category retrieved successfully"
          )
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);

export const GetAllCategories = AsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      if (!categories) {
        throw new ApiError(404, "Categories not found");
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { ...categories },
            "Categories retrieved successfully"
          )
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);
