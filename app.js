var dotenv = require('dotenv').config();
var express = require('express');
var expressSanitizer = require('express-sanitizer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

// define routes
var routes = require('./routes/index');
var order = require('./routes/order');
var admin = require('./routes/login');
var orders = require('./routes/admin/orders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize public routes
app.use('/', routes);
app.use('/admin', admin);
app.use('/order', order);

// setup admin authentication
app.use('/admin/*', jwt({
  secret: process.env.JWT_SECRET,
  getToken: function fromCookie (req) {
    if(req.cookies.admin){
      return req.cookies.admin;
    }
    return null;
  }
}), function(err, req, res, next){
  if(err.status === 401){
    res.redirect('/admin')
  }
});
// initialize admin routes
app.use('/admin/orders', orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
