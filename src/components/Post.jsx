import React from "react";
import { Card, Button } from "react-bootstrap";

const Post = ({ post, onDelete }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <Card.Text as="div" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <Button variant="primary" href={post.link} target="_blank">
          Modifica
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Post;
