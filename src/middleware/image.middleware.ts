import { ApiError, ApiResponse, AsyncHandler, decodeImage } from "../utils";
import { User } from "../model";
import { Request, Response } from 'express';

interface ImageMiddlewareRequest extends Request{
    files: {
        [fieldname: string]: Express.Multer.File[];
    },
    body: {
        walletAddress: string;
        signature: string;
        title: string;
        description: string;
        category: string;
        transactionId?: string;
        price: number;
        verification_rate : number;
    }
}

export const imageMiddleware = AsyncHandler(async (req: ImageMiddlewareRequest, res: Response, next: Function) => {
    try {
        const { walletAddress, signature } = req.body;
        const user = await User.findOne({ walletAddress, signature });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new ApiError(400, "No files were uploaded");
        }

        const Data = {
            timeStamp: Date.now(),
            walletAddress: walletAddress,
            signature: signature,
            username: user.username,
        }

        // Function to add the data to the image

        req.body = {
            ...req.body,
            transactionId : "0x123",
        }

        next();
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new ApiError(400, err.message);
        } else {
            throw new ApiError(400, "An unknown error occurred");
        }
    }
});