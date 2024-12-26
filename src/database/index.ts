import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongo = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}?${process.env.EXTRA_ARGS}`)
        console.log("MONGO:",`Database connected: ${mongo.connection?.name}`);
    } catch (error) {
        console.error("MONGO:","Database connection failed");
        throw new Error("Error connecting database: " + error);
    }
}