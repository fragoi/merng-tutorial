import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  user: null,
  signin: user => { },
  signout: () => { }
});

function AuthProvider(props) {
  const [user, setUser] = useState(null);
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

function WhenAuthenticated({ children }) {
  const authContext = useAuthContext();
  return authContext.user ? children(authContext) : null;
}

function WhenNotAuthenticated({ children }) {
  const authContext = useAuthContext();
  return !authContext.user ? children(authContext) : null;
}

export {
  AuthContext,
  AuthProvider,
  useAuthContext,
  WhenAuthenticated,
  WhenNotAuthenticated
};
