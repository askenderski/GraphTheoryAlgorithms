const router = require('express').Router();
const ArticleModel = require("../models/article");

router.get("/:algorithmTypeId/:algorithmId", async (req, res) => {
    try {
        const {algorithmTypeId, algorithmId} = req.params;

        const article = await ArticleModel.findOne({type: algorithmTypeId, title: algorithmId});

        console.log(article)
        res.status(200).json(article);
    } catch(err) {
        throw {status: 404, message: "Article does not exist"};
    }
});

module.exports = router;