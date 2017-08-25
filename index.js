require('dotenv').config({path: 'variables.env'});

const app = require('./app');
console.log("map Key " + process.env.MAP_KEY);
const port = parseInt(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`App listening on ${port}`);
})
