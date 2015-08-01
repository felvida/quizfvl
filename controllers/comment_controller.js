console.log("comment_controller.js>");
var models = require('../models/models.js'); // se construye en fvl2015.heroku.com

// GET /quizes/:quizId/comments/new pag.8 m.9
exports.new = function(req,res){ 
    console.log("comment new>");
	res.render( 'comments/new.ejs',{ quizIde: req.params.quizId, errors: []}  ); 
};
// POST /quizes/:quizId/comments
 exports.create = function(req,res){ 
    console.log("comment create>");
	var commentario= models.Comment.build( // tomo vars.
		{ 	texto:req.body.comment.texto,
			QuizId: req.params.quizId});
	var errors = commentario.validate();//ya que segun version el objeto errors no tiene then()
if (errors)
{   console.log("comentario err>"); 
	var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
	for (var prop in errors) errores[i++]={message: errors[prop]};
	res.render('comments/new.ejs', 
	     {comment: comment, quizid:req.params.quizId, errors: errores});
} else { console.log("comentario ok>");
	commentario // save: guarda en DB campos pregunta y respuesta de quiz
	.save() // pag.8 m.9
	.then( function(){ res.redirect('/quizes/'+req.params.quizId)}) ;
} // profe con .catch
};

