const router = require("express").Router();

router.use("/auth", require("./routes/authentication"));
router.get("/", (req, res) => res.json({a: 1}));

module.exports = router;