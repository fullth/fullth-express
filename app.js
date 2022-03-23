const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session')
const mysqlSessionStore = require("express-mysql-session")(expressSession);
const handlebars = require('express3-handlebars')
const passport = require("passport")
    , LocalStrategy = require("passport-local").Strategy;
const logger = require('morgan');

//const dbconfig = require('./config/database')
const con = require('./database/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/auth/login');

const app = express();

//const sessionStore = new mysqlSessionStore(dbconfig);

// view engine setup
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: false,
  saveUninitialized: false
}));

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// passport 설정
let configPassport = require('./passport/passport');
configPassport(app, passport, con);

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
