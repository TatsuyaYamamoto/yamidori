import {Sprite} from 'pixi.js';

import {loadTexture} from "../../../helper/AssetLoader";
import manifest from '../../../resources/image';

/**
 * @class
 */
class Background extends Sprite {
    public constructor() {
        super(loadTexture(manifest.background));
    }
}

export default Background;
