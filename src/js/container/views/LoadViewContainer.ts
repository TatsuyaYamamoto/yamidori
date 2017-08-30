import {Container} from 'pixi.js';

import Text from "../sprite/text/Text";

class LoadViewContainer extends Container {
    private _loadingInfoText;

    constructor() {
        super();

        this._loadingInfoText = new Text('Now loading...');
        this._loadingInfoText.x = 300;
        this._loadingInfoText.y = 300;

        this.addChild(this._loadingInfoText)
    }
}

export default LoadViewContainer;
