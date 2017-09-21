/**
 * @fileOverview Convenience utilities.
 */
import PixiSound from 'pixi-sound/lib';

import {ASPECT_RATIO, BASIC_IMAGE_WIDTH} from "../Constants";

/**
 * Detecting iOS
 * Return true if the user's device is iOS.
 *
 * @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 */
export function isIOS(): boolean {
    return !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Return current view size in according to {@link window.innerWidth}, {@link window.innerHeight} and {@link ASPECT_RATIO}.
 *
 * @returns {{width: number; height: number}}
 */
export function getCurrentViewSize(): { width: number, height: number } {
    const currentWindowAspectRatio = window.innerWidth / window.innerHeight;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // horizontally long then expected ratio.
    if (ASPECT_RATIO < currentWindowAspectRatio) width = window.innerHeight * ASPECT_RATIO;

    // vertically long then expected ratio.
    if (currentWindowAspectRatio < ASPECT_RATIO) height = window.innerWidth / ASPECT_RATIO;

    return {width, height}
}

/**
 * Return view size ratio of current window size to application basic size.
 *
 * @return {number}
 */
export function getScale(): number {
    const {width} = getCurrentViewSize();
    return width / BASIC_IMAGE_WIDTH;
}

/**
 * Return true if running browser is supporting touch events.
 * @see https://github.com/Modernizr/Modernizr/blob/v3.3.1/feature-detects/touchevents.js
 * @return {boolean}
 */
export function isSupportTouchEvent(): boolean {
    return 'ontouchstart' in window;
}

/**
 * Get integer. this value is generated randomly between min and max.
 *
 * @param min
 * @param max
 * @return {number}
 */
export function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * Toggle muted property for all sounds.
 *
 * @return {boolean} if all sounds are muted.
 */
export function toggleMute(): boolean {
    if (PixiSound.context.muted) {
        PixiSound.unmuteAll();
    } else {
        PixiSound.muteAll();
    }

    return PixiSound.context.muted;
}