import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import CreditBackground from "../../container/sprite/background/CreditBackground";
import CreditComponent from "../../container/components/CreditComponent";
import BackToTopButton from "../../container/sprite/button/BackToTopButton";

import {getCurrentViewSize} from "../../utils";
import {URL, NAME_AND_ROLE} from "../../Constants";
import {Events} from "../view/TopViewState";
import {dispatchEvent} from '../EventUtils';
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';

class CreditTopState {
    public static TAG = "CreditTopState";

    private _container: Container;
    private _creditBackground: CreditBackground;
    private _t28Credit: CreditComponent;
    private _sanzashiCredit: CreditComponent;
    private _onjinCredit: CreditComponent;
    private _loveliveCredit: CreditComponent;
    private _backToTopButton: BackToTopButton;

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
        console.log(`${CreditTopState.TAG}@onEnter`);

        const {width, height} = getCurrentViewSize();
        this._container = new Container();

        this._creditBackground = new CreditBackground();

        this._t28Credit = new CreditComponent(NAME_AND_ROLE.T28, URL.SOKONTOKORO_HOME);
        this._t28Credit.position.set(width * 0.3, height * 0.5);

        this._sanzashiCredit = new CreditComponent(NAME_AND_ROLE.SANZASHI, URL.TWITTER_HOME_SANZASHI);
        this._sanzashiCredit.position.set(width * 0.3, height * 0.7);

        this._onjinCredit = new CreditComponent(NAME_AND_ROLE.ON_JIN, URL.ONJIN_TOP);
        this._onjinCredit.position.set(width * 0.7, height * 0.6);

        this._loveliveCredit = new CreditComponent(NAME_AND_ROLE.LOVELIVE, URL.LOVELIVE_TOP);
        this._loveliveCredit.position.set(width * 0.7, height * 0.8);

        this._backToTopButton = new BackToTopButton();
        this._backToTopButton.position.set(width * 0.2, height * 0.9);
        this._backToTopButton.setOnClickListener(this.onBackToTopButton);

        this._container.addChild(
            this._creditBackground,
            this._backToTopButton,
            this._t28Credit,
            this._sanzashiCredit,
            this._onjinCredit,
            this._loveliveCredit,
        );

        this._cancelSound = loadSound(manifest.soundCancel);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${CreditTopState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }

    private onBackToTopButton = () => {
        this._cancelSound.play();
        dispatchEvent(Events.REQUEST_BACK_TO_TOP);
    };
}

export default CreditTopState;