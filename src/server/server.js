const bodyParser = require("body-parser");
const express = require('express')

const port = 8000

const app = express()

// Initialize the main project folder
app.use(express.static('dist'))

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.post('/trips', function (req, res) {
    console.log(req.body)
    // TODO: Build an object getting the data from the external APIs
    res.send({
        status: 'ok'
    });
});

app.listen(port, function () {
    console.log(`app listening on port ${port}!`)
});