import React, { createContext, useContext } from 'react';

import useStoredState from '../hooks/useStoredState';

const AuthContext = createContext({
  user: null,
  signin: user => { },
  signout: () => { }
});

function AuthProvider(props) {
  const [user, setUser] = useStoredState(localStorage, "user");
  const signin = user => setUser(user);
  const signout = () => setUser(null);
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
