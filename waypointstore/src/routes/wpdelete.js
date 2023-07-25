const express = require('express');
const router = express.Router();
const WaypointsModel = require('../models/waypoint');
const mongoose = require('mongoose');


router.delete('/api/waypoints/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log("Delete service called");
    try {
        const resp = await WaypointsModel.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
        console.log("Delete called");
        //console.log(resp.body);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        console.log("Exception caught");
        return res.status(500).send({error: error});
    }
});

module.exports = router;

