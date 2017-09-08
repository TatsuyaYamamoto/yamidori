import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class BackToTopButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGameRestart).texture);
    }
}

export default BackToTopButton;
