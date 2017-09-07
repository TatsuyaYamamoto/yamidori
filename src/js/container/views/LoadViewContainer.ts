import {Container} from 'pixi.js';

import Text from "../sprite/text/Text";
import BrandLogoAnimation from "../BrandLogoAnimation.js";
import LoadKotoriAnimation from "../LoadKotoriAnimation.js";
import {Events} from '../../fsm/view/LoadViewState'
import {getCurrentViewSize} from "../../utils";
import {dispatchEvent} from '../../fsm/EventUtils';

class LoadViewContainer extends Container {
    private _loadingInfoText;
    private _brandLogoAnimation: BrandLogoAnimation;
    private _loadKotoriAnimation: LoadKotoriAnimation;
    private _loadedProgressPercentage: number = 0;

    constructor() {
        super();
        const {width, height} = getCurrentViewSize();

        this._loadingInfoText = new Text(`Now loading... ${this._loadedProgressPercentage}%`);
        this._loadingInfoText.position.set(width * 0.6, height * 0.8);

        this._brandLogoAnimation = new BrandLogoAnimation();
        this._brandLogoAnimation.position.set(width / 2, height / 2);

        this._loadKotoriAnimation = new LoadKotoriAnimation(100);
        this._loadKotoriAnimation.position.set(width * 0.2, height * 0.8);
        this._loadKotoriAnimation.scale.set(0.2);

        this.addChild(
            this._loadingInfoText,
            this._brandLogoAnimation,
            this._loadKotoriAnimation,
        );

        this._brandLogoAnimation
            .start()
            .then(() => dispatchEvent(Events.COMPLETE_LOGO_ANIMATION));
    }

    public updateLoadedProgress(percentage: number): void {
        this._loadedProgressPercentage = percentage;
        this._loadingInfoText.text = `Now loading... ${Math.round(this._loadedProgressPercentage)}%`;
        this._loadKotoriAnimation.progress(percentage);
    }
}

export default LoadViewContainer;
