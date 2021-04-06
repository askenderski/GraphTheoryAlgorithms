const passport = require("passport");
const router = require('express').Router();

router.post("/login");
router.post("/logout");
router.post("/register");

module.exports = router;