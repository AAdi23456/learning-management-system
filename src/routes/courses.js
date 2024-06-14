const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { validateRegister, validateLogin, validateCourse, validateProgressUpdate, validate } = require('../middleware/validator');
const { sanitizeRegister, sanitizeCourse } = require('../middleware/sanitize');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/',validateCourse, sanitizeCourse,validate, [authenticate, authorize(['teacher'])], createCourse);
router.put('/:id', [authenticate, authorize(['teacher'])], updateCourse);
router.delete('/:id', [authenticate, authorize(['teacher'])], deleteCourse);

module.exports = router;
