
var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res) {
 models.Quiz.findAll().success(function(quiz){
  res.render('quizes/question',{ pregunta: quiz[0].pregunta } );	
 })	  
};

// GET /quizes/answer
exports.answer = function(req, res) {
 models.Quiz.findAll().success(function(quiz){
  var resultado = 'Incorrecta';
  if (req.query.respuesta ===quiz[0].respuesta) {
    resultado = 'Correcta';  }
  res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado });
  })
};

// GET /quizes/author
exports.author = function(req, res) {
   res.render(    'quizes/author', { pregunta: 'Capital de Portugal' }  );
};