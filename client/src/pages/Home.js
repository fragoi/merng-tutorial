import React from 'react';

import PageTitle from '../components/PageTitle';
import RecentPosts from '../components/RecentPosts';

function Home() {
  return (
    <div>
      <PageTitle>Recent Posts</PageTitle>
      <RecentPosts />
    </div>
  );
}

export default Home;
