import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageFileName = req.file ? req.file.filename : null;

    const authorId = req.user.id;

    const post = new Post({
      title,
      content,
      author: authorId,
      imageFileName,
    });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ msg: "Error creating post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username")
      .lean(); //Return plain JavaScript objects (not full Mongoose documents)

    // Add full image URL for each post if image exists
    const postWithImageUrl = posts.map((post) => {
      if (post.imageFileName) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
          post.imageFileName
        }`;
      }
      return post;
    });
    res.json(postWithImageUrl);
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ msg: "Error fetching posts" });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("Delete Post Error", err);
    res.status(500).json({ msg: "Error deleting post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageFileName = req.file ? req.file.fileName : undefined;

    const updateData = { title, content };
    if (imageFileName) updateData.imageFileName = imageFileName;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error("Update post error: ", error);
    res.json(500).json({ msg: "Error updating poat" });
  }
};
// export const likePost = async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   post.likes = (post.likes || 0) + 1;
//   await post.save();
//   res.json(post);
// };

// export const commentPost = async (req, res) => {
//   const { text, username } = req.body;
//   const post = await Post.findById(req.params.id);
//   post.comments.push({ text, username, createdAt: new Date() });
//   await post.save();
//   res.json(post);
// };

// export const searchPost = async (req, res) => {
//   const { q } = req.query;
//   const posts = await Post.find({
//     $or: [{ title: new RegExp(q, "i") }, { content: new RegExp(q, "i") }],
//   });
//   res.json(posts);
// };
