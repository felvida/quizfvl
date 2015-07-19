var path = require('path');
console.log("imported path");
// para Postgress o Sqlite
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var urlK = process.env.DATABASE_URL; // PATH si lo hace
console.log("DATABASE_URL="+urlK);
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
console.log("creada url");

var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;
console.log("creadas vars. gestion BD:"+protocol);

var Sequelize = require('sequelize'); // Cargar Modelo ORM
console.log("imported Sequelize");

// Sequelize usa BBDD SQLite o Postgres, segun DATABASE_URL
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);
console.log("creada Sequelize");

var Quiz = sequelize.import(path.join(__dirname,'Quiz')); // Importar definicion de la tabla 
console.log("imported "+storage);
exports.Quiz = Quiz; 
console.log("Iniciando BD");
// sequelize.sync() inicializar tabla quiz (pregunta,respuesta,userId) en DB
sequelize.sync().then(function() {     // then(..) ejecuta el manejador una vez creada la tabla
     Quiz.count().then(function (count){
		  console.log("Regs.=" + count );
          if(count === 0) {   // la tabla se inicializa solo si está vacía
		    console.log("Creandola 1reg.");
            Quiz.create(
				{pregunta: 'Capital de Italia',   respuesta: 'Roma' }
                 )
			.success(function(){console.log("BD creada")});
          }; // if count
        }); // Quiz.count
   
   }); //sequelize.sync()
    