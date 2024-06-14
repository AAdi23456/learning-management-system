const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');

const authenticate = (req, res, next) => {
    const Authorization = req.header('Authorization');
    if (!Authorization) {
        logger.error('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = Authorization.replace('Bearer ', '');
    if (!token) {
        logger.error('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, "keyyytueuioiuuti");
        req.user = decoded;
        next();
    } catch (err) {
        logger.error('Invalid token',err);
        res.status(401).json({ error: err });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        console.log(req);
        if (!req.user || !roles.includes(req.user.role)) {
            logger.error('Forbidden');
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
