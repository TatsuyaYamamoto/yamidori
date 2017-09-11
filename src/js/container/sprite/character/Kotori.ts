import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import ClickableSprite from "../ClickableSprite";

export enum Speed {
    LOW = 0.3,
    MIDDLE = 0.45,
    HIGH = 0.58
}

export enum Direction {
    RIGHT,
    LEFT
}

interface ConstructorParams {
    direction?: Direction,
    speed?: Speed,
}

const DefaultConstructorParams: ConstructorParams = {
    direction: Direction.RIGHT,
    speed: Speed.LOW
};

class Kotori extends ClickableSprite {
    private _direction: Direction;
    private _id: number;
    private _speed: Speed;

    public constructor(params?: ConstructorParams) {
        params = Object.assign({}, DefaultConstructorParams, params);
        super(Sprite.fromImage(params.direction === Direction.RIGHT ? manifest.kotoriRight : manifest.kotoriLeft).texture);

        this.buttonMode = true;
        this._direction = params.direction;
        this._id = Date.now();
        this._speed = params.speed;
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
     * Get direction of the instance.
     *
     * @return {Direction}
     */
    public get direction(): Direction {
        return this._direction;
    }

    /**
     * Move to the direction of x axis.
     *
     * @param elapsedTime
     */
    public move(elapsedTime: number): void {
        const direction = this._direction === Direction.RIGHT ? 1 : -1;

        this.position.x += this._speed * elapsedTime * direction;
    }

    /**
     * Destroy kotori-chun.
     * Before {@link this#destroy} decrement alpha.
     */
    public destroyByTap(): void {
        this.interactive = false;

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
