import {Sprite, Texture, interaction} from 'pixi.js';

/**
 * @class
 */
abstract class ClickableSprite extends Sprite {
    public constructor(texture: Texture) {
        super(texture);

        this.anchor.set(0.5);
    }

    /**
     * Set to {@link _onClickListener}
     *
     * @param fn
     */
    public setOnClickListener(fn: (event: interaction.InteractionEvent) => void) {
        this.interactive = true;
        this.on('pointerdown', fn);
    }
}

export default ClickableSprite;
