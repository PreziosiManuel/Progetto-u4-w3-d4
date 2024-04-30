import React, { useState } from "react";

const PostDetail = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title.rendered);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    onUpdate({ ...post, title: { rendered: e.target.value } }); // Aggiorna lo stato del titolo nel componente genitore
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Effettua una richiesta PATCH o POST all'API personalizzata di WordPress per aggiornare il post
    fetch(`http://localhost/E-Commerce/wp-json/custom-api/update-post/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title: editedTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data); // Aggiorna lo stato del post nel componente genitore
        setIsEditing(false);
      })
      .catch((error) => console.error("Errore durante il salvataggio delle modifiche:", error));
  };

  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      {isEditing ? (
        <div>
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
          <button onClick={handleSaveClick}>Salva</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Elimina</button>
      )}
    </div>
  );
};

export default PostDetail;
