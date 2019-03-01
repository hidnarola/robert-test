import _ from 'lodash';

export const required = value => value ? undefined : 'Required'

export const validateAutoCompleteObject = value => {
    console.log("value", value);

    console.log("validateAutoCompleteObject ===>", value)
    if (typeof value === "undefined" || !value.isArray || value.length < 0) {
        return "Required";
    }

    // if (value && value[0]) {
    //     if (value[0].name === undefined) {
    //         return "Required";
    //     }
    // }

    return undefined;
}

export const validNumber = (value) => {
    if (value && !/^\d+(?:\.\d{1,})?$/i.test(value)) {
        return "Only numeric values allowed.";
    }
    return undefined;
}

export const validString = (value) => {
    let hasNumber = /\d/;
    let _a = hasNumber.test(value); // false
    if (_a && _a === true) {
        return "Only string values allowed.";
    }
    return undefined;
}

export const requiredReactSelect = (value) => {
    console.log('------------------------------------');
    console.log('value => ', value);
    console.log('------------------------------------');

    if (!value || !value.value) {
        return "Field is required";
    }
    return undefined;
}

export const requiredReactSelectNumberOptions = (value) => {
    if (!value || typeof value.value === 'undefined') {
        return "Field is required";
    }
    return undefined;
}

export const requiredReactSelectStatus = (value) => {
    if (!value || Object.keys(value).length <= 0 || value.value === '') {
        return "Field is required";
    }
    return undefined;
}

export const requiredReactSelectMulti = (value) => {
    if (!value || !_.isArray(value) || _.isEmpty(value)) {
        return "Field is required";
    }
    return undefined;
}

export const requiredImage = (value) => {
    if (!value || typeof value === 'undefined' || Object.keys(value).length <= 0) {
        return "Field is required";
    }
    return undefined;
}

export const validImage = (value) => {
    let isError = false;
    if (value) {
        Array.from(value).forEach(file => {
            if (file.type !== 'image/jpeg' || file.type !== 'image/jpg' || file.type !== 'image/png') {
                isError = true;
            }
        });
    }
    if (isError) {
        return "Invalid File. Please select jpg and png only";
    }
    return undefined;
}

export const email = (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value)) {
        return "Invalid email address";
    }
    return undefined;
}

export const mobile = (value) => {
    if (value && !/^(\+\d{1,3}[- ]?)?\d{6,15}$/i.test(value)) {
        return "Invalid mobile number";
    }
    return undefined;
}

export const maxLength = (max) => (value) => {
    if (value && value.length > max) {
        return "Length must be less than or equal to " + max
    }
    return undefined;
}

export const minLength = (min) => (value) => {
    if (value && value.length < min) {
        return "Length must be more than or equal to " + min
    }
    return undefined;
}
export const minLength8 = minLength(8)

export const minLength3 = minLength(3)

export const max = (max) => (value) => {
    if (value && value > max) {
        return "Value must be less than or equal to " + max
    }
    return undefined;
}

export const min = (min) => (value) => {
    if (value && value < min) {
        return "Value must be more than or equal to " + min
    }
    return undefined;
}

export const alphaNumeric = value => {
    return value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;
}

export const disableField = (value,allValues,props,name) => {
    return undefined;
}