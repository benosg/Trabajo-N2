
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connection = require('../db');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config(); // Carga las variables de entorno desde .env
const secretKey = process.env.SECRET_KEY;
const mailer = process.env.EMAIL;
const mailerPassword = process.env.EMAILPASSWORD;
const sitioWeb = process.env.SITIO;

// Define el método para generar el token de verificación
const generateVerificationToken = (email) => {
  const verificationToken = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  return verificationToken;
};
const authController = {
  register: async (req, res) => {
    try {

       // Validación y sanitización de datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar en la base de datos
      const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
      await connection.promise().execute(query, [email, hashedPassword]);

      // Enviar correo de verificación (solo ejemplo, implementación real puede variar)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailer,
          pass: mailerPassword,
        },
      });
      const verificationToken = generateVerificationToken(email);
// Crear el enlace de verificación
      const verificationLink = `${sitioWeb}/auth/verify-email/${verificationToken}`;
      const mailOptions = {
        from: mailer,
        to: email,
        subject: 'Verificación de correo electrónico',
        text: `Por favor, haga clic en el enlace para verificar su correo: ${verificationLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente. Verifique su correo electrónico.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await connection.promise().execute(query, [email]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      const user = rows[0];
       const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
  
      // Verificar si el correo electrónico está validado
      if (user.is_email_verified !== 1) {
        return res.status(401).json({ message: 'El correo electrónico no ha sido verificado.' });
      }
  
      const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  },
  

  verifyEmail: async (req, res) => {
    try {
      const token = req.params.token;
      const decodedToken = jwt.verify(token, secretKey);

      const email = decodedToken.email;

      // Actualizar el campo is_email_verified en la base de datos
      const query = 'UPDATE users SET is_email_verified = 1 WHERE email = ?';
      await connection.promise().execute(query, [email]);

      res.status(200).json({ message: 'Correo electrónico verificado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  },
};

module.exports = authController;
