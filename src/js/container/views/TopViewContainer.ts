import {Container, interaction} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";
import {Events} from "../../fsm/ApplicationState";
import {dispatchEvent} from '../../fsm/EventUtils'
import Background from "../sprite/background/Background";
import Text from "../sprite/text/Text";
import {getCurrentViewSize, getString} from "../../utils";
import {Ids} from "../../resources/string";
import GoCreditButton from "../sprite/button/GoCreditButton";
import GoHowToPlayButton from "../sprite/button/GoHowToPlayButton";
import GoTwitterHomeButton from "../sprite/button/GoTwitterHomeButton";

class TopViewContainer extends ViewContainer {
    private _background: Background;

    private _tapInfoText: Text;
    private _gameStartButton: GameStartButton;
    private _goCreditButton: GoCreditButton;
    private _goHowToPlayButton: GoHowToPlayButton;
    private _goTwitterHomeButton: GoTwitterHomeButton;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._background = new Background();

        this._tapInfoText = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfoText.position.set(width * 0.5, height * 0.9);

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.position.set(width * 0.5, height * 0.8);
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this._goCreditButton = new GoCreditButton();
        this._goCreditButton.position.set(width * 0.7, height * 0.8);
        this._goCreditButton.setOnClickListener(this.onGameStartButtonClick);

        this._goHowToPlayButton = new GoHowToPlayButton();
        this._goHowToPlayButton.position.set(width * 0.2, height * 0.8);
        this._goHowToPlayButton.setOnClickListener(this.onGameStartButtonClick);

        this._goTwitterHomeButton = new GoTwitterHomeButton();
        this._goTwitterHomeButton.position.set(width * 0.7, height * 0.3);
        this._goTwitterHomeButton.setOnClickListener(this.onGameStartButtonClick);

        this.backGroundLayer.addChild(this._background);
        this.applicationLayer.addChild(
            this._tapInfoText
        );

        window.addEventListener('touchstart', this.onWindowTap);
    }

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        dispatchEvent(Events.GAME_START_REQUEST);
    };

    private onWindowTap = (): void => {
        window.removeEventListener('touchstart', this.onWindowTap);
        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(
            this._gameStartButton,
            this._goCreditButton,
            this._goHowToPlayButton,
            this._goTwitterHomeButton
        )
    };
}

export default TopViewContainer;
