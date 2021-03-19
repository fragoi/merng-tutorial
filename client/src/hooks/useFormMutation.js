import { useState } from 'react';

import useForm from './useForm';

function useFormMutation({
  useMutation: [mutate, { loading }],
  valuesToVariables = values => values,
  ...formArgs
}) {
  const [serverError, setServerError] = useState(false);

  const onSubmit = (values, setErrors) => {
    const variables = valuesToVariables(values);
    const handleError = errorHandler(setErrors, setServerError);
    mutate({ variables }).catch(handleError);
  };

  const form = useForm({ ...formArgs, onSubmit });

  return {
    loading,
    serverError: form.valid && serverError,
    ...form
  };
}

function errorHandler(setErrors, setServerError) {
  return error => {
    const errors = error.graphQLErrors[0]?.extensions?.errors;
    if (errors) {
      setErrors(errors);
      setServerError(false);
    } else {
      setErrors({});
      setServerError(true);
    }
  };
}

export default useFormMutation;
