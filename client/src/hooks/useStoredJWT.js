import { useState } from 'react';
import jwtdecode from 'jwt-decode';

function useStoredJWT(storage, name) {
  const [state, setState] = useState(() => getItem(storage, name));
  const storeState = state => setState(setItem(storage, name, state));
  return [state, storeState];
}

function getItem(storage, name) {
  const value = storage.getItem(name);
  return value ? jwtdecode(value) : null;
}

function setItem(storage, name, value) {
  if (value) {
    storage.setItem(name, value);
    return jwtdecode(value);
  } else {
    storage.removeItem(name);
    return null;
  }
}

export default useStoredJWT;
