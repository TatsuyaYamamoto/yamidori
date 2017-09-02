import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';
import {getCurrentViewSize, getScale} from "../../../utils";

/**
 * @class
 */
class Background extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.background).texture);

        const scale = getScale();
        this.scale.set(scale, scale);
    }
}

export default Background;
