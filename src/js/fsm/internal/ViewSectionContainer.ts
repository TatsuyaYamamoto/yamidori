import {Container} from 'pixi.js';

import State from "./State";

import {BASIC_IMAGE_HEIGHT, BASIC_IMAGE_WIDTH} from "../../Constants";

abstract class ViewSectionContainer extends Container implements State {
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

export default ViewSectionContainer;
