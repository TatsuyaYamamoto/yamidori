import {interaction} from 'pixi.js';

import ViewContainer from "./ViewContainer";
import GameStartButton from "../sprite/button/GameStartButton";
import {Events} from "../../fsm/ApplicationState";
import {dispatchEvent} from '../../fsm/EventUtils'

class TopViewContainer extends ViewContainer {
    private _gameStartButton;

    constructor() {
        super();
        this._gameStartButton = new GameStartButton();
        this._gameStartButton.setOnClickListener(this.onGameStartButtonClick);
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

    private onGameStartButtonClick = (event: interaction.InteractionEvent): void => {
        dispatchEvent(Events.GAME_START_REQUEST);
    }
}

export default TopViewContainer;
