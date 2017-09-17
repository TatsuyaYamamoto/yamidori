import Sound from "pixi-sound/lib/Sound";

import ViewSectionContainer from "../../internal/ViewSectionContainer";
import CountDownText from "../../../container/components/CountDownText";

import {dispatchEvent} from '../../EventUtils';
import {Events} from '../../view/GameViewState';

import manifest from '../../../resources/manifest';
import {loadSound} from "../../../helper/SoundManager";

class CountGameState extends ViewSectionContainer {
    public static TAG = "CountGameState";
    private _initialTimeMillis: number;

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
            this.addChild(this._countInfo);
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
        super.onEnter();

        this._initialTimeMillis = 0;
        this._countHighSound = loadSound(manifest.soundCountHigh);
        this._countLowSound = loadSound(manifest.soundCountLow);

        // Set deadline position.
        this._countInfo = new CountDownText();
        this._countInfo.position.set(this.viewWidth * 0.5, this.viewHeight * 0.5);
    }

    onExit(): void {
        super.onExit();
    }
}

export default CountGameState;
