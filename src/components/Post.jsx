import React from "react";
import { Card, Button, Container } from "react-bootstrap";
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
    <Container>
      <Card className="my-4 mx-2" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <Card.Text as="div" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          <Button className="me-2" variant="primary" href={post.link} target="_blank">
            <i className="bi bi-pencil-square"></i> Modifica
          </Button>
          <DeleteButton onDelete={handleDelete} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Post;
