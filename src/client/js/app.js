import moment from 'moment-timezone';

import { createTrip, loadTrips } from './trips';

export default () => {
    // Init Materialize css modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Init Materialize css date pickers
    const datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers, {
        minDate: moment().add('days', 1).toDate(),
    });

    // Add a click listener to the save button
    document.getElementById('save-trip-button').onclick = createTrip;

    loadTrips();
}

