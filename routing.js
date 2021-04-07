const router = require("express").Router();

router.use("/auth", require("./routes/authentication"));
router.get("/", (req, res) => res.json({a: 1}));
router.use((err, req, res, next) => {
    res.status(err.status || 400).json({message: err.message});
});

module.exports = router;