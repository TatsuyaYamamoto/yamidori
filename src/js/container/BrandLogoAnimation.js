import {Container, Texture, Sprite, Text} from 'pixi.js';
import * as anime from 'animejs'

const HAMMER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAADXUAAA11AFeZeUIAAAAzElEQVRIie2WwQ2DMAwA3aqj5Oks0BfqGAzAUAzANxugvlggfmYX+koUqpoQK4BUclIeRsEXGRIH4GrcBO/MJXI9BGLoW4BX8wyx6qbsHHeJGABgfOfLYlLl4coKiJhMTkRs/jUxK+UWopQKsXNuVS4u9TdEFGTGmMUidhXHcq11cm5Rscdae454C7uJ/ffmKPZXe+JtRkQpBysWDUSM45+ID5CNiA4Qjrlvlw+6IT+XqEl4QqMYDmwScXeS8H/7uIqruIoP47QL/fX4AHCDQfcvNliwAAAAAElFTkSuQmCC";
const BRAND_CHARACTERS = ['そ', 'こ', 'ん', 'と', 'こ', 'ろ', '工', '房'];
const TIMELINE = {
    HAMMER_DELAY: 220,
    SHRINK: 100,
    EXPANSION: 200,
    CHARACTER_WAITING: 200,
    CHARACTER_EXTEND: 100,
    HAMMER_MOVING: 600,
    CHARACTER_BOU_WAITING: 600,
    CHARACTER_BOU_ROTATION: 100,
};
const DURATION_SCALE = 1;

class BrandLogoAnimation extends Container {
    constructor(width, height) {
        super();

        this._width = width || 400;
        this._height = height || this._width;
        this._timeoutAfterComplete = 500;

        // create sprites
        this._characters = BRAND_CHARACTERS.map((char) => {
            const text = new Text(char);
            text.anchor.set(0.5, 1);
            return text;
        });
        
        this._hammer = Sprite.fromImage(HAMMER_IMAGE);
        this._hammer.anchor.set(0.5, 1);
        this._hammer.position.set(
            this.x + this._width * 0.05,
            this.y - this._height * 0.04
        );

        // add sprites
        this._characters.forEach((c) => this.addChild(c));
        this.addChild(this._hammer);

        // create animjs timeline instances
        this._hammerTimeLine = anime.timeline();
        this._charTimeLine = anime.timeline();

        // create promise that fire on complete animation.
        const hammerPromise = new Promise((resolve) => {
            this._defineHammerTimeLineItems(resolve)
        });
        const charsPromise = new Promise((resolve) => {
            this._defineCharacterTimeLineItems(resolve)
        });

        // set promise that fire on complete all animation.
        this._promise = Promise.all([hammerPromise, charsPromise]);
    }

    /**
     * Start animation.
     *
     * @return {Promise.<*>|*}
     */
    start() {
        this._hammerTimeLine.play();
        this._charTimeLine.play();

        return this._promise;
    }

    _defineHammerTimeLineItems(onComplete) {
        this._hammerTimeLine
            .add({
                targets: this._hammer,
                rotation: [
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                    {value: -90 * Math.PI / 180, duration: TIMELINE.EXPANSION * DURATION_SCALE},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE},
                ],
                easing: 'easeOutQuad',
                delay: TIMELINE.HAMMER_DELAY * DURATION_SCALE
            })
            .add({
                targets: this._hammer,
                x: [
                    {value: this.x + this._width * 0.36, easing: 'linear', duration: TIMELINE.HAMMER_MOVING},
                ],
                y: [
                    {value: this.y - this._height * 0.18, easing: 'easeOutQuad', duration: TIMELINE.HAMMER_MOVING / 2},
                    {value: this.y - this._height * 0.05, easing: 'easeOutQuad', duration: TIMELINE.HAMMER_MOVING / 2},
                ],
                rotation: {
                    value: (2 * Math.PI) * 5 - Math.PI / 4,
                    duration: TIMELINE.HAMMER_MOVING,
                    easing: 'linear'
                },
                complete: () => {
                    onComplete && onComplete();
                }
            });
    }

    _defineCharacterTimeLineItems(onComplete) {
        // 各文字の最終的なx方向の位置を計算
        const positions = this._characters.map((c, index, array) => {
            const cellTotal = array.length + 5;
            const cellIndex = index + 3;
            return (cellIndex - cellTotal / 2) / cellTotal;
        });

        this._characters.forEach((c) => c.scale.y = 0);

        this._charTimeLine
        /**
         * 1. Expand and contract with hammer.
         * After complete, change theirs scale to x = 0, y = 1;
         */
            .add({
                targets: this._characters // 'そこんところ' only
                    .filter((c) => c.text !== '工' && c.text !== '房')
                    .map((c) => c.scale),
                delay: function (el, i, l) {
                    return ((TIMELINE.EXPANSION + TIMELINE.SHRINK) * i + 50) * DURATION_SCALE;
                },
                y: [
                    {value: 1, duration: TIMELINE.EXPANSION * DURATION_SCALE, easing: 'easeInOutExpo',},
                    {value: 0, duration: TIMELINE.SHRINK * DURATION_SCALE, easing: 'easeInQuart',},
                ],
                complete: () => {
                    this._characters.forEach((c) => {
                        c.scale.x = 0;
                        c.scale.y = 1;
                    });
                }
            })
            /**
             * 2-a. Move to each last position.
             */
            .add({
                targets: this._characters,
                x: (el, i, l) => this.x + this._width * positions[i],
                duration: TIMELINE.CHARACTER_EXTEND * DURATION_SCALE,
                delay: function (el, i, l) {
                    return TIMELINE.CHARACTER_WAITING * DURATION_SCALE
                },
                easing: 'linear',
            })
            /**
             * 2-b. Reset each scale.
             * Arrange offset time to fire at the same time of 2-a moving.
             */
            .add({
                targets: this._characters.map((c) => c.scale),
                x: 1,
                duration: TIMELINE.CHARACTER_EXTEND * DURATION_SCALE,
                offset: `-=${TIMELINE.CHARACTER_EXTEND * DURATION_SCALE}`, // Starts before the previous animation ends
                easing: 'linear',
            })
            /**
             * 3. Rotate '房'
             * Fire callback function on complete.
             */
            .add({
                targets: this._characters[7], // '房'
                rotation: Math.PI / 4,
                duration: TIMELINE.CHARACTER_BOU_ROTATION * DURATION_SCALE,
                easing: 'linear',
                delay: TIMELINE.CHARACTER_BOU_WAITING * DURATION_SCALE,
                complete: () => {
                    setTimeout(() => onComplete && onComplete(), this._timeoutAfterComplete);
                }
            });
    }
}

export default BrandLogoAnimation;
