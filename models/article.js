const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {collection: "articles"});

const ArticleModel = mongoose.model('article', ArticleSchema);

module.exports = ArticleModel;