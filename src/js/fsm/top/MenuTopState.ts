import {Container, interaction} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import MenuBackground from "../../container/sprite/background/MenuBackground";
import GameStartButton from "../../container/sprite/button/GameStartButton";
import GoHowToPlayButton from "../../container/sprite/button/GoHowToPlayButton";
import GoRankingButton from "../../container/sprite/button/GoRankingButton";
import GoCreditButton from "../../container/sprite/button/GoCreditButton";
import GoTwitterHomeButton from "../../container/sprite/button/GoTwitterHomeButton";
import SoundButton from "../../container/sprite/button/SoundButton";

import {getCurrentViewSize} from "../../helper/utils";
import {Events} from "../view/TopViewState";
import {dispatchEvent} from '../EventUtils';
import {goTo} from "../../helper/network";
import {toggleMute} from "../../helper/SoundManager";
import {URL} from '../../Constants';
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';

class MenuTopState {
    public static TAG = "MenuTopState";

    private _container: Container;

    private _menuBackground: MenuBackground;

    private _gameStartButton: GameStartButton;
    private _goCreditButton: GoCreditButton;
    private _goHowToPlayButton: GoHowToPlayButton;
    private _goRankingButton: GoRankingButton;
    private _goTwitterHomeButton: GoTwitterHomeButton;
    private _soundButton: SoundButton;

    private _okSound: Sound;
    private _toggleSound: Sound;

    /**
     * @inheritDoc
     */
    update(elapsedTimeMillis: number): void {
    }

    /**
     * @inheritDoc
     */
    onEnter(): void {
        console.log(`${MenuTopState.TAG}@onEnter`);

        const {width, height} = getCurrentViewSize();
        this._container = new Container();

        this._menuBackground = new MenuBackground();

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.position.set(width * 0.2, height * 0.65);
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this._goHowToPlayButton = new GoHowToPlayButton();
        this._goHowToPlayButton.position.set(width * 0.45, height * 0.65);
        this._goHowToPlayButton.setOnClickListener(this.onHowToUseButtonClick);

        this._goRankingButton = new GoRankingButton();
        this._goRankingButton.position.set(width * 0.7, height * 0.65);

        this._goCreditButton = new GoCreditButton();
        this._goCreditButton.position.set(width * 0.9, height * 0.8);
        this._goCreditButton.setOnClickListener(this.onCreditButtonClick);

        this._goTwitterHomeButton = new GoTwitterHomeButton();
        this._goTwitterHomeButton.position.set(width * 0.9, height * 0.15);
        this._goTwitterHomeButton.setOnClickListener(this.onTwitterHomeButtonClick);

        this._soundButton = new SoundButton();
        this._soundButton.position.set(width * 0.8, height * 0.15);
        this._soundButton.setOnClickListener(this.onSoundButtonClick);

        this._container.addChild(
            this._menuBackground,
            this._gameStartButton,
            this._goCreditButton,
            this._goHowToPlayButton,
            this._goRankingButton,
            this._goTwitterHomeButton,
            this._soundButton
        );

        this._okSound = loadSound(manifest.soundOk);
        this._toggleSound = loadSound(manifest.soundToggleSound);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${MenuTopState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        dispatchEvent(Events.REQUEST_GAME_START);
    };

    private onTwitterHomeButtonClick = (event: interaction.InteractionEvent): void => {
        goTo(URL.TWITTER_HOME_T28);
    };

    private onHowToUseButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        dispatchEvent(Events.REQUEST_GO_TO_USAGE);
    };

    private onCreditButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        dispatchEvent(Events.REQUEST_GO_TO_CREDIT);
    };

    private onSoundButtonClick = () => {
        this._toggleSound.play();
        toggleMute();
    };
}

export default MenuTopState;
