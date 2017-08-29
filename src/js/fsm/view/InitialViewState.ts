import State from "../internal/State";
import {isIOS} from "../../utils";
import {Events} from "../ApplicationState";
import {dispatchEvent} from '../EventUtils';

class InitialViewState implements State {
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

    private _handleGoNextStateAction(): void {
        dispatchEvent(Events.INITIALIZED);
    }
}

export default InitialViewState;
