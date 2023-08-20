const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); // Carga las variables de entorno desde .env

// Accede a las variables de entorno
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDatabase= process.env.DB_DATABASE
// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: dbHost, 
  user:dbUser,
  password: dbPassword, 
  database: dbDatabase 
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
