import GameState from "./GameState";
import {dispatchEvent} from '../EventUtils';
import {Events} from '../view/GameViewState';

class CountGameState implements GameState {
    public static TAG = "CountGameState";
    private _initialTimeMillis: number;

    private _isCountedOne: boolean = false;
    private _isCountedTwo: boolean = false;
    private _isCountedThree: boolean = false;

    update(elapsedTimeMillis: number): void {
        this._initialTimeMillis += elapsedTimeMillis;

        if (1000 < this._initialTimeMillis && !this._isCountedThree) {
            console.log("Count down, 3!");
            this._isCountedThree = true;
        }

        if (2000 < this._initialTimeMillis && !this._isCountedTwo) {
            console.log("Count down, 2!");
            this._isCountedTwo = true;
        }

        if (3000 < this._initialTimeMillis && !this._isCountedOne) {
            console.log("Count down, 1!");
            this._isCountedOne = true;
        }

        if (this.isFinishedCounting()) {
            console.log("Count down, done!");
            dispatchEvent(Events.GAME_START);
        }
    }

    onEnter(): void {
        console.log(`${CountGameState.TAG}@onEnter`);
        this._initialTimeMillis = 0;
    }

    onExit(): void {
        console.log(`${CountGameState.TAG}@onExit`);
    }

    private isFinishedCounting(): boolean {
        return 4000 < this._initialTimeMillis && this._isCountedOne && this._isCountedTwo && this._isCountedThree;
    }
}

export default CountGameState;
