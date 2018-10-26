const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegister = data => {
    let errors = {};

    // validate if there is falsy value
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have 6 chars';
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = 'Confirm Password is required';
    }
    else if (!Validator.isLength(data.confirm_password, { min: 6, max: 30 })) {
        errors.confirm_password = 'Confirm Password must have 6 chars';
    }
    else if (!Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = 'Password and Confirm Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}