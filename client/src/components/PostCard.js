import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({ id, body, username, createdAt, commentsCount, likesCount }) {
  const likeClick = () => likePost(id);
  const commentClick = () => commentPost(id);
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image floated='right' size='mini' src='/logo192.png' />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' size='mini' onClick={likeClick}>
          <Button icon size='mini'>
            <Icon name='heart' />
          </Button>
          <Label basic pointing='left'>
            {likesCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' size='mini' onClick={commentClick}>
          <Button icon size='mini'>
            <Icon name='comments' />
          </Button>
          <Label basic pointing='left'>
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

function likePost(id) {
  console.log(`I like ${id}`);
}

function commentPost(id) {
  console.log(`Comment on ${id}`);
}

export default PostCard;
