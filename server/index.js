const express = require("express");
const cors = require("cors");

const router = require("./routing");

require("./config")();

const app = express();

app.use(cors());

app.use("/", router);

app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});