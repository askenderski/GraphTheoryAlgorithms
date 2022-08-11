const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const {promisify} = require("util");

const register = async (email, username, password) => {
    try {
        const user = await UserModel.create({ email, username, password });

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
        const {email, username, password} = req.body;
        console.log(req.body);
        const result = await register(email, username, password);

        console.log(result.error);
        next(result.error);
    },
    login: async (req, res, next) => {
        const {email, password} = req.body;
        const result = await login(email, password);

        if (result.error !== undefined) next(result.error);

        const {user} = result;
        const body = {
            _id: user._id
        };

        const token = jwt.sign({user: body}, process.env.JWT_SECRET_KEY);

        req.user = {id: user._id, username: user.username};
        req.token = token;

        next();
    },
    getUser: async (req, res, next) => {
        const token = req.cookies.jwt;
        console.log(token)

        if (!token) {
            return next();
        }

        promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)
            .then(tokenDecoded=>{
                const newToken = jwt.sign({user: tokenDecoded.user}, process.env.JWT_SECRET_KEY);
                res.cookie('jwt', newToken, { maxAge: 900000, httpOnly: true });
                req.user = tokenDecoded.user;

                next();
            })
            .catch(err => next({status: 401, message: "Invalid token"}));
    }
};