const express = require("express");
const cookieSession = require("cookie-session");
const redirectRoute = require("./routes/redirect");
const paramRoute = require("./routes/params");
const userDataRoute = require("./routes/githubuserdata");
const healthChkRoute = require("./routes/healthcheck");
const signoutRoute = require("./routes/signout");

let cors = require("cors");

const app = express();
app.set('trust proxy', true);
app.use(
    cookieSession( {
        signed: false,
        secure: false
    })
);
app.use(cors({credentials: true, origin: true}));
app.use(redirectRoute);
app.use(paramRoute);
app.use(userDataRoute);
app.use(healthChkRoute);
app.use(signoutRoute);

app.all('*'),  async (req, res) => {
    res.status("404").send("This is not your page");
};

module.exports = app;