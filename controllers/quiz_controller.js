var models = require('../models/models.js'); //fvl
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No hallo quizId=' + quizId));}
		}
	).catch(function(error) { next(error);});
};
// GET /quizes pag.32
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', { quizes: quizes});
	}).catch(function (error){next(error);});
};
// GET /quizes/:id ahora llama show pag.32
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz:req.quiz, errors: []}); // pag. 27 quiz: quiz
	})
};

// GET /quizes/:id/answer pag32
exports.answer = function(req, res) {
 models.Quiz.find(req.params.quizId).then(function(quiz){
  var resultado = 'Incorrecta'; // que no distinga mayusculas
  if ( req.query.respuesta.toLowerCase() ===req.quiz.respuesta.toLowerCase() ) {
    resultado = 'Correcta';  }
  res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado });
  })
};


// GET /quizes/author
exports.author = function(req, res) {
   res.render(    'quizes/author', {  }  );
};