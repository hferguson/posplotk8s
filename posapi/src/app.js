/**
 * This API provides two services.  Get me lat-long coords for 
 * an address, and get me address for lat-long co-ordinates
 * We are relying on positionstack API
 */
const express = require('express');
const forwardRoute = require('./routes/forward-lookup');
const reverseRoute = require('./routes/reverse-lookup');
const healthcheckRoute = require('./routes/healthcheck');

const  {json} = require('body-parser');

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(forwardRoute);
app.use(reverseRoute);
app.use(healthcheckRoute);


app.all('*'),  async (req, res) => {
    res.status("404").send("This is not your page");
}
module.exports = app;

