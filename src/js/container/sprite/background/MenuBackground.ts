import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';

/**
 * @class
 */
class MenuBackground extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.backgroundMenu).texture);
    }
}

export default MenuBackground;
