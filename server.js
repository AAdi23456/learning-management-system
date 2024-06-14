const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const morgan = require('morgan');

dotenv.config();

// Import Routes
const authRoutes = require('./src/routes/auth');
const courseRoutes = require('./src/routes/courses');
const progressRoutes = require('./src/routes/progress');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logger middleware using morgan
app.use(morgan('combined', { stream: logger.stream }));

// Routes

app.get("/documentaion",(req,res)=>{
return   res.redirect("https://documenter.getpostman.com/view/25332112/2sA3XPChyH#33c144d8-6c7c-4a36-86b2-df62d1e7bee1");

})
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/progress', progressRoutes);

// Sync Database and Start Server
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        logger.info(`Server is running on port ${PORT}`);
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
});
