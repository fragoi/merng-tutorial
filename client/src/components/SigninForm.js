import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Message } from 'semantic-ui-react'

import useFormMutation from './useFormMutation';

const SIGNIN_MUTATION = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      id
      token
    }
  }
`;

function SigninForm() {
  const history = useHistory();
  const onCompleted = () => history.push('/');
  const formMutation = useFormMutation({
    useMutation: useMutation(SIGNIN_MUTATION, { onCompleted }),
    formName: 'signin',
    initialValues: {
      username: '',
      password: ''
    },
    validate
  });
  return FormRenderer(formMutation);
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username must not be empty';
  }
  if (!values.password) {
    errors.password = 'Password must not be empty';
  }
  return errors;
}

function FormRenderer({ loading, error, values, handleChange, handleSubmit }) {
  let genericErrorMsg;
  if (error.serverError) {
    /* server error */
    genericErrorMsg = 'There was a problem processing your request, please try again later';
  } else if (error.validationError) {
    /* validation error */
    genericErrorMsg = 'There was a problem processing your request, please check your data';
  } else {
    /* no errors */
    genericErrorMsg = null;
  }
  const { errors } = error;
  return (
    <Form
      name='signin'
      onSubmit={handleSubmit}
      loading={loading}
      error={genericErrorMsg ? true : false}>
      <Form.Input
        label='Username'
        placeholder='Username'
        name='username'
        value={values.username}
        onChange={handleChange}
        error={errors?.username || error.validationError}
      />
      <Form.Input
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        error={errors?.password || error.validationError}
      />
      <Button type='submit' color='teal'>Submit</Button>
      <Message
        error
        header='Something went wrong :('
        content={genericErrorMsg}
      />
    </Form>
  );
}

export default SigninForm;
