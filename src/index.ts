import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json({ limit: "50kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

import { connectDB } from "./database";

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

app.get("/", (req, res) => {
    res.json({set: "Hello World"})
})