import {Container} from 'pixi.js';

import {getCurrentViewSize} from "../../helper/utils";

abstract class ViewContainer extends Container {
    private _backGroundLayer: Container;
    private _applicationLayer: Container;
    private _informationLayer: Container;

    private _viewWidth: number;
    private _viewHeight: number;

    constructor() {
        super();

        this._backGroundLayer = new Container();
        this._applicationLayer = new Container();
        this._informationLayer = new Container();

        this.addChild(
            this._backGroundLayer,
            this._applicationLayer,
            this._informationLayer
        );

        const {width, height} = getCurrentViewSize();
        this._viewWidth = width;
        this._viewHeight = height;
    }

    protected get viewWidth(): number {
        return this._viewWidth;
    }

    protected get viewHeight(): number {
        return this._viewHeight;
    }

    public get backGroundLayer(): Container {
        return this._backGroundLayer;
    }

    public get applicationLayer(): Container {
        return this._applicationLayer;
    }

    public get informationLayer(): Container {
        return this._informationLayer;
    }
}

export default ViewContainer;
