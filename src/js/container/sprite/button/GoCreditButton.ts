import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class GoCreditButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoCredit));
    }
}

export default GoCreditButton;
