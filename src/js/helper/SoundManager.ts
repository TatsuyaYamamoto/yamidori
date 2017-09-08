import PixiSound from 'pixi-sound/lib';
import Sound from "pixi-sound/lib/Sound";

export function loadSound(uri: string): Sound {
    return PixiSound.Sound.from(uri);
}
