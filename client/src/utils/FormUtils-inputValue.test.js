import { inputValue } from './FormUtils';

test('Text Input Value', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='text' name='myInput' value='myValue' />
    </form>
  `;
  const target = document.forms.myForm.elements.myInput;
  expect(inputValue(target)).toBe('myValue');
});

test('Checkbox Input No Value', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='checkbox' name='myInput' checked='checked' />
    </form>
  `;
  const target = document.forms.myForm.elements.myInput;
  expect(inputValue(target)).toBe('on');
  target.checked = false;
  expect(inputValue(target)).toBeUndefined();
});

test('Checkbox Input Empty Value', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='checkbox' name='myInput' checked='checked' value />
    </form>
  `;
  const target = document.forms.myForm.elements.myInput;
  expect(inputValue(target)).toBe(true);
  target.checked = false;
  expect(inputValue(target)).toBe(false);
});

test('Checkbox Input Non Empty Value', () => {
  document.body.innerHTML = `
    <form name='myForm'>
      <input type='checkbox' name='myInput' checked='checked' value='myValue' />
    </form>
  `;
  const target = document.forms.myForm.elements.myInput;
  expect(inputValue(target)).toBe('myValue');
  target.checked = false;
  expect(inputValue(target)).toBeUndefined();
});
