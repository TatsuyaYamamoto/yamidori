import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import State from "../internal/State";

import TitleLogo from "../../container/sprite/logo/TitleLogo";
import VersionText from "../../container/components/VersionText";
import Text from '../../container/sprite/text/Text';

import {Events} from '../view/TopViewState';
import {dispatchEvent} from '../EventUtils';

import {getCurrentViewSize, getString, isSupportTouchEvent} from "../../helper/utils";
import {Ids} from "../../resources/string";
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';


class TitleTopState implements State {
    public static TAG = "TitleTopState";

    private _container: Container;

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

        const {width, height} = getCurrentViewSize();
        this._container = new Container();

        this._titleLog = new TitleLogo();
        this._titleLog.position.set(width * 0.5, height * 0.5);

        this._appVersion = new VersionText();
        this._appVersion.position.set(width * 0.1, height * 0.95);

        this._tapInfoText = new Text(getString(Ids.TAP_DISPLAY_INFO));
        this._tapInfoText.position.set(width * 0.5, height * 0.9);

        this._container.addChild(
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

    public getContainer(): Container {
        return this._container;
    }

    private onWindowTap = (): void => {
        this._okSound.play();
        dispatchEvent(Events.REQUEST_GO_TO_MENU);
        window.removeEventListener(isSupportTouchEvent() ? 'touchstart' : 'click', this.onWindowTap);
    };
}

export default TitleTopState;
