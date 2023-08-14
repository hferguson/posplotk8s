const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/api/oauth/healthcheck', (req, res) => {
    console.log("Healthcheck received");
    const respBody = {name: "OAuth Manager API service", health: "OK", date: new Date()};
    res.status(200).send(respBody);
});

module.exports = router;