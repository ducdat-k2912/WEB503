import Post from "../models/post";

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
    { id: 3, title: "Bài viết 3", content: "Nội dung bài viết 3" },
];

//Lấy danh sách
export async function getPosts(req, res) {
  //Post.find()
  try {
    const post = await Post.find();
    return res.json(post);
  } catch (error) {
    return res.json({message: error.message});
  }
}
//Lấy chi tiết
export async function getPostsByID(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if(!post) {
        return res.status(404).json({message: "Không tìm thấy bài viết"})
      }
      return res.json(post);
    } catch (error) {
      return res.status(400).json({message: error.message})
    }
}
//Thêm bài viết
export async function addPosts(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost)
  } catch (error) {
    return res.status (400).json({message: error.message})    
  }
}
//Cập nhật bài viết
export async function updatePosts(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await Post.findByIdAndUpdate(id,{ title, content },{ new: true });
      if(!post) return res.status(404).json("Lỗi 404 - Không tìm thấy bài viết");
      res.json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Lỗi server");
    }
}
//Xoá bài viết
export async function deletePosts(req, res) {
    try {
      const { id } = req.params;
      const deletePosts = await Post.findByIdAndDelete(id);
      if(!deletePosts) {
        return res.status(404).json({message: "Không tìm thấy bài viết"})
      }
      res.json({success: true});
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({message: "Lỗi server"});
    }
}       
// Tìm kiếm posts
export async function searchPosts(req, res) {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.json("Vui lòng nhập từ khoá tìm kiếm");
    }
    const posts = await Post.find({
      $or: [
        { title: new RegExp(keyword, "i") },
        { content: new RegExp(keyword, "i") }
      ]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
}