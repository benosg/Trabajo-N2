// controllers/userController.js
const connection = require('../db');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta';

const userController = {
  getUserProfile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, SECRET_KEY);

      const email = decodedToken.email;

      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await connection.promise().execute(query, [email]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const user = rows[0];
      delete user.password; // No mostrar la contraseña en la respuesta

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  },
};

module.exports = userController;
