// GET /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {}; 		// toma errores
    req.session.errors = {};				// borra req.session.errs 
    res.render('sessions/new', {errors: errors});	// a sessions/new.ejs
};

// el primer MW para autorizar accesos a HTTP restringido, da paso o redirige a /login
exports.loginRequired = function(req, res, next){
    if ( req.session.user ) {
        next();
    } else {
        res.redirect('/login');
    }
};
// ahora los MW de abajo, se ejecutan despues de loginRequired
// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {
    var login     = req.body.login;
    var password  = req.body.password;
    var userController = require('./user_controller'); // importa MW
    userController.autenticar(login, password, function(error, user) {
        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [ {"message": 'Se ha producido un error: '+error} ];
            res.redirect("/login");       // redirecciona /login 
            return;
        }
        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username };
        res.redirect( req.session.redir.toString() );// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect( req.session.redir.toString() ); // redirect a path anterior a login
};