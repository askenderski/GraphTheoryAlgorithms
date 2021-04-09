require("./config")();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routing");
const {getUser} = require("./middlewares/authentication");
require("./configDatabase")();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(getUser);

app.use("/", router);

//If express.json body is invalid
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ message: "Invalid body" });
    }

    next();
});
app.use((err, req, res, next) => {
    return res.status(500).send({ message: err.message || "Unknown error" });
});

process.env;
app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});