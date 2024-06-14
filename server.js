const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const morgan = require('morgan');
const cors = require("cors");

dotenv.config();


const authRoutes = require('./src/routes/auth');
const courseRoutes = require('./src/routes/courses');
const progressRoutes = require('./src/routes/progress');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());


app.use(morgan('combined', { stream: logger.stream }));

//Ignore this endpoint it is used for faster response from the server.

let maxRequests = 300000;
let interval = 300000;
let url = "https://continouessssss.onrender.com/isAlive";
app.get('/isAlive', (req, res) => {
    let count = 0;

    function sendRequest() {
        if (count < maxRequests) {
            axios.get(url)
                .then(response => {
                    console.log(`Request #${count + 1} successful`, response.data);
                    res.write(`Request #${count + 1} successful: ${JSON.stringify(response.data)}\n`);
                })
                .catch(error => {
                    console.error(`Request #${count + 1} failed`, error);
                    res.write(`Request #${count + 1} failed: ${error.message}\n`);
                })
                .finally(() => {
                    count++;
                    if (count < maxRequests) {
                        setTimeout(sendRequest, interval);
                    } else {
                        res.end('Completed 300,000 requests\n');
                    }
                });
        }
    }

    sendRequest();
});

app.get("/", (req, res) => {
    return res.redirect("https://documenter.getpostman.com/view/25332112/2sA3XQgMhF");

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
