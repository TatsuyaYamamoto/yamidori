import {Container} from 'pixi.js';

import ViewState from "./ViewState";
import TopViewContainer from "../../container/views/TopViewContainer";

class TopViewState implements ViewState {
    public static TAG = "TopViewState";

    private _container: TopViewContainer;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${TopViewState.TAG}@onEnter`);
        this._container = new TopViewContainer();
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
        return this._container;
    }
}

export default TopViewState;
