/**
 * This endpoint used to geo-search the database for points within a specific # of metres
 * of 
 */
const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');
const mongoose = require('mongoose');

router.get('/api/waypoints/find/:lat/:lon/:range', async (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const range = req.params.range;
    console.log(`Looking for coordinates within ${range} meters`);
    try {
        // create a location parameter to use in search
        const resp = await WaypointsModel.find({location: 
                                                    {$near: {
                                                        $geometry: {type: "Point", coordinates: [lon, lat]},
                                                        $maxDistance: range
                                                        }
                                                    }
                                                });
        res.status(200).send(resp);
    } catch (error) {
        console.log(error);
        return res.status(500).send({error: error});
    }
});
module.exports = router;