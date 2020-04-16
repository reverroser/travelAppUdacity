document.addEventListener('DOMContentLoaded', function () {
    // Init Materialize css modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Init Materialize css date pickers
    const datePickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datePickers);
});