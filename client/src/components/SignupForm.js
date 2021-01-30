import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Message } from 'semantic-ui-react'

import useFormMutation from './useFormMutation';

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      id
      token
    }
  }
`;

function SignupForm() {
  const formMutation = useFormMutation({
    useMutation: useMutation(SIGNUP_MUTATION),
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: ''
    },
    valuesToVariables: (values) => ({ input: values })
  });
  return FormRenderer(formMutation);
}

function FormRenderer({ loading, errors, values, handleChange, handleSubmit }) {
  let genericErrorMsg;
  if (!errors) {
    /* no errors */
    genericErrorMsg = null;
  } else if (Object.entries(errors).length !== 0) {
    /* validation errors */
    genericErrorMsg = 'There was a problem processing your request, please check your data';
  } else {
    /* server error */
    genericErrorMsg = 'There was a problem processing your request, please try again later';
  }
  return (
    <Form onSubmit={handleSubmit} loading={loading}>
      <Form.Input
        className='form-field'
        label='Username'
        placeholder='Username'
        name='username'
        value={values.username}
        onChange={handleChange}
        error={errors?.username && {
          content: errors.username,
          pointing: 'left'
        }}
      />
      <Form.Input
        className='form-field'
        type='password'
        label='Password'
        placeholder='Password'
        name='password'
        value={values.password}
        onChange={handleChange}
        error={errors?.password && {
          content: errors.password,
          pointing: 'left'
        }}
      />
      <Form.Input
        className='form-field'
        type='password'
        label='Confirm Password'
        placeholder='Confirm Password'
        name='passwordConfirm'
        value={values.passwordConfirm}
        onChange={handleChange}
        error={errors?.passwordConfirm && {
          content: errors.passwordConfirm,
          pointing: 'left'
        }}
      />
      <Form.Input
        className='form-field'
        label='Email'
        placeholder='Email'
        name='email'
        value={values.email}
        onChange={handleChange}
        error={errors?.email && {
          content: errors.email,
          pointing: 'left'
        }}
      />
      <Form.Checkbox label='I agree to the Terms and Conditions' />
      <Button type='submit'>Submit</Button>
      <Message
        error
        visible={genericErrorMsg ? true : false}
        header='Something went wrong :('
        content={genericErrorMsg}
      />
    </Form>
  );
}

export default SignupForm;
