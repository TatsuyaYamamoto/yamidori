import {ASPECT_RATIO, BASIC_IMAGE_WIDTH} from "./Constants";

/**
 * Return true if the device's OS is iOS. Otherwise false.
 *
 * TODO: implement
 */
export function isIOS(): boolean {
    return false;
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
