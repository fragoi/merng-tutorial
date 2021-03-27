import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import ErrorMessage from './ErrorMessage';
import useFormMutation from '../hooks/useFormMutation';

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
    }
  }
`;

function PostForm() {
  const history = useHistory();
  const onCompleted = data => {
    history.push(`/posts/${data.createPost.id}`);
  };
  const formMutation = useFormMutation({
    useMutation: useMutation(CREATE_POST_MUTATION, { onCompleted }),
    formName: 'createPost',
    initialValues: {
      body: ''
    },
    validate
  });
  return FormRenderer(formMutation);
}

function validate(values) {
  const errors = {};
  if (!values.body) {
    errors.body = 'Please write something';
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
      name='createPost'
      onSubmit={handleSubmit}
      loading={loading}>
      <Form.TextArea
        placeholder='Write something here...'
        name='body'
        value={values.body}
        onChange={handleChange}
        error={errors.body}
      />
      <Button type='submit' color='teal'>Submit</Button>
      <ErrorMessage
        serverError={serverError}
        validationError={!valid} />
    </Form>
  );
}

export default PostForm;
