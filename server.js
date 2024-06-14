const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const morgan = require('morgan');

dotenv.config();


const authRoutes = require('./src/routes/auth');
const courseRoutes = require('./src/routes/courses');
const progressRoutes = require('./src/routes/progress');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(morgan('combined', { stream: logger.stream }));



app.get("/",(req,res)=>{
return   res.redirect("https://documenter.getpostman.com/view/25332112/2sA3XQgMhF");

})
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/progress', progressRoutes);


app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
        logger.info(`Server is running on port ${PORT}`);
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
});
