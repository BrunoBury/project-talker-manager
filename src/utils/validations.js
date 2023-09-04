function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      return { status: 400, message: 'O campo "email" é obrigatório' };
    } if (!emailRegex.test(email)) {
      return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
    }
    return null; 
  }
  
  function validatePassword(password) {
    if (!password) {
      return { status: 400, message: 'O campo "password" é obrigatório' };
    } if (password.length < 6) {
      return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
    }
    return null;
  }
  
  function validateLogin(email, password) {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
  
    if (emailError || passwordError) {
      return [emailError, passwordError].filter((error) => error !== null);
    }
  
    return null;
  }
  
  module.exports = {
    validateLogin,
  };
