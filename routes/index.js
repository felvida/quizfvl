// views/index.js 				desplegado en fvl2015.heroku.com 
var express = require('express'); 
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller'); 
var sessionController = require('../controllers/session_controller');//p.19 m.9

/* GET / home page */
router.get('/', function(req, res) {
	res.render('index', { title: 'QUIZ 15' ,errors:[]});// pag.13 m.8
});
router.param('quizId',quizController.load); // autoload

// defino rutas /login /logout  p.19 m.9
router.get('/login', sessionController.new); // form entrada 
router.post('/login', sessionController.create); // entrada
router.get('/logout', sessionController.destroy); // salir

// defino rutas /quizes
router.get('/quizes', quizController.index); // busqueda pregunta
router.get('/quizes/new',quizController.new); // nueva pregunta pag.4 m.8
router.post('/quizes/create',quizController.create); // nueva pregunta pag.5 m.8
router.get('/quizes/:quizId(\\d+)', quizController.show); //pag.27 m.7
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);//pag.27 m.7
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);//pag.17 m.8
router.put( '/quizes/:quizId(\\d+)', quizController.update);//pag.17 m.8
router.get('/quizes/author',quizController.author);
router.delete('/quizes/:quizId(\\d+)',quizController.destroy); //pag.24 m.8

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new); // nueva comentario pag.7 m.9
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create); // nueva comentario pag.7 m.9

module.exports = router;
