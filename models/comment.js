// Defino BD  'comment', con campo: texto
console.log('comment.js>');
module.exports = function(sequelize, DataTypes) {
 return sequelize.define(
		'Comment',
		{ texto: { type: DataTypes.STRING,
		  validate: { notEmpty: {msg: "-> Falta Comentario"} } 	}// pag.3 m.9 }
		} );
}