import { Tags } from 'exiftool-vendored';

export interface MetaData {
    transactionId?: string;
    walletAddress?: string;
}

export interface encodeImageParams {
    metaData: MetaData;
    image: string;
}

export interface encodedImageResult {
    image: string;
    success: boolean;
    error?: string;
    message?: string;
}

export interface decodeImageParams {
    image: string;
}

export interface decodeImageResult {
    image: string;
    metaData: MetaData | null;
    success: boolean;
    error?: string;
}

export interface extractImageMetaDataResult {
    image: string;
    metaData: Tags | null;
    success: boolean;
    error?: string;
}