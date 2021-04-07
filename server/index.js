require("./config")();

const express = require("express");
const cors = require("cors");

const router = require("./routing");
require("./configDatabase")();

const app = express();

app.use(cors());

app.use("/", router);

process.env;
app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});