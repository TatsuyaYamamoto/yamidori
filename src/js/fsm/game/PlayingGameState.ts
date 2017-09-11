import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import GameState from "./GameState";
import Kotori from "../../container/sprite/character/Kotori";
import {Events as GameEvents} from '../view/GameViewState'
import {dispatchEvent} from '../EventUtils';
import {getCurrentViewSize} from "../../utils";
import GamePointCount from "../../container/components/GamePointCount";
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';
import {clearGamePoint, getGamePoint, saveGamePoint} from "../../helper/GlobalState";

export const DEAD_ZONE_WIDTH_RATE = 0.4;

class PlayingGameState implements GameState {
    public static TAG = "PlayingGameState";

    private _container: Container;
    private _gamePointCount: GamePointCount;

    private _kotoriMap: Map<number, Kotori>;
    private _elapsedTimeMillis = 0;
    private _nextAppearTimeMillis = 0;
    private _rightDeadLine: number;
    private _leftDeadLine: number;

    private _gameLoopSound: Sound;

    update(elapsedTime: number): void {
        this._elapsedTimeMillis += elapsedTime;

        if (this._nextAppearTimeMillis < this._elapsedTimeMillis) {
            console.log('Appear kotori!');
            this._nextAppearTimeMillis += this.getNextAppearTimeMillis();

            const kotori = this.createKotori();
            this._container.addChild(kotori);
            this._kotoriMap.set(kotori.id, kotori);
        }

        this._kotoriMap.forEach((k: Kotori) => {
            k.move(elapsedTime);

            if (this.isOnDeadZone(k)) {
                console.log("Gameover!!");
                dispatchEvent(GameEvents.GAME_OVER);
            }
        });
    }

    onEnter(): void {
        console.log(`${PlayingGameState.TAG}@onEnter`);

        // reset prev game point.
        clearGamePoint();

        // Set deadline position.
        const {width, height} = getCurrentViewSize();
        this._leftDeadLine = width * (1 - DEAD_ZONE_WIDTH_RATE) / 2;
        this._rightDeadLine = width * (1 + DEAD_ZONE_WIDTH_RATE) / 2;

        // set container
        this._container = new Container();
        this._gamePointCount = new GamePointCount();
        this._gamePointCount.position.set(width * 0.5, height * 0.1);
        this._container.addChild(this._gamePointCount);

        this._kotoriMap = new Map();
        this._elapsedTimeMillis = 0;
        this._nextAppearTimeMillis = this.getNextAppearTimeMillis();

        this._gameLoopSound = loadSound(manifest.soundGameLoop);
        this._gameLoopSound.play({loop: true});
    }

    onExit(): void {
        console.log(`${PlayingGameState.TAG}@onExit`);
        this._kotoriMap.forEach((k: Kotori) => k.destroy());
        this._kotoriMap.clear();
        this._gameLoopSound.stop();
    }

    public getContainer(): Container {
        return this._container;
    }

    private getNextAppearTimeMillis(): number {
        return 2000;
    }

    private createKotori(): Kotori {
        const {width} = getCurrentViewSize();

        const isRight = this.getRandomBool();
        const kotori = new Kotori(isRight);
        kotori.position.set(isRight ? 0 - kotori.width : width + kotori.width, this.getRandomNumber(50, 300));
        kotori.setOnClickListener(() => this.handleClickKotori(kotori));
        return kotori;
    }

    private handleClickKotori = (targetSprite: Kotori) => {
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

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    private getRandomBool(): boolean {
        return Math.floor(Math.random() * 2) === 1;
    }

    private isOnDeadZone(kotori: Kotori): boolean {
        if (kotori.isRight) {
            return this._leftDeadLine < kotori.x
        } else {
            return kotori.x < this._rightDeadLine;
        }
    }
}

export default PlayingGameState;
