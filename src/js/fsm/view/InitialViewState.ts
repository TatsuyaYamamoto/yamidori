import {Container} from 'pixi.js';

import ViewState from "./ViewState";

import Text from "../../container/sprite/text/Text";
import InitialViewContainer from "../../container/views/InitialViewContainer";

import {Events} from "../ApplicationState";
import {dispatchEvent} from '../EventUtils';
import {getCurrentViewSize, getString, isIOS, isSupportTouchEvent} from "../../utils";
import {Ids} from "../../resources/string";

class InitialViewState implements ViewState {
    public static TAG = "InitialViewState";

    private _container: InitialViewContainer;

    /**
     * @inheritDoc
     */
    update(elapsedTime: number): void {

    }

    /**
     * @inheritDoc
     */
    onEnter(): void {
        console.log(`${InitialViewState.TAG}@onEnter`);

        this._container = new InitialViewContainer();
        // TODO: Check login?

        if (isIOS()) {
            window.addEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this._handleGoNextStateAction);
        }
        else {
            this._handleGoNextStateAction();
        }
    }

    /**
     * @inheritDoc
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
