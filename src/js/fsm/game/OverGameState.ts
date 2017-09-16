import {Container} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import State from "../internal/State";

import {Events as ApplicationEvents} from "../ApplicationState";
import {dispatchEvent} from "../EventUtils";

import ViewSectionContainer from "../internal/ViewSectionContainer";
import GameOverLogo from '../../container/sprite/logo/GameOverLogo';
import GameRestartButton from "../../container/sprite/button/GameRestartButton";
import GoBackHomeButton from "../../container/sprite/button/GoBackHomeButton";
import ResultTweetButton from "../../container/sprite/button/ResultTweetButton";
import GamePointCount from "../../container/components/GamePointCount";

import {getCurrentViewSize, getString, getRandomInteger} from "../../helper/utils";
import {postPlayLog, tweetGameResult} from '../../helper/network';
import {loadSound} from "../../helper/SoundManager";
import {getGamePoint} from "../../helper/GlobalState";

import manifest from '../../resources/manifest';
import {Ids} from '../../resources/string';

class OverGameState extends ViewSectionContainer implements State {
    public static TAG = "OverGameState";

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

        this._gameOverLogo = new GameOverLogo();
        this._gameOverLogo.position.set(this.viewWidth * 0.5, this.viewHeight * 0.5);

        this._gameRestartButton = new GameRestartButton();
        this._gameRestartButton.position.set(this.viewWidth * 0.15, this.viewHeight * 0.45);
        this._gameRestartButton.setOnClickListener(this.handleTapRestartGame);

        this._goBackHomeButton = new GoBackHomeButton();
        this._goBackHomeButton.position.set(this.viewWidth * 0.85, this.viewHeight * 0.45);
        this._goBackHomeButton.setOnClickListener(this.handleTapGoBackHome);

        this._resultTweetButton = new ResultTweetButton();
        this._resultTweetButton.position.set(this.viewWidth * 0.85, this.viewHeight * 0.15);
        this._resultTweetButton.setOnClickListener(this.handleTapResultTweet);

        this._gamePointCount = new GamePointCount();
        this._gamePointCount.position.set(this.viewWidth * 0.22, this.viewHeight * 0.15);
        this._gamePointCount.rotation = -1 * Math.PI * 0.02;
        this._gamePointCount.point = getGamePoint();

        this.addChild(
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

        postPlayLog(getGamePoint());
    }

    onExit(): void {
        console.log(`${OverGameState.TAG}@onExit`);
        this._gameOverSound.stop();
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
