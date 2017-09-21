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

import {DEFAULT_LANGUAGE} from "../Constants";
import {getCurrentLanguage} from "./i18n";

const IMAGE_BASE_DIR = 'assets/image/';
const SOUND_BASE_DIR = 'assets/sound/';

/**
 * Cache space of loaded resources.
 *
 * @type {any}
 * @private
 */
const AssetsCache: { string: Asset } = Object.create(null);

/**
 * Texture and Sound resource interface loaded with PIXI Loader.
 */
export interface Asset extends loaders.Resource {
    sound: Sound
}

/**
 * Image manifest interface that the loader requires.
 */
export interface ImageManifest {
    [language: string]: {
        [key: string]: string
    };
}

/**
 * Sound manifest interface that the loader requires.
 */
export interface SoundManifest {
    [key: string]: string
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
     * @param {ImageManifest} imageManifest
     */
    public setImageManifest(imageManifest: ImageManifest): void {
        // Concat manifests with base and current language.
        const targetManifest = Object.assign({},
            imageManifest[DEFAULT_LANGUAGE],
            imageManifest[getCurrentLanguage()],
        );

        // add each asset info to loader.
        const assetIds = Object.keys(targetManifest);
        assetIds.forEach(id => this.add({
            name: id,
            url: `${IMAGE_BASE_DIR}${targetManifest[id]}`
        }));
    }

    /**
     * Set sound manifest for loader.
     *
     * @param {SoundManifest} soundManifest
     */
    public setSoundManifest(soundManifest: SoundManifest): void {

        // add each asset info to loader.
        const assetIds = Object.keys(soundManifest);
        assetIds.forEach(id => this.add({
            name: id,
            url: `${SOUND_BASE_DIR}${soundManifest[id]}`
        }));
    }

    /**
     * Fire on complete load resources.
     *
     * @param {AssetLoader} loader
     * @param {{[string]: Asset}} assets
     * @private
     */
    private setAssets(loader: AssetLoader, assets: { [key: string]: Asset }) {
        const assetIds = Object.keys(assets);

        assetIds.forEach((id) => {
            const asset = assets[id];
            AssetsCache[asset.name] = asset;
        });
    }
}

/**
 * Convenience method for getting texture asset cached with the loader.
 *
 * @param {string} id
 * @returns {Texture}
 */
export function loadTexture(id: string): Texture {
    return AssetsCache[id].texture;
}

/**
 * Convenience method for getting sound asset cached with the loader.
 *
 * @param {string} id
 * @return {Sound}
 */
export function loadSound(id: string): Sound {
    return AssetsCache[id].sound;
}

export default AssetLoader;