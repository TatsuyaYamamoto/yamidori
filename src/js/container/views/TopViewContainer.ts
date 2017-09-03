import {Container, interaction} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";
import {Events} from "../../fsm/ApplicationState";
import {dispatchEvent} from '../../fsm/EventUtils'
import Background from "../sprite/background/Background";
import Text from "../sprite/text/Text";
import {getCurrentViewSize, getString} from "../../utils";
import {Ids} from "../../resources/string";

class TopViewContainer extends ViewContainer {
    private _backgroundLayer: Container;
    private _background: Background;

    private _buttonLayer: Container;
    private _tapInfoText: Text;
    private _gameStartButton;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._backgroundLayer = new Container();
        this._background = new Background();

        this._buttonLayer = new Container();

        this._tapInfoText = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfoText.position.set(width * 0.5, height * 0.9);

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this._backgroundLayer.addChild(this._background);
        this._buttonLayer.addChild(this._tapInfoText);

        this.addChild(
            this._backgroundLayer,
            this._buttonLayer,
        );

        window.addEventListener('pointerdown', this.onWindowTap);
    }

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        dispatchEvent(Events.GAME_START_REQUEST);
    };

    private onWindowTap = (): void => {
        window.removeEventListener('pointerdown', this.onWindowTap);
        this._buttonLayer.removeChildren();
        this._buttonLayer.addChild(
            this._gameStartButton
        )
    };
}

export default TopViewContainer;
