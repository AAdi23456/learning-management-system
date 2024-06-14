const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required'),
];

const validateCourse = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
];

const validateProgressUpdate = [
    body('progress').trim().notEmpty().withMessage('Progress is required').isFloat({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 10'),
    body('courseId').trim().notEmpty().withMessage('courseId is required').isInt().withMessage('courseId must be between in numbers'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateCourse,
    validateProgressUpdate,
    validate,
};
