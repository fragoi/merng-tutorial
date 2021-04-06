import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import ShowPost from '../components/ShowPost';

function Post() {
  const { id } = useParams();
  return (
    <div>
      <PageTitle>Post</PageTitle>
      <ShowPost id={id} />
    </div>
  );
}

export default Post;
