var models = require('../models/models.js'); //fvl

// GET /quizes pag.28 2a
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes});
	})
};
// GET /quizes/:id ahora llama show pag.27 paso 1a
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz, errors: []}); // pag. 27 quiz: quiz
	})
};

// GET /quizes/:id/answer pag.27 paso 1a
exports.answer = function(req, res) {
 models.Quiz.find(req.params.quizId).then(function(quiz){
  var resultado = 'Incorrecta'; // que no distinga mayusculas
  if ( req.query.respuesta.toLowerCase() ===quiz.respuesta.toLowerCase() ) {
    resultado = 'Correcta';  }
  res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado });
  })
};


// GET /quizes/author
exports.author = function(req, res) {
   res.render(    'quizes/author', {  }  );
};