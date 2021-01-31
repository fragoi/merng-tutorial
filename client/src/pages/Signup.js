import React from 'react';

import PageTitle from '../components/PageTitle';
import SignupForm from '../components/SignupForm';
import FormContainer from '../components/FormContainer';

function Signup() {
  return (
    <div>
      <PageTitle>Signup</PageTitle>
      <FormContainer size='small'>
        <SignupForm />
      </FormContainer>
    </div>
  );
}

export default Signup;
