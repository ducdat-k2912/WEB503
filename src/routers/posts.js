import { Router } from "express";

const postsRouter = Router();

postsRouter.get("/",(req,res)=>{
    res.send("Posts");
});

postsRouter.get("/detail/:id",(req, res)=>{
    res.send("Post detail có id là:" + req.params?.id)
});

postsRouter.get("/detail",(req, res)=>{
    console.log(req.query?.name);
    res.send(req.query?.name)
});

export default postsRouter;