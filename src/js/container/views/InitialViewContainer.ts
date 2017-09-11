import {Container} from 'pixi.js';

import Text from "../sprite/text/Text";

import {getCurrentViewSize, getString} from "../../utils";
import {Ids} from "../../resources/string";

class InitialViewContainer extends Container {
    private _tapInfo: Text;

    constructor() {
        super();

        const {width, height} = getCurrentViewSize();

        this._tapInfo = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfo.position.set(width * 0.5, height * 0.5);

        this.addChild(this._tapInfo)
    }
}

export default InitialViewContainer;
