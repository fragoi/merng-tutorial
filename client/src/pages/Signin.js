import React from 'react';

import PageTitle from '../components/PageTitle';
import SigninForm from '../components/SigninForm';
import FormContainer from '../components/FormContainer';

function Signin() {
  return (
    <div>
      <PageTitle>Signin</PageTitle>
      <FormContainer size='small'>
        <SigninForm />
      </FormContainer>
    </div>
  );
}

export default Signin;
