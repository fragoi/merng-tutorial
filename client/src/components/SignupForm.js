import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import ErrorMessage from './ErrorMessage';
import useFormMutation from '../hooks/useFormMutation';
import { useAuthContext } from '../context/auth';

const SIGNUP_MUTATION = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      id
      token
      username
    }
  }
`;

function SignupForm() {
  const authContext = useAuthContext();
  const history = useHistory();
  const onCompleted = data => {
    authContext.signin(data.signup);
    history.push('/');
  };
  const formMutation = useFormMutation({
    useMutation: useMutation(SIGNUP_MUTATION, { onCompleted }),
    valuesToVariables,
    formName: 'signup',
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      tc: false
    },
    validate
  });
  return FormRenderer(formMutation);
}

function valuesToVariables(values) {
  const input = { ...values };
  delete input.tc;
  return { input };
}

function validate(values) {
  const errors = {};
  if (!values.tc) {
    errors.tc = 'You must agree in order to proceed';
  }
  return errors;
}

function FormRenderer({
  loading,
  serverError,
  valid,
  errors,
  values,
  handleChange,
  handleSubmit
}) {
  return (
    <Form
      name='signup'
      onSubmit={handleSubmit}
      loading={loading}>
      <Form.Input
        label='Username'
        placeholder='Username'
        name='username'
        value={values.username}
        onChange={handleChange}
        error={errors.username}
      />
      <Form.Input
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Form.Input
        label='Confirm Password'
        placeholder='Confirm Password'
        type='password'
        name='passwordConfirm'
        value={values.passwordConfirm}
        onChange={handleChange}
        error={errors.passwordConfirm}
      />
      <Form.Input
        label='Email'
        placeholder='Email'
        name='email'
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Form.Checkbox
        className='block'
        label='I agree to the Terms and Conditions'
        name='tc'
        checked={values.tc}
        onChange={handleChange}
        error={errors.tc}
      />
      <Button type='submit' color='teal'>Submit</Button>
      <ErrorMessage
        serverError={serverError}
        validationError={!valid} />
    </Form>
  );
}

export default SignupForm;
