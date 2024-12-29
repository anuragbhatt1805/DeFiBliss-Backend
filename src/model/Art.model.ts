import mongoose from "mongoose";

export const ArtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required: true,
    },
    downloads : {
        type: Number,
        required: false,
        default: 0,
    },
    price : {
        type: Number,
        required: true,
        default: 0,
    },
    resolution : {
        type: {
            width: Number,
            height: Number,
        },
        required: false,
        default: {
            width: 100,
            height: 100,
        },
    },
    description: {
        type: String,
        required: false,
    },
    file: {
        type: String,
        required: true,
    },
    verified : {
        type: Boolean,
        required: true,
        default: true,
    },
    verification_rate : {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
})