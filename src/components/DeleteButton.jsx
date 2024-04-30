import React from "react";

const DeleteButton = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Elimina
    </button>
  );
};

export default DeleteButton;
