const express = require('express');
const axios = require('axios');

exports.landing = (req, res) => {
    const title = 'Weather Monitor';
    const location = 'Thane';
    const key = process.env.MAP_KEY;

    res.render('index', { title, location, key });
}
exports.getWeatherByCoords = (req, res) => {
    // console.log(`${req.params.lat}/${req.params.lng}`);
    const url = `${process.env.WEATHER_URL}/${req.params.lat},${req.params.lng}?units=${process.env.WEATHER_UNITS}`;
    // console.log(url);
    axios.get(url)
        .then(response => {
            const currentData = {
                placeId: req.params.id,
                name: req.params.name,
                address: req.params.address,
                lat: req.params.lat,
                lng: req.params.lng,
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
            res.json(currentData);
        });
}
exports.getWeatherForAll = (req, res) => {
    res.send('In getWeatherForAll');
}
