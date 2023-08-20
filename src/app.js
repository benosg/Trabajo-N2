const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
// Definir la ruta para la verificación de correo electrónico
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});