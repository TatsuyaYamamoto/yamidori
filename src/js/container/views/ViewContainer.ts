import {Container} from 'pixi.js';

import {getCurrentViewSize} from "../../utils";

abstract class ViewContainer extends Container {

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
