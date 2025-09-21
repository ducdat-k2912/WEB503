import { Router } from "express";

const userRouter = Router();

userRouter.get("/",(req,res)=>{
    res.send("user");
})

export default userRouter;