import {Container} from 'pixi.js';

import ViewState from "./ViewState";
import GameViewContainer from "../../container/views/GameViewContainer";
import StateMachine from "../internal/StateMachine";
import {addEvents, removeEvents} from "../EventUtils";
import CountGameState from "../game/CountGameState";
import OverGameState from "../game/OverGameState";
import PlayingGameState from "../game/PlayingGameState";
import {SKIP_COUNT_DOWN_FOR_GAME_START} from "../../Constants";

export enum Events {
    COUNT_START = "GameViewState@COUNT_START",
    GAME_START = "GameViewState@GAME_START",
    GAME_OVER = "GameViewState@GAME_OVER",
    TAP_KOTORI = "GameViewState@TAP_KOTORI"
}

class GameViewState implements ViewState {
    public static TAG = "GameViewState";
    private _container: GameViewContainer;

    private _gameStateMachine: StateMachine;
    private _countGameState: CountGameState;
    private _overGameState: OverGameState;
    private _playingGameState: PlayingGameState;

    private _gamePoint: number;

    update(elapsedTime: number): void {
        this._gameStateMachine.update(elapsedTime);
    }

    onEnter(): void {
        console.log(`${GameViewState.TAG}@onEnter`);
        this._container = new GameViewContainer();

        this._countGameState = new CountGameState();
        this._overGameState = new OverGameState();
        this._playingGameState = new PlayingGameState();

        this._gameStateMachine = new StateMachine({
            [CountGameState.TAG]: this._countGameState,
            [OverGameState.TAG]: this._overGameState,
            [PlayingGameState.TAG]: this._playingGameState
        });

        addEvents({
            [Events.COUNT_START]: this._changeToCountState,
            [Events.GAME_START]: this._changeToPlayingGameState,
            [Events.GAME_OVER]: this._changeToOverGameState,
            [Events.TAP_KOTORI]: this._incrementGamePoint
        });

        this._gameStateMachine.init(CountGameState.TAG);

        this._gamePoint = 0;

        this._container.applicationLayer.addChild(this._countGameState.getContainer());

        if (SKIP_COUNT_DOWN_FOR_GAME_START) {
            this._changeToPlayingGameState();
        }
    }

    onExit(): void {
        console.log(`${GameViewState.TAG}@onExit`);
        removeEvents([
            Events.COUNT_START,
            Events.GAME_START,
            Events.GAME_OVER,
            Events.TAP_KOTORI
        ]);
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
    };

    private _changeToCountState = (): void => {

    };

    private _changeToPlayingGameState = (): void => {
        this._gameStateMachine.change(PlayingGameState.TAG);
        this._container.applicationLayer.removeChildren();
        this._container.applicationLayer.addChild(this._playingGameState.getContainer());
    };

    private _changeToOverGameState = (): void => {
        this._gameStateMachine.change(OverGameState.TAG);
        this._container.applicationLayer.removeChildren();
        this._container.applicationLayer.addChild(this._overGameState.getContainer());
    }

    private _incrementGamePoint = (): void => {
        this._gamePoint++;
    }
}

export default GameViewState;
