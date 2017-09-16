import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import State from "../internal/State";
import {Events} from '../view/TopViewState';
import {dispatchEvent} from '../EventUtils';

import ViewSectionContainer from "../internal/ViewSectionContainer";
import TitleLogo from "../../container/sprite/logo/TitleLogo";
import VersionText from "../../container/components/VersionText";
import Text from '../../container/sprite/text/Text';

import {getCurrentViewSize, getString, isSupportTouchEvent} from "../../helper/utils";
import {Ids} from "../../resources/string";
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';


class TitleTopState extends ViewSectionContainer implements State {
    public static TAG = "TitleTopState";

    private _titleLog: TitleLogo;
    private _appVersion: VersionText;
    private _tapInfoText: Text;

    private _okSound: Sound;

    /**
     * @inheritDoc
     */
    update(elapsedTimeMillis: number): void {
    }

    /**
     * @inheritDoc
     */
    onEnter(): void {
        console.log(`${TitleTopState.TAG}@onEnter`);

        this._titleLog = new TitleLogo();
        this._titleLog.position.set(this.viewWidth * 0.5, this.viewHeight * 0.5);

        this._appVersion = new VersionText();
        this._appVersion.position.set(this.viewWidth * 0.1, this.viewHeight * 0.95);

        this._tapInfoText = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfoText.position.set(this.viewWidth * 0.5, this.viewHeight * 0.9);

        this.addChild(
            this._titleLog,
            this._appVersion,
            this._tapInfoText
        );

        this._okSound = loadSound(manifest.soundOk);

        window.addEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this.onWindowTap);
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${TitleTopState.TAG}@onExit`);
    }

    private onWindowTap = (): void => {
        this._okSound.play();
        dispatchEvent(Events.REQUEST_GO_TO_MENU);
        window.removeEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this.onWindowTap);
    };
}

export default TitleTopState;
