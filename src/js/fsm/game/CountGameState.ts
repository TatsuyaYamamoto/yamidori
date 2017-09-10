import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import GameState from "./GameState";
import {dispatchEvent} from '../EventUtils';
import {Events} from '../view/GameViewState';
import manifest from '../../resources/manifest';
import {loadSound} from "../../helper/SoundManager";
import CountDownText from "../../container/components/CountDownText";
import {getCurrentViewSize} from "../../utils";

class CountGameState implements GameState {
    public static TAG = "CountGameState";
    private _initialTimeMillis: number;

    private _container: Container;
    private _countInfo: CountDownText;

    private _isCountedOne: boolean = false;
    private _isCountedTwo: boolean = false;

    private _countLowSound: Sound;
    private _countHighSound: Sound;

    update(elapsedTimeMillis: number): void {
        this._initialTimeMillis += elapsedTimeMillis;

        if (1000 < this._initialTimeMillis && !this._isCountedTwo) {
            console.log("Count down, 2!");
            this._countInfo.count = 2;
            this._container.addChild(this._countInfo);
            this._countLowSound.play();
            this._isCountedTwo = true;
        }

        if (2000 < this._initialTimeMillis && !this._isCountedOne) {
            console.log("Count down, 1!");
            this._countInfo.count = 1;
            this._countLowSound.play();
            this._isCountedOne = true;
        }

        // is finished counting.
        if (3000 < this._initialTimeMillis && this._isCountedOne && this._isCountedTwo) {
            console.log("Count down, done!");
            this._countHighSound.play();
            dispatchEvent(Events.GAME_START);
        }
    }

    onEnter(): void {
        console.log(`${CountGameState.TAG}@onEnter`);
        this._initialTimeMillis = 0;
        this._countHighSound = loadSound(manifest.soundCountHigh);
        this._countLowSound = loadSound(manifest.soundCountLow);

        // Set deadline position.
        const {width, height} = getCurrentViewSize();
        this._container = new Container();
        this._countInfo = new CountDownText();
        this._countInfo.position.set(width * 0.5, height * 0.5);
    }

    onExit(): void {
        console.log(`${CountGameState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }
}

export default CountGameState;
