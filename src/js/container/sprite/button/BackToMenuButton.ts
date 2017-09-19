import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class BackToMenuButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoBackMenu));
    }
}

export default BackToMenuButton;
