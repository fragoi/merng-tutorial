import React from 'react';
import { gql, useQuery } from '@apollo/client';

import GqlQuery from './GqlQuery';
import PostCard from './PostCard';

const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(postId: $id) {
      id
      body
      username
      createdAt
      commentsCount
      comments {
        id
        body
        username
        createdAt
      }
      likesCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

function ShowPost({ id }) {
  const result = useQuery(GET_POST, { variables: { id } });
  return (
    <GqlQuery result={result}>
      {data => PostDetails(data.getPost)}
    </GqlQuery>
  );
}

function PostDetails(props) {
  return (
    <PostCard {...props} />
  );
}

export default ShowPost;
