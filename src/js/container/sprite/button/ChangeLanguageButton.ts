import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';


class ChangeLanguageButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonChangeLanguage));
    }
}

export default ChangeLanguageButton;
