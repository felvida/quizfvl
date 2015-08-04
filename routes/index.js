// views/index.js 				desplegado en fvl2015.heroku.com 
var express = require('express'); 
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller'); 
var sessionController = require('../controllers/session_controller');//p.19 m.9

/* GET / home page */
router.get('/', function(req, res) {
	res.render('index', { title: 'QUIZ 19' ,errors:[]});// pag.13 m.8
});
router.param('quizId',quizController.load); // quiz_autoload
router.param('commentId', commentController.load);  // comment_autoload :commentId
// despues de linea router.param();
router.get('/login', sessionController.new); 			// form login quiz 16 m.9
router.post('/login', sessionController.create); 		// crear sesion
router.delete('/logout', sessionController.destroy); 	// destruir sesion 

// defino rutas /login /logout  p.19 m.9
router.get('/login', sessionController.new); // form entrada 
router.post('/login', sessionController.create); // entrada
router.get('/logout', sessionController.destroy); // salir

// defino rutas /quizes accesibles previo paso por loginRequired
router.get('/quizes/new', 		   sessionController.loginRequired, quizController.new); // nueva pregunta 1º
router.post('/quizes/create',       sessionController.loginRequired, quizController.create);// nueva pregunta 2º
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit); // edit pregunta 1
router.put('/quizes/:quizId(\\d+)',    sessionController.loginRequired, quizController.update);// edit pregunta 2
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy); // borro pregunta

// defino rutas /quizes
router.get('/quizes', quizController.index); // busqueda pregunta
router.get('/quizes/:quizId(\\d+)', quizController.show); //pag.27 m.7
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);//pag.27 m.7
router.get('/quizes/author',quizController.author);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new); // nueva comentario pag.7 m.9
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create); // nueva comentario pag.7 m.9
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	                        sessionController.loginRequired, commentController.publish);


module.exports = router;
