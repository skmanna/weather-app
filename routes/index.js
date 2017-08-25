const express = require('express');
const Weather = require('../controllers/weather');
const Location = require('../controllers/location');

const router = express.Router();

router.get('/', Weather.landing);
router.get('/weather/:id')
router.get('/weather/:id/:name/:address/:lat/:lng', Weather.getWeatherByCoords);
router.get('/weather', Weather.getWeatherForAll);
router.post('/location/add', Location.addLocation);
router.post('/location/remove', Location.removeLocation);

module.exports = router;
