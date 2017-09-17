import {Texture} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class ChangeLanguageButton extends Button {
    constructor() {
        super(Texture.fromImage(manifest.buttonChangeLanguage));
    }
}

export default ChangeLanguageButton;
