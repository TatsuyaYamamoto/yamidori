import {Container} from 'pixi.js';

import {BASIC_IMAGE_HEIGHT, BASIC_IMAGE_WIDTH} from "../../Constants";

abstract class ViewSectionContainer extends Container {
    private _viewWidth: number;
    private _viewHeight: number;

    constructor() {
        super();

        this._viewWidth = BASIC_IMAGE_WIDTH;
        this._viewHeight = BASIC_IMAGE_HEIGHT;
    }

    protected get viewWidth(): number {
        return this._viewWidth;
    }

    protected get viewHeight(): number {
        return this._viewHeight;
    }
}

export default ViewSectionContainer;
