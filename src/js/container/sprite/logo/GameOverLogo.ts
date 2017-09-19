import {Sprite, Container} from 'pixi.js';

import manifest from '../../../resources/image';
import {loadTexture} from "../../../helper/AssetLoader";

/**
 * @class
 */
class GameOverLogo extends Container {
    public constructor() {
        super();

        const gameOverLogo = new Sprite(loadTexture(manifest.logoGameOver));
        gameOverLogo.anchor.set(0.5);
        gameOverLogo.y = gameOverLogo.height * 1.6;

        const gameOverImage = new Sprite(loadTexture(manifest.logoGameOverImage));
        gameOverImage.anchor.set(0.5);

        this.addChild(
            gameOverImage,
            gameOverLogo,
        );
    }
}

export default GameOverLogo;
