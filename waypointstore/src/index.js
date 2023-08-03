const mongoose = require('mongoose');
const app  = require('./app');
require('dotenv').config();
const start = async () => {
  console.log("Waypoint service Starting up...");
  
  if (!process.env.MONGO_URI && !process.env.MONGO_URL) {
    //console.log(process.env);
    throw new Error('No MONGO_URI env variable set');

  }
  try {
    console.log(`Connecting with Mongo URI ${process.env.MONGO_URI}, and ${process.env.MONGO_USER}`);
    const dbURL = process.env.MONGO_URI || process.env.MONGO_URL;
    console.log(`Connecting to database using URI ${dbURL}`);
    await mongoose.connect(dbURL);  // No options since v6
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Exception caught while connecting to database");
    console.error(err);
  }
  
  app.listen(3000, () => {
    console.log("Startup complete");
    console.log("Waypoint service listening on port 3000");
  });
}


// DB startup
start();