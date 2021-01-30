import { useState } from 'react';

function useFormMutation({
  useMutation: [mutate, { loading, error }],
  initialValues,
  valuesToVariables
}) {
  const errors = asErrors(error);
  const [values, setValues] = useState(initialValues);
  const handleChange = (e, { name, value }) => {
    setValues({ ...values, [name]: value });
    if (errors) errors[name] = null;
  };
  const handleSubmit = (e) => submit(e, values, mutate, valuesToVariables);
  return {
    loading,
    errors,
    values,
    handleChange,
    handleSubmit
  };
}

function asErrors(error) {
  if (!error) return null;
  if (!error.graphQLErrors[0]) return {};
  return error.graphQLErrors[0].extensions.errors;
}

async function submit(e, values, mutate, valuesToVariables) {
  e.preventDefault();
  try {
    await mutate({
      variables: valuesToVariables(values)
    });
  } catch (e) {
    /* do nothing, this seems a bug in the mutate call as the error
    is available anyway in the error object returned by useMutation */
  }
}

export default useFormMutation;
