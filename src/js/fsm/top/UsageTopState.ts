import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import UsageTapTargetInfo from "../../container/components/UsageTapTargetInfo";
import UsageTextArea from "../../container/components/UsageTextArea";
import Kotori from "../../container/sprite/character/Kotori";
import BackToTopButton from "../../container/sprite/button/BackToTopButton";

import {getCurrentViewSize} from "../../utils";
import {Events} from "../view/TopViewState";
import {dispatchEvent} from '../EventUtils';
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';

class UsageTopState {
    public static TAG = "UsageTopState";

    private _container: Container;
    private _usageTextArea: UsageTextArea;
    private _usageTapTargetInfo: UsageTapTargetInfo;
    private _usageModelKotori: Kotori;
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
        console.log(`${UsageTopState.TAG}@onEnter`);

        const {width, height} = getCurrentViewSize();
        this._container = new Container();

        this._usageTextArea = new UsageTextArea();
        this._usageTextArea.position.set(width * 0.35, height * 0.3);

        this._usageTapTargetInfo = new UsageTapTargetInfo();
        this._usageTapTargetInfo.position.set(width * 0.8, height * 0.7);

        this._usageModelKotori = new Kotori();
        this._usageModelKotori.position.set(width * 0.8, height * 0.4);

        this._backToTopButton = new BackToTopButton();
        this._backToTopButton.position.set(width * 0.2, height * 0.9);
        this._backToTopButton.setOnClickListener(this.onBackToTopButton);

        this._container.addChild(
            this._backToTopButton,
            this._usageTextArea,
            this._usageTapTargetInfo,
            this._usageModelKotori
        );

        this._cancelSound = loadSound(manifest.soundCancel);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${UsageTopState.TAG}@onExit`);
    }

    public getContainer(): Container {
        return this._container;
    }

    private onBackToTopButton = () => {
        this._cancelSound.play();
        dispatchEvent(Events.REQUEST_BACK_TO_TOP);
    };
}

export default UsageTopState;
