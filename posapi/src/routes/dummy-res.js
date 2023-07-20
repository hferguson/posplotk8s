const express = require('express');
const router = express.Router();

router.get('/dummy', async (req, res) => {
    const now = new Date();
    const payload = {"datestamp": now};
    console.log("Dummy route called");
    res.status(200).send(payload);
});

console.log("Exporting dummy route...");
module.exports = router;