const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const logger = require('../../utils/logger');


const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const checkUser=await User.findOne({where:{email}})
        if(checkUser){
            logger.error(`Error registering user: user already registerd`);
          return  res.status(400).json({ error:"user already registerd" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        logger.info(`User registered: ${user.email}`);
        res.status(201).json(user);
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            logger.warn(`Invalid login attempt: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, "keyyytueuioiuuti");
        logger.info(`User logged in: ${user.email}`);
        res.json({ token });
    } catch (error) {
        logger.error(`Error logging in: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
};
