import { useState } from 'react';

function useStoredState(storage, name) {
  const [state, setState] = useState(() => getItem(storage, name));
  const storeState = state => {
    setItem(storage, name, state);
    setState(state);
  };
  return [state, storeState];
}

function getItem(storage, name) {
  return JSON.parse(storage.getItem(name));
}

function setItem(storage, name, value) {
  if (value) {
    storage.setItem(name, JSON.stringify(value));
  } else {
    storage.removeItem(name);
  }
}

export default useStoredState;
