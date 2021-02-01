import React from 'react';

function FormContainer({ size, children }) {
  return (
    <div className={`myui form-container-${size}`}>
      {children}
    </div>
  );
}

export default FormContainer;
