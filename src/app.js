import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routers/index.js";


const app = express();

//Dùng morgan để log ở chế độ 'dev'
app.use(morgan("dev"));

//Middle ware tích hợp để parse JSON: req.body
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/web503_nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

//Localhost:3000
app.get("/",(req, res)=>{
  res.send("Hello, chào các bạn")
});

app.use("/api/", router);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});