/**
 * @fileOverview Entry point of the app.
 * create root application state and ticker.
 *
 * @author Tatsuya Yamamoto
 */
import ApplicationState from "./fsm/ApplicationState";
import {getCurrentViewSize} from "./helper/utils";
import {initI18n} from './helper/i18n';
import resources from './resources/string';
import {SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE} from "./Constants";

import 'whatwg-fetch';


/**
 * Initialize the application.
 */
function init() {
    console.info("Welcome Toridori!");

    // Initialize internationalization.
    initI18n(
        resources,
        SUPPORTED_LANGUAGES,
        DEFAULT_LANGUAGE
    );

    const mainElement: HTMLElement = document.getElementById('main');
    const rootState = new ApplicationState(getCurrentViewSize());

    // set application viewer.
    mainElement.appendChild(<HTMLElement>rootState.view);

    // start application.
    rootState.onEnter();

    // start application tick.
    rootState.ticker.add((deltaTime: number) => {
        rootState.update(rootState.ticker.elapsedMS);
    });
}

// Fire init() on page loaded.
window.addEventListener('load', init);
