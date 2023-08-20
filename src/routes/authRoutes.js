
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
    '/register',
    [
      body('email').isEmail().normalizeEmail(),
      body('password').isLength({ min: 8 }).trim(),
    ],
    authController.register
  );
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;
