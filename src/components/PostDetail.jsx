import React, { useState } from "react";

const PostDetail = ({ post, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title.rendered);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    onUpdate({ ...post, title: { rendered: e.target.value } });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsSaving(true);
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il salvataggio delle modifiche");
        }
        return response.json();
      })
      .then((data) => {
        onUpdate(data);
        setIsEditing(false);
        setIsSaving(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsSaving(false);
      });
  };

  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            style={{ border: "1px solid #ccc", padding: "5px" }}
          />
          <button onClick={handleSaveClick}>{isSaving ? "Salvataggio..." : "Salva"}</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <button onClick={handleEditClick}>Modifica</button>
      )}
    </div>
  );
};

export default PostDetail;
