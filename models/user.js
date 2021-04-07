const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Invalid email"]
    },
    password: {
        type: String,
        required: true
    }
}, {collection: "users"});

UserSchema.pre(
    'save',
    async function(next) {
        const user = this;

        if (user.password.length <= 7) {
            throw {status: 400, message: "Password must be at least 8 characters long"};
        }

        const hash = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS));

        user.password = hash;
        next();
    }
);

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next({status: 409, message: 'Email already exists'});
    } else {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;