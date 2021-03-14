import React, { createContext, useState } from 'react';

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

export { AuthContext, AuthProvider }; 
