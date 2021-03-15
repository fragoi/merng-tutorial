import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Message } from 'semantic-ui-react';

import ErrorMessage from './ErrorMessage';
import useFormMutation from './useFormMutation';
import { useAuthContext } from '../context/auth';

const SIGNIN_MUTATION = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      id
      token
      username
    }
  }
`;

function SigninForm() {
  const authContext = useAuthContext();
  const history = useHistory();
  const onCompleted = data => {
    authContext.signin(data.signin);
    history.push('/');
  };
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
  const { errors } = error;
  return (
    <Form
      name='signin'
      onSubmit={handleSubmit}
      loading={loading}>
      <Form.Input
        label='Username'
        placeholder='Username'
        name='username'
        value={values.username}
        onChange={handleChange}
        error={errors?.username}
      />
      <Form.Input
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={values.password}
        onChange={handleChange}
        error={errors?.password}
      />
      <Button type='submit' color='teal'>Submit</Button>
      {errors?.generic &&
        <Message
          error
          content={errors?.generic}
          visible={errors?.generic ? true : false} />
      }
      {!errors?.generic &&
        <ErrorMessage
          serverError={error.serverError}
          validationError={error.validationError} />
      }
    </Form>
  );
}

export default SigninForm;
