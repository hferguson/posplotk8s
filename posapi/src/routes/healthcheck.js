const express = require('express');
const router = express.Router();

/**
 * Very simple route to allow for a health check from elsewhere.
 */
router.get('/api/position/healthcheck', async (req, res) => {
    console.log("Healthcheck received");
    const respBody = {name: "position API service", health: "OK", date: new Date()};
    res.status(200).send(respBody);
});

console.log("Exporting dummy route...");
module.exports = router;