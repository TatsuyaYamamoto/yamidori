import {Container} from 'pixi.js';

import GameStartButton from "../sprite/button/GameStartButton";

class TopViewContainer extends Container {
    private _gameStartButton;

    constructor() {
        super();

        this._gameStartButton = new GameStartButton();
        this.addChild(this._gameStartButton)
    }
}

export default TopViewContainer;
