import { Router } from "express";
import userRouter from "./user";
import productsRouter from "./products";
import postsRouter from "./posts";


const router = Router();


router.use("/user",userRouter)

router.use("/products",productsRouter)

router.use("/posts",postsRouter)

export default router;