// GET /quizes/question
exports.question = function(req, res) {
   res.render(    'quizes/question', { pregunta: 'Capital de Portugal' }  );
};

// GET /quizes/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecta';
  if (req.query.respuesta ==='Lisboa') {
    resultado = 'Correcta';  }
  res.render(    'quizes/answer',  { quiz: req.quiz, respuesta: resultado    }  );
};

// GET /quizes/author
exports.author = function(req, res) {
   res.render(    'quizes/author', { pregunta: 'Capital de Portugal' }  );
};