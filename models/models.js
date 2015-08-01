var path = require('path');
console.log("models.js>imported path"); 	// configuracion DB_URL 
// SQLite (lee fichero .env) > DATABASE_URL = sqlite://:@:/
// Postgres Heroku (lo toma de sus VARS) DATABASE_URL = postgres://user:passwd@host:port/database
var urlK = process.env.DATABASE_URL; 
console.log("DATABASE_URL="+urlK); 
if (!urlK) // si es null  lee lo anterior sobre config. DB_URL
	console.log("Falta .env(SQLITE) ó Var.DATABASE_URL(Postgres Heroku)"); // 
var url = urlK.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
console.log("creada url[]");

var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;
console.log("creadas vars. BD,protocol=:"+protocol);

var Sequelize = require('sequelize'); // Cargar Modelo ORM
console.log("imported Sequelize");

// Sequelize usa BBDD SQLite(local) o Postgres(Web), segun var. sacadas de DATABASE_URL
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
var qfile= path.join(__dirname,'quiz');
var Quiz = sequelize.import(qfile); // Importar definicion de la tabla models/quiz.js
console.log("imported "+qfile);
var cfile= path.join(__dirname,'comment');
var Comment = sequelize.import(cfile); // Importa definicion de comment 
console.log("imported "+cfile);

Comment.belongsTo(Quiz); // crea nuevo campo Quiz.comment 
Quiz.hasMany(Comment);   // lo relaciona Comment.QuizId (N regs.), ver relacion entre tablas pag.5 m.9, 

exports.Quiz = Quiz; 
exports.Comment = Comment; 

console.log("Iniciando BD "+DB_name);
// sequelize.sync() inicializar tabla quiz (pregunta,respuesta) en DB
sequelize.sync().then(function() {     // success() por then(..) ejecuta el manejador una vez creada la tabla
     Quiz.count().then(function (count){ //then
		  console.log("tenia=" + count+" regs." );
          if(count === 0) {   // la tabla se inicializa solo si está vacía
		    console.log("Creandola MultiRegistro Temario."); // p2p m.8
            Quiz.create({pregunta: 'Capital de Italia',   respuesta: 'Roma',tema:"Otro" }  );
			Quiz.create({pregunta: 'Capital de Argentina',respuesta: 'Buenos Aires',tema:"Otro" } );
			Quiz.create({pregunta: 'Capital de Francia',  respuesta: 'Paris' ,tema:"Otro"} );
			Quiz.create({pregunta: 'Oro parece plata no es, que es?',respuesta:'Platano',tema:"Ocio"});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa',tema:"Otro" })
			.then(function(){console.log("BD creada")}); //then
          }; // if count
        }); // Quiz.count
   
   }); //sequelize.sync()
    