const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {isEmail} = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [isEmail, "Invalid email"]
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre(
    'save',
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(user.password, process.env.SALT_ROUNDS);

        user.password = hash;
        next();
    }
);

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('email must be unique'));
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