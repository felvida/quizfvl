console.log("quiz_controller.js>");
var models = require('../models/models.js'); //fvl
// GET /quizes/new pag.4 m.8
exports.new = function(req,res){ 
	var quiz= models.Quiz.build( { pregunta:"APreguntar",respuesta:"Respuesta"}); 
	console.log("new>"+quiz.pregunta);
	res.render( 'quizes/new',{quiz:quiz, errors: []}  ); 
};
  
 /* POST /quizes/create pag.5 m.8
exports.create = function(req,res){ 
	var quiz= models.Quiz.build( req.body.quiz);   // creo objeto quiz de params.body 
	
	quiz // si no  crea. if null 
	.validate() // validar entrada segun definicion campo
	.then( // si hay problemas Undefined is not a function
	  function(err){
		if (err){  
		  
	      res.render('/quizes/new',{quiz:quiz, errors:err.errors});
	    } else {  
		  
	      quiz	 //  sin problemas save  guarda en BD los campos
	     .save( {fields: [ "pregunta","respuesta"]} ) 
	     .then( function()   { res.redirect('/quizes')}) // despues redirigo a esta pag.		   
	    } //else
      } //function(err)	
	); //then si hay problemas
}; //exports
*/
exports.create = function(req, res){
var quiz = models.Quiz.build( req.body.quiz );
console.log("create>"+quiz.pregunta+":"+quiz.respuesta);// decia undefined!! por override mal
var errors = quiz.validate();//ya que el objeto errors no tiene then(
if (errors)
{   console.log("validate err>"); 
	var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
	for (var prop in errors) errores[i++]={message: errors[prop]};
	res.render('quizes/new', {quiz: quiz, errors: errores});
} else { console.log("validate ok>");
	quiz // save: guarda en DB campos pregunta y respuesta de quiz
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