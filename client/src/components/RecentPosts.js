import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import GqlQuery from './GqlQuery';
import PostCard from './PostCard';

const GET_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      commentsCount
      likesCount
    }
  }
`;

function RecentPosts() {
  const result = useQuery(GET_POSTS_QUERY);
  return (
    <GqlQuery result={result}>
      {data => PostCards({ posts: data.getPosts })}
    </GqlQuery>
  );
}

function PostCards({ posts }) {
  posts = posts.map(p => PostCard(p));
  return (
    <Grid columns='3' stackable>
      <Grid.Row>
        <Grid.Column>{posts[0]}</Grid.Column>
        <Grid.Column>{posts[1]}</Grid.Column>
        <Grid.Column>{posts[2]}</Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{posts[3]}</Grid.Column>
        <Grid.Column>{posts[4]}</Grid.Column>
        <Grid.Column>{posts[5]}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default RecentPosts;
export { GET_POSTS_QUERY };
