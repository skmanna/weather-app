require('dotenv').config({path: 'variables.env'});

const app = require('./app');

const port = parseInt(process.env.PORT) || 3000
app.listen(port, () => {
    console.log(`App listening on ${port}`);
})
