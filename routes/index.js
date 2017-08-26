const express = require('express');
const Weather = require('../controllers/weather');
const Location = require('../controllers/location');

const router = express.Router();

router.get('/', Weather.landing);
router.get('/weather/:id/:lat/:lng/:name/:address', Weather.getWeatherByCoords);
router.get('/weather', Weather.getWeatherForAll);
router.post('/location/add', Location.addLocation);
router.delete('/location/:id', Location.removeLocation);

module.exports = router;
