const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const tripsHelper = require('./tripsHelper');

const app = express();
const port = 8000;

// Routes
const mainRoute = '/';
const tripsRoute = '/trips';

// Enable env variables
dotenv.config()

// Initialize the main project folder
app.use(express.static('dist'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

// Main
app.get(mainRoute, function (req, res) {
    res.sendFile('dist/index.html')
});

// Trips
app.get(tripsRoute, function (req, res) {
    const trips = tripsHelper.getTrips();
    res.json(trips)
});

app.post(tripsRoute, async function (req, res) {
    try {
        const trip = await tripsHelper.postTrip(req.body);
        res.json(trip);
    } catch (error) {
        res.status(400).send(error)
    }
});

app.delete(tripsRoute, function (req, res) {
    const tripId = req.query.id;
    tripsHelper.deleteTrip(tripId);
    res.json({
        id: tripId
    });
});

app.listen(port, function () {
    console.log(`app listening on port ${port}!`)
});
