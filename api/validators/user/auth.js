const {check} = require('express-validator/check');
const constants = require('../../constants');
const validator_helper = require('../../helpers/validator');

module.exports = {
    register: [
        check('first_name')
                .trim()
                .not().isEmpty().withMessage('First name is required')
                .exists().withMessage('First name is required')
                .isLength({min: 2, max: 20}).withMessage('First name should be between 2 to 20 characters long'),
        check('last_name')
                .trim()
                .not().isEmpty().withMessage('Last name is required')
                .exists().withMessage('Last name is required')
                .isLength({min: 2, max: 20}).withMessage('Last name should be between 2 to 20 characters long'),
        check('email')
                .not().isEmpty().withMessage('Email is required')
                .exists().withMessage('Email is required')
                .isEmail().withMessage('Invalid email')
                .custom((value) => validator_helper.checkEmailExists(value)).withMessage('Email is already used.'),
        check('password')
                .not().isEmpty().withMessage('Password is required')
                .exists().withMessage('Password is required')
                .isLength({min: 8, max: 32}).withMessage('Password should be between 8 to 32 characters long'),
        ],
    profiledata: [
        check('first_name')
                .trim()
                .not().isEmpty().withMessage('First name is required')
                .exists().withMessage('First name is required')
                .isLength({min: 2, max: 20}).withMessage('First name should be between 2 to 20 characters long'),
        check('last_name')
                .trim()
                .not().isEmpty().withMessage('Last name is required')
                .exists().withMessage('Last name is required')
                .isLength({min: 2, max: 20}).withMessage('Last name should be between 2 to 20 characters long'),
    ],
};