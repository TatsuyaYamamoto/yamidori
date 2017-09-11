import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import GameState from "./GameState";
import {Events as ApplicationEvents} from "../ApplicationState";
import GameOverLogo from '../../container/sprite/logo/GameOverLogo';
import GameRestartButton from "../../container/sprite/button/GameRestartButton";
import GoBackHomeButton from "../../container/sprite/button/GoBackHomeButton";
import ResultTweetButton from "../../container/sprite/button/ResultTweetButton";
import GamePointCount from "../../container/components/GamePointCount";

import {dispatchEvent} from "../EventUtils";
import {getCurrentViewSize, getString, getRandomInteger} from "../../utils";
import {tweetGameResult} from '../../network';
import {loadSound} from "../../helper/SoundManager";
import {getGamePoint} from "../../helper/GlobalState";
import manifest from '../../resources/manifest';
import {Ids} from '../../resources/string';

class OverGameState implements GameState {
    public static TAG = "OverGameState";

    private _container: Container;

    private _gameOverLogo: GameOverLogo;
    private _gameRestartButton: GameRestartButton;
    private _goBackHomeButton: GoBackHomeButton;
    private _resultTweetButton: ResultTweetButton;

    private _gamePointCount: GamePointCount;

    private _gameOverSound: Sound;
    private _okSound: Sound;
    private _cancelSound: Sound;

    update(elapsedTime: number): void {

    }

    onEnter(): void {
        console.log(`${OverGameState.TAG}@onEnter`);
        const {width, height} = getCurrentViewSize();

        this._container = new Container();

        this._gameOverLogo = new GameOverLogo();
        this._gameOverLogo.position.set(width * 0.5, height * 0.5);

        this._gameRestartButton = new GameRestartButton();
        this._gameRestartButton.position.set(width * 0.15, height * 0.45);
        this._gameRestartButton.setOnClickListener(this.handleTapRestartGame);

        this._goBackHomeButton = new GoBackHomeButton();
        this._goBackHomeButton.position.set(width * 0.85, height * 0.45);
        this._goBackHomeButton.setOnClickListener(this.handleTapGoBackHome);

        this._resultTweetButton = new ResultTweetButton();
        this._resultTweetButton.position.set(width * 0.9, height * 0.1);
        this._resultTweetButton.setOnClickListener(this.handleTapResultTweet);

        this._gamePointCount = new GamePointCount();
        this._gamePointCount.position.set(width * 0.22, height * 0.12);
        this._gamePointCount.rotation = -1 * Math.PI * 0.02;
        this._gamePointCount.point = getGamePoint();

        this._container.addChild(
            this._gameOverLogo,
            this._gameRestartButton,
            this._goBackHomeButton,
            this._resultTweetButton,
            this._gamePointCount
        );

        this._gameOverSound = loadSound(manifest.soundGameEnd);
        this._okSound = loadSound(manifest.soundOk);
        this._cancelSound = loadSound(manifest.soundCancel);

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
        this._cancelSound.play();
        dispatchEvent(ApplicationEvents.BACK_TO_TOP_REQUEST);
    };

    private handleTapRestartGame = () => {
        this._okSound.play();
        dispatchEvent(ApplicationEvents.GAME_START_REQUEST);
    };

    /**
     * Request to tweet game result with game point.
     *
     * @private
     */
    private handleTapResultTweet = () => {
        let tweetText = getString(Ids.GAME_RESULT_TWEET_ZERO_POINT);

        if (getGamePoint() !== 0) {
            switch (getRandomInteger(0, 2)) {
                case 0:
                    tweetText = getString(Ids.GAME_RESULT_TWEET1);
                    break;
                case 1:
                    tweetText = getString(Ids.GAME_RESULT_TWEET2);
                    break;
                case 2:
                default:
                    tweetText = getString(Ids.GAME_RESULT_TWEET3);
                    break;
            }
            tweetText = tweetText.replace(/%s/, `${getGamePoint()}`);
        }

        tweetGameResult(tweetText);
    };
}

export default OverGameState;
