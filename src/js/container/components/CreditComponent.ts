import {Container} from 'pixi.js';
import {getCurrentViewSize, isSupportTouchEvent} from "../../helper/utils";
import Text from "../sprite/text/Text";

class CreditComponent extends Container {
    private _name: Text;
    private _url: Text;

    constructor(nameAndRole: string, url: string) {
        super();
        const {width, height} = getCurrentViewSize();

        this._name = new Text(nameAndRole, {
            fontSize: 20,
        });
        this._name.y -= this._name.height * 0.5;
        this._url = new Text(url, {
            fontSize: 20,
        });
        this._url.y += this._url.height * 0.5;

        this.addChild(
            this._name,
            this._url,
        );

        this.buttonMode = true;
        this.interactive = true;
        this.on(isSupportTouchEvent() ? 'touchstart' : 'click', () => window.location.href = url);
    }

}

export default CreditComponent;
