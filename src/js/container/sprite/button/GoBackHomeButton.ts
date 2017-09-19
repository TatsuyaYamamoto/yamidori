import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';

class GoBackHomeButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoBackHome));
    }
}

export default GoBackHomeButton;
