import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import ViewState from "./ViewState";
import TitleTopState from "../top/TitleTopState";
import CreditTopState from "../top/CreditTopState";
import UsageTopState from "../top/UsageTopState";
import MenuTopState from "../top/MenuTopState";

import ViewContainer from "../../container/views/ViewContainer";
import Background from "../../container/sprite/background/Background";

import manifest from '../../resources/manifest';
import {loadSound} from "../../helper/SoundManager";
import StateMachine from "../internal/StateMachine";

import {Events as ApplicationEvents} from "../ApplicationState";
import {dispatchEvent, addEvents, removeEvents} from "../EventUtils";

export enum Events {
    REQUEST_GAME_START = "GameViewState@REQUEST_GAME_START",
    REQUEST_GO_TO_MENU = "GameViewState@REQUEST_GO_TO_MENU",
    REQUEST_GO_TO_USAGE = "GameViewState@REQUEST_GO_TO_USAGE",
    REQUEST_GO_TO_CREDIT = "GameViewState@REQUEST_GO_TO_CREDIT",
    REQUEST_BACK_TO_TOP = "TopViewState@REQUEST_BACK_TO_TOP"
}

class TopViewState extends ViewContainer implements ViewState {
    public static TAG = "TopViewState";

    private _topViewStateMachine: StateMachine;
    private _titleTopState: TitleTopState;
    private _menuTopState: MenuTopState;
    private _creditTopState: CreditTopState;
    private _usageTopState: UsageTopState;

    private _background: Background;

    private _zenkaiSound: Sound;

    /**
     * @inheritDoc
     */
    update(elapsedTime: number): void {
        this._topViewStateMachine.update(elapsedTime);
    }

    /**
     * @inheritDoc
     */
    onEnter(): void {
        console.log(`${TopViewState.TAG}@onEnter`);

        this._titleTopState = new TitleTopState();
        this._menuTopState = new MenuTopState();
        this._creditTopState = new CreditTopState();
        this._usageTopState = new UsageTopState();

        this._topViewStateMachine = new StateMachine({
            [TitleTopState.TAG]: this._titleTopState,
            [MenuTopState.TAG]: this._menuTopState,
            [CreditTopState.TAG]: this._creditTopState,
            [UsageTopState.TAG]: this._usageTopState,
        });

        addEvents({
            [Events.REQUEST_GO_TO_MENU]: this._changeToMenuTopState,
            [Events.REQUEST_GAME_START]: this._requestGameStart,
            [Events.REQUEST_GO_TO_USAGE]: this._changeToUsageState,
            [Events.REQUEST_GO_TO_CREDIT]: this._changeToCredit,
            [Events.REQUEST_BACK_TO_TOP]: this._changeToMenuTopState,
        });

        this._zenkaiSound = loadSound(manifest.soundZenkai);
        this._zenkaiSound.play({loop: true});

        this._topViewStateMachine.init(TitleTopState.TAG);

        this._background = new Background();

        this.backGroundLayer.addChild(this._background);
        this.applicationLayer.addChild(this._titleTopState.getContainer());
    }

    /**
     * @inheritDoc
     */
    onExit(): void {
        console.log(`${TopViewState.TAG}@onExit`);
        this._zenkaiSound.stop();
        removeEvents([
            Events.REQUEST_GO_TO_MENU,
            Events.REQUEST_GAME_START,
            Events.REQUEST_GO_TO_USAGE,
            Events.REQUEST_GO_TO_CREDIT,
            Events.REQUEST_BACK_TO_TOP,
        ]);
    }

    /**
     * @deprecated
     */
    public getContainer = (): Container => {
        return this;
    };

    private _requestGameStart = (): void => {
        dispatchEvent(ApplicationEvents.GAME_START_REQUEST);
    };

    private _changeToMenuTopState = (): void => {
        this._topViewStateMachine.change(MenuTopState.TAG);

        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(this._menuTopState.getContainer());
    };

    private _changeToUsageState = (): void => {
        this._topViewStateMachine.change(UsageTopState.TAG);

        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(this._usageTopState.getContainer());
    };

    private _changeToCredit = (): void => {
        this._topViewStateMachine.change(CreditTopState.TAG);

        this.applicationLayer.removeChildren();
        this.applicationLayer.addChild(this._creditTopState.getContainer());
    };
}

export default TopViewState;
