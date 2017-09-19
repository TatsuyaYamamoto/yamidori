import {Sprite} from 'pixi.js';

import manifest from '../../../resources/image';
import {loadTexture} from "../../../helper/AssetLoader";

/**
 * @class
 */
class CreditBackground extends Sprite {
    public constructor() {
        super(loadTexture(manifest.backgroundCredit));
    }
}

export default CreditBackground;
