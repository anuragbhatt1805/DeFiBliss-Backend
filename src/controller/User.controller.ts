import { ApiError, ApiResponse, AsyncHandler } from "../utils";
import { User, Art, Category } from "../model";
import {
  AddUserRequest,
  GetUserRequest,
  UpdateUserRequest,
  FollowRequest,
  UnFollowRequest,
  ListArtsRequest,
} from "../interface/User.interface";
import { Response } from "express";

export const AddUser = AsyncHandler(
  async (req: AddUserRequest, res: Response) => {
    try {
      const { username, walletAddress, signature, provider } = req.body;

      const existingUser = await User.findOne({
        $or: [{ walletAddress }, { signature }],
      });
      if (existingUser) {
        throw new ApiError(409, "User already exists");
      }

      const user = await User.create({
        username,
        walletAddress,
        signature,
        provider,
      });

      return res
        .status(201)
        .json(new ApiResponse(201, { ...user }, "User Accepted successfully"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);

export const GetUser = AsyncHandler(
  async (req: GetUserRequest, res: Response) => {
    try {
      const { walletAddress } = req.body;

      const user = await User.findOne({ walletAddress });
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      return res
        .status(200)
        .json(new ApiResponse(200, { ...user }, "User retrieved successfully"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);

export const UpdateUser = AsyncHandler(
  async (req: UpdateUserRequest, res: Response) => {
    try {
      const { username } = req.params;
      const { signature, walletAddress, name, bio, verified } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      if (
        user.signature !== signature &&
        user.walletAddress !== walletAddress
      ) {
        throw new ApiError(401, "Unauthorized");
      }

      if (name) user.name = name;
      if (bio) user.bio = bio;
      if (verified) user.verified = verified;

      await user.save();

      return res
        .status(200)
        .json(new ApiResponse(200, { ...user }, "User updated successfully"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);

export const FollowUser = AsyncHandler(
  async (req: FollowRequest, res: Response) => {
    try {
      const { username } = req.params;
      const { follower, signature, walletAddress } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      if (
        user.signature !== signature &&
        user.walletAddress !== walletAddress
      ) {
        throw new ApiError(401, "Unauthorized");
      }

      const follower1 = await User.findOne({ follower });
      if (!follower1) {
        throw new ApiError(401, "Follower not found");
      }

      if (
        user.following?.includes(follower1.username) &&
        follower1.followers?.includes(user.username)
      ) {
        throw new ApiError(409, "Already following user");
      } else {
        user.following?.push(follower1.username);
        follower1.followers?.push(user.username);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(200, { ...user }, `Following ${follower1.username}`)
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

export const UnFollowUser = AsyncHandler(
  async (req: UnFollowRequest, res: Response) => {
    try {
      const { username } = req.params;
      const { follower, signature, walletAddress } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      if (
        user.signature !== signature &&
        user.walletAddress !== walletAddress
      ) {
        throw new ApiError(401, "Unauthorized");
      }

      const follower1 = await User.findOne({ follower });
      if (!follower1) {
        throw new ApiError(401, "Follower not found");
      }

      if (
        user.following?.includes(follower1.username) &&
        follower1.followers?.includes(user.username)
      ) {
        user.following = user.following.filter(
          (following: string) => following !== follower1.username
        );
        follower1.followers = follower1.followers.filter(
          (follower: string) => follower !== user.username
        );
      } else {
        throw new ApiError(409, "Not following user");
      }

      return res
        .status(200)
        .json(
          new ApiResponse(200, { ...user }, `Unfollowed ${follower1.username}`)
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

export const ListArts = AsyncHandler(
  async (req: ListArtsRequest, res: Response) => {
    try {
      const { username } = req.params;
      const { categories } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        throw new ApiError(404, "User not found");
      }

      let arts;
      if (categories) {
        const category = await Category.findOne({ categories });

        if (!category) {
          throw new ApiError(404, "Category not found");
        }

        arts = await Art.find({ artist: user._id, category: category._id }).populate("category", "artist");;
      } else {
        arts = await Art.find({ artist: user._id }).populate("category", "artist");;
      }
      if (!arts) {
        throw new ApiError(404, "No arts found");
      }

      return res
        .status(200)
        .json(new ApiResponse(200, { arts }, "Arts retrieved successfully"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(400, error.message);
      } else {
        throw new ApiError(400, "An unknown error occurred");
      }
    }
  }
);
