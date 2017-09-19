import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class SoundButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonSound));
    }
}

export default SoundButton;
