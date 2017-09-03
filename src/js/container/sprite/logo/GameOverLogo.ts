import Sprite from "../Sprite";
import manifest from '../../../resources/manifest';

/**
 * @class
 */
class Background extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.logoGameOver).texture);
    }
}

export default Background;
