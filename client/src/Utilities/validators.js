import isEmail from "validator/es/lib/isEmail";

export const emailValidator = email => {
    const errors = [];

    if (!isEmail(email)) errors.push("Invalid email");

    return errors;
};

export const usernameValidator = username => {
    const errors = [];

    if (username.length === 0) errors.push("Username cannot be empty");

    return errors;
};

export const passwordValidator = password => {
    const errors = [];

    if (password.length < 8) errors.push("Password must be at least 8 characters long");
    if (password.match(/[^0-9a-zA-Z]+/) !== null) errors.push("Password can only contain letters and numbers");

    return errors;
};

export const passwordComparator = ({password, passwordRepeated}) => {
    const errors = [];

    if (passwordRepeated !== password) errors.push("Passwords must match");

    return errors;
};

export const validateToHaveNoErrors = ()=>[];