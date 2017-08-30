import {Container} from 'pixi.js';

import ViewState from "./ViewState";

class TopViewState implements ViewState {
    public static TAG = "TopViewState";

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${TopViewState.TAG}@onEnter`);
    }

    onExit(): void {
        console.log(`${TopViewState.TAG}@onExit`);
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
    }
}

export default TopViewState;
