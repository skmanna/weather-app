require('dotenv').config({path: 'variables.env'});
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DB_PATH)
    .then(() => console.log('connected to DB'))
    .catch((err) => console.error('could not connect to DB\n', err));


const port = parseInt(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`App listening on ${port}`);
})
