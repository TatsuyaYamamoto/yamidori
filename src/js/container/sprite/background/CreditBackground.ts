import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';

/**
 * @class
 */
class CreditBackground extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.backgroundCredit).texture);
    }
}

export default CreditBackground;
