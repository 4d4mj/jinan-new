// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
