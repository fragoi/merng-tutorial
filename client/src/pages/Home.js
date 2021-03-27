import React from 'react';

import PageTitle from '../components/PageTitle';
import RecentPosts from '../components/RecentPosts';
import PostForm from '../components/PostForm';
import { WhenAuth } from '../context/auth';

function Home() {
  return (
    <div>
      <WhenAuth>
        <PostForm />
      </WhenAuth>
      <PageTitle>Recent Posts</PageTitle>
      <RecentPosts />
    </div>
  );
}

export default Home;
