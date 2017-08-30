/**
 * @fileOverview Entry point of the app.
 * create root application state and ticker.
 *
 * @author Tatsuya Yamamoto
 */
import ApplicationState from "./fsm/ApplicationState";

/**
 * Root application state;
 * @type {any}
 */
const rootState = new ApplicationState();

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
        rootState.update(deltaTime);
    });
}

// Fire init() on page loaded.
window.addEventListener('load', init);
