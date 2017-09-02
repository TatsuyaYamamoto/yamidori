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
}

export default Kotori;
