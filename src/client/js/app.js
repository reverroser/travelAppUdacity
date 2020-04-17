document.addEventListener('DOMContentLoaded', function () {
    // Init Materialize css modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Init Materialize css date pickers
    const datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers);
});

document.getElementById('save-trip-button').onclick = () => {
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    console.log(destination, date);
}

