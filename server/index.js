const express = require("express");
const cors = require("cors");
const config = require("./config");
config();

const app = express();

app.use(cors());

app.listen(process.env.PORT, function () {
    console.log(`Listening on port ${process.env.PORT}`);
});