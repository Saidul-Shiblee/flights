const { Schema, model } = require('mongoose');

const destinationSchema = new Schema (
    {
        airport: {
            type: String,
            enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'],
        },
        arrival: {
            type: Date,
        },
    });

// HELP: Need to use destination properties by importing the destination schema?

// Flight Model with properties
// Part 2: MongoDB
// Create Airport and Destination properties (destinationSchema)
const flightSchema = new Schema(   
    {
        airline: {
            type: String,
            enum: ['American', 'Southwest', 'United'],
            required: true,
        },
        flightNo: {
            type: Number,
            min: 10,
            max: 9999,
            required: true,
        },
        departs: {
            type: Date,
            default: function () {
                    const oneYearFromNow = new Date();
                    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                    return new Date(oneYearFromNow)
            }
        },
        // Part 2: MongoDB
        //  Created airport and destination properties
        // Set Default airport location to SAN
        airport: {
            type: String,
            enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'],
        },
        destinations: [destinationSchema],
        },
        // destinations set up below if there was another schema created for destination.js
        // type: [Schema.Types.ObjectID], 
        // ref: 'Destination',
    {
        timestamps: true,
    }
);
const Flight = model('Flight', flightSchema);
module.exports = Flight;