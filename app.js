console.log("app.js>");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); // favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session= require('express-session'); 	// 	importa MW instalado antes con npm Quiz16 m.9

var partials= require( 'express-partials'); // pag.40
var methodOverride = require('method-override'); //pag.18 m.8
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
app.use( bodyParser.urlencoded()); // pag. 6 m.8 ,borra { extended: false }, para pasar campos en body
app.use(cookieParser('fvl 2015')); 		//	semilla para encriptar
app.use(session() );  				//  	instala MW
app.use(methodOverride('_method')); // pag.18 m.8 nombre para encapsulado
app.use(express.static(path.join(__dirname, 'public')));

// New MW autologout
app.use(function(req, res, next) {
    if(req.session.user){									// si estamos en una sesion
        if(!req.session.mtiempo){							//primera vez se crea la var mtiempo
			req.session.mtiempo=(new Date()).getTime(); }    // ya existe la var. con t. del ultimo click del usuario
        if( (new Date()).getTime()-req.session.mtiempo > 120000){ //pasaron 120000ms(=2minutos)?
				req.session.mtiempo =null; 	 	// 	que SI> reset de mtiempo para cuando loguee la proxima vez
                delete req.session.user;     	// 		y eliminamos el usuario, var.usada para usuario logueado
            }else{								//	que NO> se actualiza mtiempo
                req.session.mtiempo=(new Date()).getTime();
            }
    }
    next();
});
// Helpers dinamicos:
app.use( function( req ,res ,next) {  // Quiz 16 m.9
	 if ( !req.path.match(/\/login|\/logout/)) { // si ruta /login o /logout 
	   req.session.redir = req.path;	// paso 1.c redirigir a form /login o /logout
	 } //if
	 res.locals.session= req.session; // paso 1.b pasa parametro session
	 next();
}); //app.use

app.use('/', routes);// segun pag.24 m.7
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Página desconocida');
    err.status = 404;
    next(err);
});

// error handlers

// 		development error handler> will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
			errors:[] // para mostrar errores p.13 m.8
        });
    });
}
// 		production error handler> no stacktraces to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
