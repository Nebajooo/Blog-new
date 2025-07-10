import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import "../css/AdminDashboard.css";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/posts/${id}`);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setEditForm({ title: post.title, content: post.content });
  };

  // const handleUpdate = async () => {
  //   await axios.put(`/posts/${editingId}`, editForm);
  //   setEditingId(null);
  //   fetchPosts();
  // };
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("content", editForm.content);
    // Add image if editing includes image upload feature
    formData.append("image", editForm.image);

    await axios.put(`/posts/${editingId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setEditingId(null);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPost((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle create new post submit
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);
      if (newPost.image) formData.append("image", newPost.image);

      await axios.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewPost({ title: "", content: "", image: null });
      setImagePreview(null);
      fetchPosts();
      alert("Post created successfully!");
    } catch (error) {
      alert("Failed to create post.");
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Create Post Form */}
      <form
        className="create-post-form"
        onSubmit={handleCreatePost}
        style={{ marginBottom: "2rem" }}
      >
        <h3>Create New Post</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleNewPostChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleNewPostChange}
          required
          rows={4}
          style={{ display: "block", marginBottom: "10px", width: "300px" }}
        />
        <label htmlFor="image">Upload Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ marginTop: "10px", maxWidth: "150px", maxHeight: "150px" }}
          />
        )}
        <br />
        <button type="submit" style={{ marginTop: "10px" }}>
          Create Post
        </button>
      </form>

      {/* Existing posts */}
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {editingId === post._id ? (
            <>
              <input
                className="post-card"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <textarea
                className="edit-textarea"
                value={editForm.content}
                onChange={(e) =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
                rows={4}
              />
              <button className="button-group" onClick={handleUpdate}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              {/* Show image if available */}
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
              <div className="button-group">
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
