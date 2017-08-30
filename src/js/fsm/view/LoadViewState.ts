import State from "../internal/State";
import {dispatchEvent} from '../EventUtils';
import {Events} from "../ApplicationState";
import manifest from '../../resources/manifest';

class LoadViewState implements State {
    public static TAG = "LoadViewState";

    private _loader: PIXI.loaders.Loader = new PIXI.loaders.Loader();

    /**
     * @param elapsedTime
     * @override
     */
    update(elapsedTime: number): void {

    }

    /**
     * @override
     */
    onEnter(): void {
        console.log(`${LoadViewState.TAG}@onEnter`);

        Object.keys(manifest).forEach((key) => {
            this._loader.add(key, manifest[key]);
        });
        this._loader.onProgress.add(this._onLoadProgress);
        this._loader.onComplete.add(this._onLoadComplete);
        this._loader.load();
    }

    /**
     * @override
     */
    onExit(): void {
        console.log(`${LoadViewState.TAG}@onExit`);
    }

    private _onLoadProgress = (): void => {

    };

    private _onLoadComplete = (): void => {
        const resourceLength = Object.keys(this._loader.resources).length;
        console.log(`Complete to load [${resourceLength}] resources.`);

        dispatchEvent(Events.PRELOAD_COMPLETE);
    };
}

export default LoadViewState;