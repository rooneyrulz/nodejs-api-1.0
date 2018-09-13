const jwt = require('jsonwebtoken');

const Check_Authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            message: 'Authorization failed..',
            Error: {
                info: error.message
            }
        });
    }
};

module.exports = Check_Authorization;