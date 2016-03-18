var dotenv = require('dotenv').config();
var express = require('express');
var expressSanitizer = require('express-sanitizer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var updateOrders = require('./lib/updateOrderStatus');

// define routes
var routes = require('./routes/index');
var order = require('./routes/order');
var track = require('./routes/track');
var cancel = require('./routes/cancel');
var login = require('./routes/login');
var logout = require('./routes/logout');
var admin = require('./routes/admin');
var ship = require('./routes/ship');

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

// protect admin routes
app.use(jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: function fromCookie(req) {
    if(req.cookies && req.cookies.admin) {
      return req.cookies.admin;
    }
    return null;
  }
}).unless({path: ['/', '/order', '/track', '/cancel']}));

// initialize routes
app.use('/', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/order', order);
app.use('/track', track);
app.use('/cancel', cancel);
app.use('/admin', admin);
app.use('/ship', ship);

//check for new payments every minute and update status
var updateOrderStatus = setInterval(updateOrders, 60000);

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
