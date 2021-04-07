const router = require("express").Router();

router.use("/auth", require("./routes/authentication"));
router.use("/articles", require("./routes/articles"));
router.use("/graphs", require("./routes/graphs"));

router.all("/*", (req, res, next) => {
    res.status(404).send({message: "Invalid page"});
});

router.use((err, req, res, next) => {
    res.status(err.status || 400).json({message: err.message});
});

module.exports = router;