import {Application} from 'pixi.js';

import State from "./internal/State";
import StateMachine from "./internal/StateMachine";
import {addEvents, removeEvents} from './EventUtils';
import InitialViewState from "./view/InitialViewState";
import LoadViewState from "./view/LoadViewState";
import TopViewState from "./view/TopViewState";

export enum Events {
    INITIALIZED = "ApplicationState@INITIALIZED",
    PRELOAD_COMPLETE = "ApplicationState@PRELOAD_COMPLETE",
    GAME_START_REQUEST = "ApplicationState@GAME_START_REQUEST",
    BACK_TO_TOP_REQUEST = "ApplicationState@BACK_TO_TOP_REQUEST"
}

class ApplicationState extends Application implements State {
    private _viewStateMachine = new StateMachine({
        [InitialViewState.TAG]: new InitialViewState(),
        [LoadViewState.TAG]: new LoadViewState(),
        [TopViewState.TAG]: new TopViewState(),
    });

    constructor() {
        super(800, 450, {backgroundColor: 0xeeeeee});
    }

    /**
     *
     * @param elapsedTime
     * @override
     */
    update(elapsedTime: number): void {
        this._viewStateMachine.update(elapsedTime);
    }

    /**
     * @override
     */
    onEnter(): void {
        addEvents({
            [Events.INITIALIZED]: this._changeToLoadViewState,
            [Events.PRELOAD_COMPLETE]: this._changeToTopViewState
        });

        this._viewStateMachine.init(InitialViewState.TAG);
    }

    /**
     * @override
     */
    onExit(): void {
        removeEvents([
            Events.INITIALIZED,
            Events.PRELOAD_COMPLETE
        ]);
    }

    private _changeToLoadViewState = () => {
        this._viewStateMachine.change(LoadViewState.TAG);
    };

    private _changeToTopViewState = () => {
        this._viewStateMachine.change(TopViewState.TAG);
    };
}

export default ApplicationState;
