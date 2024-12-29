import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());
app.use('/uploads', express.static('src/uploads'));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);


import { connectDB } from "./database";
import { ArtsRouter } from "./routes/Arts.routes";
import { UserRouter } from "./routes/User.routes";
import { CategoryRouter } from "./routes/Category.routes";

connectDB()
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running at http://0.0.0.0:${port}`);
      });
    } else {
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    }
    app.on("error", (error) => {
      console.error("EXPRESS: Express error:", error);
    });
  })
  .catch((err) => {
    console.log(`Couldn't connect to Database: ${err.message}`);
  });

app.use("/arts", ArtsRouter);
app.use("/users", UserRouter);
app.use("/category", CategoryRouter);