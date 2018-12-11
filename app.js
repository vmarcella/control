// Import npm modules and std lib dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Configure our dotenv
require('dotenv').config();

// Import custom routes from routes folder
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

// Import authentication middleware
const authenticate = require('./lib/authenticate');


// Instantiate express app
const app = express();

// Create the database connection
const dbConnection = require('./data/control-db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Register middleware before any request hits our routes
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authenticate);

// Register custom routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
