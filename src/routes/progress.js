const express = require('express');
const { authenticate , authorize} = require('../middleware/auth');
const { validateRegister, validateLogin, validateCourse, validateProgressUpdate, validate } = require('../middleware/validator');
const { sanitizeRegister, sanitizeCourse } = require('../middleware/sanitize');
const { getUserProgress, createUserProgress, updateUserProgress } = require('../controllers/progressController');
const router = express.Router();

router.get('/users/:id/progress', authenticate, getUserProgress);
router.post('/users/:id/progress', authenticate, validateProgressUpdate, validate, createUserProgress);
router.put('/users/:id/progress', authenticate,authorize(["teacher"]), validateProgressUpdate, validate, updateUserProgress);


module.exports = router;
