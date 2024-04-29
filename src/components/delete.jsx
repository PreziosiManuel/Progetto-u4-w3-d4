import React from "react";
import DeleteButton from "./DeleteButton";

const PostDetailWithDelete = ({ post, onDelete }) => {
  if (!post) return <div>Caricamento...</div>;

  const handleDelete = () => {
    // Chiamare la funzione onDelete quando l'utente clicca sul pulsante "Elimina"
    onDelete();
  };

  return (
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <DeleteButton onDelete={handleDelete} />
    </div>
  );
};

export default PostDetailWithDelete;
