import {Container} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import Background from "../sprite/background/Background";

class GameViewContainer extends ViewContainer {
    private _gameBackground: Background;

    constructor() {
        super();

        this._gameBackground = new Background();
        this.backGroundLayer.addChild(this._gameBackground);
    }
}

export default GameViewContainer;
