var path = require('path');

var Sequelize = require('sequelize'); // Cargar Modelo ORM

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(null, null, null, 
  { dialect:  "sqlite",
    storage:  "quiz.sqlite"  // solo SQLite (.env)
  }      
);

var Quiz = sequelize.import(path.join(__dirname,'Quiz')); // Importar definicion de la tabla Comment

exports.Quiz = Quiz; // exportar las 3 tablas
//exports.Comment = Comment; 
//exports.User = User;
console.log("Iniciando BD");
// sequelize.sync() inicializar tablas user(username,password) y quiz (pregunta,respuesta,userId) en DB
sequelize.sync().then(function() {     // then(..) ejecuta el manejador una vez creada la tabla
     Quiz.count().then(function (count){
		  console.log("Regs.=" + count );
          if(count === 0) {   // la tabla se inicializa solo si está vacía
		    console.log("Creandola ");
            Quiz.create(
				{pregunta: 'Capital de Italia',   respuesta: 'Roma' }
                 )
			.success(function(){console.log("BD creada")});
          }; // if count
        }); // Quiz.count
   
   }); //sequelize.sync()
    