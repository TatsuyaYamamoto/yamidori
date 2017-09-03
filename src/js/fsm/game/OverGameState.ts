import {Container} from 'pixi.js';

import GameState from "./GameState";
import GameOverLogo from '../../container/sprite/logo/GameOverLogo';
import GameRestartButton from "../../container/sprite/button/GameRestartButton";
import {getCurrentViewSize} from "../../utils";

class OverGameState implements GameState {
    public static TAG = "OverGameState";

    private _container: Container;

    private _gameOverLogo: GameOverLogo;
    private _gameRestartButton: GameRestartButton;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${OverGameState.TAG}@onEnter`);
        const {width, height} = getCurrentViewSize();

        this._container = new Container();
        this._gameOverLogo = new GameOverLogo();
        this._gameOverLogo.position.set(width * 0.5, height * 0.2);
        this._gameRestartButton = new GameRestartButton();
        this._gameRestartButton.position.set(width * 0.5, height * 0.7);

        this._container.addChild(
            this._gameOverLogo,
            this._gameRestartButton
        )
    }

    onExit(): void {
        console.log(`${OverGameState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }
}

export default OverGameState;
