const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const constants = require('../constants');
const userauth = require('../validators/user/auth')
const common_helper = require('../helpers/common');
const Users = require('../models/users');
const { validationResult } = require('express-validator/check');
const validator_helper = require('../helpers/validator');

router.get("/", async function (req, res, next) {
    let responseData = {
        status: 1,
        message: "Success",
        data: null
    };
    res.status(config.OK_STATUS).json(responseData);
});

//User Login
router.post("/login", async function (req, res, next) {
    const { email, password } = req.body;

    Users.findOne({ email: email, role: 'client' }, function (err, data) {
        if (err) {
            return next(err);
        } else {
            if (data) {
                bcrypt.compare(password, data.password, async function (err, result) {
                    if (result) {
                        let userDataForToken = {
                            id: data._id,
                            role: data.role,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                        };
                        let token = jwt.sign(userDataForToken, config.JWT_SECRET_KEY, { expiresIn: config.JWT_TOKEN_EXPIRED_TIME });
                        //UPDATE DATABASE
                        let userId = mongoose.Types.ObjectId(data._id);
                        let user = await common_helper.update(Users, { _id: userId }, { token: token });

                        res.status(config.OK_STATUS).json({
                            status: 1,
                            message: "User authenticated successfully",
                            data: user
                        });
                    } else {
                        res.status(config.BAD_REQUEST).json({
                            status: 0,
                            message: "Password is wrong",
                            error: ["Password is wrong"],
                        });
                    }
                });
            } else {
                res.status(config.BAD_REQUEST).json({
                    status: 0,
                    message: "Email is wrong",
                    error: ["Email is wrong"]
                });
            }
        }
    })
});

//User Register
router.post("/register", userauth.register, async function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let { first_name, last_name, email, password } = req.body;
        bcrypt.genSalt(config.SALT_ROUNDS, function (err, salt) {
            if (err) {
                res.status(config.BAD_REQUEST).json({
                    status: 0,
                    message: "Error",
                    error: ["Something went wrong! please try again later."]
                });
            } else {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) {
                        res.status(config.BAD_REQUEST).json({
                            status: 0,
                            message: "Error",
                            error: ["Something went wrong! please try again later."]
                        });
                    } else {
                        let userData = {
                            first_name,
                            last_name,
                            email,
                            password: hash
                        };
                        let userResource = await common_helper.insert(Users, userData);

                        if (userResource && userResource.status === 1) {
                            res.status(config.OK_STATUS).json(userResource);
                        } else {
                            res.status(config.INTERNAL_SERVER_ERROR).json(userResource);
                        }
                    }
                });
            }
        });
    } else {
        res.status(config.VALIDATION_FAILURE_STATUS).json({
            status: 0,
            message: "Validation error",
            error: validator_helper.generateValidationErrorArr(errors.mapped())
        });
    }
});

module.exports = router;
