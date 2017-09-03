import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";
import {getCurrentViewSize} from "../../../utils";

class ResultTweetButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonResultTweet).texture);
    }
}

export default ResultTweetButton;
