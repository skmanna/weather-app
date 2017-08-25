const express = require('express');
const Location = require('../models/location');

exports.addLocation = (req, res) => {
    // console.log("Req:", req.body);
    const location = new Location({
        place_id: req.body.placeId,
        name: req.body.name,
        address: req.body.address,
        geometry: {
            type: 'Point',
            coordinates: [req.body.lng, req.body.lat].map(parseFloat)
        }
    })
    location.save()
        .then(location => {
            res.json(req.body);
        })
        .catch(err => {
            res.json({err: "could not save record"});
        });

}
exports.removeLocation = (req, res) => {
    res.send('In removeLocation');
}
