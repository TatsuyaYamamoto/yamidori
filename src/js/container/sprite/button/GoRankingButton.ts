import Button from "./Button";

import {loadTexture} from "../../../helper/AssetLoader";

import manifest from '../../../resources/image';


class GoRankingButton extends Button {
    constructor() {
        super(loadTexture(manifest.buttonGoRanking));
    }
}

export default GoRankingButton;
