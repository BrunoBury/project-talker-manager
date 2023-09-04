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

  function validateToken(token) {
    if (!token) {
      return { status: 401, message: 'Token não encontrado' };
    }
  
    if (token.length !== 16 || typeof token !== 'string') {
      return { status: 401, message: 'Token inválido' };
    }
  
    return null;
  }
  
  function validateName(name) {
    if (!name || name.trim().length < 3) {
      return { status: 400, message: 'O campo "name" é obrigatório' };
    }
  
    return null;
  }
  
  function validateAge(age) {
    if (!age) {
      return { status: 400, message: 'O campo "age" é obrigatório' };
    }
  
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
      return { status: 400, 
        message: 'O campo "age" deve ser um númerointeiro igual ou maior que 18' };
    }
  
    return null;
  }

  function validateWatchedAt(watchedAt) {
    if (!watchedAt) {
      return { status: 400, message: 'O campo "watchedAt" é obrigatório' };
    }
  
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
      return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
    }
  
    return null;
  }
  
  const validateRate = (req, res, next) => {
    const { rate } = req.body.talk;
  
    if (!rate && rate !== 0) {
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
      });
    }
  
    if (rate <= 0 || rate > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
  
    next();
  };
  
  function validateTalk(talk) {
    if (!talk) {
      return { status: 400, message: 'O campo "talk" é obrigatório' };
    }
  
    const { watchedAt, rate } = talk;
  
    const watchedAtError = validateWatchedAt(watchedAt);
    if (watchedAtError) {
      return watchedAtError;
    }
  
    const rateError = validateRate(rate);
    if (rateError) {
      return rateError;
    }
  
    return null;
  }
  
  module.exports = {
    validateLogin,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    validateWatchedAt,
  };
