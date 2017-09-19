import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class GoHowToPlayButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoHowToPlay));
    }
}

export default GoHowToPlayButton;
