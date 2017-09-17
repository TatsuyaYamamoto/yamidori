import {Sprite} from 'pixi.js';
import manifest from '../../../resources/manifest';

/**
 * @class
 */
class Background extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.background).texture);
    }
}

export default Background;
