const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');
const mongoose = require('mongoose');



router.get('/api/waypoints/get/:id', async (req, res) => {
    const id = req.params.id;
    let wp;
    let statusCode = 200;
    const errObj = {};
    console.log("Get by ID called");
    try {
        wp = await WaypointsModel.findById({_id: new mongoose.Types.ObjectId(id)});

        
    } catch(error) {
        console.log(error);
        errObj['error'] = error;
        statusCode = 400;
        return res.status(400).send({error: error});
    } 
    if (wp != undefined) {
        res.status(200).send(wp.toJSON());
    } else {
        res.status(404).send("not found")
    }
    
});

module.exports = router;