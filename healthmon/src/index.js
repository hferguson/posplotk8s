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
    console.log("Starting healthcheck API service");
    let i;
    for (i=0;i<serviceURLs.length;i++) {
        let statusObj = {name: serviceNames[i], status: "unknown", statusDate: new Date()};
        serviceStats.push(statusObj);
    }
    while(true) {
        for (i=0;i<serviceURLs.length;i++) {
            let status = true;
            try {
                let url = serviceURLs[i];
        
                console.log(`Checking service ${serviceNames[i]}`);
                console.log(`Service Endpoint: ${url}`);

                let resp = await axios.get(url);
                let data = resp.data;
                console.log(data);
                console.log(`Health check response received from svc ${data.name} at ${data.date}`);
            } catch (error) {
                console.log(`Error while checking service ${serviceNames[i]}`);
                console.error(error);
                status = false;
            }
            updateSvcStatus(serviceNames[i], status);
        }
        await new Promise(r => setTimeout(r, 10000));
    }
};

const updateSvcStatus = (name, status) => {
    for (let i=0;i<serviceStats.length;i++) {
        let obj = serviceStats[i];
        if (obj.name === name) {
            obj.status = status;
            obj.statusDate = new Date();
            break;
        }
    }
};



router.get('/api/healthmon/scan', async (req, res) => {
    console.log("Healthmonitor service request received");
   return res.json(serviceStats);
});
app.set('trust proxy', true);
app.use(json());

app.use(router);
app.listen(port, () => {
    console.log(`Health monitor listening on port ${port}`);
});

start();