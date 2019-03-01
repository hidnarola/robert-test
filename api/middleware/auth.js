var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.JWT_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(config.UNAUTHORIZED).json({
                    status: 0,
                    message: "Unauthorized access",
                    error: ["Unauthorized access"]
                });
            } else {
                if (decoded && decoded.role === config.CLIENT) {
                    req.decoded = decoded;
                    req.userId = decoded.id;
                    next();
                } else {
                    return res.status(config.UNAUTHORIZED).json({
                        status: 0,
                        message: "Unauthorized access",
                        error: ['Unauthorized access']
                    });
                }
            }
        });
    } else {
        return res.status(config.UNAUTHORIZED).json({
            status: 0,
            message: "Unauthorized access",
            error: ['Unauthorized access']
        });
    }
}