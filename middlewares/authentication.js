const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const register = async (email, password) => {
    try {
        const user = await UserModel.create({ email, password });

        return user;
    } catch (error) {
        return {error};
    }
};

const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return {error: {message: 'User not found'}};
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
            return {error: {message: 'Wrong Password'}};
        }

        return {user};
    } catch (error) {
        return {error};
    }
};

module.exports = {
    register: async (req, res, next) => {
        const {email, password} = req.headers;
        const result = await register(email, password);

        next(result.error);
    },
    login: async (req, res, next) => {
        const {email, password} = req.headers;
        const result = await login(email, password);

        if (result.error !== undefined) next(result.error);

        const {user} = result;
        const body = {
            _id: user._id
        };

        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);

        req.user = {id: user._id, email: user.email};
        req.token = token;

        next();
    }
};