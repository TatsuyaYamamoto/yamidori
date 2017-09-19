import {Sprite} from 'pixi.js';

import manifest from '../../../resources/image';
import {loadTexture} from "../../../helper/AssetLoader";

/**
 * @class
 */
class MenuBackground extends Sprite {
    public constructor() {
        super(loadTexture(manifest.backgroundMenu));
    }
}

export default MenuBackground;
