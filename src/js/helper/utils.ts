import {loaders} from 'pixi.js';

import {ASPECT_RATIO, BASIC_IMAGE_WIDTH} from "../Constants";
import strings from "../resources/string";

/**
 * Detecting iOS
 * Return true if the user's device is iOS.
 *
 * @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 */
export function isIOS(): boolean {
    return !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}


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
 * Preloaded resources with Pixi loader.
 *
 * @type {any}
 * @private
 */
const AssetsCache: { string: loaders.Resource } = Object.create(null);

/**
 * Cache asset resource.
 *
 * @param resource
 */
export function setAsset(resource: loaders.Resource) {
    AssetsCache[resource.url] = resource;
}

/**
 * Get cached asset resource.
 *
 * @param url
 * @return {any}
 */
export function getAsset(url: string) {
    return AssetsCache[url];
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
