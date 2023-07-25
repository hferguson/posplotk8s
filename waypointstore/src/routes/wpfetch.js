const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');
/**
 * Very simple route to allow for a health check from elsewhere.
 */
router.get('/api/waypoints/fetch', async (req, res) => {
    let waypoints = [];
    try {
        waypoints = await WaypointsModel.find();
        //console.log(waypoints);
    } catch (error) {
        return res.status(400).send({error: error});
    }
    res.status(200).send(waypoints);
});

router.get('/api/waypoints/center', async (req, res) => {
    const payload = {latCtr: 0, lonCtr: 0};
    try {
        const waypoints = await WaypointsModel.find();
        const num = waypoints.length;
        let  avgLat = avgLon = 0;
        let wpCount = 0;
        if(num > 0) {
            for (let i=0;i<num;i++) {
                const wp = waypoints[i];
                const coords = wp.location.coordinates; // An array with two elements, lon first in mongo
                if (coords.length > 1) {
                    if (!isNaN(coords[0]) && !isNaN(coords[1])) {
                        wpCount++;
                        avgLat += coords[1];
                        avgLon += coords[0];
                    }
                }
            }
            if (wpCount > 0) {
                payload.latCtr = avgLat/wpCount;
                payload.lonCtr = avgLon/wpCount;
            }
        } else {
            console.log(`Warning: no waypoints found!`);
        }
        res.status(200).send(payload);

    } catch (error) {
        return res.status(500).send({error: error});
    }
});

module.exports = router;