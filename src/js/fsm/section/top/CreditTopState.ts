import Sound from "pixi-sound/lib/Sound";

import {Events} from "../../view/TopViewState";
import {dispatchEvent} from '../../EventUtils';

import ViewSectionContainer from "../../../framework/ViewSectionContainer";
import CreditBackground from "../../../container/sprite/background/CreditBackground";
import CreditComponent from "../../../container/components/CreditComponent";
import BackToMenuButton from "../../../container/sprite/button/BackToMenuButton";

import {t} from "../../../helper/i18n";
import {loadSound} from "../../../helper/AssetLoader";

import {Ids as SoundIds} from '../../../resources/sound';
import {Ids} from "../../../resources/string";
import {URL} from "../../../Constants";

class CreditTopState extends ViewSectionContainer {
    public static TAG = "CreditTopState";

    private _creditBackground: CreditBackground;
    private _t28Credit: CreditComponent;
    private _sanzashiCredit: CreditComponent;
    private _onjinCredit: CreditComponent;
    private _loveliveCredit: CreditComponent;
    private _backToMenuButton: BackToMenuButton;

    private _cancelSound: Sound;

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

        this._creditBackground = new CreditBackground();

        this._t28Credit = new CreditComponent(t(Ids.CREDIT_T28), URL.SOKONTOKORO_HOME);
        this._t28Credit.position.set(this.viewWidth * 0.3, this.viewHeight * 0.5);

        this._sanzashiCredit = new CreditComponent(t(Ids.CREDIT_SANZASHI), URL.TWITTER_HOME_SANZASHI);
        this._sanzashiCredit.position.set(this.viewWidth * 0.5, this.viewHeight * 0.7);

        this._onjinCredit = new CreditComponent(t(Ids.CREDIT_ON_JIN), URL.ONJIN_TOP);
        this._onjinCredit.position.set(this.viewWidth * 0.7, this.viewHeight * 0.9);

        this._loveliveCredit = new CreditComponent(t(Ids.CREDIT_LOVELIVE), URL.LOVELIVE_TOP);
        this._loveliveCredit.position.set(this.viewWidth * 0.8, this.viewHeight * 0.55);

        this._backToMenuButton = new BackToMenuButton();
        this._backToMenuButton.position.set(this.viewWidth * 0.15, this.viewHeight * 0.8);
        this._backToMenuButton.setOnClickListener(this.onBackToMenuButtonClick);

        this.addChild(
            this._creditBackground,
            this._backToMenuButton,
            this._t28Credit,
            this._sanzashiCredit,
            this._onjinCredit,
            this._loveliveCredit,
        );

        this._cancelSound = loadSound(SoundIds.SOUND_CANCEL);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        super.onExit();
    }

    private onBackToMenuButtonClick = () => {
        this._cancelSound.play();
        dispatchEvent(Events.REQUEST_BACK_TO_TOP);
    };
}

export default CreditTopState;
