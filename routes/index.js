var express = require('express'); //fvl views/index.js
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'QUIZ FVL' });
});
//router.get('/quizes/question',quizController.question);
//router.get('/quizes/answer',quizController.answer); 
router.get('/quizes', quizController.index); // pag. 26 y 28
router.get('/quizes/:quizId(\\d+)', quizController.show); //pag.27
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);//pag.27
router.get('/quizes/author',quizController.author);
module.exports = router;
