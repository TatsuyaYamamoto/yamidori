import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class SoundButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonSound).texture);
    }
}

export default SoundButton;
