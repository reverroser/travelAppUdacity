import { register } from 'register-service-worker';

// MaterializeCss
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import initApp from './js/app.js';

import './styles/main.scss';

window.onload = () => {
    initApp();
    register('/service-worker.js', {
        ready() {
            console.log('Service worker is active.')
        },
    });
}