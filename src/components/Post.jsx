import React from "react";
import { Card, Button } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Card.Text as="div" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <Button variant="primary" href={post.link} target="_blank">
          Dettagli
        </Button>
        <Button className="mx-1" variant="danger" href={post.link} target="delete.jsx">
          Elimina
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
