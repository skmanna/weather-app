const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    place_id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    geometry: {
        type: { type: String, default: 'Point'},
        coordinates: { type: [Number], index: '2dsphere' },
    },
    watched: { type: Boolean, default: true },
    last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('location', LocationSchema);
