import {loaders} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

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

/**
 * Preloaded resources with Pixi loader.
 *
 * @type {any}
 * @private
 */
const AssetsCache: { string: Asset } = Object.create(null);

/**
 * Cache asset resource.
 *
 * @param resource
 */
function setAsset(resource: Asset) {
    AssetsCache[resource.url] = resource;
}

/**
 * Get cached asset resource.
 *
 * @param url
 * @return {any}
 */
function getAsset(url: string): Asset {
    return AssetsCache[url];
}

/**
 * Get cached sound asset.
 *
 * @param {string} url
 * @return {Sound}
 */
export function loadSound(url: string): Sound {
    return getAsset(url).sound;
}

export default AssetLoader;
