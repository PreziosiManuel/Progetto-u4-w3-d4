import React, { useState, useEffect } from "react";
import Post from "./Post";
import PostDetail from "./PostDetail";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = () => {
    fetch("http://localhost/E-Commerce/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei post");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .then(undefined, (error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter((post) => post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;

  return (
    <div>
      <h1>Post List</h1>
      <input type="text" placeholder="Cerca post..." onChange={(e) => setSearchTerm(e.target.value)} />
      {selectedPost ? (
        <div>
          <button onClick={() => setSelectedPost(null)}>Back to Posts</button>
          <PostDetail post={selectedPost} />
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {filteredPosts.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost(post)}>
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
