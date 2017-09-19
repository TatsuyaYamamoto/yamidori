import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';


class ResultTweetButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonResultTweet));
    }
}

export default ResultTweetButton;
