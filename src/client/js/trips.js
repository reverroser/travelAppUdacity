import axios from 'axios';
import moment from 'moment-timezone';

const tripsEndpoint = 'http://localhost:8000/trips';
const tripsContainer = document.getElementById('tripsContainer');

const deleteTrip = async (id, tripEl) => {
    try {
        await axios.delete(tripsEndpoint, {
            params: {
                id
            }
        });
        tripEl.remove();
        M.toast({ html: 'Trip removed succesfully' })
    } catch (error) {
        M.toast({ html: 'Error deleting trip, try again later' })
    }
};

const renderTrip = async ({ date, destination, id, imageURL, weather }, i) => {
    const weatherIcon = weather ? await import(`../assets/weatherIcons/${weather.icon}.png`) : 'a01d';

    const tripHTML = `
        <div class="col s12 m6">
            <div class="card">
                <div class="card-image" style="background: url(${imageURL}); background-position: center center; background-size: cover;">
                    <div class="card-title">
                        ${destination}
                    </div>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div class="trip-date">
                            <div class="trip-date__date">
                                ${moment(date).format('DD/MM/YYYY')}
                            </div>
                            <div class="trip-date__away grey-text">
                                ${moment(date).fromNow()}
                            </div>
                        </div>
                        <div class="trip-weather">
                            <img src="${weatherIcon.default}" />
                        </div>
                    </div>
                    <a id="deleteTrip${i}" class="delete-btn btn-floating waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
        </div>
    `;

    const tripEl = document.createElement('div');
    tripEl.innerHTML = tripHTML;
    tripsContainer.appendChild(tripEl);
    document.getElementById(`deleteTrip${i}`).onclick = ((tripId, el) => () => deleteTrip(tripId, el))(id, tripEl);
};

export const createTrip = async () => {
    const createTripModalEl = document.getElementById('createTripModal');
    const createTripModalInstance = M.Modal.getInstance(createTripModalEl);
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    try {
        const { data } = await axios.post(tripsEndpoint, {
            destination,
            date: moment(date).toISOString(),
        });
        renderTrip(data);
        createTripModalInstance.close();
        // Reset form values
        document.getElementById('destination').value = null;
        document.getElementById('date').value = null;
        M.toast({ html: 'Trip created succesfully' })
    } catch (error) {
        M.toast({ html: 'Error! Enter valid date and destination' })
    }
}

export const loadTrips = async () => {
    try {
        const { data } = await axios.get(tripsEndpoint);
        data.forEach(renderTrip);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}
