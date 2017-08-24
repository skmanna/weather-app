const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

module.exports = app;
