import {loaders} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

import {getAsset, setAsset} from "./utils";

import manifest from '../resources/manifest';

export interface Asset extends loaders.Resource {
    sound: Sound
}

class AssetLoader extends loaders.Loader {
    constructor() {
        super();

        Object.keys(manifest).forEach((key) => this.add(key, manifest[key]));

        this.on("complete", function (loader: AssetLoader, resources: { string: Asset }) {
            Object.keys(resources).forEach((key) => setAsset(resources[key]));
        })
    }
}

export function loadSound(url: string): Sound {
    return getAsset(url).sound;
}


export default AssetLoader;
