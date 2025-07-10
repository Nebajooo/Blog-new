import { useState } from "react";
import axios from "../api/axiosConfig";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post created!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post", err);
      alert("Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <textarea
        placeholder="Content"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
        style={{
          display: "block",
          marginBottom: "1rem",
          width: "100%",
          height: "100px",
        }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />
      <button type="submit">Post</button>
    </form>
  );
}
