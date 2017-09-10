import {Container} from 'pixi.js';

import {isIOS, isSupportTouchEvent} from "../../utils";
import {Events} from "../ApplicationState";
import {dispatchEvent} from '../EventUtils';
import ViewState from "./ViewState";
import InitialViewContainer from "../../container/views/InitialViewContainer";

class InitialViewState implements ViewState {
    public static TAG = "InitialViewState";

    private _container: InitialViewContainer;

    /**
     *
     * @param elapsedTime
     * @override
     */
    update(elapsedTime: number): void {

    }

    /**
     * @override
     */
    onEnter(): void {
        console.log(`${InitialViewState.TAG}@onEnter`);

        this._container = new InitialViewContainer();

        // TODO: Check login?
        // TODO: Setup screen scale?
        // TODO: Others.

        if (isIOS()) {
            // TODO: Show information prompting to tap.

            window.addEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this._handleGoNextStateAction);
        }
        else {
            this._handleGoNextStateAction();
        }
    }

    /**
     * @override
     */
    onExit(): void {
        console.log(`${InitialViewState.TAG}@onExit`);

        if (isIOS()) {
            window.removeEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this._handleGoNextStateAction);
        }
    }

    /**
     * Get pixi container.
     *
     * @return {TopViewContainer}
     * @override
     */
    public getContainer = (): Container => {
        return this._container;
    };

    private _handleGoNextStateAction(): void {
        dispatchEvent(Events.INITIALIZED);
    }
}

export default InitialViewState;
