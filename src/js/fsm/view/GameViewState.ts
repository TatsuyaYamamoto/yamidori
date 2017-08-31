import {Container} from 'pixi.js';

import ViewState from "./ViewState";
import GameViewContainer from "../../container/views/GameViewContainer";
import StateMachine from "../internal/StateMachine";
import {addEvents, removeEvents} from "../EventUtils";

export enum Events {
    COUNT_START = "GameViewState@COUNT_START",
    GAME_START = "GameViewState@GAME_START",
    GAME_OVER = "GameViewState@GAME_OVER",
}

class GameViewState implements ViewState {
    public static TAG = "GameViewState";
    private _gameStateMachine: StateMachine;
    private _container: GameViewContainer;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${GameViewState.TAG}@onEnter`);
        this._container = new GameViewContainer();

        this._gameStateMachine = new StateMachine({});

        addEvents({});
    }
    
    onExit(): void {
        console.log(`${GameViewState.TAG}@onExit`);
        removeEvents([]);
    }

    /**
     * Get pixi container.
     *
     * {@see ViewState#getContainer}
     * @return {GameViewContainer}
     * @override
     */
    public getContainer = (): Container => {
        return this._container;
    }
}

export default GameViewState;
