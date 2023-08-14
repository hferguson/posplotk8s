const express = require('express');
const getUser = require('../getuser-github');
const axios = require('axios');
const currentUser = require('@hfcdevops/posplotcommon');
const router = express.Router();

require('dotenv').config();


const GITHUB_API_URL = process.env.GITHUB_API_URL;

/**
 * Endpoint to get user info from JWT
 */
router.get("/api/oauth/userdata/jwt", currentUser, async (req, res) =>  {
    const userData = req.currentUser;
    if (userData != undefined) {
        return res.status(200).send(userData);
    } else {
        return res.status(404).send({status: 404, message: "no user session found"});
    }
});

/*
* Endpoint to get user info from GitHub
*/

router.get("/api/oauth/userdata/github", async (req, res) => {
    console.log("Userdata route called");
    //console.log(req.currentUser);
    
    const token = req.headers["authorization"];
    
    try {
        const data = await getUser(token);
        // essential fields are name, email, and possibly login
        console.log(data);
        return res.status(200).send(data);
    } catch(error) {
        //console.log(error);
            let statusCode = 500;
            if (error.hasOwnProperty('response')) {
                const response = error.response;
                statusCode = response.statusCode;
                console.log(response.data);
            }
            return res.status(statusCode).send({error: error});
    }
});


module.exports = router;