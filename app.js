const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morganDebug = require('morgan-debug');
const helmet = require('helmet');
const passport = require('passport');
const debug = require('debug')('myapp:passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcrypt');
const data = require('./data');

const indexRouter = require('./routes/index');

const app = express();

passport.use(new BasicStrategy(async (username, password, done) => {
  const {db} = app.locals;
  try {
    const user = await db.collection('librarian').findOne({username});
    if (!user) return done(null, false);
    const match = await bcrypt.compare(password, user.hash);
    if (!match) return done(null, false);

    return done(null, user);
  } catch (e) {
    return done(e);
  }
}));

// view engine setup
app.locals.data = data;

app.use(helmet());
app.use(morganDebug('myapp:server','dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

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
