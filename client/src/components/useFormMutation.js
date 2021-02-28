import { useState } from 'react';

import { pipe } from '../utils/FUtils';
import { inputValue, useAutofill } from '../utils/FormUtils';

function useFormMutation({
  useMutation: [mutate, { loading }],
  initialValues,
  valuesToVariables = values => values,
  validate = values => null,
  formName
}) {
  /* states for error and values */
  const [error, setError] = useState({});
  const [values, setValues] = useState(initialValues);

  /* this is to deal with autofill */
  const autofill = useAutofill(formName);

  /* functions to handle errors from server and validation */
  const handleServerError = pipe(serverError, setError);
  const handleValidationError = pipe(validationError, setError);

  /* calls mutation on server and handles errors */
  const handleMutate = variables => mutate({ variables })
    .catch(handleServerError);

  /* transforms values to variables for mutation and calls it */
  const submit = pipe(valuesToVariables, handleMutate);

  /* validates and submits if no errors */
  const validateAndSubmit = values => {
    const errors = validate(values);
    if (errors && Object.entries(errors).length !== 0) {
      handleValidationError(errors);
    } else {
      submit(values);
    }
  };

  /* handles values changes */
  const handleChange = (event, target) => {
    autofill(values);
    const { name } = target;
    const value = inputValue(target);
    setValues({ ...values, [name]: value });
    removeValidationError(error, name);
  };

  /* handles submit */
  const handleSubmit = event => {
    event.preventDefault();
    autofill(values);
    validateAndSubmit(values);
  };

  return {
    loading,
    error,
    values,
    handleChange,
    handleSubmit
  };
}

/**
 * Converts the error to an error object,
 * either a 'serverError' or a 'validationError'.
 * 
 * @param error the error to convert
 */
function serverError(error) {
  if (!error.graphQLErrors[0]) {
    return { serverError: true };
  }
  return validationError(
    error.graphQLErrors[0].extensions.errors
  );
}

/**
 * Creates a validation error from the given errors object,
 * which is expected to contain keys corresponding to the
 * form fields and errors as values.
 * 
 * @param errors the object mapping fields with errors
 */
function validationError(errors) {
  return { validationError: true, errors };
}

/**
 * Removes a key from the error.errors object.
 * 
 * @param error the error object
 * @param name the key to remove
 */
function removeValidationError(error, name) {
  if (error && error.errors && error.errors[name]) {
    delete error.errors[name];
  }
}

export default useFormMutation;
