import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class BackToMenuButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoBackMenu).texture);
    }
}

export default BackToMenuButton;
