const constant = require("../constants");
const fs = require("fs");
const common_helper = {};
const async = require("async");
const jwt = require('jsonwebtoken');
const moment = require('moment');

common_helper.sign = async (plainObject) => {
    try {
        var data = await jwt.sign(plainObject, constant.SECRET_KEY, {expiresIn: constant.EXPIRED_TIME})
        return data;
    } catch (error) {
        return error;
    }
};

common_helper.count = async (model, condition = {}) => {
    try {
        let data = await model.countDocuments(condition);
        return {status: 1, message: "Data found", data};
    } catch (error) {
        return {status: 0, message: "No data found"};
}
};

common_helper.insert = async (Model, newData) => {
    try {
        let document = new Model(newData);
        let data = await document.save();
        if (data) {
            return {status: 1, message: "Data inserted", data};
        } else {
            return {status: 0, message: "No data inserted", error: ["Something went wrong! please try again later"]};
        }
    } catch (error) {
        return {status: 0, message: "No data inserted", error: ["Something went wrong! please try again later"]};
    }
};

common_helper.insertMany = async (Model, newData) => {
    try {
        let data = await Model.insertMany(newData);
        return {status: 1, message: "Data inserted", data};
    } catch (error) {
        return {status: 0, message: "No data inserted"};
    }
};

common_helper.update = async (model, condition, newData) => {
    try {
        let data = await model.findOneAndUpdate(condition, newData, {new : true});
        return {status: 1, message: "Data updated", data};
    } catch (error) {
        return {status: 0, message: "No data updated"};
    }
};

common_helper.softDelete = async (model, condition) => {
    try {
        let data = await model.findOneAndUpdate(condition, {isDeleted: 1}, {new : true});
        return {status: 1, message: "Data deleted", data};
    } catch (error) {
        return {status: 0, message: "No data deleted"};
    }
};
common_helper.delete = async (model, condition) => {
    try {
        let data = await model.findOneAndDelete(condition);
        return {status: 1, message: "Data deleted", data};
    } catch (error) {
        return {status: 0, message: "No data deleted"};
    }
};

common_helper.find = async (model, condition = {}) => {
    try {
        let data = await model.find(condition).lean();
        return {status: 1, message: "Data found", data};
    } catch (error) {
        return {status: 0, message: "No data found"};
}
};

common_helper.findOne = async (model, condition = {}) => {
    try {
        let data = await model.findOne(condition).lean();
        return {status: 1, message: "Data found", data};
    } catch (error) {
        return {status: 0, message: "No data found"};
}
};

common_helper.updatepassword = async (model, condition, newData) => {
    try {
        let data = await model.findOneAndUpdate(condition, newData, {new : true});
        return {status: 1, message: "Data updated", data};
    } catch (error) {
        return {status: 0, message: "No data updated"};
    }
};

common_helper.generateRandomNumber = () => {
    let unixTime = moment().unix();
    let randomInt = parseInt(Math.random() * 100000000);
    return unixTime.toString() + randomInt.toString();
}

common_helper.changeObject = function (data) {
    columnFilter = {};
    columnSort = {};
    async.forEach(data.columnFilter, function (val, next) {
        var key = val.id;
        var value = val.value;
        if (val.isDigitFlag) {
            value = parseInt(val.value);
        } else if (!val.isEqualFlag) {
            re = new RegExp(val.value, "i");
            value = {
                $regex: re
            };
        }
        columnFilter[key] = value;
    });
    if (data.columnSort && data.columnSort.length > 0) {
        async.forEach(data.columnSort, function (val, next) {
            var key = val.id;
            var value = 1;
            if (val.desc) {
                value = -1;
            }
            columnSort[key] = value;
        });
    } else {
        columnSort["_id"] = -1;
    }

    data = {
        pageSize: data.pageSize,
        page: data.page,
        columnSort,
        columnFilter
    };
    return data;
};

common_helper.filterResponse = async (model, condition) => {
    try {
        let response = await model.aggregate(condition);
        if (response) {
            return response;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

module.exports = common_helper;
