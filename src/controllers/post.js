let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
    { id: 3, title: "Bài viết 3", content: "Nội dung bài viết 3" },
];

export function getPosts(req, res) {
    res.json(posts)
}





function getPostsByID(req, res) { }
function addPosts(req, res) { }
function updatePosts(req, res) { }
function deletePosts(req, res) { }