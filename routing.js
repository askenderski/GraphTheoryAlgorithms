const router = require("express").Router();

router.use("/auth", require("./routes/authentication"));

module.exports = router;