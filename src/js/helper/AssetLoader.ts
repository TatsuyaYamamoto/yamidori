import {loaders} from 'pixi.js';

import manifest from '../resources/manifest';

class AssetLoader extends loaders.Loader {
    /**
     * Load assets written in manifest files.
     *
     * @see ../resources/manifest.ts
     * @param cb
     * @return {PIXI.loaders.Loader}
     * @override
     */
    load(cb?: Function): this {
        Object.keys(manifest).forEach((key) => {
            this.add(key, manifest[key]);
        });

        return super.load(cb);
    }
}

export default AssetLoader;
