import {Sprite, Texture, interaction} from 'pixi.js';

/**
 * @interface
 */
export interface OnClickListener {
    onClick(event: interaction.InteractionEvent): void;
}

/**
 * @class
 */
abstract class ClickableSprite extends Sprite {
    private _onClickListener: OnClickListener;

    public constructor(texture: Texture) {
        super(texture);

        this.anchor.set(0.5);
        this.interactive = true;
        this.on('pointerdown', this._handleOnPointerDown);
    }

    /**
     * Set to {@link _onClickListener}
     *
     * @param listener
     */
    public setOnClickListener(listener: OnClickListener) {
        this._onClickListener = listener;
    }

    /**
     * Event callback function for pointerdown.
     *
     * @param event
     * @private
     */
    private _handleOnPointerDown = (event: interaction.InteractionEvent) => {
        if (this._onClickListener) {
            this._onClickListener.onClick(event);
        }
    }
}

export default ClickableSprite;
