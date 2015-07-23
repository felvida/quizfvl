console.log("quiz_controller.js>");
var models = require('../models/models.js'); // se construye en fvl2015.heroku.com

// GET /quizes/new pag.4 m.8
exports.new = function(req,res){ 
	var quiz= models.Quiz.build( { pregunta:"APreguntar",respuesta:"Respuesta"}); 
	console.log("new>"+quiz.pregunta);
	res.render( 'quizes/new',{quiz:quiz, errors: []}  ); 
};
// GET /quizes/:id/edit
 exports.edit = function(req,res){ 
	var quiz= req.quiz; // autoload instancia quiz
	console.log("edit>"+quiz.pregunta);
	res.render( 'quizes/edit',{quiz:quiz, errors: []}  ); 
};
// POST  /quizes/create
exports.create = function(req, res){
var quiz = models.Quiz.build( req.body.quiz );
console.log("create>"+quiz.pregunta+":"+quiz.respuesta);// decia undefined!! por override mal
var errors = quiz.validate(); //ya que el objeto errors no tiene then(
if (errors)
 {   console.log("Valida err>"); 
	var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
	for (var prop in errors) errores[i++]={message: errors[prop]};
	res.render('quizes/new', {quiz: quiz, errors: errores});
 } else { console.log("Valida ok>");
	quiz // save: guarda en DB campos pregunta y respuesta 
	.save({fields: ["pregunta", "respuesta"]})
	.then( function(){ res.redirect('/quizes')}) ;
 }
};
// PUT /quizes/ID:
exports.update = function(req, res){
req.quiz.pregunta =  req.body.quiz.pregunta;
req.quiz.respuesta =  req.body.quiz.respuesta;
console.log("update>"+req.quiz.pregunta+":"+req.quiz.respuesta);
var errors = req.quiz.validate();//ya que segun version el objeto errors no tiene then()
if (errors)
{   console.log("validate err>"); 
	var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
	for (var prop in errors) errores[i++]={message: errors[prop]};
	res.render('quizes/edit', {quiz: quiz, errors: errores});
} else { console.log("validate ok>");
	req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
	.save({fields: ["pregunta", "respuesta"]})
	.then( function(){ res.redirect('/quizes')}) ;
}
};

// Autoload :quizId - factoriza el código que la ruta incluye /2
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No hallo quizId=' + quizId));}
		}
	).catch( function(error) { next(error);});
};

// GET /quizes 
exports.index = function(req, res) {
if (req.query.search) {
	models.Quiz.findAll(
	   {where: ["pregunta like ?", '%' + req.query.search.replace(/ /g,"%") + '%'],
	    order: ["pregunta"] }).then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
	}).catch(function(error) { next(error);})
} else {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes, errors: [] });
	}).catch(function(error) { next(error);})
	}
};

// GET /quizes/:id ahora llama show pag.32 m.7
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz:req.quiz, errors: []}); //pag.14 mod.8
	})
};

// GET /quizes/:id/answer pag.32
exports.answer = function(req, res) {
 models.Quiz.find(req.params.quizId).then(function(quiz){
  var resultado = 'Incorrecta'; // que no distinga mayusculas
  if ( req.query.respuesta.toLowerCase() ===req.quiz.respuesta.toLowerCase() ) {
    resultado = 'Correcta';  }
  res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado,errors:[] });//pag.14 mod.8
  })
};


// GET /quizes/author
exports.author = function(req, res) {
   res.render(    'quizes/author', { errors:[] }  ); // pag.14 mod.8
};