/**
 * @fileOverview Entry point of the app.
 * create root application state and ticker.
 *
 * @author Tatsuya Yamamoto
 */
import ApplicationState from "./fsm/ApplicationState";
import {initI18n} from './framework/i18n';
import resources from './resources/string';
import {SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE} from "./Constants";

import 'whatwg-fetch';

const mainElement: HTMLElement = document.getElementById('main');
const app = new ApplicationState();

/**
 * Initialize the application.
 */
function init() {
    console.info("Welcome Yamidori!");

    // Initialize internationalization.
    initI18n(
        resources,
        SUPPORTED_LANGUAGES,
        DEFAULT_LANGUAGE
    );

    // set application viewer.
    mainElement.appendChild(<HTMLElement>app.view);

    // start application.
    app.start();
}

// Fire init() on page loaded.
window.addEventListener('load', init);
