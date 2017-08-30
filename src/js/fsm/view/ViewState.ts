import {Container} from 'pixi.js';

import State from "../internal/State";

/**
 * @interface
 */
interface ViewState extends State {
    getContainer(): Container;
}

export default ViewState;
