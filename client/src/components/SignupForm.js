import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const onCompleted = () => history.push('/');
  const formMutation = useFormMutation({
    useMutation: useMutation(SIGNUP_MUTATION, { onCompleted }),
    formName: 'signup',
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      tc: false
    },
    valuesToVariables,
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
      name='signup'
      onSubmit={handleSubmit}
      loading={loading}
      error={genericErrorMsg ? true : false}>
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
      <Form.Input
        label='Confirm Password'
        placeholder='Confirm Password'
        type='password'
        name='passwordConfirm'
        value={values.passwordConfirm}
        onChange={handleChange}
        error={errors?.passwordConfirm}
      />
      <Form.Input
        label='Email'
        placeholder='Email'
        name='email'
        value={values.email}
        onChange={handleChange}
        error={errors?.email}
      />
      <Form.Checkbox
        className='block'
        label='I agree to the Terms and Conditions'
        name='tc'
        checked={values.tc}
        onChange={handleChange}
        error={errors?.tc}
      />
      <Button type='submit'>Submit</Button>
      <Message
        error
        header='Something went wrong :('
        content={genericErrorMsg}
      />
    </Form>
  );
}

export default SignupForm;
