const constants = require('../constants');
const collectionName = "users";

const collectionSchema = {
    first_name: { type: String, require: true,default: null },
    last_name: { type: String, require: true,default: null },
    email: { type: String, required: true,default: null },
    password: { type: String, required: true, default: null },
    token: { type: String, default: null },
    refresh_token: { type: String, default: null },
    status: { type: Number, default: constants.STATUS.ENABLE, enum: [constants.STATUS.ENABLE, constants.STATUS.DISABLE] },
    is_deleted: { type: Number, default: constants.IS_DELETED.NO, enum: [constants.IS_DELETED.YES, constants.IS_DELETED.NO] },
    last_login_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: Date.now },
    role: { type: String, default: 'client' },
    image: { type: String, default: null }
};

module.exports = require("./index")(collectionSchema, collectionName);
