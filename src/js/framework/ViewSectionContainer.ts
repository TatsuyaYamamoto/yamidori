import {Container} from 'pixi.js';

import State from "./State";

import config from "./config";

abstract class ViewSectionContainer extends Container implements State {
    private _viewWidth: number;
    private _viewHeight: number;

    constructor() {
        super();

        this._viewWidth = config.basicImageWidth;
        this._viewHeight = config.basicImageHeight;
    }

    protected get viewWidth(): number {
        return this._viewWidth;
    }

    protected get viewHeight(): number {
        return this._viewHeight;
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

        this.removeChildren();
    }
}

export default ViewSectionContainer;
