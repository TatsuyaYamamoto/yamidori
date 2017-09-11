import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import Kotori, {Direction} from "../../container/sprite/character/Kotori";
import UsageTapTargetInfo from "../../container/components/UsageTapTargetInfo";
import UsageTextArea from "../../container/components/UsageTextArea";
import BackToTopButton from "../../container/sprite/button/BackToTopButton";

import {getCurrentViewSize} from "../../helper/utils";
import {Events} from "../view/TopViewState";
import {dispatchEvent} from '../EventUtils';
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';

class UsageTopState {
    public static TAG = "UsageTopState";

    private _container: Container;

    private _usageTextArea: UsageTextArea;
    private _usageTapTargetInfo: UsageTapTargetInfo;
    private _backToTopButton: BackToTopButton;
    private _usageTarget: Kotori;

    private _tapKotoriSound: Sound;
    private _cancelSound: Sound;

    /**
     * @inheritDoc
     */
    update(elapsedTimeMillis: number): void {
        const {width, height} = getCurrentViewSize();

        if (!this._usageTarget) {
            this._usageTarget = new Kotori({direction: Direction.LEFT});
            this._usageTarget.position.set(width * 1.1, height * 0.4);
            this._container.addChild(this._usageTarget);
        }

        if (this._usageTarget && width * 0.8 < this._usageTarget.x) {
            this._usageTarget.move(elapsedTimeMillis);
        } else {
            if (!this._usageTapTargetInfo) {
                this._usageTarget.setOnClickListener(this.onUsageModelTargetClick);
                this._usageTapTargetInfo = new UsageTapTargetInfo();
                this._usageTapTargetInfo.position.set(width * 0.8, height * 0.7);
                this._container.addChild(this._usageTapTargetInfo);
            }
        }
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

        this._backToTopButton = new BackToTopButton();
        this._backToTopButton.position.set(width * 0.2, height * 0.9);
        this._backToTopButton.setOnClickListener(this.onBackToTopButton);

        this._container.addChild(
            this._backToTopButton,
            this._usageTextArea,
        );

        this._tapKotoriSound = loadSound(manifest.soundTapKotori);
        this._cancelSound = loadSound(manifest.soundCancel);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${UsageTopState.TAG}@onExit`);
        this._usageTarget = null;
        this._usageTapTargetInfo = null;
    }

    public getContainer(): Container {
        return this._container;
    }

    private onUsageModelTargetClick = () => {
        this._tapKotoriSound.play();

        if (this._usageTarget) {
            this._usageTarget.destroyByTap();
        }
        this._usageTarget = null;
        if (this._usageTapTargetInfo) {
            this._usageTapTargetInfo.destroy();
        }
        this._usageTapTargetInfo = null;
    };

    private onBackToTopButton = () => {
        this._cancelSound.play();
        dispatchEvent(Events.REQUEST_BACK_TO_TOP);
    };
}

export default UsageTopState;
