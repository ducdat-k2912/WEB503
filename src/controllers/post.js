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
        return res.json("Lối 404")
    }
    posts.splice(index, 1);
    res.json({succes: true});
}