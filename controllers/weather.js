const express = require('express');

exports.landing = (req, res) => {
    const title = 'Weather Monitor';
    const location = 'Thane';
    res.render('index', { title, location });
}
exports.getWeatherByCoords = (req, res) => {
    res.send('In getWeatherByCoords');
}
exports.getWeatherForAll = (req, res) => {
    res.send('In getWeatherForAll');
}
