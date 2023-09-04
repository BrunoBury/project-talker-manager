const express = require('express');
const fs = require('fs');
const path = require('path');
const tokenGenerator = require('./utils/tokenGenerator');
const { validateLogin } = require('./utils/validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
const PORT = process.env.PORT || '3001';

const TALKER_FILE = path.join(__dirname, 'talker.json');

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Req 1;

app.get('/talker', (_request, response) => {
  const talkersJson = fs.readFile(TALKER_FILE, 'utf8');
  const talkersData = JSON.parse(talkersJson);
  
  if (talkersData) {
    response.status(HTTP_OK_STATUS).json(talkersData);
  } else {
    response.status(HTTP_OK_STATUS).json([]);
  }
});

// Req 2;

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkersJson = fs.readFile(TALKER_FILE, 'utf8');
  const talkersData = JSON.parse(talkersJson);

  const foundTalker = talkersData.find((talker) => talker.id === Number(id));

  if (foundTalker) {
    res.status(HTTP_OK_STATUS).json(foundTalker);
  } else {
    res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

// Req 3, 4;

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const validationErrors = validateLogin(email, password);

  if (validationErrors && validationErrors.length > 0) {
    const errorMessages = validationErrors.map((error) => error.message);
    const msgError = errorMessages[0];
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: msgError });
  }
  
const token = tokenGenerator(16);
return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});