const express = require('express');
const axios = require('axios');

const router = express.Router();

require('dotenv').config();
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_URL = process.env.GITHUB_URL;

/**
 * Returns Git hub URL and 
 */
router.get("/api/oauth/params", async (req, res) => {
    const payload = {
        github_authURL: GITHUB_URL,
        github_clientID: CLIENT_ID
    };
    return res.status(200).send(payload);
});

module.exports = router;
