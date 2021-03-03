import React from 'react';
import { Message } from 'semantic-ui-react';

function ErrorMessage({ serverError, validationError }) {
  let content;
  if (serverError) {
    /* server error */
    content = 'There was a problem processing your request, please try again later';
  } else if (validationError) {
    /* validation error */
    content = 'There was a problem processing your request, please check your data';
  } else {
    /* no errors */
    content = null;
  }
  return (
    <Message
      error
      header='Something went wrong :('
      content={content}
      visible={content ? true : false}
    />
  );
}

export default ErrorMessage;
