import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";
import {getCurrentViewSize} from "../../../utils";

class GameStartButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGameStart).texture);

        const {width, height} = getCurrentViewSize();
        this.position.set(width / 2, height / 2)
    }
}

export default GameStartButton;
