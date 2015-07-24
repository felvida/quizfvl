// Defino BD  'Quiz', con campos: pregunta,respuesta
console.log('quiz.js>');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define(
		'Quiz',
		{ pregunta:  { type: DataTypes.STRING,
			validate:{notEmpty:{msg:"->Falta pregunta"}}      }, // pag.10 m.8
		  respuesta: { type: DataTypes.STRING,
		  	validate:{notEmpty:{msg:"->Falta respuesta"}}      }, 
		  tema: { type: DataTypes.STRING,
		  validate: { notEmpty: {msg: "-> Falta Tema"} } 	}// P2p m.8 }
		} );
}