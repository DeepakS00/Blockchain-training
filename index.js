require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./src/utils/database');
const user = require('./src/routes/user');

const app = express();
const port = process.env.PORT || 1998;

db.sync({
  alter: true,
})
  .then(() => console.log('DB created'))
  .catch((err) => console.log('Error: ', err));

app.use(express.json());
app.use('/user', user);
app.use(
  cors({
    origin: '*',
  })
);

app.listen(port, 'localhost', () => {
  console.log(`The server is now running at http://localhost:${port}/`);
});
