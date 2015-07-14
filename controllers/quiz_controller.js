// GET /quizes/question
exports.question = function(req, res) {
   res.render(    'quizes/question', { pregunta: 'Capital de Portugal' }  );
};

// GET /quizes/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta ==='Lisboa') {
    resultado = 'Correcto';  }
  res.render(    'quizes/answer',  { quiz: req.quiz, respuesta: resultado    }  );
};

