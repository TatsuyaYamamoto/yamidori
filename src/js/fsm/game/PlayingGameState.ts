import {Container} from 'pixi.js';

import GameState from "./GameState";
import Kotori from "../../container/sprite/character/Kotori";

class PlayingGameState implements GameState {
    public static TAG = "PlayingGameState";

    private _container: Container;
    private _kotoriList: Kotori[] = [];
    private _elapsedTimeMillis = 0;
    private _nextAppearTimeMillis = 0;

    update(elapsedTime: number): void {
        this._elapsedTimeMillis += elapsedTime;

        if (this._nextAppearTimeMillis < this._elapsedTimeMillis) {
            console.log('Appear kotori!');
            this._nextAppearTimeMillis += this.getNextAppearTimeMillis();

            const kotori = this.createKotori();
            this._container.addChild(kotori);
            this._kotoriList.push(kotori);
        }
    }

    onEnter(): void {
        console.log(`${PlayingGameState.TAG}@onEnter`);
        this._container = new Container();
        this._elapsedTimeMillis = 0;
        this._nextAppearTimeMillis = this.getNextAppearTimeMillis();
    }

    onExit(): void {
        console.log(`${PlayingGameState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }

    private getNextAppearTimeMillis(): number {
        return 2000;
    }

    private createKotori(): Kotori {
        const isRight = this.getRandomBool();
        const kotori = new Kotori(isRight);
        kotori.position.set(isRight ? 50 : 800, this.getRandomNumber(50, 300));
        kotori.setOnClickListener(() => this.handleClickKotori(kotori));
        return kotori;
    }

    private handleClickKotori = (targetSprite: Kotori) => {
        console.log('on click!');
        targetSprite.destroy();
    };

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    private getRandomBool(): boolean {
        return Math.floor(Math.random() * 2) === 1;
    }
}

export default PlayingGameState;
