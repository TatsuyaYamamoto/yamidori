import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import ClickableSprite from "../ClickableSprite";

class Kotori extends ClickableSprite {
    public constructor(isRight: boolean = true) {
        super(Sprite.fromImage(isRight ? manifest.kotoriRight : manifest.kotoriLeft).texture);

        this.buttonMode = true;
    }

    public start(): void {
        // TODO: implement
    }
}

export default Kotori;
