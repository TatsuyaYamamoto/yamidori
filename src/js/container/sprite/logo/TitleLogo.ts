import Sprite from "../Sprite";
import manifest from '../../../resources/manifest';

/**
 * @class
 */
class TitleLogo extends Sprite {
    public constructor() {
        super(Sprite.fromImage(manifest.logoTitle).texture);
    }
}

export default TitleLogo;
