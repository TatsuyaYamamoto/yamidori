import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';


class GoTwitterHomeButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoTwitterHome));
    }
}

export default GoTwitterHomeButton;
