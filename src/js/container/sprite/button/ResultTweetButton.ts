import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import {Ids} from '../../../resources/image';


class ResultTweetButton extends Button {
    constructor() {
        super(loadTexture(Ids.BUTTON_RESULT_TWEET));
    }
}

export default ResultTweetButton;
