/**
 * This API consists of the following calls:
 * GET /api/waypoints/healthcheck - checks the health of the service
 * GET /api/waypoints/fetch       - retrieves all waypoints
 * GET /api/waypoints/get/:id     - gets waypoint by its UID
 * GET /api/waypoints/center      - find the centrepoint from all WP's in database
 * GET /api/waypoints/find/:lat/:lon/:range - find all WP's within :range metres of :lat,:lon
 * POST /api/waypoints/save         - saves WP data
 * DELETE /api/waypoints/delete/:id     - deletes a WP
 */
const express = require('express');
const {json} = require('body-parser');
const healthcheck = require('./routes/healthcheck');
const wpfetch = require('./routes/wpfetch');
const wpsave = require('./routes/wpsave');
const wpgetbyid = require('./routes/wpgetbyid');
const wpdelete = require('./routes/wpdelete');
const wpfind = require('./routes/wpfind');

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(healthcheck);
app.use(wpfetch);
app.use(wpsave);
app.use(wpgetbyid);
app.use(wpdelete);
app.use(wpfind);

module.exports = app;