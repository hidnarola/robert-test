require('dotenv').config();
module.exports = Object.freeze({
    DATABASE: process.env.DATABSE_CONNECTION_DEV,
    OBJECT_ID: require("mongoose").Schema.Types.ObjectId,

    // HTTP Status
    OK_STATUS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    MEDIA_ERROR_STATUS: 415,
    VALIDATION_FAILURE_STATUS: 417,
    DATABASE_ERROR_STATUS: 422,
    INTERNAL_SERVER_ERROR: 500,

    // JWT detais
    JWT_SECRET_KEY: "robert_test",
    JWT_TOKEN_EXPIRED_TIME: 60*60*24,

    //bcrypt config
    SALT_ROUNDS: 10,

    IS_HTTPS: process.env.IS_HTTPS,
    SSL_CERT: process.env.SSL_CERT,
    SSL_KEY: process.env.SSL_KEY,

    // User roles
    ADMIN: 'admin',
    CLIENT: 'client'
});
