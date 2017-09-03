import {interaction} from 'pixi.js';

import Sprite from "./Sprite";

/**
 * @class
 */
abstract class ClickableSprite extends Sprite {
    /**
     * Set to {@link _onClickListener}
     *
     * @param fn
     */
    public setOnClickListener(fn: (event: interaction.InteractionEvent) => void) {
        this.interactive = true;
        this.on('touchstart', fn);
    }
}

export default ClickableSprite;
