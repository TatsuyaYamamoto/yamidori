import {Container} from 'pixi.js';

import State from "../internal/State";

/**
 * @interface
 */
interface ViewState extends State {
    /**
     * Get pixi container that the view state has.
     */
    getContainer(): Container;
}

export default ViewState;
