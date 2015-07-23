var express = require('express'); //fvl views/index.js
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'QUIZ FVL' ,errors:[]});// pag.13 m.8
});
router.param('quizId',quizController.load); // autoload
// defino rutas /quizes
router.get('/quizes', quizController.index); // busqueda pregunta
router.get('/quizes/new',quizController.new); // nueva pregunta pag.4 m.8
router.post('/quizes/create',quizController.create); // nueva pregunta pag.5 m.8
router.get('/quizes/:quizId(\\d+)', quizController.show); //pag.27 m.7
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);//pag.27 m.7
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);//pag.17 m.8
router.put( '/quizes/:quizId(\\d+)', quizController.update);//pag.17 m.8
router.get('/quizes/author',quizController.author);
module.exports = router;
