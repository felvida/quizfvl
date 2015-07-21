// Defino BD  'Quiz', con campos: pregunta,respuesta
module.exports = function(sequelize, DataTypes) {
 return sequelize.define(
		'Quiz',
		{ pregunta:  DataTypes.STRING,
		respuesta: DataTypes.STRING
		});
}