import {Container} from 'pixi.js';

import {getCurrentViewSize} from "../../helper/utils";

abstract class ViewSectionContainer extends Container {
    private _viewWidth: number;
    private _viewHeight: number;

    constructor() {
        super();

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
}

export default ViewSectionContainer;
