/**
 * @fileOverview Resource loader class and util functions.
 * {@link AssetLoader} loads with manifest files.
 * The manifest file's construction is key, name of resource called in javascript , and value; actual file name.
 * URL of the resource is create with fileName and {@link IMAGE_BASE_DIR} or {@link SOUND_BASE_DIR}, when {@link AssetLoader} adds load list with manifest.
 * After completing to load assets, the loader set them to {@link AssetsCache}.
 * User can get assets cached in {@link AssetsCache} with {@link loadTexture} and {@link loadSound}.
 */

import {Texture, loaders} from 'pixi.js';
import Sound from "pixi-sound/lib/Sound";

const IMAGE_BASE_DIR = 'assets/image/';
const SOUND_BASE_DIR = 'assets/sound/';

/**
 * Texture and Sound resource interface loaded with PIXI Loader.
 */
export interface Asset extends loaders.Resource {
    sound: Sound
}

/**
 * Assets Loader for image and sound resources.
 * It should be set manifest before executing {@link this#load}.
 */
class AssetLoader extends loaders.Loader {
    constructor() {
        super();
        this.on("complete", this.setAssets);
    }

    /**
     * Set image asset manifest for loader.
     *
     * @param {Object} imageManifest
     */
    public setImageManifest(imageManifest: object): void {
        Object.keys(imageManifest).forEach((key) => {
            const name = `image@${key}`;
            const url = `${IMAGE_BASE_DIR}${imageManifest[key]}`;
            this.add(name, url);
        });
    }

    /**
     * Set sound manifest for loader.
     *
     * @param {Object} soundManifest
     */
    public setSoundManifest(soundManifest: object): void {
        Object.keys(soundManifest).forEach((key) => {
            const name = `sound@${key}`;
            const url = `${SOUND_BASE_DIR}${soundManifest[key]}`;
            this.add(name, url);
        });
    }

    /**
     * Fire on complete load resources.
     *
     * @param {AssetLoader} loader
     * @param {{string: Asset}} resources
     * @private
     */
    private setAssets(loader: AssetLoader, resources: { string: Asset }) {
        Object.keys(resources).forEach((key) => setAsset(resources[key]));
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
 * @private
 */
function setAsset(resource: Asset) {
    AssetsCache[resource.url] = resource;
}

/**
 * Get cached asset resource.
 *
 * @param url
 * @return {any}
 * @private
 */
function getAsset(url: string): Asset {
    return AssetsCache[url];
}

/**
 * Get cached texture asset.
 *
 * @param {string} url
 * @return {Sound}
 */
export function loadTexture(url: string): Texture {
    return getAsset(`${IMAGE_BASE_DIR}${url}`).texture;
}

/**
 * Get cached sound asset.
 *
 * @param {string} url
 * @return {Sound}
 */
export function loadSound(url: string): Sound {
    return getAsset(`${SOUND_BASE_DIR}${url}`).sound;
}

export default AssetLoader;
