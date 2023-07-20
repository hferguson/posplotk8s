const express = require('express');
const router = express.Router();

/**
 * Very simple route to allow for a health check from elsewhere.
 */
router.get('/posapi/healthcheck', async (req, res) => {
    
    res.status(200).send("OK");
});

console.log("Exporting dummy route...");
module.exports = router;