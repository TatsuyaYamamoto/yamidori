import {Container, Graphics} from 'pixi.js';

import Text from "../sprite/text/Text";

import {getCurrentViewSize, getString} from "../../helper/utils";
import {Ids} from "../../resources/string";

class UsageTextArea extends Container {
    private _text: Text;
    private _roundedRectangle: Graphics;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._text = new Text(getString(Ids.HOW_TO_PLAY_INFORMATION), {
            fontSize: 16,
        });

        const rectWidth = width * 0.6;
        const rectHeight = height * 0.4;

        this._roundedRectangle = new Graphics();
        this._roundedRectangle.beginFill(0x001111, 0.25);
        this._roundedRectangle.drawRoundedRect(-1 * rectWidth * 0.5, -1 * rectHeight * 0.5, rectWidth, rectHeight, 15);
        this._roundedRectangle.endFill();

        this.addChild(
            this._roundedRectangle,
            this._text,
        );
    }

}

export default UsageTextArea;
