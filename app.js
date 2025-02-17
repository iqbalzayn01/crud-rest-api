const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const v1 = '/api/v1';

// Routes
const usersRouter = require('./app/api/v1/users/router');

// Middlewares
const authMiddlewares = require('./app/middlewares/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.send('Welcome to Express');
// });

// App router
app.use(`${v1}/cms`, usersRouter);

// App middlewares
app.use(authMiddlewares);

module.exports = app;
