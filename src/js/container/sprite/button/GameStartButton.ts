import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GameStartButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGameStart).texture);
    }
}

export default GameStartButton;
