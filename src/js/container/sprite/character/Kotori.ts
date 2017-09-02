import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import ClickableSprite from "../ClickableSprite";

enum Speed {
    LOW = 0.2,
    MIDDLE = 0.5,
    HIGH = 1
}

class Kotori extends ClickableSprite {
    // TODO implement direction enum.
    private _isRight: boolean;
    private _id: number;
    private _speed: Speed;

    public constructor(isRight: boolean = true) {
        super(Sprite.fromImage(isRight ? manifest.kotoriRight : manifest.kotoriLeft).texture);

        this.buttonMode = true;
        this._isRight = isRight;
        this._id = Date.now();
        this._speed = Speed.LOW
    }

    /**
     * Get identifier of the instance.
     *
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Return true if these direction is right.
     *
     * @return {boolean}
     */
    public get isRight(): boolean {
        return this._isRight;
    }

    /**
     * Move to the direction of x axis.
     *
     * @param elapsedTime
     */
    public move(elapsedTime: number): void {
        const direction = this._isRight ? 1 : -1;

        this.position.x += this._speed * elapsedTime * direction;
    }

    /**
     * Destroy kotori-chun.
     * Before {@link this#destroy} decrement alpha.
     */
    public destroyByTap(): void {
        Promise.resolve()
            .then(() => {
                return new Promise((resolve) => {
                    this.startAlphaDecrementLoop(resolve);
                })
            })
            .then(() => this.destroy());
    }

    private startAlphaDecrementLoop(callback) {
        setTimeout(() => {
            this.alpha -= 0.2;

            if (this.alpha > 0) {
                this.startAlphaDecrementLoop(callback);
            } else {
                callback();
            }
        }, 33); // 1000 ms / 30FPS
    }
}

export default Kotori;
