const Progress = require('../../models/Progress');
const logger = require('../../utils/logger');
const user =require("../../models/User");
const { error } = require('winston');

const getUserProgress = async (req, res) => {
    try {
        const progress = await Progress.findAll({ where: { userId: req.params.id } });
        logger.info(`Retrieved progress for user ID: ${req.params.id}`);
        res.json(progress);
    } catch (error) {
        logger.error(`Error retrieving progress for user ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createUserProgress = async (req, res) => {
    try {
        const { progress, courseId } = req.body;
        const isProgress = await Progress.findOne({ where: { userId: req.params.id, courseId } });
        const isStudent=await user.findByPk(req.params.id)
        if(isStudent.role==="teacher"){
            logger.info(`userId: ${req.params.id} is a teacher.`);
            return res.status(400).json({error:`userId:${req.params.id} is a techer, please provide the student id.`})
        }
        if (isProgress) {
            logger.info(`Progress report is alreday created for user ID: ${req.params.id}`);
            return res.status(400).json({ error: "progress report is alreday created" });
        }
        const progressEntry = await Progress.create({ userId: req.params.id, progress, courseId });
        logger.info(`Progress created for user ID: ${req.params.id}`);
        res.status(201).json(progressEntry);
    } catch (error) {
        logger.error(`Error creating progress for user ID ${req.params.id}: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

const updateUserProgress = async (req, res) => {
    try {
        const { progress , courseId} = req.body;
        const isProgress = await Progress.findOne({ where: { userId: req.params.id, courseId } });
        if (!isProgress) {
            logger.info(`Progress report not found for user ID: ${req.params.id} and courseId:${courseId}`);
            return res.status(400).json({ error: "Progress report not found" });
        }
        const [progressUpdate] = await Progress.update({progress},{where:{ userId: req.params.id, courseId }});
        logger.info(`Progress updated for user ID: ${req.params.id}`);
      return  res.status(200).json(`Progress updated for user ID: ${req.params.id}`);
    } catch (error) {
        logger.error(`Error updating progress for user ID ${req.params.id}: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUserProgress,
    createUserProgress,
    updateUserProgress
};
