import {Sprite} from 'pixi.js';

import {loadTexture} from "../../../helper/AssetLoader";
import {Ids} from '../../../resources/image';

/**
 * @class
 */
class Background extends Sprite {
    public constructor() {
        super(loadTexture(Ids.BACKGROUND));
    }
}

export default Background;
