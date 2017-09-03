import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";
import {getCurrentViewSize} from "../../../utils";

class ResultTweetButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonResultTweet).texture);

        const {width, height} = getCurrentViewSize();
        this.position.set(width / 2, height / 2)
    }
}

export default ResultTweetButton;
