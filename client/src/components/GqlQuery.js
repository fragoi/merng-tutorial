import React from 'react';

import Loader from './Loader';
import ServerError from './ServerError';

function GqlQuery({ result: { loading, error, data }, children }) {
  if (loading) return <Loader />;
  if (error) return <ServerError />;
  if (children) return children(data);
  return null;
}

export default GqlQuery;
