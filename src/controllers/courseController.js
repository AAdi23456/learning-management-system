const Course = require('../../models/Course');
const logger = require('../../utils/logger');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        logger.info('Retrieved all courses');
        res.json(courses);
    } catch (error) {
        logger.error(`Error retrieving courses: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            logger.warn(`Course not found: ID ${req.params.id}`);
            return res.status(404).json({ error: 'Course not found' });
        }
        logger.info(`Retrieved course: ID ${req.params.id}`);
        res.json(course);
    } catch (error) {
        logger.error(`Error retrieving course by ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.create({ title, description });
        logger.info(`Course created: ${course.title}`);
        res.status(201).json(course);
    } catch (error) {
        logger.error(`Error creating course: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            logger.warn(`Course not found: ID ${req.params.id}`);
            return res.status(404).json({ error: 'Course not found' });
        }

        course.title = title;
        course.description = description;
        await course.save();
        logger.info(`Course updated: ID ${req.params.id}`);
        res.json(course);
    } catch (error) {
        logger.error(`Error updating course: ID ${req.params.id}: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            logger.warn(`Course not found: ID ${req.params.id}`);
            return res.status(404).json({ error: 'Course not found' });
        }

        await course.destroy();
        logger.info(`Course deleted: ID ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`Error deleting course: ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
