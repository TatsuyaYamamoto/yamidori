import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';


class GoTwitterHomeButton extends Button {
    constructor() {
        super(loadTexture(Ids.BUTTON_GO_TWITTER_HOME));
    }
}

export default GoTwitterHomeButton;
