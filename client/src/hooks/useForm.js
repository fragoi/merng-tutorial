import { useState } from 'react';

import { inputValue, useAutofill } from '../utils/FormUtils';

function useForm({
  formName,
  initialValues = {},
  validate = values => null,
  onSubmit = (values, setErrors) => { }
}) {
  /* states for errors and values */
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  /* this is to deal with autofill */
  const autofill = useAutofill(formName, values);

  /* validates and submits if no errors */
  const validateAndSubmit = values => {
    const errors = validate(values);
    if (errors && !isValid(errors)) {
      setErrors(errors);
    } else {
      onSubmit(values, setErrors);
    }
  };

  /* handles values changes */
  const handleChange = (event, target) => {
    autofill();
    const { name } = target;
    const value = inputValue(target);
    setValues({ ...values, [name]: value });
    setErrors(deleteField(errors, name));
  };

  /* handles submit */
  const handleSubmit = event => {
    event.preventDefault();
    autofill();
    validateAndSubmit(values);
  };

  return {
    valid: isValid(errors),
    errors,
    values,
    handleChange,
    handleSubmit
  };
}

/**
 * Returns if the errors object is empty.
 * 
 * @param errors the errors object
 * @returns if the errors object is empty
 */
function isValid(errors) {
  return Object.entries(errors).length === 0;
}

/**
 * Returns a copy of the object without the field corresponding to the name.
 * 
 * @param obj the object to copy
 * @param name the name of the field to delete
 * @returns a copy of the object with the field deleted
 */
function deleteField(obj, name) {
  const copy = { ...obj };
  delete copy[name];
  return copy;
}

export default useForm;
