import { Router } from "express";
import { AddCategory, GetCategory, GetAllCategories } from "../controller/Category.controller";

export const CategoryRouter = Router();

CategoryRouter.post("/", AddCategory);
CategoryRouter.get("/:name", GetCategory);
CategoryRouter.get("/", GetAllCategories);