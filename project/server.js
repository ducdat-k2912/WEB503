import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BodyParser from "body-parser";
import {registerUser} from "./controllers/userControllers.js";

dotenv.config();
const app = express();
app.use(BodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/web503_nodejs")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

app.post("/api/register", registerUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


