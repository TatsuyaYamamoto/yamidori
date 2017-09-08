import {Sprite} from 'pixi.js';

import manifest from '../../../resources/manifest';
import Button from "./Button";

class GoRankingButton extends Button {
    constructor() {
        super(Sprite.fromImage(manifest.buttonGoRanking).texture);
    }
}

export default GoRankingButton;
