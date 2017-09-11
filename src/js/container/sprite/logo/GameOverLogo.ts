import Sprite from "../Sprite";
import manifest from '../../../resources/manifest';
import Container = PIXI.Container;

/**
 * @class
 */
class GameOverLogo extends Container {
    public constructor() {
        super();

        const gameOverLogo = Sprite.fromImage(manifest.logoGameOver);
        gameOverLogo.anchor.set(0.5);
        gameOverLogo.y = gameOverLogo.height * 1.3;

        const gameOverImage = Sprite.fromImage(manifest.logoGameOverImage);
        gameOverImage.anchor.set(0.5);

        this.addChild(
            gameOverImage,
            gameOverLogo,
        );
    }
}

export default GameOverLogo;
