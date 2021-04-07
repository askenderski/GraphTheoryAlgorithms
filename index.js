require("./config")();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routing");
require("./configDatabase")();

const app = express();

app.use(cors());
app.use(cookieParser());

app.use("/", router);

process.env;
app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});