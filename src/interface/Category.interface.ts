import { Request } from "express";

export interface AddCategoryRequest extends Request {
  body: {
    name: string;
  }
}

export interface CategoryRequest extends Request {
  params: {
    name: string
  }
}