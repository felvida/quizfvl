var sequelize = require('sequelize');
var models = require('../models/models.js')
//GET /quizes/stadistics
exports.resumen = function(req, res){
	var N_quiz, N_coment, Med_coment, quiz_ConComent, quiz_sinComent,Coment_Publicado;
	models.Quiz.count().then(function(quiz) {		// reg. en bd Quiz
		N_quiz = quiz;
		console.log('N_quiz='+N_quiz);
	models.Comment.count().then(function(comment) {		// reg. en bd Comment
		N_coment = comment;
		console.log('N_coment='+N_coment);
		if (N_quiz == 0){
			Med_coment = 0;
		}else{
			Med_coment = N_coment / N_quiz;
		}
		console.log('Med_coment='+Med_coment);
	models.Comment.count( {group: ['QuizId']} ).then(function(count) { // reg.agrupados Id. del quiz en bd. Comment 
		quiz_ConComent = count.length;								   //  nos da el numero de quiz con comentarios
		console.log('quiz_ConComent='+quiz_ConComent);
		quiz_sinComent = N_quiz - quiz_ConComent;
		console.log('quiz_sinComent='+quiz_sinComent);
	models.Comment.count( {where: ["publicado" ] } ).then(function(count) { // comentarios con publicado true
		Coment_Publicado = count; //.length;								   //  
		console.log('Coment_Publicado='+Coment_Publicado);
		// pasamos los datos a la vista
		res.render('statistics/resulta', { // views/statistics/resulta.ejs
			quiz: N_quiz,
			coment: N_coment,
			media: Med_coment, //formato 1,24
			quizconcoment: quiz_ConComent,
			quizsincoment: quiz_sinComent,
			comentpublicado: Coment_Publicado,
			errors: []
		}); // res.render , errors: []
	})	})  })  }) // 4 queries anidadas, para que sean secuenciales
}; // exports.
