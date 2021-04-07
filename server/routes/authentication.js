const router = require('express').Router();
const {register, login} = require("../middlewares/authentication");

router.post("/login",
    login,
    (req, res) => {
    const {user} = req;
    res.send({
        message: "Login successful",
        user: req.user
    });
    }
);

router.post("/logout", );

router.post("/register",
    register,
    async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

module.exports = router;