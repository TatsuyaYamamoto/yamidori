import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";
import {getCurrentViewSize} from "../../../utils";

class GameRestartButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGameRestart).texture);

        const {width, height} = getCurrentViewSize();
        this.position.set(width / 2, height / 2)
    }
}

export default GameRestartButton;
