import React from 'react';
import { Message } from 'semantic-ui-react';

function ErrorMessage({ message, serverError, validationError }) {
  let header;
  let content;
  if (message) {
    content = message;
  } else if (serverError) {
    /* server error */
    header = 'Something went wrong :(';
    content = 'There was a problem processing your request, please try again later';
  } else if (validationError) {
    /* validation error */
    header = 'Something went wrong :(';
    content = 'There was a problem processing your request, please check your data';
  }
  return (
    <Message
      error
      header={header}
      content={content}
      visible={content ? true : false}
    />
  );
}

export default ErrorMessage;
