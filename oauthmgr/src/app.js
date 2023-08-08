const express = require("express");
const axios = require("axios");
const redirectRoute = require("./routes/redirect");
const paramRoute = require("./routes/params");
const userDataRoute = require("./routes/githubuserdata");
const healthChkRoute = require("./routes/healthcheck");

let cors = require("cors");

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(redirectRoute);
app.use(paramRoute);
app.use(userDataRoute);
app.use(healthChkRoute);

app.all('*'),  async (req, res) => {
    res.status("404").send("This is not your page");
};

module.exports = app;