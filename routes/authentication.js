const router = require('express').Router();
const {register, login} = require("../middlewares/authentication");

router.post("/login",
    login,
    (req, res) => {
    const {user} = req;
    res.cookie('jwt', req.token, { maxAge: 900000, httpOnly: true });
    res.status(200).send({
        message: "Login successful",
        user
    });
}
);

router.post("/logout", (req, res) => {
    res.clearCookie('jwt');
    res.status(205).send({
        message: "Logout successful"
    });
});

router.post("/register", register,
    async (req, res, next) => {

        res.status(201).json({
            message: 'Signup successful'
        });
});

module.exports = router;