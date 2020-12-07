const express = require('express');
const logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');
const linksRouter = require('./routes/links');
//const linksController = require('./controllers/links');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/links', linksRouter);

module.exports = app;
