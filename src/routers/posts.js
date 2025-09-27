import { Router } from "express";

import { addPosts, deletePosts, getPosts, getPostsByID, updatePosts, searchPosts } from "../controllers/post";

const postsRouter = Router();

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];


//GET /api/posts - Lấy danh sách
postsRouter.get("/",getPosts);

// GET /api/posts/search?search=keyword - Tìm kiếm bài viết
postsRouter.get("/search",searchPosts);

//GET /api/posts/:id - Lấy chi tiết
postsRouter.get("/:id",getPostsByID);

//POST /api/posts - Thêm bài viết
postsRouter.post("/",addPosts);

//PUT /api/posts/:id - Cập nhật bài viết
postsRouter.put("/:id",updatePosts);

//DELETE /api/posts/:id - Xoá bài viết
postsRouter.delete("/:id",deletePosts);

export default postsRouter;