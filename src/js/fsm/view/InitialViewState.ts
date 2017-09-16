import {Container} from 'pixi.js';

import State from "../internal/State";

import ViewContainer from "../internal/ViewContainer";
import Text from "../../container/sprite/text/Text";

import {Events} from "../ApplicationState";
import {dispatchEvent} from '../EventUtils';
import {getString, isIOS, isSupportTouchEvent} from "../../helper/utils";
import {Ids} from "../../resources/string";

class InitialViewState extends ViewContainer implements State {
    public static TAG = "InitialViewState";

    private _tapInfo: Text;

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

        // TODO: Check login?

        if (isIOS()) {
            this._tapInfo = new Text(getString(Ids.TAP_DISPLAY_INFO));
            this._tapInfo.position.set(this.viewWidth * 0.5, this.viewHeight * 0.5);
            this.addChild(this._tapInfo);

            window.addEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this._handleGoNextStateAction);
        } else {
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

    private _handleGoNextStateAction(): void {
        dispatchEvent(Events.INITIALIZED);
    }
}

export default InitialViewState;
