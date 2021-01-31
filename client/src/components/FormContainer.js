import React from 'react';

function FormContainer({ size, children }) {
  return (
    <div class={`myui form-container-${size}`}>
      {children}
    </div>
  );
}

export default FormContainer;
