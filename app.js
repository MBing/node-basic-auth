const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morganDebug = require('morgan-debug');
const helmet = require('helmet');
const passport = require('passport');
const debug = require('debug')('myapp:passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const data = require('./data');

const indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const app = express();
passport.use(new BearerStrategy((token, done) => {
  debug(`Passport: ${token}`);

  if (token === 'SECRET') {
    return done(null, {});
  }

  return done(null, false);
}));
// view engine setup
app.locals.data = data;

app.use(helmet());
app.use(morganDebug('myapp:server','dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
