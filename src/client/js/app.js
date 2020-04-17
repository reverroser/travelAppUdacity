document.addEventListener('DOMContentLoaded', function () {
    // Init Materialize css modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Init Materialize css date pickers
    const datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers);
});

document.getElementById('save-trip-button').onclick = async () => {
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    // fetch POST method here
    // console.log(destination, date);

    const response = await fetch('http://localhost:8000/trips', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            destination,
            date: new Date(date).toISOString(),
        }),
    })
    console.log(response);
}

