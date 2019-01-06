const session = require('express-session');  
const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash'); //passes things to next requests
const expressValidator = require('express-validator');
const createError = require('http-errors');
const logger = require('morgan');
const helpers = require('./helpers');
require('./handlers/passport');

const indexRouter = require('./routes/index');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//serves files from public folder directly
app.use(express.static(path.join(__dirname, 'public')));

//WTF is is?  It was here from the express-generator
app.use(logger('dev'));

// Uses body-parser to parse json data from streams
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// a bunch of stuff for validating user input
app.use(expressValidator());

// deals with cookies passed in the requests
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Initialize Passport js and use sessions
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// A middleware that passes eveything along as a local for all requests 
app.use((req, res, next) => {
  res.locals.h = helpers; //allows helpers to be used
  res.locals.user = req.user || null; // passes use to locals for pug and other things
  res.locals.flashes = req.flash(); // sets flash messages from connect-flash to locals
  res.locals.currentPath = req.path; // sets up using paths
  res.locals.moment = require('moment'); //allows use of moment in pug
  next();
})

// Use indexRouter (./routes/index.js) for all the routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
