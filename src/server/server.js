const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const { v1: uuidv1 } = require('uuid');

const app = express();
const port = 8000;
let trips = [];

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

// Methods
function initWebClient(req, res) {
    res.sendFile('dist/index.html')
}

function getTrips(req, res) {
    res.json(trips);
}

async function postTrip(req, res) {
    const { date, destination } = req.body;
    const encodedDestination = encodeURIComponent(destination);

    try {
        let trip = {
            id: uuidv1(),
            date,
            destination,
        };

        // Get destination image
        const { data: { hits } } = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodedDestination}&image_type=photo`);
        trip.imageURL = hits[0].webformatURL;

        // Get destination coords
        const { data: { geonames } } = await axios.get(`http://api.geonames.org/searchJSON?q=${encodedDestination}&maxRows=10&fuzzy=0.8&username=${process.env.GEONAMES_USERNAME}`);
        const { lat, lng } = geonames[0];

        // Get destination weather
        const { data: { data } } = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`);
        trip.weather = data[0].weather;

        trips.push(trip);

        res.json(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

function deleteTrip(req, res) {
    const newTrips = trips.filter(({ id }) => id !== req.query.id);
    trips = newTrips;
    res.json({
        id: req.query.id
    });
}

// Main
app.get(mainRoute, initWebClient);

// Trips
app.get(tripsRoute, getTrips);
app.post(tripsRoute, postTrip);
app.delete(tripsRoute, deleteTrip);

app.listen(port, function () {
    console.log(`app listening on port ${port}!`)
});