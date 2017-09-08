import PixiSound from 'pixi-sound/lib';
import Sound from "pixi-sound/lib/Sound";
import {getAsset} from "../utils";

export function loadSound(url: string): Sound {
    return getAsset(url).sound;
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