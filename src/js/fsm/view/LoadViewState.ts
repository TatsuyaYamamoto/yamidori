import {loaders} from 'pixi.js';

import {Events as ApplicationEvents} from "../ApplicationState";

import ViewContainer from "../internal/ViewContainer";
import Text from "../../container/sprite/text/Text";
import BrandLogoAnimation from '../../container/BrandLogoAnimation';
import LoadKotoriAnimation from '../../container/LoadKotoriAnimation';

import {addEvents, removeEvents, dispatchEvent} from '../EventUtils';
import AssetLoader from '../../helper/AssetLoader';
import {setAsset} from "../../helper/utils";

import {SKIP_BRAND_LOGO_ANIMATION} from "../../Constants";

export enum Events {
    COMPLETE_LOAD = "LoadViewState@COMPLETE_LOAD",
    COMPLETE_LOGO_ANIMATION = "LoadViewState@COMPLETE_LOGO_ANIMATION",
}

class LoadViewState extends ViewContainer {
    public static TAG = "LoadViewState";

    private _loader: AssetLoader;
    private _isLoadComplete: boolean = false;
    private _isLogoAnimComplete: boolean = false;

    private _loadingInfoText;
    private _brandLogoAnimation: BrandLogoAnimation;
    private _loadKotoriAnimation: LoadKotoriAnimation;
    private _loadedProgressPercentage: number = 0;

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
        super.onEnter();

        addEvents({
            [Events.COMPLETE_LOAD]: this._handleLoadCompleteEvent,
            [Events.COMPLETE_LOGO_ANIMATION]: this._handleLogoAnimCompleteEvent,
        });

        this._loadingInfoText = new Text(`Now loading... ${this._loadedProgressPercentage}%`);
        this._loadingInfoText.position.set(this.viewWidth * 0.6, this.viewHeight * 0.8);

        this._brandLogoAnimation = new BrandLogoAnimation();
        this._brandLogoAnimation.position.set(this.viewWidth / 2, this.viewHeight / 2);

        this._loadKotoriAnimation = new LoadKotoriAnimation(100);
        this._loadKotoriAnimation.position.set(this.viewWidth * 0.2, this.viewHeight * 0.8);
        this._loadKotoriAnimation.scale.set(0.2);

        this.addChild(
            this._loadingInfoText,
            this._brandLogoAnimation,
            this._loadKotoriAnimation,
        );

        this._brandLogoAnimation
            .start()
            .then(() => dispatchEvent(Events.COMPLETE_LOGO_ANIMATION));

        this._loader = new AssetLoader();
        this._loader.onProgress.add(this._onLoadProgress);
        this._loader.load(this._onLoadComplete);
    }

    /**
     * @override
     */
    onExit(): void {
        super.onExit();

        removeEvents([
            Events.COMPLETE_LOAD,
            Events.COMPLETE_LOGO_ANIMATION,
        ]);
    }

    private _onLoadProgress = (event: loaders.Loader): void => {
        const percentage = event.progress;

        this._loadedProgressPercentage = percentage;
        this._loadingInfoText.text = `Now loading... ${Math.round(this._loadedProgressPercentage)}%`;
        this._loadKotoriAnimation.progress(percentage);
    };

    private _onLoadComplete = (loader: AssetLoader, resources: { string: loaders.Resource }): void => {
        console.log(`Complete to load [${Object.keys(resources).length}] resources.`);

        Object.keys(resources).forEach((key) => setAsset(resources[key]));
        dispatchEvent(Events.COMPLETE_LOAD);
    };

    private _handleLoadCompleteEvent = () => {
        if (SKIP_BRAND_LOGO_ANIMATION) {
            dispatchEvent(ApplicationEvents.PRELOAD_COMPLETE);
            return;
        }

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
