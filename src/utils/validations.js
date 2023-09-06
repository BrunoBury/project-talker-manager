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

  function validateToken(req, res, next) {
    // console.log(req.headers);
    const { authorization } = req.headers;
    console.log(req.headers);
    // const token = authorization.split(' ')[1];
    // console.log(token);
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
  
    if (authorization.length !== 16 || typeof authorization !== 'string') {
      // console.log(authorization.length);
      // console.log(typeof authorization);  
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  }
  
  function validateName(req, res, next) {
    // console.log(req.body);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  }
  
  function validateAge(req, res, next) {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
  
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 18) {
      return res.status(400).json({ 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
  
    next();
  }

  function validateTalk(req, res, next) {
    if (!req.body.talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  }

  function validateWatchAt(req, res, next) {
    // console.log(req.body);
    const { talk } = req.body;
    // console.log(talk);
    const { watchedAt } = talk;
    // console.log(watchedAt);
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }  
  
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
      return res.status(400).json({ 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    next();
  }
  
  const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;
    const validadeDec = !Number.isInteger(rate);
    if (rate === undefined) {
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
      });
    }
  
    if (rate <= 0 || rate > 5 || validadeDec) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
    next();
  };

module.exports = {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateRate,
  validateWatchAt,
  validateTalk,
};
