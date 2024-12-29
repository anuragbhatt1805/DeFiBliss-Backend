import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,

    },
    signature : {
        type: String,
        required: true,
        unique: true,
    },
    provider : {
        type: String,
        required: false,
    },
    earning : {
        type: Number,
        required: false,
        default: 0,
    },
    verified : {
        type: Boolean,
        required: true,
        default: false,
    },
    name : {
        type: String,
        required: false,
    },
    bio : {
        type: String,
        required: false,
    },
    followers : {
        type: [String],
        required: false,
        default: [],
    },
    following : {
        type: [String],
        required: false,
        default: [],
    },
    downloads : {
        type: [mongoose.Schema.Types.ObjectId],
        ref : "Art",
        default: [],
    }
}, {
    timestamps: true
})