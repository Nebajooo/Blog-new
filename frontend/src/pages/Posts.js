import { useEffect, useState } from "react";
import axios from "../api/axiosConfig.js";
import "../css/Post.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return <Blog posts={posts} />;
}

function Blog({ posts = [] }) {
  return (
    <div className="blog-container">
      <h2 className="blog-title">All Blog Posts</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 100;

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const contentPreview =
    post.content.length > previewLength
      ? post.content.slice(0, previewLength) + "..."
      : post.content;

  return (
    <div className="blog-card">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="post-image"
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      )}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">
        {expanded ? post.content : contentPreview}
        {post.content.length > previewLength && (
          <button className="toggle-btn" onClick={toggleExpanded}>
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
      <p className="post-author">
        By <i>{post.author?.username}</i>
      </p>
    </div>
  );
}
