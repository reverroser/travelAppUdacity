const axios = require('axios');
const { v1: uuidv1 } = require('uuid');

let trips = [];

function deleteTrip(tripId) {
    trips = trips.filter(({ id }) => id !== tripId);
    return trips;
}

function getTrips() {
    return trips;
}

async function postTrip({ date, destination }) {
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

        return trip;
    } catch (error) {
        return error;
    }
}

module.exports = {
    deleteTrip,
    getTrips,
    postTrip,
}