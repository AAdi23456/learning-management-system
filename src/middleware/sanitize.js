const { body } = require('express-validator');
const validator = require('validator');

const sanitizeRegister = [
    body('name').trim().escape(),
    body('email').trim().normalizeEmail(),
    body('password').trim(),
];

const sanitizeCourse = [
    body('title').trim().escape(),
    body('description').trim().escape(),
];

module.exports = {
    sanitizeRegister,
    sanitizeCourse,
};
