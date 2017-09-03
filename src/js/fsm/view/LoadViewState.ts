import {Container} from 'pixi.js';

import {addEvents, removeEvents, dispatchEvent} from '../EventUtils';
import {Events as ApplicationEvents} from "../ApplicationState";
import manifest from '../../resources/manifest';
import ViewState from "./ViewState";
import LoadViewContainer from "../../container/views/LoadViewContainer";

export enum Events {
    COMPLETE_LOAD = "LoadViewState@COMPLETE_LOAD",
    COMPLETE_LOGO_ANIMATION = "LoadViewState@COMPLETE_LOGO_ANIMATION",
}

class LoadViewState implements ViewState {
    public static TAG = "LoadViewState";

    private _container: LoadViewContainer;
    private _loader: PIXI.loaders.Loader = new PIXI.loaders.Loader();
    private _isLoadComplete: boolean = false;
    private _isLogoAnimComplete: boolean = false;

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

        addEvents({
            [Events.COMPLETE_LOAD]: this._handleLoadCompleteEvent,
            [Events.COMPLETE_LOGO_ANIMATION]: this._handleLogoAnimCompleteEvent,
        });

        this._container = new LoadViewContainer();

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

        removeEvents([
            Events.COMPLETE_LOAD,
            Events.COMPLETE_LOGO_ANIMATION,
        ]);
    }

    /**
     * Get pixi container.
     *
     * @return {TopViewContainer}
     * @override
     */
    public getContainer = (): Container => {
        return this._container;
    };

    private _onLoadProgress = (): void => {

    };

    private _onLoadComplete = (): void => {
        const resourceLength = Object.keys(this._loader.resources).length;
        console.log(`Complete to load [${resourceLength}] resources.`);
        dispatchEvent(Events.COMPLETE_LOAD);
    };

    private _handleLoadCompleteEvent = () => {
        this._isLoadComplete = true;

        if (this._isLoadComplete && this._isLogoAnimComplete) {
            dispatchEvent(ApplicationEvents.PRELOAD_COMPLETE);
        }
    };

    private _handleLogoAnimCompleteEvent = () => {
        this._isLogoAnimComplete = true;

        if (this._isLoadComplete && this._isLogoAnimComplete) {
            dispatchEvent(ApplicationEvents.PRELOAD_COMPLETE);
        }
    };
}

export default LoadViewState;
