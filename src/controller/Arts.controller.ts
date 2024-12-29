import { ApiError, ApiResponse, AsyncHandler, decodeImage, encodeImage } from "../utils";
import { User, Art, Category } from "../model";
import { ExploreArtsRequest, GetArtIdRequest, DownloadArtRequest, GetOriginalArtIdRequest, UploadArtRequest } from "../interface/Arts.interface";
import { Response } from "express";

export const ExploreArts = AsyncHandler( async (req : ExploreArtsRequest, res : Response) => {
    try {
        const { search, page, limit } = req.query;
        const { category, order } = req.body;

        const query : any = {};
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        if (category) {
            const categoryObj = await Category.findOne({ name: category });
            if (!categoryObj) {
                throw new ApiError(404, "Category not found");
            }
            query.category = categoryObj._id;
        }
        if (page && limit){
            const arts = await Art.find(query)
                .sort({ createdAt: order === "LATEST" ? -1 : 1, downloads: order === "POPULAR" ? -1 : 1 })
                .skip((parseInt(page) - 1) * parseInt(limit))
                .limit(parseInt(limit))
                .populate("category", "artist");
            const total = await Art.countDocuments(query);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    { arts, total },
                    "Arts retrieved successfully"
                )
            );
        } else {
            const arts = await Art.find(query)
                .sort({ createdAt: order === "LATEST" ? -1 : 1 })
                .populate("category", "artist");

            return res.status(200).json(
                new ApiResponse(
                    200,
                    arts,
                    "Arts retrieved successfully"
                )
            );
        }

    } catch (err : unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
})

export const GetArtId = AsyncHandler( async (req:GetArtIdRequest, res:Response) => {
    try {
        const { id } = req.params;
        const art = await Art.findById(id).populate("category", "artist");
        if (!art) {
            throw new ApiError(404, "Art not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                art,
                "Art retrieved successfully"
            )
        );
    } catch (err : unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
});

export const DownloadArt = AsyncHandler( async (req:DownloadArtRequest, res:Response) => {
    try {
        const { id } = req.params;
        const {walletAddress, signature} = req.body;
        const art = await Art.findById(id);

        if (!art) {
            throw new ApiError(404, "Art not found");
        }

        const user = await User.findOne({ walletAddress, signature });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user._id.toString() !== art.artist.toString()) {
            throw new ApiError(400, "You are the owner of this art");
        }

        const artist = await User.findById(art.artist.toString());

        if (!user.downloads.includes(art._id)) {
            art.downloads = (art.downloads ?? 0) + 1;
            user.downloads.push(art._id);
            if (artist && artist.earning !== undefined && artist.earning !== null) {
                artist.earning += (art.price * 0.95);
            } else {
                throw new ApiError(400, "Artist or artist's earning is not defined");
            }
            await artist.save();
            await art.save();
            await user.save();
        }

        return res.status(200)
            .download(`./${art.file}`, art.title)
    } catch (err : unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
});

export const CheckOriginalArt = AsyncHandler( async (req:GetOriginalArtIdRequest, res:Response) => {
    try {
        const { image } = req.files;
        const {metaData, success} = await decodeImage({image: image[0].path});

        if (success && !metaData) {
            throw new ApiError(400, "No metadata found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                metaData,
                "Metadata retrieved successfully"
            )
        );

    } catch (err : unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
});

export const AddNewArt = AsyncHandler( async (req:UploadArtRequest, res:Response) => {
    try {
        const { walletAddress, signature, title, description, category, transactionId, verification_rate, price } = req.body;
        const { image } = req.files;

        const user = await User.findOne({ walletAddress, signature });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const categoryObj = await Category.findById(category);
        if (!categoryObj) {
            throw new ApiError(404, "Category not found");
        }

        const { success } = await encodeImage({ image: image[0].path, metaData: {
            transactionId: transactionId,
            walletAddress: walletAddress,
        } });

        if (!success || !image[0].path) {
            throw new ApiError(400, "Failed to encode image");
        }

        const art = await Art.create({
            title,
            description,
            category: categoryObj._id,
            artist: user._id,
            file: image[0].path,
            verification_rate,
            price,
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                art,
                "Art uploaded successfully"
            )
        );
    } catch (err : unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
});