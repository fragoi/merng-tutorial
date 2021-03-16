import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../context/auth';

function AuthRoute({ pub, prv, ...rest }) {
  const { user } = useAuthContext();
  if (pub && user) {
    cleanProps(rest);
    return <Route {...rest}><Redirect to='/' /></Route>;
  } else if (prv && !user) {
    cleanProps(rest);
    return <Route {...rest}><Redirect to='/login' /></Route>;
  } else {
    return <Route {...rest} />
  }
}

function cleanProps(props) {
  delete props.component;
  delete props.render;
  delete props.children;
}

export default AuthRoute;
