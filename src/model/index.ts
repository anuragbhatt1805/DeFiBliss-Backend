import mongoose from "mongoose";

import { UserSchema } from "./User.model";
import { ArtSchema } from "./Art.model";
import { CategorySchema } from "./Category.model";

export const User = mongoose.model("User", UserSchema);
export const Art = mongoose.model("Art", ArtSchema);
export const Category = mongoose.model("Category", CategorySchema);