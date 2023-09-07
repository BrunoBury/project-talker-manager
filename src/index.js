const express = require('express');
const fs = require('fs');
const path = require('path');
const tokenGenerator = require('./utils/tokenGenerator');
const { 
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchAt,
  validateRate,
 } = require('./utils/validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_CREATED_STATUS = 201;
const PORT = process.env.PORT || '3001';

const TALKER_FILE = path.join(__dirname, 'talker.json');

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const read = () => {
  const filePath = path.join(__dirname, 'talker.json');
  const file = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(file);

  return parsed;
};

const write = (talkers) => {
  const filePath = path.join(__dirname, 'talker.json');
  fs.writeFileSync(filePath, JSON.stringify(talkers), 'utf8');
};

// Req 1;

app.get('/talker', (_request, response) => {
  const talkersJson = fs.readFileSync(TALKER_FILE, 'utf8');
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
  const talkersJson = fs.readFileSync(TALKER_FILE, 'utf8');
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

// Req 5;

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchAt,
  async (req, res) => {
    // console.log(req.body);
  const talkers = await read();
  const id = talkers.length + 1;
  const { name, age, talk } = req.body;
  const newTalker = [...talkers, { id, name, age, talk }];
  write(newTalker);

  res.status(HTTP_CREATED_STATUS).json({ id, name, age, talk });
});

// Req 6;
app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchAt,
  (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = read();
    const editTalker = talkers.findIndex((talker) => talker.id === Number(id));
    if (editTalker === -1) {
      res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    } else {
      talkers[editTalker] = { ...talkers[editTalker], name, age, talk };
      write(talkers);
      res.status(HTTP_OK_STATUS).json(talkers[editTalker]);
    }
  });

// Req 7;

app.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkers = read();
  const deleteTalker = talkers.findIndex((talker) => talker.id === Number(id));
  // if (deleteTalker === -1) {
  //   res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  // } else {
    talkers.splice(deleteTalker, 1);
    write(talkers);
    res.status(204).send();
  // }
});

app.listen(PORT, () => {
  console.log('Online');
});