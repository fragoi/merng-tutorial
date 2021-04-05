import React, { createContext, useContext } from 'react';

import useStoredJWT from '../hooks/useStoredJWT';

const AuthContext = createContext({
  user: null,
  signin: token => { },
  signout: () => { }
});

function AuthProvider(props) {
  const [user, setToken] = useStoredJWT(localStorage, "token");
  const signin = token => setToken(token);
  const signout = () => setToken(null);
  return (
    <AuthContext.Provider
      value={{ user, signin, signout }}
      {...props}
    />
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

function WhenAuth({ children }) {
  const authContext = useAuthContext();
  return authContext.user ? children : null;
}

function WhenNotAuth({ children }) {
  const authContext = useAuthContext();
  return !authContext.user ? children : null;
}

export {
  AuthProvider,
  useAuthContext,
  WhenAuth,
  WhenNotAuth
};
