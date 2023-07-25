const express = require('express');
const router = express.Router();

/**
 * Very simple route to allow for a health check from elsewhere.
 * We will expand this to check the db connection in good time
 */
router.get('/api/waypoints/healthcheck', async (req, res) => {
    console.log("Healthcheck received");
    const respBody = {name: "position API service", health: "OK", date: new Date()};
    res.status(200).send(respBody);
});

module.exports = router;