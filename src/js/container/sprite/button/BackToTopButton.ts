import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class BackToTopButton extends Button {
    constructor() {
        super(loadTexture((manifest.buttonGameRestart)));
    }
}

export default BackToTopButton;
