import {Container} from 'pixi.js';

import {getCurrentViewSize} from "../../helper/utils";

abstract class ViewContainer extends Container {
    private _backGroundLayer: Container;
    private _applicationLayer: Container;
    private _informationLayer: Container;

    constructor() {
        super();

        this._backGroundLayer = new Container();
        this._applicationLayer = new Container();
        this._informationLayer = new Container();

        this.addChild(
            this._backGroundLayer,
            this._applicationLayer,
            this._informationLayer
        )
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

    /**
     * Fire on opening the view.
     */
    protected onOpen(): void {
        window.addEventListener('resize', this.onResize);

    }

    /**
     * Fire on closing the view
     */
    protected onClose(): void {
        window.removeEventListener('resize', this.onResize);
    }

    /**
     * Fire on resizing window.
     *
     * @param newWidth
     * @param newheight
     */
    protected onRendererSizeChange(newWidth: number, newheight: number): void {
    }

    private onResize = (event: Event): void => {
        const {width, height} = getCurrentViewSize();
        this.onRendererSizeChange(width, height);
    }
}

export default ViewContainer;
