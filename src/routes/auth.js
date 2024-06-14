const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, validateCourse, validateProgressUpdate, validate } = require('../middleware/validator');
const { sanitizeRegister, sanitizeCourse } = require('../middleware/sanitize');

const router = express.Router();

router.post('/register',validateRegister,sanitizeRegister,validate, register);
router.post('/login',validateLogin, validate,login);

module.exports = router;
