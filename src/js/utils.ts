import {ASPECT_RATIO} from "./Constants";

/**
 * Return true if the device's OS is iOS. Otherwise false.
 *
 * TODO: implement
 */
export function isIOS(): boolean {
    return false;
}


export function getCurrentViewSize(): { newWidth: number, newHeight: number } {
    const currentWindowAspectRatio = window.innerWidth / window.innerHeight;

    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;

    // horizontally long then expected ratio.
    if (ASPECT_RATIO < currentWindowAspectRatio) newWidth = window.innerHeight * ASPECT_RATIO;

    // vertically long then expected ratio.
    if (currentWindowAspectRatio < ASPECT_RATIO) newHeight = window.innerWidth / ASPECT_RATIO;

    return {newWidth, newHeight}
}
