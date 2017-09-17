import {interaction} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";
import * as swal from 'sweetalert';

import {Events} from "../../view/TopViewState";
import {dispatchEvent} from '../../EventUtils';

import ViewSectionContainer from "../../internal/ViewSectionContainer";
import MenuBackground from "../../../container/sprite/background/MenuBackground";
import GameStartButton from "../../../container/sprite/button/GameStartButton";
import GoHowToPlayButton from "../../../container/sprite/button/GoHowToPlayButton";
import GoRankingButton from "../../../container/sprite/button/GoRankingButton";
import GoCreditButton from "../../../container/sprite/button/GoCreditButton";
import GoTwitterHomeButton from "../../../container/sprite/button/GoTwitterHomeButton";
import SoundButton from "../../../container/sprite/button/SoundButton";
import ChangeLanguageButton from "../../../container/sprite/button/ChangeLanguageButton";

import {goTo} from "../../../helper/network";
import {toggleMute} from "../../../helper/utils";
import {loadSound} from "../../../helper/SoundManager";
import {changeLanguage, getCurrentLanguage, SupportedLanguages, t} from "../../../helper/i18n";

import manifest from '../../../resources/manifest';
import {Ids} from "../../../resources/string";

import {URL} from '../../../Constants';

class MenuTopState extends ViewSectionContainer {
    public static TAG = "MenuTopState";

    private _menuBackground: MenuBackground;

    private _gameStartButton: GameStartButton;
    private _goCreditButton: GoCreditButton;
    private _goHowToPlayButton: GoHowToPlayButton;
    private _goRankingButton: GoRankingButton;
    private _goTwitterHomeButton: GoTwitterHomeButton;
    private _soundButton: SoundButton;
    private _changeLanguageButton: ChangeLanguageButton;

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
        super.onEnter();

        this._menuBackground = new MenuBackground();

        this._gameStartButton = new GameStartButton();
        this._gameStartButton.position.set(this.viewWidth * 0.2, this.viewHeight * 0.65);
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);

        this._goHowToPlayButton = new GoHowToPlayButton();
        this._goHowToPlayButton.position.set(this.viewWidth * 0.45, this.viewHeight * 0.65);
        this._goHowToPlayButton.setOnClickListener(this.onHowToUseButtonClick);

        this._goRankingButton = new GoRankingButton();
        this._goRankingButton.position.set(this.viewWidth * 0.7, this.viewHeight * 0.65);

        this._goCreditButton = new GoCreditButton();
        this._goCreditButton.position.set(this.viewWidth * 0.9, this.viewHeight * 0.8);
        this._goCreditButton.setOnClickListener(this.onCreditButtonClick);

        this._goTwitterHomeButton = new GoTwitterHomeButton();
        this._goTwitterHomeButton.position.set(this.viewWidth * 0.9, this.viewHeight * 0.15);
        this._goTwitterHomeButton.setOnClickListener(this.onTwitterHomeButtonClick);

        this._soundButton = new SoundButton();
        this._soundButton.position.set(this.viewWidth * 0.8, this.viewHeight * 0.15);
        this._soundButton.setOnClickListener(this.onSoundButtonClick);

        this._changeLanguageButton = new ChangeLanguageButton();
        this._changeLanguageButton.position.set(this.viewWidth * 0.2, this.viewHeight * 0.15);
        this._changeLanguageButton.setOnClickListener(this.onChangeLanguageButtonClick);

        this.addChild(
            this._menuBackground,
            this._gameStartButton,
            this._goCreditButton,
            this._goHowToPlayButton,
            this._goRankingButton,
            this._goTwitterHomeButton,
            this._soundButton,
            this._changeLanguageButton
        );

        this._okSound = loadSound(manifest.soundOk);
        this._toggleSound = loadSound(manifest.soundToggleSound);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        super.onExit();
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

    private onChangeLanguageButtonClick = () => {
        this._okSound.play();
        swal(t(Ids.CHANGE_LANGUAGE_INFO), {buttons: true})
            .then((willChange) => {
                if (willChange) {
                    swal(t(Ids.RELOAD_APP_INFO))
                        .then(() => {
                            const nextLang = getCurrentLanguage() === SupportedLanguages.EN ?
                                SupportedLanguages.JA :
                                SupportedLanguages.EN;
                            changeLanguage(nextLang);

                            location.reload()
                        });
                }
            });
    }
}

export default MenuTopState;
