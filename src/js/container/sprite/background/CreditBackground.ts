import {Sprite} from 'pixi.js';

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';

/**
 * @class
 */
class CreditBackground extends Sprite {
    public constructor() {
        super(loadTexture(Ids.BACKGROUND_CREDIT));
    }
}

export default CreditBackground;
