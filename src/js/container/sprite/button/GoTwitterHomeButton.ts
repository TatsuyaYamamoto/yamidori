import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GoTwitterHomeButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoBackHome).texture);
    }
}

export default GoTwitterHomeButton;
