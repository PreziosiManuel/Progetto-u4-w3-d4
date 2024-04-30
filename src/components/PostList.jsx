import React, { useState, useEffect } from "react";
import Post from "./Post";
import PostDetail from "./PostDetail";
import { Spinner } from "react-bootstrap"; // Aggiunto import per l'icona di caricamento

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false); // Stato per gestire il caricamento

  const fetchPosts = () => {
    setLoading(true); // Imposta il caricamento su true prima di eseguire la richiesta
    fetch("http://localhost/E-Commerce/wp-json/wp/v2/posts?_embed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei post");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false); // Imposta il caricamento su false dopo il completamento della richiesta
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Imposta il caricamento su false in caso di errore
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter((post) => post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;

  const deletePost = (postId) => {
    // Logica per eliminare il post
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
          {loading ? ( // Aggiunta condizione per l'icona di caricamento durante il caricamento dei post
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id}>
                <Post
                  post={post}
                  onDelete={() => {
                    deletePost(post.id);
                    fetchPosts();
                  }}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
