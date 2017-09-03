import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GoBackHomeButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoBackHome).texture);
    }
}

export default GoBackHomeButton;
