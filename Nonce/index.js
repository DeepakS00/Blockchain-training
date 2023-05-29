require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nonce = require('./src/routes/nonce');

const port = process.env.PORT || 1998;
const app = express();

app.use(express.json());
app.use('/nonce', nonce);
app.use(
  cors({
    origin: '*',
  })
);

app.listen(port, 'localhost', () => {
  console.log(`The server is now running at http://localhost:${port}/`);
});
