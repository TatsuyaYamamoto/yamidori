import Sprite from "../Sprite";

import manifest from '../../../resources/image';
import {loadTexture} from "../../../helper/AssetLoader";

/**
 * @class
 */
class TitleLogo extends Sprite {
    public constructor() {
        super(loadTexture(manifest.logoTitle));
    }
}

export default TitleLogo;
