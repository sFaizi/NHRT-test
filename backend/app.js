const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    'Please use your own mongoDB connection string'
  )
  .then(() => console.log('DB Active'));

// ROUTES

app.use('/api', formRoutes);

app.listen(5000, () => {
  console.log('server on 5000');
});
