import { renderHook, act } from '@testing-library/react-hooks';

import { useAutofill } from './FormUtils';

test('Autofill', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='text' name='myInput' value='myValue' />
    </form>
  `;
  const values = {
    myInput: ''
  };
  const { result: hook } = renderHook(
    () => useAutofill('myForm', values)
  );
  expect(hook.current).toBeInstanceOf(Function);
  const autofill = () => hook.current();
  act(() => {
    const res = autofill();
    expect(res).toBe(true);
  });
  expect(values.myInput).toBe('myValue');
  values.myInput = 'anotherValue';
  act(() => {
    const res = autofill();
    expect(res).toBe(false);
  });
  expect(values.myInput).toBe('anotherValue');
});

test('Autofill 2', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='text' name='myInput' value='myValue' />
    </form>
  `;
  const values = {
    myInput: ''
  };
  const { result: hook } = renderHook(
    () => useAutofill('myForm')
  );
  expect(hook.current).toBeInstanceOf(Function);
  const autofill = values => hook.current(values);
  act(() => {
    const res = autofill(values);
    expect(res).toBe(true);
  });
  expect(values.myInput).toBe('myValue');
  values.myInput = 'anotherValue';
  act(() => {
    const res = autofill(values);
    expect(res).toBe(false);
  });
  expect(values.myInput).toBe('anotherValue');
});

test('Autofill Disabled', () => {
  const { result: hook } = renderHook(
    () => useAutofill()
  );
  expect(hook.current).toBeInstanceOf(Function);
  const autofill = () => hook.current();
  act(() => {
    const res = autofill();
    expect(res).toBe(false);
  });
});
