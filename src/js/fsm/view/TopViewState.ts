import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import ViewState from "./ViewState";
import TopViewContainer from "../../container/views/TopViewContainer";
import manifest from '../../resources/manifest';
import {loadSound} from "../../helper/SoundManager";

class TopViewState implements ViewState {
    public static TAG = "TopViewState";

    private _container: TopViewContainer;
    private _zenkaiSound: Sound;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${TopViewState.TAG}@onEnter`);
        this._container = new TopViewContainer();
        this._zenkaiSound = loadSound(manifest.soundZenkai);
        this._zenkaiSound.play({loop: true});
    }

    onExit(): void {
        console.log(`${TopViewState.TAG}@onExit`);
        this._zenkaiSound.stop();
    }

    /**
     * Get pixi container.
     *
     * {@see ViewState#getContainer}
     * @return {TopViewContainer}
     * @override
     */
    public getContainer = (): Container => {
        return this._container;
    }
}

export default TopViewState;
