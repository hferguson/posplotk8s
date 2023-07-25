const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;

// Create a new schema to manage waypoints
// a waypoint consists of a location (lat,lon), and some optional address
// info

const WaypointSchema = new Schema( {
    title: {
        type: String, 
        default: 'Generic waypoint'
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
    },
    address_string: {
        type: String, 
        default: 'Unknown'
    },
    city: {
        type: String, 
        default: 'Unknown'
    },
    region: {
        // represents a state, province, territory, or administrative region
        type: String, 
        default: 'Unknown'
    }, 
    country: {
        type: String, 
        default: 'Unknown'
    }
    
}, {
    // Currently this doesn't work
    toJSON: {
        // Align client friendly id property with internal _id and get rid of internal __v
        // flag for versions
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

const WaypointsModel = mongoose.model('waypoints', WaypointSchema);
module.exports = WaypointsModel;
