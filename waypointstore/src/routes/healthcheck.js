const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');
const mongoose = require('mongoose');
/**
 * Very simple route to allow for a health check from elsewhere.
 * We will expand this to check the db connection in good time
 */
router.get('/api/waypoints/healthcheck', async (req, res) => {
    console.log("Healthcheck received");
    const respBody = {name: "position API service", health: "OK", date: new Date()};
    try {
        const state = mongoose.connection.readyState;
        if (state<0 || state > 2) {

            respBody["health"] = "FAIL";
            respBody["details"] = "no DB connection";
        }
        console.log(state);
    } catch (err) {
        console.log(err);
        respBody["health"] = "FAIL";
        respBody["details"] = err.message;
    }
    res.status(200).send(respBody);
});

module.exports = router;