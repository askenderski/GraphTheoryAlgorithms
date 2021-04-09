const router = require('express').Router();
const ArticleModel = require("../models/article");

router.get("/:algorithmType/:articleTitle", async (req, res, next) => {
    const {algorithmType, articleTitle} = req.params;

    const article = await ArticleModel.findOne({type: algorithmType, title: articleTitle});
    if (article === null) {
        return next({status: 404, message: "Article does not exist"});
    }

    res.status(200).json(article);
});

router.get("/", async (req, res, next) => {
    console.log(req.headers);

    const articles = await ArticleModel.find();
    console.log(articles);

    res.status(200).json(articles);
});

module.exports = router;