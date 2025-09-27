let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
    { id: 3, title: "Bài viết 3", content: "Nội dung bài viết 3" },
];

//Lấy danh sách
export function getPosts(req, res) {
    res.json(posts)
}
//Lấy chi tiết
export function getPostsByID(req, res) {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) {
        return res.json("Lỗi 404")
    }
    res.json(post)
}
//Thêm bài viết
export function addPosts(req, res) {
    const {title, content} = req.body;
    const newPost = {id: posts.length ? posts[posts.length - 1].id + 1 : 1, title, content}; //ID tự động tăng
    posts.push(newPost);
    res.status(201).json(newPost)
}
//Cập nhật bài viết
export function updatePosts(req, res) {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if(!post) {
        return res.json("Lỗi 404")
    } 

    const {title, content} = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    console.log("Update", post);

    res.json(post);
}
//Xoá bài viết
export function deletePosts(req, res) {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.json("Lỗi 404")
    }
    posts.splice(index, 1);
    res.json({succes: true});
}       
// Tìm kiếm posts
export function searchPosts(req, res) {
  try {
    // Không có bài nào
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "Không có bài viết nào" });
    }
    const { search } = req.query;
    // Không có tham số search => trả về toàn bộ
    if (!search) {
      return res.json(posts);
    }
    // Lọc theo title, không phân biệt hoa/thường
    const keyword = search.toLowerCase();
    const results = posts.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}