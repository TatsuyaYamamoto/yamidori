import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import GameState from "./GameState";
import GameOverLogo from '../../container/sprite/logo/GameOverLogo';
import GameRestartButton from "../../container/sprite/button/GameRestartButton";
import {getCurrentViewSize} from "../../utils";
import GoBackHomeButton from "../../container/sprite/button/GoBackHomeButton";
import ResultTweetButton from "../../container/sprite/button/ResultTweetButton";
import {dispatchEvent} from "../EventUtils";
import {Events as ApplicationEvents} from "../ApplicationState";
import {tweetGameResult} from '../../network';
import {loadSound} from "../../helper/SoundManager";
import manifest from '../../resources/manifest';

class OverGameState implements GameState {
    public static TAG = "OverGameState";

    private _container: Container;

    private _gameOverLogo: GameOverLogo;
    private _gameRestartButton: GameRestartButton;
    private _goBackHomeButton: GoBackHomeButton;
    private _resultTweetButton: ResultTweetButton;

    private _gameOverSound: Sound;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${OverGameState.TAG}@onEnter`);
        const {width, height} = getCurrentViewSize();

        this._container = new Container();

        this._gameOverLogo = new GameOverLogo();
        this._gameOverLogo.position.set(width * 0.5, height * 0.2);

        this._gameRestartButton = new GameRestartButton();
        this._gameRestartButton.position.set(width * 0.3, height * 0.7);
        this._gameRestartButton.setOnClickListener(this.handleTapRestartGame);

        this._goBackHomeButton = new GoBackHomeButton();
        this._goBackHomeButton.position.set(width * 0.7, height * 0.7);
        this._goBackHomeButton.setOnClickListener(this.handleTapGoBackHome);

        this._resultTweetButton = new ResultTweetButton();
        this._resultTweetButton.position.set(width * 0.8, height * 0.2);
        this._resultTweetButton.setOnClickListener(this.handleTapResultTweet);

        this._container.addChild(
            this._gameOverLogo,
            this._gameRestartButton,
            this._goBackHomeButton,
            this._resultTweetButton
        )

        this._gameOverSound = loadSound(manifest.soundGameEnd);
        this._gameOverSound.play();
    }

    onExit(): void {
        console.log(`${OverGameState.TAG}@onExit`);
        this._gameOverSound.stop();
    }

    public getContainer(): Container {
        return this._container;
    }

    private handleTapGoBackHome = () => {
        dispatchEvent(ApplicationEvents.BACK_TO_TOP_REQUEST);
    };

    private handleTapRestartGame = () => {
        dispatchEvent(ApplicationEvents.GAME_START_REQUEST);
    };

    private handleTapResultTweet = () => {
        // TODO: Get tweet text.
        tweetGameResult("Dummy text");
    };
}

export default OverGameState;
