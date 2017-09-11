import ViewContainer from "./ViewContainer";
import Background from "../sprite/background/Background";

class TopViewContainer extends ViewContainer {
    private _background: Background;

    constructor() {
        super();
        this._background = new Background();
        this.backGroundLayer.addChild(this._background);
    }
}

export default TopViewContainer;
