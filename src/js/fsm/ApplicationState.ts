import {Application} from 'pixi.js';

import State from "./internal/State";
import StateMachine from "./internal/StateMachine";
import {addEvents, removeEvents} from './EventUtils';
import InitialViewState from "./view/InitialViewState";
import LoadViewState from "./view/LoadViewState";
import TopViewState from "./view/TopViewState";
import {getCurrentViewSize} from "../utils";
import GameViewState from "./view/GameViewState";


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
    private _gameViewState: GameViewState;

    constructor(options) {
        super(Object.assign({}, options, {backgroundColor: 0xeeeeee}));
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
        this._gameViewState = new GameViewState();

        this._viewStateMachine = new StateMachine({
            [InitialViewState.TAG]: this._initialViewState,
            [LoadViewState.TAG]: this._loadViewState,
            [TopViewState.TAG]: this._topViewState,
            [GameViewState.TAG]: this._gameViewState
        });

        addEvents({
            [Events.INITIALIZED]: this._changeToLoadViewState,
            [Events.PRELOAD_COMPLETE]: this._changeToTopViewState,
            [Events.GAME_START_REQUEST]: this._changeToGameViewState,
            [Events.BACK_TO_TOP_REQUEST]: this._changeToTopViewState,
        });

        window.addEventListener('resize', this.onResize);

        this._viewStateMachine.init(InitialViewState.TAG);
    }

    /**
     * @override
     */
    onExit(): void {
        removeEvents([
            Events.INITIALIZED,
            Events.PRELOAD_COMPLETE,
            Events.GAME_START_REQUEST,
            Events.BACK_TO_TOP_REQUEST
        ]);
        window.removeEventListener('resize', this.onResize);
    }

    private onResize = (event: Event): void => {
        const {width, height} = getCurrentViewSize();
        this.renderer.resize(width, height);
    };

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

    private _changeToGameViewState = () => {
        this._viewStateMachine.change(GameViewState.TAG);
        this.stage.removeChildren();
        this.stage.addChild(this._gameViewState.getContainer());
    };
}

export default ApplicationState;
