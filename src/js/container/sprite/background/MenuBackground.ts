import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';
import {getCurrentViewSize, getScale} from "../../../utils";

/**
 * @class
 */
class MenuBackground extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.backgroundMenu).texture);

        const scale = getScale();
        this.scale.set(scale, scale);
    }
}

export default MenuBackground;
