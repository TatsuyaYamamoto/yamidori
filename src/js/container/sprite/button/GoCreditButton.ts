import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';

class GoCreditButton extends Button {
    constructor() {
        super(loadTexture(Ids.BUTTON_GO_CREDIT));
    }
}

export default GoCreditButton;
