const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');

router.post('/api/waypoints/save', async (req, res) => {
    const {title, location, address_string, city, region, country} = req.body;

    const existingWP = await WaypointsModel.findOne({location});

    if (existingWP) {
        throw new Error("Waypoint already exists");
    } 
    //const data = await WaypointsModel.create({title, location, address_string, city, region, country});
    const wp = new WaypointsModel({title, location, address_string, city, region, country});
    await wp.save();
    

    return res.status(201).send(wp.toJSON());
});


module.exports = router;