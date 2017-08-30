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
    private _viewStateMachine: StateMachine;
    private _initialViewState: InitialViewState;
    private _loadViewState: LoadViewState;
    private _topViewState: TopViewState;

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
        this._initialViewState = new InitialViewState();
        this._loadViewState = new LoadViewState();
        this._topViewState = new TopViewState();

        this._viewStateMachine = new StateMachine({
            [InitialViewState.TAG]: this._initialViewState,
            [LoadViewState.TAG]: this._loadViewState,
            [TopViewState.TAG]: this._topViewState
        });

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
        this.stage.removeChildren();
        this.stage.addChild(this._loadViewState.getContainer());
    };

    private _changeToTopViewState = () => {
        this._viewStateMachine.change(TopViewState.TAG);
        this.stage.removeChildren();
        this.stage.addChild(this._topViewState.getContainer());
    };
}

export default ApplicationState;
