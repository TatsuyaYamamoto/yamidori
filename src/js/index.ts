/**
 * @fileOverview Entry point of the app.
 * create root application state and ticker.
 *
 * @author Tatsuya Yamamoto
 */
import ApplicationState from "./fsm/ApplicationState";
import {getCurrentViewSize} from "./helper/utils";

import 'whatwg-fetch';

/**
 * Initial window size.
 */
const {width, height} = getCurrentViewSize();

/**
 * Root application state;
 * @type {any}
 */
const rootState = new ApplicationState({width, height});

/**
 * Main game element.
 *
 * @type {HTMLElement|any}
 */
const mainElement: HTMLElement = document.getElementById('main');

/**
 * Initialize the application.
 */
function init() {
    console.info("Welcome Toridori!");
    mainElement.appendChild(<Node>rootState.view);

    rootState.onEnter();
    rootState.ticker.add((deltaTime: number) => {
        rootState.update(rootState.ticker.elapsedMS);
    });
}

// Fire init() on page loaded.
window.addEventListener('load', init);
