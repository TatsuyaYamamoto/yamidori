import {Container} from 'pixi.js';

import Text from "../sprite/text/Text";

class InitialViewContainer extends Container {
    private _initialInfoText;

    constructor() {
        super();

        this._initialInfoText = new Text('Init!');

        this.addChild(this._initialInfoText)
    }
}

export default InitialViewContainer;
