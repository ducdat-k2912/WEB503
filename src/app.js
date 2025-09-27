import express from "express";
import router from "./routers";
import morgan from "morgan";
import postsRouter from "./routers/posts.js";


const app = express();

//Dùng morgan để log ở chế độ 'dev'
app.use(morgan("dev"));

//Middle ware tích hợp để parse JSON: req.body
app.use(express.json());

//Localhost:3000
app.get("/",(req, res)=>{
  res.send("Hello, chào các bạn")
});

app.use("/api/", router);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});