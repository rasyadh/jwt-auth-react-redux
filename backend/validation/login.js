const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateLogin = data => {
    let errors = {};

    // validate if there is falsy value
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
}