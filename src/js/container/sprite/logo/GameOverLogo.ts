import {Container} from 'pixi.js';

import Sprite from "../Sprite";

import manifest from '../../../resources/manifest';
import {getScale} from "../../../helper/utils";

/**
 * @class
 */
class GameOverLogo extends Container {
    public constructor() {
        super();
        this.scale.set(getScale());

        const gameOverLogo = Sprite.fromImage(manifest.logoGameOver);
        gameOverLogo.anchor.set(0.5);
        gameOverLogo.y = gameOverLogo.height * 1.6;

        const gameOverImage = Sprite.fromImage(manifest.logoGameOverImage);
        gameOverImage.anchor.set(0.5);

        this.addChild(
            gameOverImage,
            gameOverLogo,
        );
    }
}

export default GameOverLogo;
