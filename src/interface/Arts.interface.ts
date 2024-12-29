import { Request } from "express";

export interface ExploreArtsRequest extends Request {
    query: {
        search?: string;
        page?: string;
        limit?: string;
    }
    body: {
        category?: string;
        order?: "POPULAR" | "LATEST" ;
    }
}

export interface GetArtIdRequest extends Request {
    params: {
        id: string;
    }
}

export interface DownloadArtRequest extends Request {
    params: {
        id: string;
    }
    body: {
        walletAddress: string;
        signature: string;
    }
}

export interface GetOriginalArtIdRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    }
}

export interface UploadArtRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    }
    body: {
        walletAddress: string;
        signature: string;
        title: string;
        description: string;
        category: string;
        transactionId: string;
        price: number;
        verification_rate : number;
    }
}