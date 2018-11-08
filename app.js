var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PortalDaMusicaDB');
mongoose.Promise = require('bluebird');

var indexRoute = require('./routes/indexRoute');
var usersRoute = require('./routes/usuarioRoute');
var estudioRoute = require('./routes/estudioRoute');
var salaRoute = require('./routes/salaRoute');
var buscaRoute = require('./routes/buscaRoute');
var servicoRoute = require('./routes/servicoRoute');
var portfolioRoute = require('./routes/portfolioRoute');
var agendaRoute = require('./routes/agendaRoute');
var carteiraRoute = require('./routes/carteiraRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }}))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/', usersRoute);
app.use('/', estudioRoute);
app.use('/', salaRoute);
app.use('/', buscaRoute);
app.use('/', servicoRoute);
app.use('/', portfolioRoute);
app.use('/', agendaRoute);
app.use('/', carteiraRoute);

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
