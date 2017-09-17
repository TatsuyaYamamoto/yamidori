import {Container} from 'pixi.js';

import State from "./State";

import {BASIC_IMAGE_HEIGHT, BASIC_IMAGE_WIDTH} from "../../Constants";

abstract class ViewContainer extends Container implements State {
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

        this._viewWidth = BASIC_IMAGE_WIDTH;
        this._viewHeight = BASIC_IMAGE_HEIGHT;
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

    /**
     * @inheritDoc
     * @see State#update
     */
    update(elapsedTime: number): void {

    }

    /**
     * @inheritDoc
     * @see State#onEnter
     */
    onEnter(): void {
        console.log(`${this.constructor.name}@onEnter`);
    }

    /**
     * @inheritDoc
     * @see State#onExit
     */
    onExit(): void {
        console.log(`${this.constructor.name}@onExit`);
    }
}

export default ViewContainer;
