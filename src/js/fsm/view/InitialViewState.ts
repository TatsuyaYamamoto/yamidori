import {Container} from 'pixi.js';

import {isIOS} from "../../utils";
import {Events} from "../ApplicationState";
import {dispatchEvent} from '../EventUtils';
import ViewState from "./ViewState";

class InitialViewState implements ViewState {
    public static TAG = "InitialViewState";

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

        // TODO: Check login?
        // TODO: Setup screen scale?
        // TODO: Others.

        if (isIOS()) {
            // TODO: Show information prompting to tap.

            window.addEventListener("touchstart", this._handleGoNextStateAction);
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
            window.removeEventListener("touchstart", this._handleGoNextStateAction);
        }
    }

    /**
     * Get pixi container.
     *
     * @return {TopViewContainer}
     * @override
     */
    public getContainer = (): Container => {
        // TODO: implement
        return null;
    };

    private _handleGoNextStateAction(): void {
        dispatchEvent(Events.INITIALIZED);
    }
}

export default InitialViewState;
