import { Router } from "express";
import { ExploreArts, GetArtId, DownloadArt, CheckOriginalArt, AddNewArt } from "../controller/Arts.controller";
import { upload } from "../middleware";

export const ArtsRouter = Router();

ArtsRouter.get("/explore", ExploreArts);
ArtsRouter.get("/:id", GetArtId);
ArtsRouter.post("/download/:id", DownloadArt);
ArtsRouter.post("/checkoriginal", upload.fields([
    { name: "image", maxCount: 1 }
]), CheckOriginalArt);
ArtsRouter.post("/add", upload.fields([
    { name: "image", maxCount: 1 }
]), AddNewArt);
