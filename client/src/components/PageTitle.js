import React from 'react';
import { Header } from 'semantic-ui-react';

function PageTitle({ children }) {
  return (
    <Header as='h3' textAlign='center' color='teal'>
      {children}
    </Header>
  );
}

export default PageTitle;
