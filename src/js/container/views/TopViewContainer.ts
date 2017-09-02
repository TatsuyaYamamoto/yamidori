import {Container, interaction} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";
import {Events} from "../../fsm/ApplicationState";
import {dispatchEvent} from '../../fsm/EventUtils'
import Background from "../sprite/background/Background";

class TopViewContainer extends ViewContainer {
    private _backgroundLayer: Container;
    private _background: Background;

    private _gameStartButton;

    constructor() {
        super();
        this._backgroundLayer = new Container();
        this._background = new Background();
        this._backgroundLayer.addChild(this._background);

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this.addChild(
            this._backgroundLayer,
            this._gameStartButton
        )
    }

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        dispatchEvent(Events.GAME_START_REQUEST);
    }
}

export default TopViewContainer;
