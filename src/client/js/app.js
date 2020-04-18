import axios from 'axios';
import moment from 'moment-timezone';

const tripsEndpoint = 'http://localhost:8000/trips';
const tripsContainer = document.getElementById('tripsContainer');

const renderTrip = async ({ date, destination, id, imageURL, weather }, i) => {
    const weatherIcon = await import(`../assets/weatherIcons/${weather.icon}.png`);

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

    document.getElementById(`deleteTrip${i}`).onclick = async () => {
        await axios.delete(tripsEndpoint, {
            params: {
                id
            }
        });
        tripEl.remove();
    };
};

window.onload = async () => {
    const { data } = await axios.get(tripsEndpoint);
    data.forEach(renderTrip);
};;

document.addEventListener('DOMContentLoaded', () => {
    // Init Materialize css modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Init Materialize css date pickers
    const datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers, {
        minDate: moment().add('days', 1).toDate(),
    });
});

document.getElementById('save-trip-button').onclick = async () => {
    const createTripModalEl = document.getElementById('createTripModal');
    const createTripModalInstance = M.Modal.getInstance(createTripModalEl);
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    const { data } = await axios.post(tripsEndpoint, {
        destination,
        date: new Date(date).toISOString(),
    });

    renderTrip(data);

    createTripModalInstance.close();
}

