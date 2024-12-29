import { Request } from "express";

export interface AddUserRequest extends Request {
    body: {
        username: string;
        walletAddress: string;
        signature: string;
        provider: string;
    }
}

export interface GetUserRequest extends Request {
    body:{
        walletAddress: string;
    }
}

export interface UpdateUserRequest extends Request {
    params:{
        username: string;
    }
    body: {
        walletAddress: string;
        signature: string;
        name?: string;
        bio?: string;
        verified?: boolean;
    }
}

export interface FollowRequest extends Request {
    params:{
        username: string;
    }
    body: {
        follower: string;
        signature: string;
        walletAddress: string;
    }
}

export interface UnFollowRequest extends Request {
    params:{
        username: string;
    }
    body: {
        follower: string;
        signature: string;
        walletAddress: string;
    }
}

export interface ListArtsRequest extends Request {
    params:{
        username: string;
    },
    body: {
        categories?: string;
    }
}