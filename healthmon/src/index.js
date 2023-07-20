const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();
const  {json} = require('body-parser');

require('dotenv').config();
const port = process.env.port || 3001; // Will ditch in favour of K8s
const serviceURLs =  process.env.serviceURLs.split(',');
const serviceNames = process.env.serviceNames.split(',');
const serviceStats = [];

const start = async() => {
    console.log("Starting pos API service");
    let i;
    for (i=0;i<serviceURLs.length;i++) {
        let statusObj = {name: serviceNames[i], status: "unknown", statusDate: new Date()};
        serviceStats.push(statusObj);
    }
    while(true) {
        for (i=0;i<serviceURLs.length;i++) {
            let status = true;
            try {
                console.log(`Checking service ${serviceNames[i]}`);
                let url = serviceURLs[i];
                let resp = await axios.get(url);

            } catch (error) {
                console.log(`Error while checking service ${serviceNames[i]}`);
                console.error(error);
                status = false;
            }
            updateSvcStatus(serviceName[i], status);
        }
        await new Promise(r => setTimeout(r, 5000));
    }
};

const updateSvcStatus = (name, status) => {
    for (let i=0;i<serviceStats.length;i++) {
        let obj = sericeStats[i];
        if (obj.name === name) {
            obj.status = status;
            obj.statusDate = new Date();
            break;
        }
    }
};

// Restrict this service to servicing only GET requests
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
});

router.get('/healthmon', async (req, res) => {
   return res.json(serviceStats);
});
app.set('trust proxy', true);
app.use(json());

app.use(router);
app.listen(port, () => {
    console.log(`Health monitor listening on port ${port}`);
});

start();