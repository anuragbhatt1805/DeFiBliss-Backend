import { Router } from "express";
import { AddUser, UpdateUser, GetUser, ListArts, FollowUser, UnFollowUser } from "../controller/User.controller";

export const UserRouter = Router();

UserRouter.post("/add", AddUser);
UserRouter.post("/", GetUser);
UserRouter.put("/:username", UpdateUser);
UserRouter.get("/:username/arts", ListArts);
UserRouter.post("/:username/follow", FollowUser);
UserRouter.post("/:username/unfollow", UnFollowUser);