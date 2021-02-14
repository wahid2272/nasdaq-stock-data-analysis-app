const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const routes = require('./src/routes');

const app = express();

//NOTE: 1st logger for request, 2nd one for after response is returned
app.use(logger('[:date[iso]] :method :url', {immediate: true}));
app.use(logger('[:date[iso]] :method :url :status :response-time ms'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


module.exports = app;
