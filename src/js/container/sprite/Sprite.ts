import {Sprite as PixiSprite, Texture} from 'pixi.js';

import {getScale} from "../../helper/utils";

abstract class Sprite extends PixiSprite {
    public constructor(texture: Texture) {
        super(texture);
        this.anchor.set(0.5);
        this.scale.set(getScale());
    }
}

export default Sprite;
