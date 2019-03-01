const validator_helper = {};
const mongoose = require('mongoose');
const Users = require('../models/users');

validator_helper.generateValidationErrorArr = (validationErrors) => {
    let errors = [];
    Object.keys(validationErrors).map((key) => {
        let o = validationErrors[key];
        errors.push(o.msg);
    });
    return errors;
};

validator_helper.checkEmailExists = async (email) => {
    try {
        let re = new RegExp(["^", email, "$"].join(""), "i");
        let _email = {$regex: re};
        let data = await Users.findOne({email: _email});
        if (data) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};

validator_helper.checkEmailDoesNotExists = async (email) => {
    try {
        let re = new RegExp(["^", email, "$"].join(""), "i");
        let _email = {$regex: re};
        let data = await Users.findOne({email: _email});
        if (data) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

validator_helper.checkProfileEmailExists = async (email, res) => {
    let old_email = res.req.body.old_email;
    let re = new RegExp(["^", email, "$"].join(""), "i");
    let _email = {$regex: re};
    if (old_email.toLowerCase() === email.toLowerCase()) {
        return true;
    } else {
        try {
            let data = await Users.findOne({email: _email});
            if (data) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }
};

validator_helper.decodeBase64Data = async (encoded) => {
    try {
        Buffer.from(encoded, 'base64').toString();
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = validator_helper;
