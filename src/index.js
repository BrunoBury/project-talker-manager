const express = require('express');
const fs = require('fs');
const path = require('path');
const tokenGenerator = require('./utils/tokenGenerator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
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

// Req 3;

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
const token = tokenGenerator(16);
return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});