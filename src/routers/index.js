import { Router } from "express";
import productRouter from "./products.js";
// import postsRouter from "./posts.js";
import authRouter from "./authRoute.js";

const router = Router();

router.use("/products", productRouter);
// router.use("/posts", postsRouter);
router.use("/auth", authRouter);

export default router;
