import {Container, Graphics} from 'pixi.js';
import Text from "../sprite/text/Text";
import {getCurrentViewSize} from "../../utils";

class UsageTapTargetInfo extends Container {
    private _text: Text;
    private _roundedRectangle: Graphics;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._text = new Text(" ↑ \nTap!");
        this._text.position.x = this._text.width * 0.5;

        this._roundedRectangle = new Graphics();
        this._roundedRectangle.beginFill(0x001111, 0.25);
        this._roundedRectangle.drawRoundedRect(-1 * width * 0.08, -1 * height * 0.05, width * 0.3, height * 0.3, 15);
        this._roundedRectangle.endFill();

        this.addChild(
            // this._roundedRectangle,
            this._text,
        );
    }

}

export default UsageTapTargetInfo;
