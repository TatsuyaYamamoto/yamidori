import PixiSound from 'pixi-sound/lib';
import Sound from "pixi-sound/lib/Sound";
import {getAsset} from "./utils";

export function loadSound(url: string): Sound {
    return getAsset(url).sound;
}
