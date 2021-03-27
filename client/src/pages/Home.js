import React from 'react';

import PageTitle from '../components/PageTitle';
import RecentPosts from '../components/RecentPosts';
import PostForm from '../components/PostForm';
import { WhenAuthenticated } from '../context/auth';

function Home() {
  return (
    <div>
      <WhenAuthenticated>
        <PostForm />
      </WhenAuthenticated>
      <PageTitle>Recent Posts</PageTitle>
      <RecentPosts />
    </div>
  );
}

export default Home;
