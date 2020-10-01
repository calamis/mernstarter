const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Load dotenv
require('dotenv').config();

// Load DB Connection
connectDB()

// Load Middleware
const middlewares = require('./middlewares');
const api = require('./api');
const Users = require('./api/user');

// Init Express
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

// Load API Endpoint
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
