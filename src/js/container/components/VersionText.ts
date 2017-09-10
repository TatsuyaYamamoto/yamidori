import {Container} from 'pixi.js';
import Text from "../sprite/text/Text";
import {getCurrentViewSize} from "../../utils";

import * as packageJson from '../../../../package.json';

class VersionText extends Container {
    private _text: Text;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._text = new Text(`v${(<any>packageJson).version}`, {
            fontSize: 20,
        });

        this.addChild(
            this._text,
        );
    }

}

export default VersionText;
