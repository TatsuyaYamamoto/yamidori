import {Container, interaction} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";
import {Events} from "../../fsm/ApplicationState";
import {dispatchEvent} from '../../fsm/EventUtils'
import Background from "../sprite/background/Background";
import Text from "../sprite/text/Text";
import {getCurrentViewSize, getString, isSupportTouchEvent} from "../../utils";
import {Ids} from "../../resources/string";
import GoCreditButton from "../sprite/button/GoCreditButton";
import GoHowToPlayButton from "../sprite/button/GoHowToPlayButton";
import GoTwitterHomeButton from "../sprite/button/GoTwitterHomeButton";
import GoRankingButton from "../sprite/button/GoRankingButton";
import {goTo} from "../../network";
import {NAME_AND_ROLE, URL} from '../../Constants';
import MenuBackground from "../sprite/background/MenuBackground";
import TitleLogo from "../sprite/logo/TitleLogo";
import SoundButton from "../sprite/button/SoundButton";
import {loadSound, toggleMute} from "../../helper/SoundManager";
import manifest from '../../resources/manifest'
import BackToTopButton from "../sprite/button/BackToTopButton";
import UsageTextArea from "../components/UsageTextArea";
import Kotori from "../sprite/character/Kotori";
import UsageTapTargetInfo from "../components/UsageTapTargetInfo";
import CreditComponent from "../components/CreditComponent";
import CreditBackground from "../sprite/background/CreditBackground";

class TopViewContainer extends ViewContainer {
    private _background: Background;
    private _menuBackground: MenuBackground;
    private _creditBackground: CreditBackground;

    private _titleLog: TitleLogo;

    private _tapInfoText: Text;
    private _usageTextArea: UsageTextArea;
    private _usageTapTargetInfo: UsageTapTargetInfo;

    private _usageModelKotori: Kotori;

    private _gameStartButton: GameStartButton;
    private _goCreditButton: GoCreditButton;
    private _goHowToPlayButton: GoHowToPlayButton;
    private _goRankingButton: GoRankingButton;
    private _goTwitterHomeButton: GoTwitterHomeButton;
    private _soundButton: SoundButton;
    private _backToTopButton: BackToTopButton;

    private _t28Credit: CreditComponent;
    private _sanzashiCredit: CreditComponent;
    private _onjinCredit: CreditComponent;
    private _loveliveCredit: CreditComponent;

    private _okSound: Sound;
    private _cancelSound: Sound;
    private _toggleSound: Sound;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._background = new Background();
        this._menuBackground = new MenuBackground();
        this._creditBackground = new CreditBackground();

        this._titleLog = new TitleLogo();
        this._titleLog.position.set(width * 0.5, height * 0.5);

        this._tapInfoText = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfoText.position.set(width * 0.5, height * 0.9);

        this._usageTextArea = new UsageTextArea();
        this._usageTextArea.position.set(width * 0.35, height * 0.3);

        this._usageTapTargetInfo = new UsageTapTargetInfo();
        this._usageTapTargetInfo.position.set(width * 0.8, height * 0.7);

        this._usageModelKotori = new Kotori(false);
        this._usageModelKotori.position.set(width * 0.8, height * 0.4);

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.position.set(width * 0.2, height * 0.5);
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this._goHowToPlayButton = new GoHowToPlayButton();
        this._goHowToPlayButton.position.set(width * 0.4, height * 0.5);
        this._goHowToPlayButton.setOnClickListener(this.onHowToUseButtonClick);

        this._goRankingButton = new GoRankingButton();
        this._goRankingButton.position.set(width * 0.6, height * 0.5);

        this._goCreditButton = new GoCreditButton();
        this._goCreditButton.position.set(width * 0.8, height * 0.5);
        this._goCreditButton.setOnClickListener(this.onCreditButtonClick);

        this._goTwitterHomeButton = new GoTwitterHomeButton();
        this._goTwitterHomeButton.position.set(width * 0.9, height * 0.9);
        this._goTwitterHomeButton.setOnClickListener(this.onTwitterHomeButtonClick);

        this._backToTopButton = new BackToTopButton();
        this._backToTopButton.position.set(width * 0.2, height * 0.9);
        this._backToTopButton.setOnClickListener(this.onBackToTopButton);

        this._soundButton = new SoundButton();
        this._soundButton.position.set(width * 0.8, height * 0.9);
        this._soundButton.setOnClickListener(this.onSoundButtonClick);

        this._t28Credit = new CreditComponent(NAME_AND_ROLE.T28, URL.SOKONTOKORO_HOME);
        this._t28Credit.position.set(width * 0.3, height * 0.5);

        this._sanzashiCredit = new CreditComponent(NAME_AND_ROLE.SANZASHI, URL.TWITTER_HOME_SANZASHI);
        this._sanzashiCredit.position.set(width * 0.3, height * 0.7);

        this._onjinCredit = new CreditComponent(NAME_AND_ROLE.ON_JIN, URL.ONJIN_TOP);
        this._onjinCredit.position.set(width * 0.7, height * 0.6);

        this._loveliveCredit = new CreditComponent(NAME_AND_ROLE.LOVELIVE, URL.LOVELIVE_TOP);
        this._loveliveCredit.position.set(width * 0.7, height * 0.8);

        this.backGroundLayer.addChild(this._background);
        this.applicationLayer.addChild(
            this._titleLog,
            this._tapInfoText
        );

        this._okSound = loadSound(manifest.soundOk);
        this._cancelSound = loadSound(manifest.soundCancel);
        this._toggleSound = loadSound(manifest.soundToggleSound);

        window.addEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this.onWindowTap);
    }

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        dispatchEvent(Events.GAME_START_REQUEST);
    };

    private onTwitterHomeButtonClick = (event: interaction.InteractionEvent): void => {
        goTo(URL.TWITTER_HOME_T28);
    };

    private onHowToUseButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        this.showHowToUse();
    };

    private onCreditButtonClick = (event: interaction.InteractionEvent): void => {
        this._okSound.play();
        this.showCredit();
    };

    private onBackToTopButton = () => {
        this._cancelSound.play();
        this.showMenu();
    };

    private onSoundButtonClick = () => {
        this._toggleSound.play();
        toggleMute();
    };

    private onWindowTap = (): void => {
        this._okSound.play();
        window.removeEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this.onWindowTap);
        this.showMenu();
    };

    private showHowToUse = () => {
        this.backGroundLayer.removeChildren();
        this.backGroundLayer.addChild(this._background);
        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(
            this._backToTopButton,
            this._usageTextArea,
            this._usageTapTargetInfo,
            this._usageModelKotori
        )
    };

    private showMenu = () => {
        this.backGroundLayer.removeChildren();
        this.backGroundLayer.addChild(this._menuBackground);
        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(
            this._gameStartButton,
            this._goCreditButton,
            this._goHowToPlayButton,
            this._goRankingButton,
            this._goTwitterHomeButton,
            this._soundButton
        )
    };

    private showCredit = () => {
        this.backGroundLayer.removeChildren();
        this.backGroundLayer.addChild(
            this._background,
            this._creditBackground);
        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(
            this._backToTopButton,
            this._t28Credit,
            this._sanzashiCredit,
            this._onjinCredit,
            this._loveliveCredit
        )
    }
}

export default TopViewContainer;
