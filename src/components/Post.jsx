import React from "react";
import { Card, Button } from "react-bootstrap";
import DeleteButton from "./DeleteButton";

const Post = ({ post, fetchPosts }) => {
  const handleDelete = () => {
    fetch(`http://localhost/E-Commerce/wp-json/wp/v2/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("asdf : kGo2aVuLgNZOozrmIZHZGg1B")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del post");
        }
        fetchPosts();
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Card.Text as="div" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <Button variant="primary" href={post.link} target="_blank">
          Modifica
        </Button>
        <DeleteButton onDelete={handleDelete} />
      </Card.Body>
    </Card>
  );
};

export default Post;
