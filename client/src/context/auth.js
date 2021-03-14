import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext({
  user: null,
  signin: data => { },
  signout: () => { }
});

function authReducer(state, action) {
  switch (action.type) {
    case 'SIGNIN': return { ...state, user: action.payload };
    case 'SIGNOUT': return { ...state, user: null };
    default: return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const signin = data => dispatch({ type: 'SIGNIN', payload: data });
  const signout = () => dispatch({ type: 'SIGNOUT' });
  return (
    <AuthContext.Provider
      value={{ user: state.user, signin, signout }}
      {...props}
    />
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuthContext };
