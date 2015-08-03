console.log("comment_controller.js>");
var models = require('../models/models.js'); // se construye en fvl2015.heroku.com

// GET /quizes/:quizId/comments/new pag.8 m.9
exports.new = function(req,res){ 
    console.log("comment_new>");
	res.render( 'comments/new.ejs',{ quizIde: req.params.quizId, errors: []}  ); 
};
// POST /quizes/:quizId/comments
 exports.create = function(req,res){ 
    console.log("comment_create>");
	var commentario= models.Comment.build( // tomo vars.
		{ 	texto: req.body.comment.texto,
			QuizId: req.params.quizId});
  commentario.validate() //ya que segun version el objeto errors no tiene then()
  .then(
    function(err){
	if (err){
	 	res.render('comments/new.ejs', 
	    	{comment: comment, quizid:req.params.quizId, errors: errores} );
	} else { 
	   console.log("comentario ok>");
	   commentario // save: guarda en DB campos pregunta y respuesta de quiz
	   .save() // pag.8 m.9
	   .then( 
	      function(){ res.redirect('/quizes/'+req.params.quizId)}) ;
       }
    }
  ).catch(function(error){next(error)}) ; 
 };
