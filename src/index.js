const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const TALKER_FILE = path.join(__dirname, 'talker.json');

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

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

app.listen(PORT, () => {
  console.log('Online');
});
