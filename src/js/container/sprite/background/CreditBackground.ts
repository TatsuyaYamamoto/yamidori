import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';
import {getCurrentViewSize, getScale} from "../../../helper/utils";

/**
 * @class
 */
class CreditBackground extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.backgroundCredit).texture);

        const scale = getScale();
        this.scale.set(scale, scale);
    }
}

export default CreditBackground;
