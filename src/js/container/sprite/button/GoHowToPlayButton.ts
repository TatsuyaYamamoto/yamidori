import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GoHowToPlayButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoHowToPlay).texture);
    }
}

export default GoHowToPlayButton;
