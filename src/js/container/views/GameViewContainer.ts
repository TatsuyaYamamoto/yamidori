import {Container} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import Background from "../sprite/background/Background";

class GameViewContainer extends ViewContainer {
    private _backgroundLayer: Container;
    private _background: Background;

    constructor() {
        super();
        this._backgroundLayer = new Container();
        this._background = new Background();
        this._backgroundLayer.addChild(this._background);

        this.addChild(this._backgroundLayer);
    }
}

export default GameViewContainer;
