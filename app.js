var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); // favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials= require( 'express-partials'); // pag.40

var routes = require('./routes/index');
// var users = require('./routes/users'); // segun pag.24 m.7

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use( partials() ); // segun pag.40 m.7

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico')); // segun pag. 27 m.7
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); // pag. 6 m.8 ,borra { extended: false }, para pasar campos en body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);// segun pag.24 m.7
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Página desconocida');
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
            error: err
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
