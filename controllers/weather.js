const express = require('express');
const axios = require('axios');
const Location = require('../models/location');

getWeatherData = (placeId, lat, lng, name, address) => {
    const url = `${process.env.WEATHER_URL}/${lat},${lng}?units=${process.env.WEATHER_UNITS}`;
    return axios.get(url)               //return the promise
        .then(response => {
            const currentData = {
                placeId,
                lat,
                lng,
                name,
                address,
                timezone: response.data.timezone,
                time: new Date(response.data.currently.time),
                temperature: response.data.currently.temperature,
                apparentTemperature: response.data.currently.apparentTemperature,
                dewPoint: response.data.currently.dewPoint,
                humidity: response.data.currently.humidity,
                windSpeed: response.data.currently.windSpeed,
                windGust: response.data.currently.windGust,
                windBearing: response.data.currently.windBearing,
                cloudCover: response.data.currently.cloudCover,
                pressure: response.data.currently.pressure,
            }
            return currentData;
        })
}
exports.landing = (req, res) => {
    const title = 'Weather Monitor';
    const location = 'Thane';
    const key = process.env.MAP_KEY;

    res.render('index', { title, location, key });
}
exports.getWeatherByCoords = (req, res) => {
        getWeatherData(req.params.id, req.params.lat, req.params.lng, req.params.name, req.params.address)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
}
exports.getWeatherForAll = (req, res) => {
    //get all the locations where watched = true
    Location.find({ watched: true })
        .then(locations => {                //map raw location data into a friendly array
            return locations.map((loc) => {
                return {
                    placeId: loc.place_id,
                    lat: loc.geometry.coordinates[1], //in mongodb, the second item is lat
                    lng: loc.geometry.coordinates[0], //in mongodb, the first item is lng
                    name: loc.name,
                    address: loc.address
                }
            });
        })
        .then(locations => {
            locationPromises = locations.map(location => {
                return getWeatherData(location.placeId, location.lat, location.lng, location.name, location.address);
            });
            // console.log(locationPromises);
            Promise.all(locationPromises)
                .then(data => {
                    // console.log(data);
                    res.send(data);
                })
        })
        .catch(err => {
            res.send({err: 'Could not load/fetch watchlist data'});
        });
    //get id, lat, lng, name, address of each
    //call getWeatherData for each location

}
