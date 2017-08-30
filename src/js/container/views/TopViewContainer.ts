import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";

class TopViewContainer extends ViewContainer {
    private _gameStartButton;

    constructor() {
        super();
        this._gameStartButton = new GameStartButton();
        this.addChild(this._gameStartButton)
    }

    /**
     * {@see ViewContainer#onOpen}
     * @override
     */
    protected onOpen(): void {
        super.onOpen();
    }

    /**
     * {@see ViewContainer#onClose}
     * @override
     */
    protected onClose(): void {
        super.onClose();
    }

    /**
     * {@see ViewContainer#onRendererSizeChange}
     * @override
     */
    protected onRendererSizeChange(newWidth: number, newheight: number): void {
        super.onRendererSizeChange(newWidth, newheight);
    }
}

export default TopViewContainer;
