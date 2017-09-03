import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GoCreditButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoCredit).texture);
    }
}

export default GoCreditButton;
