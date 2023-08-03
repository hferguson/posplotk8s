const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');

router.post('/api/waypoints/save', async (req, res) => {
    const {title, location, address_string, city, region, country} = req.body;
    console.log(req.body);
    let payload = {};
    try {
        console.log("Attempting to save");
        const existingWP = await WaypointsModel.findOne({location});

        if (existingWP) {
            return res.status(403).send({error: {message: "Waypoint already exists"}});
        } 
        //const data = await WaypointsModel.create({title, location, address_string, city, region, country});
        const wp = new WaypointsModel({title, location, address_string, city, region, country});
        await wp.save();
        payload = wp.toJSON();
    } catch (error) {
        return res.status(500).send({"error": error});
    } 

    return res.status(201).send(payload);
});


module.exports = router;