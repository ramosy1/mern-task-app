const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isVerified = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) {
            return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
  
module.exports = isVerified;