import Sound from "pixi-sound/lib/Sound";

import State from "../../internal/State";

import ViewSectionContainer from "../../internal/ViewSectionContainer";
import Kotori, {Direction, Speed} from "../../../container/sprite/character/Kotori";
import GamePointCount from "../../../container/components/GamePointCount";

import {Events as GameEvents} from '../../view/GameViewState'
import {dispatchEvent} from '../../EventUtils';

import {getRandomInteger} from "../../../helper/utils";

import {loadSound} from "../../../helper/SoundManager";
import {clearGamePoint, getGamePoint, saveGamePoint} from "../../../helper/GlobalState";

import manifest from '../../../resources/manifest';
import {GAME_PARAMETERS} from "../../../Constants";

export const DEAD_ZONE_WIDTH_RATE = 0.4;

class PlayingGameState extends ViewSectionContainer implements State {
    public static TAG = "PlayingGameState";

    private _gamePointCount: GamePointCount;

    private _kotoriMap: Map<number, Kotori>;
    private _elapsedTimeMillis = 0;
    private _nextAppearTimeMillis = 0;

    private _rightDeadLine: number;
    private _leftDeadLine: number;

    private _gameLoopSound: Sound;
    private _tapKotoriSound: Sound;

    update(elapsedTime: number): void {
        this._elapsedTimeMillis += elapsedTime;

        if (this._nextAppearTimeMillis < this._elapsedTimeMillis) {
            console.log('Appear kotori!');
            this._nextAppearTimeMillis += this.getNextAppearTimeMillis();

            const kotori = this.createKotori();
            this.addChild(kotori);
            this._kotoriMap.set(kotori.id, kotori);
        }

        this._kotoriMap.forEach((k: Kotori) => {
            this.move(k, elapsedTime);

            if (this.isOnDeadZone(k)) {
                console.log("Gameover!!");
                dispatchEvent(GameEvents.GAME_OVER);
            }
        });
    }

    onEnter(): void {
        super.onEnter();

        // reset prev game point.
        clearGamePoint();

        // Set deadline position.
        this._leftDeadLine = this.viewWidth * (1 - DEAD_ZONE_WIDTH_RATE) / 2;
        this._rightDeadLine = this.viewWidth * (1 + DEAD_ZONE_WIDTH_RATE) / 2;

        // set container
        this._gamePointCount = new GamePointCount();
        this._gamePointCount.position.set(this.viewWidth * 0.5, this.viewHeight * 0.1);
        this.addChild(this._gamePointCount);

        this._kotoriMap = new Map();
        this._elapsedTimeMillis = 0;
        this._nextAppearTimeMillis = this.getNextAppearTimeMillis();

        this._gameLoopSound = loadSound(manifest.soundGameLoop);
        this._gameLoopSound.play({loop: true});
        this._tapKotoriSound = loadSound(manifest.soundTapKotori);
    }

    onExit(): void {
        super.onExit();

        this._kotoriMap.forEach((k: Kotori) => k.destroy());
        this._kotoriMap.clear();
        this._gameLoopSound.stop();
    }

    private getNextAppearTimeMillis(): number {
        const min = GAME_PARAMETERS.KOTORI_APPEARANCE_INTERVAL_MIN;
        const max = GAME_PARAMETERS.KOTORI_APPEARANCE_INTERVAL_MAX;

        return min + getRandomInteger(0, max - min);
    }

    private createKotori(): Kotori {
        const params = {
            direction: this.getKotoriDirectionRandomly(),
            speed: this.getKotoriSpeedRandomly(),
        };

        const kotori = new Kotori(params);
        kotori.position.set(
            params.direction === Direction.RIGHT ? 0 - kotori.width : this.viewWidth + kotori.width,
            this.viewHeight * 0.1 * getRandomInteger(1, 9));
        kotori.setOnClickListener(() => this.handleClickKotori(kotori));
        return kotori;
    }

    private handleClickKotori = (targetSprite: Kotori) => {
        // sound
        this._tapKotoriSound.play();

        // remove touched kotori.
        targetSprite.destroyByTap();
        this._kotoriMap.delete(targetSprite.id);

        // increment game point.
        const newPoint = getGamePoint() + 1;
        // increment game point.
        this._gamePointCount.point = newPoint;

        // store point
        saveGamePoint(newPoint);

        dispatchEvent(GameEvents.TAP_KOTORI);
    };

    private getKotoriDirectionRandomly(): Direction {
        switch (getRandomInteger(0, 1)) {
            case 0:
                return Direction.RIGHT;
            case 1:
            default:
                return Direction.LEFT;
        }
    }

    private getKotoriSpeedRandomly(): Speed {
        switch (getRandomInteger(0, 2)) {
            case 0:
                return Speed.LOW;
            case 1:
                return Speed.MIDDLE;
            case 2:
            default:
                return Speed.HIGH;
        }
    }

    private isOnDeadZone(kotori: Kotori): boolean {
        if (kotori.direction == Direction.RIGHT) {
            return this._leftDeadLine < kotori.x
        } else {
            return kotori.x < this._rightDeadLine;
        }
    }

    private move(kotori: Kotori, elapsedTime: number): void {
        const direction = kotori.direction === Direction.RIGHT ? 1 : -1;
        kotori.position.x += this.viewWidth * kotori.speed * elapsedTime * direction;
    }
}

export default PlayingGameState;
