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
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter((post) => post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;

  const deletePost = (postId) => {
    const username = "asdf";
    const password = "kGo2aVuLgNZOozrmIZHZGg1B";
    const credentials = window.btoa(`${username}:${password}`);

    fetch(`http://localhost/E-Commerce/wp-json/wp/v2/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del post");
        }
        return response.json();
      })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      });
  };

  return (
    <div>
      <h1>Post List</h1>
      <input type="text" placeholder="Cerca post..." onChange={(e) => setSearchTerm(e.target.value)} />
      {selectedPost ? (
        <div>
          <button onClick={() => setSelectedPost(null)}>Torna ai post</button>
          <PostDetail post={selectedPost} />
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
              <button variant="danger" onClick={() => deletePost(post.id)}>
                Elimina
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
