const express = require('express');
const axios = require('axios');

const router = express.Router();

require('dotenv').config();
require("dotenv").config();

const GITHUB_API_URL = process.env.GITHUB_API_URL;


/*
* Endpoint to get user info from GitHub
*/

router.get("/api/oauth/userdata/github", async (req, res) => {
    console.log("Userdata route called");
   const token = req.headers["authorization"];
   const url = GITHUB_API_URL;
   const config = {
       headers: {
           Authorization: token
       }
   }
   try {
       const resp = await axios.get(url, config);
       return res.status(200).send(resp.data);
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