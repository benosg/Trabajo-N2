
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connection = require('../db');

const SECRET_KEY = 'tu_clave_secreta';
const MAILER_EMAIL = 'tu_correo@gmail.com';
const MAILER_PASSWORD = 'tu_contraseña_de_correo';

const authController = {
  register: async (req, res) => {
    try {
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
          user: MAILER_EMAIL,
          pass: MAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: MAILER_EMAIL,
        to: email,
        subject: 'Verificación de correo electrónico',
        text: 'Por favor, haga clic en el enlace para verificar su correo.',
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

      const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const token = req.params.token;
      const decodedToken = jwt.verify(token, SECRET_KEY);

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
