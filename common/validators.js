function validateSignupInput(username, email, password, confirmPassword) {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else if (!email.match('\\w+@\\w+\\.\\w{2,}')) {
    errors.email = 'Email must be a valid email address';
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  } else if (password != confirmPassword) {
    errors.confirmPassword = 'Confirm password must match password';
  }
  return {
    errors,
    valid: Object.keys(errors).length == 0
  };
}

function validateSigninInput(username, password) {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length == 0
  };
}

module.exports = {
  validateSignupInput,
  validateSigninInput
}
