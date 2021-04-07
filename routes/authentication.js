const router = require('express').Router();
const {register, login} = require("../middlewares/authentication");

router.post("/login",
    login,
    (req, res) => {
    const {user} = req;
    res.cookie('jwt', req.token, { maxAge: 900000, httpOnly: true });
    res.send({
        message: "Login successful",
        user
    });
}
);

router.post("/logout", (req, res) => {
    res.clearCookie('jwt');
    res.send({
        message: "Logout successful"
    });
});

router.post("/register", register,
    async (req, res, next) => {
    res.json({
        message: 'Signup successful'
    });
});

module.exports = router;