import { useState } from 'react';

/**
 * Returns a function to fill the provided object with values from the form.
 * Only keys already existing in the provided object are filled.
 * The function runs only once, and this is indicated by the returned boolean.
 * An example of usage of this function is to call it as first in your change
 * handler function passing the object to hold the values, before setting the
 * current changing value.
 * 
 * @param formName the name of the form
 */
export function useAutofill(formName, defaultValues) {
  const [filled, setFilled] = useState(formName ? false : true);
  return (values = defaultValues) => {
    if (filled) return false;
    formValues(formName, values);
    setFilled(true);
    return true;
  };
}

/**
 * Copies the values from the form to the target object.
 * Only values corresponding to the keys already existing in target object
 * are copied.
 * 
 * @param formName the name of the form
 * @param values the target object
 */
function formValues(formName, values) {
  const form = document.forms[formName];
  Object.keys(values).forEach(k => {
    values[k] = inputValue(form[k]);
  });
}

/**
 * Returns the adapted value from the target input element.
 * 
 * @param target the target input element
 */
export function inputValue({ type, value, checked }) {
  if (type === 'checkbox') {
    if (value) {
      value = checked ? value : undefined;
    } else {
      value = checked;
    }
  }
  return value;
}
