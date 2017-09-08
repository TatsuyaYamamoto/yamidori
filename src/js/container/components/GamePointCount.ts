import {Container, Graphics} from 'pixi.js';
import Sprite from "../sprite/Sprite";
import Kotori from "../sprite/character/Kotori";
import Text from "../sprite/text/Text";
import {getCurrentViewSize} from "../../utils";

class GamePointCount extends Container {
    private _point: number = 0;
    private _kotoriIcon: Sprite;
    private _text: Text;
    private _roundedRectangle: Graphics;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._kotoriIcon = new Kotori();
        this._kotoriIcon.scale.set(this._kotoriIcon.scale.x * 0.3);
        this._kotoriIcon.position.x = -1 * this._kotoriIcon.width * 0.5;

        this._text = new Text(`× ${this._point}`);
        this._text.position.x = this._text.width * 0.5;

        this._roundedRectangle = new Graphics();
        this._roundedRectangle.beginFill(0x001111, 0.25);
        this._roundedRectangle.drawRoundedRect(-1 * width * 0.08, -1 * height * 0.05, width * 0.16, height * 0.1, 15);
        this._roundedRectangle.endFill();
        
        this.addChild(
            this._roundedRectangle,
            this._kotoriIcon,
            this._text,
        );
    }

}

export default GamePointCount;