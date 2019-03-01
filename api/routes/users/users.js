const express = require("express");
const router = express.Router();
const async = require("async");

const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../../config');
// const logger = config.logger;

const path = require('path');
const fs = require('fs');

const common_helper = require('../../helpers/common');
const validator_helper = require('../../helpers/validator');
let userAuth = require('../../validators/user/auth');

const Users = require('../../models/users');
mongoose = require('mongoose');


router.get("/", async function (req, res) {
    try {
        let userData = await Users.find();
        if (userData && userData.length > 0) {
            res.status(config.OK_STATUS).json(userData);
        } else {
            let responseData = {
                status: 0,
                message: "No data found",
                error: ["No data found"]
            }
            res.status(config.BAD_REQUEST).json(responseData);
        }
    } catch (error) {
        let responseData = {
            status: 0,
            message: "Something went wrong! please try again later",
            error: ["Something went wrong! please try again later"]
        }
        res.status(config.BAD_REQUEST).json(responseData);
    }

});

router.post("/profile", userAuth.profiledata, async function (req, res, next) {
    const errors = validationResult(req);
    try {
        if (errors.isEmpty()) {
            let _userId = req.userId;
            let userId = mongoose.Types.ObjectId(_userId);
            let { first_name, last_name } = req.body;
            Users.findOne({ _id: userId, role: 'client' }, async function (err, data) {
                if (err) {
                    return next(err);
                } else {
                    if (data) {
                        let new_data = { first_name: first_name, last_name: last_name };
                        //UPDATE DATABASE
                        let userId = mongoose.Types.ObjectId(data._id);
                        let user = await common_helper.update(Users, { _id: userId }, new_data);
                        res.status(config.OK_STATUS).json({
                            status: 1,
                            message: "Profile Updated",
                            data: user,
                        });
    
                    } else {
                        res.status(config.BAD_REQUEST).json({
                            status: 0,
                            message: "Error",
                            error: ["Please login again"]
                        });
                    }
                }
            })
        } else {
            res.status(config.VALIDATION_FAILURE_STATUS).json({
                status: 0,
                message: "Validation error",
                error: validator_helper.generateValidationErrorArr(errors.mapped())
            });
        }    
    } catch (error) {
        res.status(config.INTERNAL_SERVER_ERROR).json({
            status: 0,
            message: "Internal Server Error",
            error: ["something went wrong! please try again later"]
        });
    }
    
});

router.post("/image", async function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let _userId = req.userId;
        let userId = mongoose.Types.ObjectId(_userId);
        var filename;
        var userdetail = await common_helper.findOne(Users, { _id: userId, role: 'client' });
        if (userdetail.status === 1) {
            if (req.files && req.files["image"]) {
                var file = req.files["image"];
                var dir = "./upload/profile";
                var mimetype = ["image/png", "image/jpeg", "image/jpg"];

                if (mimetype.indexOf(file.mimetype) != -1) {
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    extention = path.extname(file.name);
                    filename = "profile_" + Date.now() + extention;
                    file.mv(dir + "/" + filename, function (err) {
                        if (err) {
                            res.send({
                                status: config.MEDIA_ERROR_STATUS,
                                err: "There was an issue in uploading image"
                            });
                        }
                    });
                } else {
                    res.send({
                        status: config.VALIDATION_FAILURE_STATUS,
                        err: "Image format is invalid"
                    });
                }
            } else {
                res.send({
                    status: 0,
                    message: "no image selected"
                })
            }
            if (filename) {
                let _filename = "upload/profile/" + filename;
                let userData = await common_helper.update(Users, { _id: userId }, { image: _filename });
                if (userData.status === 1) {
                    res.status(config.OK_STATUS).json(userData);
                } else {
                    res.status(config.BAD_REQUEST).json(userData);
                }
            }
        } else {
            res.status(config.BAD_REQUEST).json({
                status: 0,
                message: "Error",
                error: ["User Id not found"]
            });
        }
    } else {
        res.status(config.BAD_REQUEST).json({
            message: "Validation Error",
            error: { errors }
        });
    }
});

module.exports = router;